# Gastón – The Decentralized Wallet That Improves Your Finances

**Gastón** is a modern virtual wallet designed to help you manage your finances across multiple currencies and cryptocurrencies. With advanced reports, categorized transactions, and powerful features like investment tracking and financial news, Gastón gives you full control of your money.

Built on the innovative **Internet Computer Protocol (ICP)**, Gastón guarantees speed, security, and a truly decentralized backend architecture.

Whether you’re just starting your financial journey or you’re an experienced crypto user, Gastón offers an intuitive, empathetic, and aesthetically pleasing experience.

---

## 🔧 About the Project

Gastón is currently built with a **React (TypeScript)** frontend and a **NestJS (TypeScript)** backend, using a **PostgreSQL** database. The final goal is to migrate the backend to **Rust canisters** on the Internet Computer.

For now, there’s a deployed backend on **Railway**, and the app can be run locally or connected to the cloud backend.

---

## 🚀 Try It Out

You have **two ways** to run Gastón locally. Choose the one that suits you best:

### Option 1 – Run Both Frontend and Backend Locally

1. **Clone both repos**:  
   - [Frontend](https://github.com/juanvelozo/gaston-client)  
   - [Backend](https://github.com/juanvelozo/gaston-server)

2. Set the enviroment variables for both projects: <br> [In this document](https://docs.google.com/document/d/1UM3tiaUrgbUBKIgK3SqII4B-tiiIKUOx8JOIc40MIWI/edit?usp=sharing) you can find the values.

3. In both root directories, run:  
   ```bash
   npm install
   ```

4. Start the backend:  
   ```bash
   npm run start
   # or, for live reload:
   npm run start:dev
   ```
   The server will run on `http://localhost:3000`.

5. Start the frontend:  
   ```bash
   npm start
   ```
   Since port 3000 is in use by the backend, the command line will ask to use port `3001`. Accept it.

6. Use your own credentials to register, or log in with the demo account:

   ```
   Email: juanvelozomoreno18@gmail.com
   PIN: 123456
   ```

   This account includes preloaded data for testing.

---

### Option 2 – Run Only the Frontend Locally (Connected to Deployed Backend)

1. **Clone only the frontend**:
   ```bash
   git clone https://github.com/juanvelozo/gaston-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an `.env` file at the root with this content:
   ```
   REACT_APP_SERVER_DEV=https://gaston-server-production.up.railway.app/
   ```

4. Run the app in development mode:
   ```bash
   npm run start:dev
   ```

   This will set an enviroment variable that configures the api.ts file to point the baseUrl of the axios configuration to the url you have set in the REACT_APP_SERVER_DEV enviroment variable.

5. Log in with the same demo credentials or register a new user.


---

## 🛣️ 4-Month Development Roadmap

### 🎯 Project Goal

Build a powerful and intuitive personal finance web application (mobile + desktop) focused on **crypto and multi-currency support**, with:

- Clean identity and branding
- ICP (Internet Computer) login and backend in Rust canisters
- Full transaction history and dashboard
- Advanced features: investments, financial news, export options
- Multi-language support (ES/EN)

---

### ✅ Current Progress

- Mobile-first frontend implemented
- Working income/expense form (no validation yet)
- List and history by date
- Basic feedback (toasts and modals)
- Working NestJS backend
- Basic authentication (login/register)

---

### 📅 Month 1 – Infrastructure + UI Foundation (Weeks 1–4)

| Area             | Tasks                                                                                   |
|------------------|------------------------------------------------------------------------------------------|
| **Backend**       | - Design initial ICP architecture <br> - Implement transaction & category canisters <br> - ICP Identity login <br> - Stable memory setup |
| **Frontend Dev**  | - Refactor layout to support desktop <br> - Add form validation and error states <br> - Integrate with ICP backend |
| **UX/UI Designer**| - Create brand identity (logo, palette, typography) <br> - Responsive design for mobile and desktop <br> - UI improvements to existing components |

---

### 📅 Month 2 – Multi-Currency & Internationalization (Weeks 5–8)

| Area             | Tasks                                                                                     |
|------------------|--------------------------------------------------------------------------------------------|
| **Backend**       | - Add support for multi-currency/crypto transactions <br> - Store and update exchange rates <br> - Provide APIs for currency data |
| **Frontend Dev**  | - Currency selector per transaction <br> - Live conversion logic <br> - Show totals in base currency |
| **UX/UI Designer**| - Currency selector UI <br> - Clear visual of conversion rates <br> - Implement i18n structure (ES/EN) |

---

### 📅 Month 3 – Investments & Financial News (Weeks 9–12)

| Area             | Tasks                                                                                         |
|------------------|------------------------------------------------------------------------------------------------|
| **Backend**       | - Design and implement investment data model <br> - CRUD endpoints for investments <br> - News feed integration via external APIs |
| **Frontend Dev**  | - Investment registration form <br> - Performance tracking charts <br> - News feed display by topic |
| **UX/UI Designer**| - Investment dashboard design <br> - Clean card layout for news items <br> - Visual differentiation for types of assets |

---

### 📅 Month 4 – Final Polish & Expansion (Weeks 13–16)

| Area             | Tasks                                                                                         |
|------------------|------------------------------------------------------------------------------------------------|
| **Backend**       | - Secure and validate canister logic <br> - Final documentation <br> - Deploy to ICP mainnet |
| **Frontend Dev**  | - Export transactions (CSV/JSON) <br> - Multi-language switch UI <br> - Group wallets (shared access with roles) |
| **UX/UI Designer**| - UI for exporting and reporting <br> - Polish animations and transitions <br> - Support for shared wallets UI |

---

## 📦 Final Deliverables (End of Month 4)

- ✅ Fully functional web app (desktop + mobile)
- ✅ Internet Identity login via ICP
- ✅ Multi-currency and multi-language support
- ✅ Investment tracking module
- ✅ Real-time financial news section
- ✅ Backend on Internet Computer (Rust canisters)
- ✅ Clean brand identity and UX
- ✅ Documentation + working live demo

---

## 👥 Team Roles

- **Backend / Project Lead**: Infrastructure, ICP/Rust migration, database, deployment, CI/CD.
- **Frontend Developer**: UI integration, state management, client-server communication.
- **UX/UI Designer**: Branding, layout design, visual polish, responsive interface.

---
## 👥 Team Members

| Name            | GitHub Profile                       | Role                  |
|-----------------|---------------------------------------|------------------------|
| Juan Velozo     | [@juanvelozo](https://github.com/juanvelozo) | Backend Developer, Project Lead, Head of engineering, UX/UI Designer |
| Matias Garay Gadea    | [@Mggadea](https://github.com/Mggadea) | Frontend developer, UX/UI Designer, DevOPS |
