FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
# Expose port and run
EXPOSE 3000
CMD ["node", "index.js"]
