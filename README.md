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
git checkout frontend
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
DFX_VERSION='0.15.1'
VITE_DFX_NETWORK='ic'
DFX_NETWORK='ic'
VITE_BACKEND_URL="BACKEND_LINK/api"
API_URL="https://icp0.io"
VITE_ICRC1_LEDGER_CANISTER_CANISTER_ID='2ouva-viaaa-aaaaq-aaamq-cai'
VITE_CANISTER_ID_ICRC1_INDEX_CANISTER='be2us-64aaa-aaaaa-qaabq-cai'
VITE_ICP_LEDGER_CANISTER_CANISTER_ID='ryjl3-tyaaa-aaaaa-aaaba-cai'
VITE_CANISTER_ID_ICP_LEDGER_CANISTER='ryjl3-tyaaa-aaaaa-aaaba-cai'
VITE_CANISTER_ID_AMPLIFY_SC_RUST_BACKEND='3s6zm-3qaaa-aaaag-ak6eq-cai'
```
