FROM node:19

WORKDIR /app
COPY ./frontend/ /app

RUN npm install -g @vue/cli
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]