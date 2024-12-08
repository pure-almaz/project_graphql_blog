# Stage 1: Build the Vite app
FROM node:alpine3.20 as build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.23-alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf *

# Copy built files from the previous stage
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Run Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
