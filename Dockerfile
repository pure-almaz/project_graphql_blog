# Stage 1: Build the Next.js app
FROM node:alpine3.20 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build and export the Next.js static site
RUN npm run build

# Stage 2: Use a lightweight web server to serve the static files
FROM nginx:alpine

# Copy the exported static files to the Nginx server directory
COPY --from=build /app/out /usr/share/nginx/html

# Expose the port Nginx serves on (default is 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
