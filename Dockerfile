FROM node:alpine

# Also exposing VSCode debug ports
EXPOSE 8000 9929 9230 9000

RUN \
  apk add --no-cache python make g++ && \
  apk add vips-dev fftw-dev --update-cache \
  --repository http://dl-3.alpinelinux.org/alpine/edge/community \
  --repository http://dl-3.alpinelinux.org/alpine/edge/main \
  && rm -fR /var/cache/apk/*

RUN npm install -g gatsby-cli

WORKDIR /app
COPY ./package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
# CMD ["yarn", "develop", "-H", "0.0.0.0" ]
CMD ["gatsby", "serve"]
# CMD ["gatsby", "serve", "-p", "8080" ]
# CMD gatsby serve -p 8080

# # base image
# FROM node:11

# # set working directory
# RUN mkdir /app
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install and cache app dependencies using yarn
# ADD package.json yarn.lock /app/
# RUN yarn --pure-lockfile

# # Copy all frontend stuff to new "app" folder
# COPY . /app/
# RUN ["chmod", "+x", "./run.sh""]
# # CMD ["./run.sh"]
# # CMD gatsby serve -p 8080
# ts-node node_modules/.bin/gatsby build
# ts-node node_modules/.bin/gatsby serve -H 0.0.0.0
# EXPOSE 9000


# FROM node:alpine as builder

# WORKDIR /app

# COPY package.json yarn.lock /app/

# RUN yarn install
# RUN npm install -g gatsby-cli --silent

# COPY . /app/

# # RUN yarn run build
# RUN gatsby build

# FROM node:alpine

# WORKDIR /app

# COPY --from=builder /app/build/ /app/

# # RUN npm install serve -g --silent
# # RUN npm install -g gatsby-cli --silent
# # RUN yarn add serve
# # CMD serve -l 8080 -s
# CMD gatsby serve -p 8080