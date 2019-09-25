FROM node:alpine
RUN apk add nginx && mkdir -p /run/nginx
WORKDIR /app
COPY package*.json /app/
RUN npm install --no-progress
COPY . /app
RUN npm run build
ARG GUESS_API
RUN sed -i "s|{GUESS_API}|$GUESS_API|" /app/build/index.html
COPY ./scripts/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
