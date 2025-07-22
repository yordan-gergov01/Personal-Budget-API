# Personal Budget API

A RESTful API for managing personal budgets using the **envelope budgeting system**. Users can register, authenticate, create/update/delete envelopes, and transfer budgets between them. The API is built with **Express.js** and connected to a **PostgreSQL** database.

## Technologies Used

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **pg** (node-postgres)
- **bcrypt** (for password hashing)
- **jsonwebtoken**
- **dotenv**
- **morgan**
- **helmet**
- **cors**
- **express-rate-limit**
- **cookie-parser**
- **nodemon** (for development)
- **Swagger (swagger-ui-express & YAML)**

---

## Getting Started

### 1. Clone the Repository

git clone https://github.com/yordan-gergov01/Personal-Budget-API.git
cd personal-budget-api

### 2. Install dependencies

npm install


### 3. Create .env File

APP_PORT
DB_NAME
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
SALT_ROUNDS
JWT_SECRET
JWT_EXPIRES_IN
JWT_COOKIE_EXPIRES_IN


### 4. Database Schema

<img width="1366" height="653" alt="Екранна снимка 2025-07-22 193657" src="https://github.com/user-attachments/assets/4b6c45d7-709b-49cb-9981-8c095ffd165a" />



### 5. Start the server

 npm run watch (for development) with nodemon


### 6. Error Handling


- All errors return a structured JSON response.

- Custom AppError class used for operational errors.

- Centralized error middleware handles different scenarios.


### 7. Security Features


- helmet for setting HTTP headers

- express-rate-limit to limit excessive API requests

- cors enabled for cross-origin access

- input validation for all relevant fields


### 8. Authentication


- All protected routes require a valid **Bearer Token** in the `Authorization` header.

- `POST /api/users/register` – create user
- `POST /api/users/login` – receive token
- Use token in cookie for authenticated routes like `/api/envelopes`, `/api/transfers`, etc.


### 9. API Documentation


Interactive Swagger documentation is available at:

> **http://localhost:3030/api-docs**

To use it locally:

1. Ensure `swagger.yaml` exists under `/docs`
2. Run the server
3. Open browser and go to `/api-docs`
