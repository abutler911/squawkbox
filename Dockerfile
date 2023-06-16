# Use an official Node.js runtime as the parent image
FROM node:16-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the work directory
COPY package*.json ./

# Install the app dependencies inside the container
RUN npm install

# Bundle the app source inside the container (assumes your application root is the build context)
COPY . .

# Expose port 3000 for the app to be accessible
EXPOSE 3000

# Run the application when the container launches
CMD [ "node", "app.js" ]
