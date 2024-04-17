FROM node:20

# Make c_client
WORKDIR /app

RUN apt-get update && \
    apt-get install -y dpkg && \
    rm -rf /var/lib/apt/lists/*

RUN wget --no-check-certificate https://github.com/griddb/c_client/releases/download/v5.5.0/griddb-c-client_5.5.0_amd64.deb
RUN dpkg -i griddb-c-client_5.5.0_amd64.deb

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "start", "griddb-server:10001", "myCluster", "admin", "admin"]
