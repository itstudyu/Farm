# Locals Middleware Overview (`localsMiddleware.ts`)

This file defines a custom middleware function for Express. Its single purpose is to take data from the user's session and make it available to all EJS templates for a given request. This is a powerful pattern for handling data that needs to be accessible globally in your views, like user login status or system messages.

---

## Code Walkthrough

### 1. Import Dependencies
```typescript
import { Request, Response, NextFunction } from 'express';
```
- **`Request`, `Response`, `NextFunction`**: These are core types from the Express framework that represent the HTTP request, the HTTP response, and the callback function to pass control to the next middleware in the chain.

### 2. TypeScript Interface Augmentation
```typescript
declare module 'express-session' {
  interface SessionData {
    user?: { id: number; name: string; email: string; };
    flash?: { type: string; message: string; };
  }
}
```
- **`declare module 'express-session'`**: This is a TypeScript feature called "declaration merging" or "module augmentation."
- **Purpose**: The original `express-session` library doesn't know about the custom `user` and `flash` properties you want to add to the session object. This block tells the TypeScript compiler that the `SessionData` interface (from `express-session`) should also include your custom properties.
- **Benefit**: This allows you to write `req.session.user` and `req.session.flash` elsewhere in your code without TypeScript raising a type error, providing auto-completion and type safety.

### 3. The Middleware Function
```typescript
export const localsMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
- This is an **arrow function** assigned to a constant `localsMiddleware` and exported. This is the middleware itself.
- **`(req: Request, res: Response, next: NextFunction)`**: The standard signature for Express middleware.
  - **`req`**: The incoming request object. We use it here to access `req.session`.
  - **`res`**: The outgoing response object. We use it here to set `res.locals`.
  - **`next`**: A function that must be called to pass control to the next middleware in the stack. If you don't call `next()`, the request will hang and never complete.

#### Logic Steps:
1.  **Make User Data Available**:
    ```typescript
    res.locals.user = req.session.user || null;
    ```
    - **`res.locals`**: An object whose properties are available as local variables within any EJS template rendered during the current request-response cycle.
    - **`req.session.user`**: The user object that was stored in the session during login.
    - **`|| null`**: A fallback. If `req.session.user` is undefined (i.e., the user is not logged in), `res.locals.user` will be set to `null`. This prevents errors in the templates.
2.  **Make Flash Messages Available**:
    ```typescript
    if (req.session.flash) {
        res.locals.flash = req.session.flash;
        delete req.session.flash;
    } else {
        res.locals.flash = null;
    }
    ```
    - This implements a "flash message" system, where a message is stored in the session and displayed only on the *next* request, then immediately deleted. This is perfect for "Success!" or "Error!" messages after a form submission.
    - It checks if a flash message exists, copies it to `res.locals`, and then **deletes it** from the session so it doesn't appear again.
3.  **Continue to Next Middleware**:
    ```typescript
    next();
    ```
    - This is the final and most important step. It tells Express, "This middleware is done, please proceed to the next middleware or the actual route handler."

---

**How it fits:**
- **Centralized Data Provider**: This middleware is registered once in `index.ts` and runs for every single request, ensuring that every EJS template can reliably check for `user` and `flash` variables without needing them to be passed in every `res.render()` call.
- **Clean Controllers**: It keeps the controllers clean. Instead of every controller function having to add `user` and `flash` to the render data, this middleware handles it automatically. 