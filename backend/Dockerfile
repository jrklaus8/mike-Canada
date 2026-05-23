FROM node:20-alpine

WORKDIR /app

# Install dependencies for canvas/pdfjs and python for any scripts
RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    python3 \
    libreoffice

COPY package*.json ./
RUN npm ci

COPY . .

# Build step if needed (e.g. tsc)
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
