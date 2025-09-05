FROM node:19

WORKDIR /app
COPY ./frontend/ /app

RUN npm install --legacy-peer-deps

EXPOSE 8080

CMD ["npm", "run", "serve"]