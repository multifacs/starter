FROM node:14-alpine as build
ENV APP_HOME=/app/build
WORKDIR ${APP_HOME}
COPY package.json ${APP_HOME}
RUN npm install
ARG VUE_APP_BACKEND_URL=http://localhost:8080
ARG VUE_APP_KEYCLOAK_URL
COPY . ${APP_HOME}
RUN npm run build

FROM nginx:1.21.4-alpine as production
ARG VUE_APP_KEYCLOAK_URL
ENV VUE_APP_KEYCLOAK_URL=$VUE_APP_KEYCLOAK_URL
EXPOSE 80
COPY --from=build /app/build/dist /usr/share/nginx/html

