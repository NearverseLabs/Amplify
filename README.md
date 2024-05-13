# Amplify

Amplify is a robust and innovative platform built on the Internet Computer (ICP) blockchain, designed to seamlessly integrate social media functionalities with blockchain capabilities. This project leverages a variety of modern technologies to ensure security, scalability, and user-friendliness.

## Features

- **Random Winner Selection**: Utilizes ICP's on-chain randomness and Rust's `rand` library for fair and transparent winner selection.
- **ICRC2 Token Support**: Ensures secure and efficient handling of token-based transactions.
- **Social Media Integration**: Directly integrates with social media platforms via the Twitter API v2.0.

## Technologies Used

### ICP Smart Contracts
- **Rust**

### Frontend
- **TypeScript**
- **React**
- **TailwindCSS**
- **Vite**

### Backend
- **TypeScript**
- **PostgreSQL**
- **Node.js**
- **Adonis.js Framework**

### DevOps
- **Docker**

## Installation

1. **Clone the repository**
```
git clone https://github.com/NearverseLabs/Amplify.git
```

2. **Navigate to the project directory**
```
cd amplify
```
3. **Checkout**
```
git checkout backend
```

4. **Install dependencies**
```
yarn install
```

## Usage

Start the development server:
```
yarn dev
```

## Acknowledgments

- Internet Computer (ICP) for blockchain infrastructure.
- Twitter API v2.0 for enabling social media interactions.

## Canister ID

- **ICP Canister ID**: `3s6zm-3qaaa-aaaag-ak6eq-cai`

## Env Variables

```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=
DRIVE_DISK=local
DB_CONNECTION=pg
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=lucid
PG_PASSWORD=
PG_DB_NAME=lucid
SESSION_DRIVER=cookie


TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
TWITTER_CALLBACK_URL=http://127.0.0.1/twitter/callback
TWITTER_V2_CLIENT_ID=
TWITTER_V2_CLIENT_SECRET=
TWITTER_V2_CALLBACK_URL=

ICP_HOST="https://icp0.io"

CANISTER_ID_AMPLIFY_SC_RUST_BACKEND='3s6zm-3qaaa-aaaag-ak6eq-cai'
```
