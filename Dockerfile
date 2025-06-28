# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy Prisma schema first (required for postinstall)
COPY prisma ./prisma

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (postinstall runs `prisma generate`)
RUN npm install

# Copy rest of the application code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose application port
EXPOSE 3005

# Start application
CMD ["node", "dist/index.js"]
