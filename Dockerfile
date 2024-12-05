FROM node:lts AS development

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci
COPY . /code

CMD [ "npm", "run", "start-watch" ]

FROM development AS builder

RUN npm run build

FROM nginx:alpine

COPY --from=build /code/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /code/build .

EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]