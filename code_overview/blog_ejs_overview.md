# blog.ejs Overview

This file is the EJS template for the blog page. It's designed to display a list of blog posts, similar to how the shop page displays products.

---

## Code Walkthrough

### 1. Include Header Partial
```ejs
<%- include('partials/header') %>
```
- Embeds the shared header into the page.

### 2. Main Blog Page Structure
```html
<main class="blog-page">
  <section class="page-hero" ...>
    ...
  </section>
  <section class="blog-posts-container">
    <div class="container">
      ...
    </div>
  </section>
</main>
```
- Standard HTML for the page layout, including a hero section and a main container for the blog posts.

### 3. Displaying Blog Posts with EJS
This section is the core of the template, where it dynamically generates the list of posts.
```ejs
<div class="blog-posts-grid">
  <% if (posts && posts.length > 0) { %>
    <% posts.forEach(function(post) { %>
      <div class="blog-post-card">
        <div class="blog-post-image">
          <a href="/blog/<%= post.slug %>">
            <img src="<%= post.image %>" alt="<%= post.title %>" />
          </a>
        </div>
        <div class="blog-post-info">
          <h3 class="blog-post-title">
            <a href="/blog/<%= post.slug %>"><%= post.title %></a>
          </h3>
          <p class="blog-post-excerpt"><%= post.excerpt %></p>
          <a href="/blog/<%= post.slug %>" class="read-more">Read More</a>
        </div>
      </div>
    <% }); %>
  <% } else { %>
    <p>No blog posts found.</p>
  <% } %>
</div>
```
- **`<% if (posts && posts.length > 0) { %>`**: Checks if the `posts` array, passed from the controller, exists and has content.
- **`<% posts.forEach(function(post) { %>`**: Loops through each `post` object in the `posts` array.
- **`<div class="blog-post-card">`**: Creates a container for each individual blog post.
- **`<a href="/blog/<%= post.slug %>">`**: This is a key part. It creates a unique link for each blog post by using its `slug` (a URL-friendly version of the title, e.g., "my-first-post"). This allows for creating detail pages for each post.
- **`<%= post.image %>`**, **`<%= post.title %>`**, **`<%= post.excerpt %>`**: These output tags display the data for the current post in the loop.
- **`<% } else { %>`**: If there are no posts, this block is executed.
- **`<p>No blog posts found.</p>`**: Displays a message when there are no posts.

### 4. Include Footer Partial
```ejs
<%- include('partials/footer') %>
```
- Embeds the shared footer at the end of the page.

---

**How it fits:**
- **View in MVC**: This is the "View" for the blog index.
- **Data-Driven Content**: It dynamically renders a list of blog posts from the `posts` array provided by its controller.
- **Foundation for Detail Pages**: The use of `post.slug` in the links sets up the structure needed to build individual blog post pages, where clicking a "Read More" link would take the user to a unique URL like `/blog/my-first-post`.

**Conditional Logic for Login/Logout:**
- The EJS template does not include conditional logic for login/logout. This is typically handled in the controller or middleware before rendering the template.
- If you need to add conditional logic for login/logout, you can use EJS syntax to conditionally include content based on the user's authentication status.

```ejs
<% if (user) { %>
  <p>Welcome, <%= user.name %>!</p>
<% } else { %>
  <p>Please log in to access your account.</p>
<% } %>
```

This example checks if a `user` object exists and displays a welcome message if the user is logged in. 