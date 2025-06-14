# Header Overview (`header.ejs`)

This file is an EJS template for the header (top navigation) of every page. It is included at the top of all main pages for consistent branding, navigation, and functionality.

---

## Code Walkthrough

### 1. Main Header Section
```ejs
<header class="main-header">
  <div class="header-container">
    <div class="logo">
      <a href="/">
        <img src="/images/floret-logo.png" alt="Floret Logo" />
      </a>
    </div>
    <nav class="main-nav">
      <ul>
        <li><a href="/shop">Shop</a></li>
        ...
      </ul>
    </nav>
    <div class="header-actions">
      <!-- Search, Account, Cart icons -->
    </div>
  </div>
</header>
```
- **`<header>...</header>`**: The HTML5 header tag wraps the top navigation.
- **`.logo`**: Shows the logo image, which links to the home page (`/`).
- **`.main-nav`**: Navigation links to main site sections.
- **`.header-actions`**: Contains icons for search, user account, and shopping cart.

### 2. EJS Logic for Conditional Login/Logout Links
This part is not in your current `header.ejs` file, but if you wanted to show different links for logged-in users, you would use this EJS logic:
```ejs
<div class="auth-links">
  <% if (!user) { %>
    <a href="/login">Login</a>
    <a href="/signup">Sign Up</a>
  <% } else { %>
    <span>Welcome, <%= user.name %>!</span>
    <a href="/logout">Logout</a>
  <% } %>
</div>
```
- **`<% if (!user) { %> ... <% } else { %> ... <% } %>`**: This is EJS conditional logic.
- **`if (!user)`**: Checks if the `user` object (from `res.locals`) does not exist. If so, the user is not logged in, and the "Login" and "Sign Up" links are shown.
- **`else`**: If the `user` object exists, the "Welcome" message and "Logout" link are shown.
- **`<%= user.name %>`**: This outputs the logged-in user's name.

---

**How it fits:**
- This file is included in every page template using `<%- include('partials/header') %>`.
- It centralizes the header, so any changes here update the header on all pages.
- It can use EJS to show different navigation options depending on whether a user is logged in (though this is not currently implemented in your file).

```ejs
<header>
  <div class="header-content">
    <div class="logo">
      <a href="/">
        <img src="/images/logo.png" alt="Floret Flower Farm Logo">
      </a>
    </div>
    <nav class="main-nav">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/history">History</a>
      <a href="/blog">Blog</a>
      <a href="/shop">Shop</a>
      <a href="/tour">Tour</a>
    </nav>
    <div class="auth-links">
      <% if (!user) { %>
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
      <% } else { %>
        <span>Welcome, <%= user.name %>!</span>
        <a href="/logout">Logout</a>
      <% } %>
    </div>
  </div>
</header>
```

### Explanation
- `<header>...</header>`: The HTML5 header tag wraps the top navigation.
- `.header-content`: Contains the logo, navigation links, and authentication links.
- `.logo`: Shows the logo image, which links to the home page (`/`).
- `.main-nav`: Navigation links to main site sections.
- `.auth-links`: Shows login/signup links if the user is not logged in, or a welcome message and logout link if the user is logged in.
- `<% if (!user) { %> ... <% } else { %> ... <% } %>`: EJS conditional logic to show different links based on login state.
- `<%= user.name %>`: EJS code to display the logged-in user's name.

**How it fits:**
- This file is included in every page template, so changes here update the header everywhere.
- Uses EJS to show different navigation options depending on whether a user is logged in. 