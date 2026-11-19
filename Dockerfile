FROM node:22.22.0-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable
COPY . .
ARG APP_RELEASE
ARG VITE_API_URL
ARG VITE_RUNTIME_APP_URL
ARG VITE_SENTRY_DSN
ARG VITE_APP_ENV=staging
ENV GITHUB_SHA=$APP_RELEASE
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_RUNTIME_APP_URL=$VITE_RUNTIME_APP_URL
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN
ENV VITE_APP_ENV=$VITE_APP_ENV
# BuildKit secret mounts keep private upload credentials out of image layers.
RUN --mount=type=secret,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN \
    --mount=type=secret,id=sentry_org,env=SENTRY_ORG \
    --mount=type=secret,id=sentry_project,env=SENTRY_PROJECT \
    yarn build && yarn check:bundle

FROM nginx:1.28-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
