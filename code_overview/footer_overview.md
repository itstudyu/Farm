# Footer Overview (`footer.ejs`)

This file is an EJS template for the footer section of every page. It is included at the bottom of all main pages for consistent layout, navigation, and functionality.

---

## Code Walkthrough

### 1. Main Footer Section
```ejs
<footer class="main-footer">
  <div class="footer-container">
    <div class="footer-join">
      <h2>Join Us</h2>
      <p>Join the Floret newsletter & stay in the loop on all the exciting happenings here on the farm</p>
      <form class="newsletter-form">
        <input type="email" placeholder="Email Address">
        <button type="submit">Sign Up</button>
      </form>
    </div>
    <div class="footer-links">
      <div class="footer-column">
        <h3>About</h3>
        <ul>
          <li><a href="/shop">Shop</a></li>
          ...
        </ul>
      </div>
      <div class="footer-column">
        <h3>Customer Care</h3>
        <ul>
          <li><a href="/contact">Contact</a></li>
          ...
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; <%= new Date().getFullYear() %> Floret LLC Clone. All rights reserved.</p>
  </div>
</footer>
```
- **`<footer>...</footer>`**: The HTML5 footer tag wraps the entire footer content.
- **`<form class="newsletter-form">`**: A simple newsletter signup form. Note that the form has no `action` or `method` attribute, so it would need JavaScript to be functional.
- **`.footer-links`**: Contains navigation links to main site sections, organized into columns for better readability.

### 2. EJS Code for Dynamic Year
```ejs
<p>&copy; <%= new Date().getFullYear() %> Floret LLC Clone. All rights reserved.</p>
```
- **`<%= ... %>`**: This is EJS syntax to output the value of a variable. It is a safer way to output data, as it escapes HTML characters.
- **`new Date().getFullYear()`**: This is standard JavaScript code that creates a new Date object and gets the current four-digit year.
- **Result:** This ensures the copyright year is always up-to-date automatically, without needing to be manually changed every year.

### 3. Script Inclusion
```ejs
<script src="/js/main.js"></script>
</body>
</html>
```
- **`<script src="/js/main.js"></script>`**: Includes the main JavaScript file for the site, which would handle things like form submissions, animations, etc.
- **`</body>` and `</html>`**: Closes the body and HTML tags, which are opened in the header.

---

**How it fits:**
- This file is included in every page template using `<%- include('partials/footer') %>`.
- It centralizes the footer, so any changes here update the footer on all pages.
- It uses a small but important piece of EJS to keep the copyright year current. 