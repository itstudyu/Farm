# Index Overview (`index.ts`)

This file is the main entry point for your Node.js/Express application. It sets up the server, middleware, routes, and starts listening for requests.

---

## Code Walkthrough

### 1. Load Environment Variables
```typescript
import dotenv from "dotenv";
dotenv.config();
```
- Loads variables from `.env` (like DB credentials, session secret) into `process.env`.

### 2. Import Dependencies
```typescript
import express, { Application } from "express";
import path from "path";
import session from "express-session";
import pageRoutes from "./routes/pageRoutes";
import authRoutes from "./routes/authRoutes";
import { localsMiddleware } from "./middleware/localsMiddleware";
```
- Imports Express (web server), path (file paths), session management, routes, and middleware.

### 3. Create Express App and Set Port
```typescript
const app: Application = express();
const port: number = parseInt(process.env.PORT || "3000", 10);
```
- Creates the Express app and sets the port (from `.env` or 3000).

### 4. View Engine Setup
```typescript
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
```
- Tells Express to use EJS templates in the `views` folder.

### 5. Middleware Setup
```typescript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));
```
- Parses JSON and form data, serves static files (images, CSS, JS).

### 6. Session Setup
```typescript
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);
```
- Sets up session management (for login state, flash messages).

### 7. Locals Middleware
```typescript
app.use(localsMiddleware);
```
- Makes user and flash data available to all templates.

### 8. Register Routes
```typescript
app.use("/", pageRoutes);
app.use("/", authRoutes);
```
- Registers page and authentication routes.

### 9. Start the Server
```typescript
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```
- Starts the server and prints the URL to the console.

---

**How it fits:**
- This file brings together all the parts of your app (middleware, routes, templates) and starts the web server. 