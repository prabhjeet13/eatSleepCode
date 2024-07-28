FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++
COPY package*.json .
RUN npm i
RUN npm cors
RUN npm i bcrypt
RUN npm i jsonwebtoken
RUN npm i nodemon
RUN npm i child_process
RUN npm i express 
RUN npm i mongoose
RUN npm i nodemailer
RUN npm i otp-generator
RUN npm i path
RUN npm i fs
RUN npm i uuid
RUN npm i cookie-parser
RUN npm i dotenv
COPY . .
EXPOSE 4000
CMD ["npm","run","dev"]