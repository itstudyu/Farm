# Page Routes Overview (`pageRoutes.ts`)

This file acts as a "table of contents" for the main pages of your website. It uses the Express `Router` to map specific URLs (e.g., `/about`, `/shop`) to the corresponding controller functions that are responsible for rendering the page.

---

## Code Walkthrough

### 1. Import Dependencies
```typescript
import { Router } from 'express';
import { getHomePage, getLoginPage, ... } from '../controllers/pagesController';
```
- **`import { Router }`**: Imports the `Router` factory function from the Express library. A Router is like a "mini-application" that can have its own middleware and routing, which helps in organizing your application.
- **`import { ... } from '../controllers/pagesController'`**: Imports all the controller functions from `pagesController.ts`. Each function is responsible for handling a single page.

### 2. Create the Router Instance
```typescript
const router = Router();
```
- **`const router = Router()`**: Creates a new instance of an Express router. You will attach all your page-related routes to this `router` object.

### 3. Define the Routes
```typescript
router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/about', getAboutPage);
// ... and so on for all other pages
```
- **`router.get(...)`**: This method is used to define a route that responds to HTTP GET requests.
- **First Argument**: The first argument is a string representing the URL path. For example, `'/'` is the home page, and `'/about'` is the about page.
- **Second Argument**: The second argument is the **controller function** that will be executed when a request is made to that URL.
  - For example, when a user navigates to `http://your-site.com/about`, Express will find the `router.get('/about', getAboutPage)` line and execute the `getAboutPage` function from your `pagesController.ts`.
- **How it uses Arrow Functions**: While this file doesn't define arrow functions, it *uses* the ones defined in `pagesController.ts`. The controller functions themselves are arrow functions, which makes this code clean and readable.

### 4. Export the Router
```typescript
export default router;
```
- **`export default router`**: This makes the configured `router` object available to be imported by other files.
- **Usage**: Your main `index.ts` file imports this router and mounts it using `app.use('/', pageRoutes);`. This tells your main application to use all the routes defined in this file.

---

**How it fits:**
- **Organization**: This file is crucial for keeping your application organized. It separates the "what" (the URL) from the "how" (the controller logic), which is a core principle of good software design.
- **Routing**: This is the heart of your application's navigation. It's the map that tells Express how to handle requests for different pages.
- **Readability**: By having all page routes in one place, it's very easy to see all the pages your application supports at a glance. 