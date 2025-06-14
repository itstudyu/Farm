# Database Config Overview (`database.ts`)

This file is responsible for a single, critical task: creating a reusable and efficient connection to your MariaDB database. It uses a "connection pool" to manage database connections, which is a standard best practice for performance and reliability in web applications.

---

## Code Walkthrough

### 1. Import `mysql2/promise`
```typescript
import mysql from 'mysql2/promise';
```
- **`import mysql from 'mysql2/promise'`**: Imports the `mysql2` library. Specifically, it imports the `promise-wrapper` version of the library.
- **Why `/promise`?**: This allows you to use modern JavaScript `async/await` syntax with your database queries, making your code cleaner and easier to read compared to using traditional callbacks.

### 2. Create the Connection Pool
```typescript
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '8080', 10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
```
- **`mysql.createPool({...})`**: This creates a pool of database connections, rather than a single connection.
  - **Why use a pool?**: Opening and closing a database connection for every single query is very slow and resource-intensive. A connection pool maintains a set of open connections that can be "checked out" when needed and "returned" to the pool when done. This is much faster and more efficient.
- **Configuration Object**:
  - **`host`**: The address of your database server. It tries to get this from the `DB_HOST` variable in your `.env` file, but defaults to `'localhost'` if it's not found.
  - **`user`**, **`password`**, **`database`**: Reads your database username, password, and the specific database name from your `.env` file. These do not have defaults, so they *must* be in the `.env` file.
  - **`port`**: The port your database server is running on. It uses `parseInt` to convert the string from `.env` into a number, defaulting to `8080`.
  - **`waitForConnections: true`**: If all connections in the pool are busy, new requests will wait in a queue for a connection to become available, rather than immediately failing.
  - **`connectionLimit: 10`**: The maximum number of connections to keep open in the pool.
  - **`queueLimit: 0`**: If `waitForConnections` is true, this sets the maximum number of requests that can be queued. `0` means there is no limit.

### 3. Export the Pool
```typescript
export default pool;
```
- **`export default pool`**: This makes the `pool` object available to be imported and used in other files in your project.
- **Usage**: Your controllers (like `authController.ts`) will import this `pool` and use it to run queries, like `await pool.query(...)`.

---

**How it fits:**
- **Centralized Configuration**: This file centralizes all your database connection logic in one place. If you ever need to change how you connect to the database, you only need to edit this one file.
- **Performance**: It is key to your application's performance by providing an efficient way to interact with the database.
- **Model in MVC**: This configuration is a core part of the "Model" layer in an MVC architecture, providing the data access mechanism for your application.

**Conditional Logic for Login/Logout:**

The conditional logic for login/logout is not directly related to the database configuration file. It is typically handled in the controller or service layer of your application.

For example, if you want to check if a user is logged in, you might do something like this:

```typescript
const isLoggedIn = req.session.isLoggedIn;
```

If you want to handle login/logout logic, you might use a session management library like `express-session` to manage user sessions.

For more information on conditional logic, you might want to look into the following topics:
- **Session Management**: How to manage user sessions in a web application.
- **Authentication**: How to implement user authentication in your application.
- **Authorization**: How to implement user authorization in your application.

These topics are beyond the scope of this file, but they are important for understanding how to handle login/logout logic in your application. 