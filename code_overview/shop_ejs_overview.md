# shop.ejs Overview

This file is the EJS template for the online shop page. It is responsible for displaying a grid of products that are available for purchase.

---

## Code Walkthrough

### 1. Include Header Partial
```ejs
<%- include('partials/header') %>
```
- Embeds the shared header at the top of the page.

### 2. Main Shop Page Structure
```html
<main class="shop-page">
  <section class="page-hero" ...>
    ...
  </section>
  <section class="product-grid-container">
    <div class="container">
      ...
    </div>
  </section>
</main>
```
- This is standard HTML that structures the main content area, including a hero section and a container for the product grid.

### 3. Displaying Products with EJS
This is the core logic of the template.
```ejs
<div class="product-grid">
  <% if (products && products.length > 0) { %>
    <% products.forEach(function(product) { %>
      <div class="product-card">
        <div class="product-image">
          <img src="<%= product.image %>" alt="<%= product.name %>" />
        </div>
        <div class="product-info">
          <h3 class="product-name"><%= product.name %></h3>
          <p class="product-price"><%= product.price %></p>
          <a href="#" class="btn btn-secondary">Add to Cart</a>
        </div>
      </div>
    <% }); %>
  <% } else { %>
    <p>No products found.</p>
  <% } %>
</div>
```
- **`<% if (products && products.length > 0) { %>`**: A scriptlet tag that checks if the `products` array (passed from `pagesController.ts`) exists and is not empty. This prevents errors if no products are available.
- **`<% products.forEach(function(product) { %>`**: This is a standard JavaScript `forEach` loop to iterate over every `product` object in the `products` array.
  - **Note**: This uses a traditional `function(product)` callback, but it works identically to an arrow function `product => { ... }`.
- **`<div class="product-card">`**: For each product in the loop, a "product card" `div` is created.
- **`<%= product.image %>`**, **`<%= product.name %>`**, **`<%= product.price %>`**: These are output tags that safely display the `image` URL, `name`, and `price` for the current product in the loop.
- **`<% }); %>`**: Closes the `forEach` loop.
- **`<% } else { %>`**: If the initial `if` condition was false (no products), this block is executed.
- **`<p>No products found.</p>`**: Displays a user-friendly message when the shop is empty.
- **`<% } %>`**: Closes the `if/else` block.

### 4. Include Footer Partial
```ejs
<%- include('partials/footer') %>
```
- Embeds the shared footer at the bottom of the page.

---

**How it fits:**
- **View in MVC**: This is the "View" for the shop.
- **Data-Driven Content**: Its primary purpose is to render dynamic data. The `pagesController.ts` provides the `products` array (the Model data), and this template uses EJS to display it.
- **Reusability**: The product card structure is defined once and reused for every product in the array, making the code clean and maintainable. 