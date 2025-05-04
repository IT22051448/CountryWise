# 🚀 COUNTRYWISE

COUNTRYWISE is an application created for the 3rd Year 2nd Semester AF project which is based on creating an Frontend Application utilizing the REST COUNTRIES API - https://restcountries.com/

## 📌 Prerequisites

Ensure you have the following installed before proceeding:

- [Visual Code or Any Supported IDE]()
- [Node.js](https://nodejs.org/) (Recommended: latest LTS version)
- [npm](https://www.npmjs.com/) (Included with Node.js)

---

## ⚙️ Setup

### 🔹 Local Environment

Follow these steps to set up and run the project locally:

1. Git Clone the repository into your Local Machine

2. Open cloned location with Visual Code

3. Open a Terminal (Terminal -> New Terminal)

4. Go to the Backend of the Project in the Terminal (eg. cd .\project-IT22051448\backend)

5. Install Project dependencies (using npm install or npm i )

6. Create a .env file in the backend folder of the project.

   env file should include,

   PORT=5000
   MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
   TOKEN=<YOUR_JWT_SECRET_HERE>

7. Backend is then run using _npm start_

8. Open another Terminal (Terminal -> New Terminal)

9. Go to the Frontend of the Project in the Terminal (eg. cd .\project-IT22051448\frontend)

10. Install Project dependencies (using npm install or npm i )

11. Create a .env file in the frontend folder of the project.

    env file should include,

    VITE_API_URL=http://localhost:5000/api

Note: Port 5000 was provided as an example, any port could be utilized however ensure the backend and front env file PORTs are the same.

12. Frontend is then run using _npm run dev_

You are all set up with the Frontend and Backend of CountryWise,
Now you could visit the application in - http://localhost:5173/ using any Browser (Chrome Recommended)

---

## 🔑 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication and authorization.

#### Obtaining a Token - Session Management

JWT Tokens are utilized to manage user sessions,
to access protected endpoints, you need to obtain a JWT by logging in with valid credentials or obtained during registration of the user for the first time.

### Endpoint:

- POST /api/auth/register
- POST /api/auth/login

---

## 🧪 Running Tests

Go to the Frontend of the Project in the Terminal (eg. cd .\project-IT22051448\frontend)

Run the test suite using: **npm test**

---

## 🎯 Chosen APIs for the Project

1.  https://restcountries.com/v3.1/all - Utilized to obtain all countries and its information

2.  https://restcountries.com/v3.1/name/{name} - Utilized to obtain a specific country using the name like using the search function

3.  https://restcountries.com/v3.1/lang/{language} - Utilized to Filter countries by Language

4.  https://restcountries.com/v3.1/region/{region} - Utilized to Filter countries by Region

Note: RTK Query was utilized for data fetching and caching, please refer the file "restCountriesApi.js" found in the frontend api folder for further reference

---

### Challenges Faced and Resolution

Due to heavy load in the REST Countries API, the server has kept crashing serveral times thoughout the project. The project was completed by utilizing the time when this issues were resolved.

---

### 🚀 Hosted Application

Hosted Application URL - https://country-wise.onrender.com

---

### 📞 Contact

For any inquiries, feel free to reach out via:

Email: christy.tck@gmail.com\
Contributors: @IT22051448\
Number: 0772048866\
