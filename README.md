🚀 Loan Management System (MERN Stack + TailwindCSS)

A modern full-stack loan application platform where customers can apply for loans, track their applications, check eligibility, view EMI, and monitor approval status — while admins manage and review all loan requests.

This project demonstrates authentication, dashboards, loan workflow automation, credit score logic, interest calculation, EMI generation, and responsive UI design.

🏗️ Tech Stack
Frontend

React.js

Context API (Global State Management)

React Router

Tailwind CSS

Axios

AOS (Scroll animations)

Responsive UI (Mobile + Tablet + Desktop)

Backend

Node.js

Express.js

MongoDB (Mongoose ODM)

JWT Authentication

Bcrypt (Password hashing)

Middleware-based route protection

Error handling + validations

🔥 Features
👤 Authentication

User Registration

Login / Logout

JWT-based secure authentication

Role-based access: Customer & Admin

🧑‍💼 Customer Features
1️⃣ Apply for Loan

Fill loan form with amount, tenure, and purpose

Backend calculates:

Eligibility Score

Interest Rate

EMI Calculation

Loan Status

UI displays modern popup modal for application form

2️⃣ Dashboard

View customer credit score

View all applied loans

Status display with color badges

🟢 APPROVED

🟡 PENDING

🔴 REJECTED

See eligibility score, interest rate, and EMI

Beautiful responsive design

3️⃣ EMI Calculation

Automatically calculated using:

EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]


Where:

P = Loan Amount

R = Monthly Interest Rate

N = Tenure in months

👨‍💼 Admin Features

View all loan applications

Approve or reject applications

Modify interest rate or tenure

See customer credit score

Dashboard summary with analytics

📡 API Endpoints
Auth
POST /auth/register
POST /auth/login
GET  /auth/me

Loan
POST /loan/apply           → Apply for a loan
GET  /loan/applications    → Get customer applications
GET  /loan/all             → Admin: get all loans
PUT  /loan/status/:id      → Update loan status

🧮 Loan Logic
Eligibility Score

Based on:

Monthly income

Credit score

Past loan history

Active loans

Interest Rate

Dynamic based on risk profile:

⭐ High score → Low interest

⚠️ Low score → High interest

Status Logic

Once application is submitted:

Default: PENDING

Admin reviews to APPROVE or REJECT

🖥️ Project Structure
/frontend
   /src
      /components
      /context
      /pages
      /apis
      /layout
      AppRoute.jsx
      App.jsx
      index.jsx

/backend
   /controllers
   /models
   /routes
   /middleware
   /services
   index.js

🔧 Installation & Setup
1. Clone Repo
git clone https://github.com/Hemankoli/loan_organization_system.git
cd loan_organization_system

⚙️ Backend Setup
cd backend
npm install


Create .env:

MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
PORT=your_port
ELIGIBILITY_THRESHOLD=


Start backend:

npm run dev

🎨 Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173/

📸 UI Screenshots

(Add screenshots if you want)

🧑‍💻 What This Project Shows Interviewers

✔ Advanced MERN knowledge
✔ Clean code architecture
✔ JWT authentication
✔ State management (Context API)
✔ Real-world financial logic
✔ Fully responsive premium UI
✔ Admin + Customer role-based system
✔ API design + error handling
✔ Calculation logic (Interest, EMI, eligibility)
