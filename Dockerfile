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

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the app using a production-ready environment
FROM node:alpine3.20

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app ./

# Install production dependencies only
RUN npm install --production

# Expose the port Next.js runs on (default is 3000)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
