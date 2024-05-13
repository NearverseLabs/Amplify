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
git checkout icp
```

4. **Install dependencies**
```
yarn install
```


To learn more before you start working with amplify_sc_rust, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Rust Canister Development Guide](https://internetcomputer.org/docs/current/developer-docs/backend/rust/)
- [ic-cdk](https://docs.rs/ic-cdk)
- [ic-cdk-macros](https://docs.rs/ic-cdk-macros)
- [Candid Introduction](https://internetcomputer.org/docs/current/developer-docs/backend/candid/)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd amplify/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

## Acknowledgments

- Internet Computer (ICP) for blockchain infrastructure.
- Twitter API v2.0 for enabling social media interactions.

## Canister ID

- **ICP Canister ID**: `3s6zm-3qaaa-aaaag-ak6eq-cai`
