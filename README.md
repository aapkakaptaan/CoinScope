# 🪙 CoinScope 

-https://coin-scope-kdz0slgs0-aapkakaptaans-projects.vercel.app/

Real-time crypto portfolio tracker built with React, ethers.js & CoinGecko API.Connect your MetaMask wallet, track token balances and prices on Ethereum & Polygon, set custom price alerts, and monitor your crypto portfolio with an intuitive interface.

## 📌 Overview

CoinScope is a modern, fully client-side web app designed to help crypto users:

Connect their MetaMask wallet

See live balances of popular tokens and custom ERC-20 tokens

Track real-time token prices and 24h price changes

Set personal price alerts (above/below a target price)

Quickly view the total value of holdings across supported networks

Built with:

React + TypeScript for maintainable, type-safe UI

ethers.js for interacting with the blockchain and fetching balances

CoinGecko API for live token prices and historical data

React Query for efficient data fetching and caching

Tailwind CSS (through custom utility classes) for styling

Lucide React icons and react-hot-toast for modern UX

## ✨ Features

🔗 Wallet Connect

One-click MetaMask connection

Automatic detection if MetaMask is installed

Displays wallet address, ENS name (if available), network info, and ETH balance

Supports Ethereum Mainnet & Polygon network

Ability to switch networks, with support for adding Polygon to MetaMask if missing

## 📊 Real-time Portfolio Dashboard

Live token balances fetched directly from your wallet via ethers.js

Automatic formatting for better readability (e.g., 0.000001 USDC → 0.000001)

Combine balances with live prices to show real USD value

View balance, price, 24h change, and total value per token

## 🛎️ Price Alerts

Set alerts when a token price goes above or below a target price

Alerts stored in browser localStorage (persist across sessions)

Instant toast notifications when conditions are met

Toggle alerts on/off and remove them easily

## ➕ Add Custom Token

Add any ERC-20 token by entering its contract address

Automatically fetches name, symbol, decimals via ethers.js

Supports custom tokens alongside common tokens on Ethereum & Polygon

## 🔍 Search & Filter

Quickly search your tokens by symbol or name

View only the assets you care about

## ♻️ Refresh

Manual refresh button to refetch balances and prices

Loading state and spinning icon during refresh

## ⚙️ How it works

Blockchain Interaction

Uses ethers.js and the MetaMask injected provider

Calls balanceOf for each token address on the current network

Supports multiple chains via chainId (Ethereum Mainnet, Polygon)

Handles ENS name lookup for connected wallet

Token Price Data

Fetches prices using CoinGecko /simple/price endpoint

Token symbols are mapped to CoinGecko IDs (e.g., ETH → ethereum)

Refreshes every 30 seconds using React Query

Combines live prices with on-chain balances to calculate total value

Alerts

Managed in localStorage

On each price update, checks if conditions are met

Fires a toast notification and disables the alert (can re-enable manually)


##  ✅ Technologies Used

React + TypeScript

ethers.js

React Query

CoinGecko API

Tailwind CSS

Lucide React icons

react-hot-toast

## 🚀 Getting Started

Replace YOUR_INFURA_KEY in utils/networks.ts with your real Infura key.

# Clone this repo
git clone https://github.com/yourusername/coinscope.git
cd coinscope

# Install dependencies
npm install

# Start local dev server
npm run dev

Open http://localhost:5173 in your browser.

### 📦 Build for production

npm run build
npm run preview

### 🙌 Contributing

Pull requests and feedback are welcome!Feel free to open issues for bugs, feature suggestions, or improvements.


⭐ Like this project?

If CoinScope helps you track your crypto more easily, please consider giving the repo a ⭐ on GitHub!

