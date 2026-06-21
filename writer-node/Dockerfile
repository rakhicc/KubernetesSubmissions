FROM node:18-alpine

WORKDIR /app

COPY writer.js .

RUN npm install uuid

CMD ["node", "writer.js"]