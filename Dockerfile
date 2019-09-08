FROM node:alpine
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install --no-progress
COPY . /app
RUN npm run build
ARG GUESS_API
RUN sed -i "s|{GUESS_API}|$GUESS_API|" /app/build/index.html
RUN cat /app/build/index.html
