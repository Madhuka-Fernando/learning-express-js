# Express.js Learning Playground 🚀

> Documenting my journey of learning Express.js from scratch.

Welcome to my Express.js learning repository! I created this space to keep track of my progress as I learn Express.js from level 0. I will be pushing all my basic test codes, small experiments, and practice snippets here as I follow along with tutorials.

This repo is a personal learning log, but anyone starting with Express.js is welcome to follow along and use it as a reference.

## 📂 Repository Structure

As my learning has progressed to different databases and language features, this repository is divided into specific project folders:

- **`01-express-postgres`**: Contains my initial learning files, focusing on building an Express.js REST API using **PostgreSQL** and the **Prisma ORM**. Includes CRUD operations, 1-M/M-N database relationships, and session/cookie management.
- **`02-express-mongodb`**: Focuses on integrating Express.js with a **MongoDB** database, handling Mongoose schemas, queries, and middleware.
- **`03-express-typescript`**: Learning and migrating Express.js to **TypeScript**, emphasizing type safety, interfaces, strict request/response typing, and modern Node.js application architecture.
- **`04-express-socket-server`**: Backend Node.js and Express server built for real-time communication. Implements **Socket.io** to handle user registration and private messaging logic.
- **`04-express-socket-client`**: Frontend application built with **React**, TypeScript, and Vite. Connects to the Node.js Socket.io server to demonstrate a real-time chat interface.
- **`05-express-file-upload`**: Explores file handling and storage in Express.js. Implements file uploads using **Multer** and integrates with **AWS S3** (`@aws-sdk/client-s3` & `multer-s3`) for secure cloud storage, alongside local disk storage configurations.
- **`06-express-graphql-server`**: Backend Node.js and Express server integrated with **Apollo Server** to provide a **GraphQL** API. Includes schema definitions (typeDefs), queries, mutations, and resolvers.
- **`06-express-graphql-client`**: Frontend application built with **React**, TypeScript, and Vite. Connects to the backend using **Apollo Client** to perform GraphQL data fetching and mutations.
- **`07-express-otplib`**: Explores Two-Factor Authentication (2FA) implementation in Express.js. Uses **otplib** to generate and verify Time-Based One-Time Passwords (TOTP) and **qrcode** to generate base64 QR codes for authenticator apps.

## 🛠️ How to Use

If you want to run these practice files on your machine:

1. Clone this repository:
   ```bash
   git clone [https://github.com/Madhuka-Fernando/learning-express-js.git](https://github.com/Madhuka-Fernando/learning-express-js.git)
   ```

2. Navigate to the main project folder:
   ```bash
   cd learning-express-js
   ```

3. Navigate into the specific project folder you want to run:
   ```bash
   cd 01-express-postgres
   # or
   cd 02-express-mongodb
   # or
   cd 05-express-file-upload
   ```

4. Install dependencies for that specific project:
   ```bash
   npm install
   ```

5. Run the practice files:
   ```bash
   npm run dev
   # or
   node server.js
   ```

> **Note for `05-express-file-upload`**: To test the AWS S3 upload functionality, you must create a `.env` file in the root of that specific project folder and provide your AWS credentials (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`).

### 💬 Running the Socket.io Chat App

To run the real-time chat application, you need to start both the server and the client concurrently in two separate terminal windows:

**Terminal 1 (Backend Server):**
```bash
cd 04-express-socket-server
npm install
npm run dev
```

**Terminal 2 (Frontend Client):**
```bash
cd 04-express-socket-client
npm install
npm run dev
```

### 💬 Running the GraphQL App

To test the GraphQL API and React client, start both the Apollo backend server and the client concurrently:

**Terminal 1 (Backend Server):**
```bash
cd 06-express-graphql-server
npm install
npm run dev
```

**Terminal 2 (Frontend Client):**
```bash
cd 06-express-graphql-client
npm install
npm run dev
```

## 🎓 Credits & Resources

A huge shoutout to the tutorials that are helping me learn Express.js. I highly recommend checking out this playlist:

- **YouTube Channel & Playlist:** AUK Learning Center - https://youtube.com/playlist?list=PLI3FSA8wuNTCZLZDaCOhnrNMnKionOAqb&si=COgw6APZVoBWdYIf

---

_Feel free to star ⭐ this repository if you find it helpful!_