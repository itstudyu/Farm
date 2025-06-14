# history.ejs Overview

This file is the EJS template for the "Our History" page. It is a static page designed to present the history of the farm to visitors.

---

## Code Walkthrough

### 1. Include Header Partial
```ejs
<%- include('partials/header') %>
```
- Embeds the shared `header.ejs` content at the beginning of the page.

### 2. Main Page Content
```html
<main class="static-page">
  <div class="container">
    <h1>Our History</h1>
    <p>
      Our farm has a rich history dating back to [Year]. It all started with
      [Founder's Name] and a small plot of land.
    </p>
    <p>
      Over the decades, we've grown and adapted, but our commitment to quality
      and community has never wavered.
    </p>
  </div>
</main>
```
- This is standard HTML structuring the main content area.
- It features a main heading (`<h1>`) and paragraphs (`<p>`) with placeholder text for the farm's history.
- The content is static and does not involve any EJS logic for dynamic data rendering.

### 3. Include Footer Partial
```ejs
<%- include('partials/footer') %>
```
- Embeds the shared `footer.ejs` content at the end of the page, maintaining a consistent layout.

---

**How it fits:**
- **View in MVC**: This is the "View" for the `/history` route.
- **Static Content**: It is rendered by the `getHistoryPage` controller, which serves this static template.
- **Informational Page**: Its purpose is to provide historical context about the farm. The content can be easily updated by editing the text within the HTML tags. 