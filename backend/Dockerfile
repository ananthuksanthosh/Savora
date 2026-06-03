# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy rest of the backend files
COPY . .

# Expose port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
