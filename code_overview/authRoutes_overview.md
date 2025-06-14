# Auth Routes Overview (`authRoutes.ts`)

This file is a dedicated router for handling authentication-related actions. It maps specific URLs and HTTP methods (like POST for submitting a form) to the controller functions in `authController.ts` that contain the actual login and signup logic.

---

## Code Walkthrough

### 1. Import Dependencies
```typescript
import { Router } from 'express';
import { signupUser, loginUser, logoutUser } from '../controllers/authController';
```
- **`import { Router }`**: Imports the `Router` factory function from Express.
- **`import { ... } from '../controllers/authController'`**: Imports the specific functions from your authentication controller that handle the logic for signing up, logging in, and logging out.

### 2. Create the Router Instance
```typescript
const router = Router();
```
- **`const router = Router()`**: Creates a new, isolated router object specifically for authentication routes.

### 3. Define the Authentication Routes
```typescript
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
```
This is the core of the file, and it's important to notice the different HTTP methods being used:
- **`router.post('/signup', signupUser)`**:
  - **`router.post`**: This route responds only to HTTP POST requests. This is the correct method for submitting form data, as the user is sending data to the server to create a new account.
  - **`'/signup'`**: The URL path for the signup action.
  - **`signupUser`**: The controller function that will execute when a POST request is made to `/signup`.
- **`router.post('/login', loginUser)`**:
  - Similarly, this handles the submission of the login form using the POST method.
- **`router.get('/logout', logoutUser)`**:
  - **`router.get`**: This route responds to HTTP GET requests. This is appropriate for a logout link, as the user is simply requesting an action (to be logged out) without submitting complex data.

### 4. Export the Router
```typescript
export default router;
```
- **`export default router`**: Makes the configured `router` object available to be imported by `index.ts`, where it is mounted using `app.use('/', authRoutes);`.

---

**How it fits:**
- **Separation of Concerns**: This file cleanly separates the *routing* for authentication from the *implementation* of authentication (which is in `authController.ts`).
- **HTTP Method Specificity**: It correctly uses different HTTP methods (`GET` vs. `POST`) for different types of actions, which is a fundamental concept in web development. A `GET` request is for retrieving data (or a simple action), while a `POST` request is for sending data to be processed or stored.
- **API Definition**: This file, along with `pageRoutes.ts`, effectively defines the "API" or the set of available URLs for your web application. 