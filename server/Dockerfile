# Use Node.js official image
FROM node:22-slim

# Install build-essential (includes g++ compiler)
RUN apt-get update && \
    apt-get install -y build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server files
COPY . .

# Expose port
EXPOSE 10000

# Start server
CMD ["npm", "start"]
