FROM node:22.12.0

#WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5500

CMD ["npm", "run", "dev"]