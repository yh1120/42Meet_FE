FROM node:10.14.1

RUN mkdir -p /tmp/42meet_FE
WORKDIR /tmp/42meet_FE
COPY . /tmp/42meet_FE
RUN npm update
RUN npm install
ENTRYPOINT ["npm", "start"]
