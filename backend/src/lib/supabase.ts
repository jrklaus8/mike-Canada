import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 * If a token is provided, uses the anon key to enforce Row Level Security (RLS).
 * Bypasses RLS only if token is omitted (falls back to service role key).
 */
export function createServerSupabase(token?: string) {
  const url = process.env.SUPABASE_URL || "";
  
  if (token) {
    const anonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SECRET_KEY || "";
    if (!url || !anonKey) {
      throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
    }
    return createClient(url, anonKey, {
      auth: { persistSession: false },
      global: { headers: { Authorization: `Bearer ${token}` } }
    });
  }

  const key = process.env.SUPABASE_SECRET_KEY || "";
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

/**
 * Extract and verify the Supabase JWT from the Authorization header.
 * Returns the user's UUID string, or throws a Response with 401.
 */
export async function getUserIdFromRequest(req: Request): Promise<string> {
  const auth = req.headers.get("authorization") ?? "";
  if (!auth.startsWith("Bearer ")) {
    throw new Response("Missing or invalid Authorization header", {
      status: 401,
    });
  }
  const token = auth.slice(7).trim();

  const supabaseUrl = process.env.SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SECRET_KEY || "";

  if (!supabaseUrl || !serviceKey) {
    throw new Response("Server auth is not configured", { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
  const { data } = await admin.auth.getUser(token);
  if (!data.user) {
    throw new Response("Invalid or expired token", { status: 401 });
  }
  return data.user.id;
}
