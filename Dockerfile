# Build Stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app files and build the project
COPY . .
RUN npm run build

# Serve Stage
FROM nginx:alpine

# Copy built files to nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Ensure the permissions are correct for the files
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
