# Personal Budget API

A simple RESTful API for managing personal budget envelopes. You can create, retrieve, update, delete envelopes, and transfer budget between them — all handled in-memory.

## Technologies Used

- **Node.js**
- **Express.js**
- **dotenv**
- **morgan**
- **helmet**
- **cors**
- **express-rate-limit**
- **nodemon** (for development)

---

## Getting Started

### 1. Clone the Repository

git clone https://github.com/yordan-gergov01/Personal-Budget-API.git
cd personal-budget-api

### 2. Install dependencies

npm install


### 3. Create .env File

APP_PORT=3000


### 4. Start the server

 npm run watch (for development) with nodemon


### 5. Error Handling


- All errors return a structured JSON response.

- Custom AppError class used for operational errors.

- Centralized error middleware handles different scenarios.


### 6. Security Features


- helmet for setting HTTP headers

- express-rate-limit to limit excessive API requests

- cors enabled for cross-origin access

- input validation for all relevant fields
