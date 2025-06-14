# Auth Controller Overview (`authController.ts`)

This file contains the core logic for user authentication: signing up, logging in, and logging out. It is a critical part of the application, handling user data, password security, and session management.

---

## Code Walkthrough

### 1. Import Dependencies
```typescript
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/database';
```
- **`express`**: Imports the `Request` and `Response` types for TypeScript type-safety.
- **`bcrypt`**: A library used for hashing and comparing passwords securely. It is essential for protecting user credentials.
- **`pool`**: Imports the database connection pool from your config file, allowing the controller to run SQL queries.

### 2. Password Hashing
```typescript
const saltRounds = 10;
```
- **`saltRounds`**: This determines the complexity of the password hash. A higher number is more secure but slower. `10` is a standard, recommended value.

### 3. `signupUser` Function
This is an `async` arrow function that handles the logic for creating a new user.
```typescript
export const signupUser = async (req: Request, res: Response) => {
  // ...
};
```
- **`async`**: This keyword is crucial. It allows the use of `await` inside the function, which pauses execution until a `Promise` (like a database query) is resolved, preventing the code from continuing before the necessary data is available.

#### Logic Steps:
1.  **Get Form Data**: `const { name, email, password, confirm_password } = req.body;`
    - Destructures the form fields from the request body.
2.  **Validate Passwords**: Checks if `password` and `confirm_password` match. If not, it sets a "flash message" in the session and redirects back to the signup page.
3.  **Check for Existing User**:
    ```typescript
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    ```
    - **`await pool.query(...)`**: This is a non-blocking database call. The `await` keyword pauses the function here until the database returns a result.
    - **`[email]`**: This uses a parameterized query, which is vital for preventing SQL injection attacks.
4.  **Hash the Password**:
    ```typescript
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    ```
    - Hashes the user's plain-text password using the generated salt. This ensures you never store plain-text passwords in your database.
5.  **Insert New User**: Inserts the new user's details (including the `hashedPassword`) into the `users` table.
6.  **Redirect**: Redirects the user to the login page with a success message.

### 4. `loginUser` Function
This `async` arrow function handles user login.
#### Logic Steps:
1.  **Get Form Data**: Gets `email` and `password` from the request body.
2.  **Find User**: Fetches the user from the database by email.
3.  **Compare Passwords**:
    ```typescript
    const match = await bcrypt.compare(password, user.password);
    ```
    - **`bcrypt.compare`**: Securely compares the plain-text password from the form with the hashed password from the database. It returns `true` if they match.
4.  **Create Session**: If the passwords match:
    ```typescript
    req.session.user = { id: user.id, name: user.name, email: user.email };
    ```
    - Stores the user's information in `req.session`. This is what keeps the user logged in across different pages.
5.  **Redirect**: Redirects to the home page (`/`) on successful login, or back to the login page on failure.

### 5. `logoutUser` Function
```typescript
export const logoutUser = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        // ...
        res.redirect('/');
    });
};
```
- **`req.session.destroy()`**: This method from `express-session` removes the user's session from the server, effectively logging them out.
- The arrow function passed to it is a callback that runs after the session is destroyed, which then redirects the user to the home page.

---

**How it fits:**
- **Controller in MVC**: This is a classic "Controller" that handles the application's core business logic for authentication.
- **Security**: It is responsible for critical security features like password hashing and preventing SQL injection.
- **Session Management**: It creates and destroys user sessions, which is fundamental to how the web application recognizes logged-in users.
- **Data Flow**: It takes user input from a `Request`, interacts with the database (Model), and then directs the user to a new page (View) by sending a `Response` (redirect). 