FROM node:18 as backend

WORKDIR /webnc/frontend

COPY ./package.json ./package-lock.json ./

RUN npm install
RUN npm i @rollup/rollup-linux-x64-gnu
RUN npm i -D @vitejs/plugin-react-swc
RUN npm i -D @swc/cli @swc/core

COPY . ./

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]