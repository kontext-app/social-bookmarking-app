# Social Bookmarking App

## Getting Started

### Prerequisites

- node
- yarn

### Install

```bash
git clone git@github.com:kontext-app/social-bookmarking-app.git
cd social-bookmarking-app
yarn
```

### Set Environmental Variables

Copy the distributed `.env` into a local env file with the name `.env.local` and set the variables accordingly.

### Local Development

You can run your own local ceramic node and 3id-connect iframe service. Therefore run following steps:

1. Globally install the ceramic cli

```bash
> yarn add --global @ceramicnetwork/cli
```

2. Clone 3id-connect repo in your preferred folder and start locally

```bash
> git clone https://github.com/ceramicstudio/3id-connect.git
> cd 3id-connect
> npm install
> CERAMIC_API=http://localhost:7007 npm run start
```

3. Set relevant env variables in `.env.local`

```
REACT_APP_CERAMIC_API_HOST=http://localhost:7007
REACT_APP_THREE_ID_CONNECT_HOST=http://localhost:30001
```

### Start Development Server

```bash
yarn start
```

### Build Production Bundle

```bash
yarn build
```
