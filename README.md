# 🛒 বাজার দর (BazarDor)

**BazarDor** is a responsive web application that helps users explore daily prices of essential products in Bangladesh. Users can compare product prices, browse categories, view market-wise price information, and manage their accounts.

## 🌐 Live Demo

Add your deployed Vercel URL here.

## 📌 Project Overview

BazarDor provides a simple and user-friendly interface for checking essential product prices. It includes product listings, category-based browsing, price sorting, product details, and secure authentication.

## ✨ Key Features

- **Daily Product Prices:** Browse essential products with current prices, units, and price-change indicators.
- **Price Trend Sections:** Explore products with increasing and decreasing prices.
- **Product Details:** View product summaries, minimum, maximum, and average prices, and market-wise price information.
- **Category Filtering and Sorting:** Browse products by category and sort prices from low to high or high to low.
- **Authentication:** Register and sign in using email and password, Google, or GitHub.
- **Protected Routes:** Require authentication to access protected product details.
- **Profile Management:** View profile information and update the account name.
- **Responsive Design:** Use the application on mobile, tablet, and desktop screens.
- **Loading and Error States:** Display loading skeletons and friendly error or not-found pages.
- **Toast Notifications:** Show relevant feedback for authentication and other user actions.

## 🛠️ Technologies Used

- **Next.js** — Application framework and App Router
- **React** — User interface development
- **TypeScript** — Type-safe application code
- **Tailwind CSS** — Responsive styling
- **Better Auth** — Authentication and social sign-in
- **PostgreSQL (Neon)** — Database
- **Lucide React** — Icons
- **React Hot Toast** — Toast notifications
- **Vercel** — Deployment platform
- **REST API** — Product and category data

## 📂 Project Structure

```text
bazardor-app/
├── public/
├── src/
│   ├── app/
│   │   ├── category/
│   │   ├── product/
│   │   ├── profile/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── auth.ts
│       └── auth-client.ts
├── .env.local
├── package.json
└── README.md
```

*Note: The structure above is a simplified overview. Actual files may differ.*

## 🔌 API Endpoints

Base URL:

`https://api.api-store.workers.dev/api/bazardor`

Alternative Base URL:

`https://api.abcz.workers.dev/api/bazardor`

| Endpoint | Description |
|---|---|
| `/products` | Retrieve all products |
| `/products?category=chal` | Filter products by category |
| `/products/1` | Retrieve a single product |
| `/categories` | Retrieve all categories |
| `/categories/chal` | Retrieve a single category |

## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/MdMozammal-ui/Assignment-7.git
```

### 2. Navigate to the project directory

```bash
cd Assignment-7/B14-A7-Bazar-Dor/bazardor-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the application root and configure the required variables.

```env
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production

```bash
npm run build
```

## 🚀 Deployment

The application is deployed using Vercel.

To deploy updates, push the latest committed changes to the connected GitHub branch. Vercel can automatically build and deploy the updated application.

Configure all required environment variables and OAuth callback URLs in the deployment settings.

## 🔐 Security

- Keep `.env.local` and all credentials private.
- Configure authentication providers with the correct callback URLs.
- Do not expose database connection strings or authentication secrets.
- Ensure protected pages enforce authentication.

## 📱 Responsive Design

BazarDor is designed to provide a usable experience across mobile phones, tablets, and desktop devices.

## 👨‍💻 Author

**Md. Mozammel Hoque**

GitHub: [MdMozammal-ui](https://github.com/MdMozammal-ui)

---

**BazarDor — প্রয়োজনীয় পণ্যের দাম এক নজরে।**

*Disclaimer: Product prices are indicative and may vary depending on market conditions.*
