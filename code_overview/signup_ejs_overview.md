# signup.ejs Overview

This file is the EJS template for the user registration page. It includes a form for users to enter their name, email, and password to create a new account.

---

## Code Walkthrough

### 1. Include Header Partial
```ejs
<%- include('partials/header') %>
```
- **`<%- include(...) %>`**: This EJS tag includes the content of another file. Here, it embeds the shared header at the top of the page. The `<%-` syntax outputs raw, unescaped HTML, which is necessary for including other templates.

### 2. Main Auth Page Container
```html
<main class="auth-page">
  <div class="auth-container">
    <h1>Create an Account</h1>
    <p>Join our community to get the latest news, workshop info, and more.</p>
    <!-- ... form and other content ... -->
  </div>
</main>
```
- This is standard HTML that structures the main content area of the signup page.

### 3. Displaying Error Messages
```ejs
<% if (typeof errors !== 'undefined' && errors.length > 0) { %>
  <div class="error-messages">
    <ul>
      <% errors.forEach(error => { %>
        <li><%= error.msg %></li>
      <% }) %>
    </ul>
  </div>
<% } %>
```
- **`<% if (...) { %>`**: This is EJS scriptlet syntax for running JavaScript logic. It checks if an `errors` array was passed from the controller and is not empty.
- **`errors.forEach(error => { ... })`**: If there are errors, this code uses an arrow function (lambda) to loop through each error object in the array.
- **`<li><%= error.msg %></li>`**: For each error, it creates a list item and displays the error message. The `<%=` syntax safely outputs the text content of `error.msg`.

### 4. The Signup Form
```html
<form action="/signup" method="POST" class="auth-form">
  <!-- ... form groups ... -->
  <button type="submit" class="btn btn-primary">Create Account</button>
</form>
```
- **`<form action="/signup" method="POST">`**: This is a standard HTML form.
  - **`action="/signup"`**: Specifies that the form data should be sent to the `/signup` URL when submitted.
  - **`method="POST"`**: Specifies that the data should be sent using the HTTP POST method, which is appropriate for sending data to create a resource (in this case, a new user).
- **Form Inputs**: The form contains standard `<input>` fields for `name`, `email`, `password`, and `confirm_password`. The `name` attribute of each input (e.g., `name="email"`) is crucial, as it becomes the key for that data in `req.body` on the server.
- **`required` attribute**: This provides basic client-side validation, preventing the form from being submitted if a field is empty.
- **`minlength="8"`**: Provides client-side validation for the password field.

### 5. Link to Login Page
```html
<p class="auth-switch">
  Already have an account? <a href="/login">Log in</a>
</p>
```
- Provides a convenient link for existing users to navigate to the login page.

### 6. Include Footer Partial
```ejs
<%- include('partials/footer') %>
```
- Embeds the shared footer at the bottom of the page.

---

**How it fits:**
- **View in MVC**: This is the "View" for the user registration process.
- **Data Submission**: It is the primary interface for users to submit their information to the backend `signupUser` controller function.
- **User Feedback**: It displays validation errors sent back from the server, providing clear feedback to the user if their submission fails. 