# 💰 ExpenseMate - Frontend  

ExpenseMate is a **personal finance tracker** that allows users to seamlessly record, categorize, and analyze their transactions.  
This repository contains the **frontend web application**, built with **React + TypeScript**, and consumes the ExpenseMate backend APIs.  

---

## ✨ Features  
- 🔑 JWT-based authentication (login/signup)  
- 💸 Add, view, and manage expenses/income  
- 📊 Transactions history with simple UI  
- 🏷️ Categorization support (basic)  
- 📈 Dashboard analytics (future)  

---

## 🏗️ Tech Stack  
- **React 18 + TypeScript**  
- **Axios** for API requests  
- **React Router** for navigation (planned)  
- **Tailwind CSS** for styling  
- **Jest + React Testing Library** for testing  

---

## 📂 Project Structure  

```
expensemate-frontend/
├── public/                  # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── api/                 # API clients
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── transactions.ts
│   │
│   ├── components/          # UI Components / Pages
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── Transactions.tsx
│   │
│   ├── utils/               # Helpers & Types
│   │   └── types.ts
│   │
│   ├── App.tsx              # Root app
│   ├── index.tsx            # Entry point
│   ├── index.css            # Global styles
│   ├── react-app-env.d.ts   # React env types
│   ├── reportWebVitals.ts   # Performance reporting
│   └── setupTests.ts        # Test setup
│
├── .env                     # Environment variables
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind config
├── postcss.config.js        # PostCSS config
├── tsconfig.json            # TypeScript config
└── README.md                # Project docs
```

---

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/Raja-shekaran/expensemate-frontend.git
cd expensemate-frontend
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Configure Environment Variables  
Create a `.env` file in the root of the project:  

```env
REACT_APP_API_URL=http://localhost:8080/api/v1
```  

This sets the backend API base URL.  

### 4️⃣ Run the App  
Start the development server:  

```bash
npm start
```  

The app will be available at **http://localhost:3000**.  

---

## 🔗 API Integration  

The frontend communicates with the backend service:  

- `POST /auth/signup` → Register a new user  
- `POST /auth/login` → Authenticate & receive JWT  
- `GET /transactions` → Fetch all user transactions  
- `POST /transactions` → Add a new transaction  

⚠️ All authenticated requests must include the header:  

```http
Authorization: Bearer <token>
```  

---

## 🧪 Testing  
Run unit and integration tests:  
```bash
npm test
```  

---

## 👨‍💻 Author  
**Rajashekaran S**  
- GitHub: [@Raja-shekaran](https://github.com/Raja-shekaran)  
- LinkedIn: [Rajashekaran S](https://www.linkedin.com/in/rajashekaran-s-b85754307/)  
