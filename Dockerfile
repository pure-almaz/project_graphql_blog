# Stage 1: Build the Next.js app
FROM node:alpine3.20 as build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate the static site
RUN npm run build
RUN npm run export

# Stage 2: Serve the static files with Nginx
FROM nginx:1.23-alpine

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy the static files from the build stage
COPY --from=build /app/out /usr/share/nginx/html

# Expose port 80 for the static site
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
