# index.ts Overview

This file is the main entry point and the "heart" of your web application. It is responsible for setting up the Express server, configuring all middleware, connecting the routes, and starting the server to listen for incoming requests.

---

## Code Walkthrough

### 1. Import Dependencies
```typescript
import express from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
// ... other imports
```
- **`express`**: The core web framework.
- **`session`**: Middleware for managing user sessions (e.g., for login).
- **`path`**: A Node.js utility for working with file and directory paths.
- **`dotenv`**: A utility that loads environment variables from a `.env` file into `process.env`. This is how your app gets the database credentials without hardcoding them.
- **`pageRoutes`, `authRoutes`**: The routers you defined in other files.
- **`localsMiddleware`**: Your custom middleware for making data available to views.

### 2. Load Environment Variables
```typescript
dotenv.config();
```
- This line must be called at the very top. It reads your `.env` file, finds all the key-value pairs (like `DB_USER=...`), and adds them to the `process.env` object, making them accessible throughout your application.

### 3. Initialize Express App
```typescript
const app = express();
const port = process.env.PORT || 8080;
```
- **`const app = express()`**: Creates an instance of the Express application.
- **`const port = ...`**: Sets the port for the server. It tries to get the port from the `.env` file, but defaults to `8080` if it's not set.

### 4. Configure Template Engine (EJS)
```typescript
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
```
- **`app.set('view engine', 'ejs')`**: Tells Express to use EJS as the template engine.
- **`app.set('views', ...)`**: Tells Express where to find the template files. `path.join(__dirname, 'views')` creates a correct, absolute path to the `views` directory, which is crucial for making sure the server can find your `.ejs` files no matter where you run it from.

### 5. Configure Middleware
This is a critical section where you tell Express how to handle requests. Middleware functions are executed in the order they are registered.
```typescript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
```
- **`express.json()`** and **`express.urlencoded(...)`**: These are body-parsers. They are responsible for parsing incoming request bodies. Without them, `req.body` would be `undefined`, and you couldn't get form data from your login/signup forms.
- **`express.static(...)`**: This serves static files (like CSS, JavaScript, and images) directly from the `public` directory. When a request comes in for `/css/style.css`, this middleware will find and serve the file from `public/css/style.css`.

### 6. Configure Session Middleware
```typescript
app.use(session({
    secret: process.env.SESSION_SECRET || 'a_default_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));
```
- This sets up the `express-session` middleware.
- **`secret`**: A secret string used to sign the session ID cookie. This should be a long, random string stored in your `.env` file for security.
- **`resave: false`**, **`saveUninitialized: true`**: Standard configuration settings.
- **`cookie: { secure: false }`**: For development. In a real production environment with HTTPS, you would set `secure: true`.

### 7. Use Custom Middleware and Routes
```typescript
app.use(localsMiddleware);
app.use('/', pageRoutes);
app.use('/', authRoutes);
```
- **`app.use(localsMiddleware)`**: Registers your custom middleware. This ensures that on *every request*, `res.locals.user` and `res.locals.flash` are set before the template is rendered.
- **`app.use('/', pageRoutes)`**: Mounts the page router. It tells Express to use the routes defined in `pageRoutes.ts` for any request that comes to the root path (`/`).
- **`app.use('/', authRoutes)`**: Mounts the authentication router.

### 8. Start the Server
```typescript
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```
- **`app.listen(port, ...)`**: Starts the server and makes it listen for connections on the specified port.
- The function `() => { ... }` is a callback that runs once the server has successfully started, logging a confirmation message to the console.

---

**How it fits:**
- **Orchestrator**: This file is the central orchestrator of the entire application. It doesn't contain much business logic itself, but it pieces together all the other parts (controllers, routers, middleware, templates) into a functioning web server.
- **Configuration Hub**: It's the main configuration hub for the server, setting up everything from the template engine to session management.
- **Entry Point**: This is the file that you execute with `node` (or `ts-node`) to start the application. 