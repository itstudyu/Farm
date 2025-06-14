# Project Overview: Step-by-Step with Code Examples

## 1. Project Structure

```
src/
  index.ts                # Main server entry point
  config/
    database.ts           # Database connection setup
  controllers/
    pagesController.ts    # Logic for rendering pages
    authController.ts     # Logic for signup, login, logout
  middleware/
    localsMiddleware.ts   # Makes user/flash data available to templates
  routes/
    pageRoutes.ts         # URL routes for pages
    authRoutes.ts         # URL routes for authentication
  views/
    *.ejs                 # HTML templates (EJS)
    partials/             # Header/footer templates
public/                   # Static files (images, CSS, JS)
```

---

## 2. Server Startup (`src/index.ts`)

```typescript
import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import path from "path";
import session from "express-session";
import pageRoutes from "./routes/pageRoutes";
import authRoutes from "./routes/authRoutes";
import { localsMiddleware } from "./middleware/localsMiddleware";

const app: Application = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// Session setup
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

// Locals middleware
app.use(localsMiddleware);

// Routes
app.use("/", pageRoutes);
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

**Explanation:**

- Loads environment variables.
- Sets up Express, EJS, static files, session, and middleware.
- Registers routes for pages and authentication.
- Starts the server.

---

## 3. Database Connection (`src/config/database.ts`)

```typescript
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "8080", 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
```

**Explanation:**

- Creates a connection pool to MariaDB using credentials from `.env`.
- Exported pool is used for all DB queries.

---

## 4. Routing

### a. Page Routes (`src/routes/pageRoutes.ts`)

```typescript
import { Router } from "express";
import {
  getHomePage,
  getLoginPage,
  getSignupPage,
  getTourPage,
  getAboutPage,
  getHistoryPage,
  getBlogPage,
  getShopPage,
} from "../controllers/pagesController";

const router = Router();

router.get("/", getHomePage);
router.get("/login", getLoginPage);
router.get("/signup", getSignupPage);
router.get("/tour", getTourPage);
router.get("/about", getAboutPage);
router.get("/history", getHistoryPage);
router.get("/blog", getBlogPage);
router.get("/shop", getShopPage);

export default router;
```

**Explanation:**

- Maps URLs to controller functions that render pages.

### b. Auth Routes (`src/routes/authRoutes.ts`)

```typescript
import { Router } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
```

**Explanation:**

- Maps signup, login, and logout endpoints to authentication logic.

---

## 5. Controllers

### a. Pages Controller (`src/controllers/pagesController.ts`)

```typescript
export const getHomePage = (req, res) => {
  res.render("index", { title: "Floret Flower Farm" });
};

export const getLoginPage = (req, res) => {
  res.render("login", { title: "Login", errors: [] });
};
// ... similar for other pages ...
```

**Explanation:**

- Each function renders a specific EJS template, passing data as needed.

### b. Auth Controller (`src/controllers/authController.ts`)

```typescript
export const signupUser = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    req.session.flash = { type: "error", message: "Passwords do not match." };
    return res.status(400).redirect("/signup");
  }
  // Check for existing user
  // Hash password
  // Insert user
  // Set flash message and redirect
};

export const loginUser = async (req, res) => {
  // Look up user by email
  // Compare password
  // If match, set session and redirect
  // If not, set flash error and redirect
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/");
    res.redirect("/");
  });
};
```

**Explanation:**

- Handles signup (with password hashing and duplicate check), login (with password check), and logout (session destroy).

---

## 6. Middleware (`src/middleware/localsMiddleware.ts`)

```typescript
export const localsMiddleware = (req, res, next) => {
  res.locals.user = req.session.user || null;
  if (req.session.flash) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
  } else {
    res.locals.flash = null;
  }
  next();
};
```

**Explanation:**

- Makes user and flash message data available to all templates.

---

## 7. Views (EJS Templates)

- EJS files in `src/views/` are HTML templates with embedded JS.
- Example: `index.ejs` uses `<%= title %>` and `<%= user %>`.
- `partials/header.ejs` and `partials/footer.ejs` are included in every page.

---

## 8. Signup Flow Example (with code)

1. User visits `/signup` (GET):
   - `getSignupPage` renders the signup form.
2. User submits form (POST `/signup`):
   - `signupUser` in `authController.ts` runs:

```typescript
const [existingUsers] = await pool.query(
  "SELECT * FROM users WHERE email = ?",
  [email]
);
if (existingUsers.length > 0) {
  req.session.flash = {
    type: "error",
    message: "A user with this email already exists.",
  };
  return res.status(400).redirect("/signup");
}
const hashedPassword = await bcrypt.hash(password, saltRounds);
await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
  name,
  email,
  hashedPassword,
]);
req.session.flash = {
  type: "success",
  message: "Registration successful! Please log in.",
};
res.redirect("/login");
```

---

## 9. Environment Variables (`.env`)

```
DB_HOST=localhost
DB_USER=farm_user
DB_PASSWORD=your_password
DB_NAME=farm_db
DB_PORT=8080
SESSION_SECRET=your_secret
```

**Explanation:**

- Stores sensitive info for DB and session.

---

**If you want a deeper explanation of any file or function, just ask!**
