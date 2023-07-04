# Use a Node.js base image for building the React project
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm ci --silent

# Copy the entire project directory
COPY . .

# Build the React project
RUN npm run build

# Use an Nginx base image to serve the static files
FROM nginx:1.21

# Copy the built static files from the previous stage to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
