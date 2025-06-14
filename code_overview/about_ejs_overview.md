# about.ejs Overview

This file is the EJS template for the "About Us" page. Like the tour page, it is currently a static page that displays information about the farm.

---

## Code Walkthrough

### 1. Include Header Partial
```ejs
<%- include('partials/header') %>
```
- Embeds the shared header content from `header.ejs` into the page.

### 2. Main Page Content
```html
<main class="static-page">
  <div class="container">
    <h1>About Our Farm</h1>
    <p>
      Welcome to our farm! We are dedicated to providing the freshest,
      locally-grown produce. Our family has been farming this land for
      generations, and we are passionate about sustainable agriculture.
    </p>
    <p>
      Learn more about our history, our practices, and the people behind the
      produce.
    </p>
  </div>
</main>
```
- This is standard HTML that structures the main content area of the page.
- It contains a main heading (`<h1>`) and paragraphs (`<p>`) that provide information about the farm.
- This template does not contain any dynamic EJS logic; it simply displays fixed text.

### 3. Include Footer Partial
```ejs
<%- include('partials/footer') %>
```
- Embeds the shared footer from `footer.ejs` at the bottom, ensuring a consistent site-wide layout.

---

**How it fits:**
- **View in MVC**: This is the "View" for the `/about` route.
- **Static Content**: It is rendered by the `getAboutPage` controller, which serves this static template.
- **Informational Page**: Its purpose is to provide core information about the business to visitors. It can be updated by simply editing the text within the HTML tags. 