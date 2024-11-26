# Use official Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the frontend port
EXPOSE 3000

CMD ["npm", "run", "dev"]
