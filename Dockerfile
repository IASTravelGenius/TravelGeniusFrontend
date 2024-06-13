# Stage 1: Build the Angular application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the application with NGINX
FROM nginx:1.27.0

# Copy the built Angular application from the previous stage
COPY --from=build /app/dist/travelling-advisor /usr/share/nginx/html

# Copy the NGINX configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
