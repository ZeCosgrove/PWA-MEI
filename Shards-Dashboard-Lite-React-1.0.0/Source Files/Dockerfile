FROM node:14

WORKDIR /src

COPY package*.json ./

RUN npm install

# Copy the source code to the container
COPY . .

RUN npm run build

# Serve the built app using a static server
CMD ["npx", "serve", "-s", "build"]
