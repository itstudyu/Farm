# login.ejs Overview

This file is the EJS template for the user login page. It provides a form for existing users to sign in to their accounts.

---

## Code Walkthrough

### 1. Include Header Partial
```ejs
<%- include('partials/header') %>
```
- Embeds the shared `header.ejs` content at the top of the page.

### 2. Main Auth Page Container
```html
<main class="auth-page">
  <div class="auth-container">
    <h1>Log In</h1>
    <p>Welcome back! Please enter your details.</p>
    <!-- ... form and other content ... -->
  </div>
</main>
```
- Standard HTML that structures the main content area of the login page.

### 3. Displaying Flash Messages
This is a key feature for user feedback on this page.
```ejs
<% if (flash) { %>
  <div class="flash-message <%= flash.type %>">
    <%= flash.message %>
  </div>
<% } %>
```
- **`<% if (flash) { %>`**: This EJS scriptlet checks if a `flash` object exists. The `localsMiddleware` is responsible for making this object available to the template if it was set in the session by a controller.
- **`<%= flash.type %>`**: Outputs the type of the flash message (e.g., 'success' or 'error') as a CSS class. This allows for styling messages differently (e.g., green for success, red for error).
- **`<%= flash.message %>`**: Outputs the actual message text (e.g., "You have logged in successfully" or "Invalid credentials").

### 4. The Login Form
```html
<form action="/login" method="POST" class="auth-form">
  <!-- ... form groups for email and password ... -->
  <button type="submit" class="btn btn-primary">Log In</button>
</form>
```
- **`<form action="/login" method="POST">`**: This is a standard HTML form.
  - **`action="/login"`**: Specifies that the form data should be sent to the `/login` URL when submitted.
  - **`method="POST"`**: Specifies that the data should be sent using the HTTP POST method, which is correct for submitting login credentials.
- **Form Inputs**: The form contains standard `<input>` fields for `email` and `password`. The `name` attribute of each input is how `req.body` identifies the data on the server.
- **`required` attribute**: This provides basic client-side validation.

### 5. Link to Signup Page
```html
<p class="auth-switch">
  Don't have an account? <a href="/signup">Sign up</a>
</p>
```
- Provides a convenient link for new users to navigate to the registration page.

### 6. Include Footer Partial
```ejs
<%- include('partials/footer') %>
```
- Embeds the shared footer at the bottom of the page.

---

**How it fits:**
- **View in MVC**: This is the "View" for the user login process.
- **Data Submission**: It is the interface for users to submit their credentials to the backend `loginUser` controller function.
- **User Feedback**: It is a key place where flash messages are used. For example, after a user signs up, the `signupUser` controller redirects them here and sets a success flash message. If they fail to log in, the `loginUser` controller redirects them back here and sets an error flash message. 