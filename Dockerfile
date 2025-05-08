# Use a stable Node.js LTS image (avoid Node 24 due to compatibility issues)
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies (add --legacy-peer-deps to avoid version conflicts if needed)
RUN npm install

# Copy the rest of the source code
COPY . .

# Build Next.js app (only works with "next build")
RUN npm run build

# Expose port (3002 as per your dev script)
EXPOSE 3002

# Start the app in development mode (you can change this to "start" for prod)
CMD ["npm", "run", "dev"]
