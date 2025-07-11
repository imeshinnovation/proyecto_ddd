FROM imeshinnovation/node:23.11.0
USER root
RUN apk upgrade
WORKDIR /app
COPY gateway/ .
RUN yarn install && yarn upgrade
EXPOSE 8080
CMD ["pm2-runtime", "start", "server.js", "--watch", "-i", "max"]
