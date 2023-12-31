FROM node:18 as backend

WORKDIR /webnc/backend

COPY ./package.json ./package-lock.json ./

RUN npm install
RUN npm install bcrypt@latest --save

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]