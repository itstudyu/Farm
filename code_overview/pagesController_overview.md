# Pages Controller Overview (`pagesController.ts`)

This file contains functions (controllers) that handle requests for different pages and render the appropriate EJS templates. These functions are the "business logic" for displaying pages that do not require complex data fetching.

---

## Code Walkthrough

### 1. Import Types
```typescript
import { Request, Response } from 'express';
```
- **`import { Request, Response }`**: Imports the `Request` and `Response` types from the Express library. Using these types provides TypeScript with auto-completion and type-checking, making the code more robust.

### 2. Controller Functions (as Arrow Functions)
Each exported function is an **arrow function** (a concise function syntax, similar to a Java lambda) assigned to a constant variable. This is a common pattern in modern JavaScript/TypeScript for creating modular, exportable functions.

#### Example: `getHomePage`
```typescript
export const getHomePage = (req: Request, res: Response) => {
    res.render('index', { title: 'Floret Flower Farm' });
};
```
- **`export const getHomePage`**: Declares and exports a constant named `getHomePage`, which holds the function.
- **`(req: Request, res: Response)`**: These are the function's parameters.
  - **`req: Request`**: The HTTP request object. It contains all information about the incoming request from the user's browser, such as headers, URL parameters, query strings, and session data.
  - **`res: Response`**: The HTTP response object. You use this object to send a response back to the user's browser.
- **`=> { ... }`**: The body of the arrow function.
- **`res.render('index', { title: 'Floret Flower Farm' });`**: This is the core logic.
  - **`res.render()`**: This Express method renders a view template (in this case, an EJS file) and sends the resulting HTML string to the client.
  - **`'index'`**: The first argument is the name of the template file to render (without the `.ejs` extension), located in the `views` folder.
  - **`{ title: 'Floret Flower Farm' }`**: The second argument is an object containing data to be passed to the template. In this case, it passes a `title` variable, which can be used inside `index.ejs` as `<%= title %>`.

#### Other Simple Page Controllers
The functions `getLoginPage`, `getSignupPage`, `getTourPage`, `getAboutPage`, and `getHistoryPage` all follow the exact same pattern as `getHomePage`, each rendering their respective EJS template with a specific title.

### 3. Controllers with Mock Data

#### `getBlogPage`
```typescript
export const getBlogPage = (req: Request, res: Response) => {
    const posts: Post[] = [
        { title: 'How to Grow Zinnias', ... },
        // ... more post objects
    ];
    res.render('blog', { title: 'Our Farm Blog', posts: posts });
};
```
- **`const posts: Post[] = [ ... ];`**: This creates an array of hard-coded "post" objects to simulate fetching data from a database.
- **`res.render('blog', { ... posts: posts });`**: It then passes this `posts` array to the `blog.ejs` template. Inside the template, you can use EJS to loop through this array and display each post.

#### `getShopPage`
This function works identically to `getBlogPage`, but it creates an array of `products` and passes it to the `shop.ejs` template.

---

**How it fits:**
- **Separation of Concerns**: This file separates the logic for handling page requests from the routing itself (which is in `pageRoutes.ts`).
- **Data Flow**: It acts as the bridge between your data (even if it's currently hard-coded) and your views (the EJS templates).
- **Controller in MVC**: This file represents the "Controller" part of the Model-View-Controller (MVC) pattern, managing the interaction between the user's request and the view that is returned. 