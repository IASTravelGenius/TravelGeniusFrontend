# Use the official Node.js image with the required version for building the Angular app
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the Angular application for production
RUN ng build --configuration production

# Use the official Nginx image to serve the built Angular app
FROM nginx:alpine

# Copy the built Angular files from the build stage to the Nginx HTML directory
COPY --from=build /app/dist/travelling-advisor /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
