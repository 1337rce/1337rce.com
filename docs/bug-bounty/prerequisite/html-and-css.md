---
sidebar_position: 10
title: "HTML & CSS"
description: "HTML (HyperText Markup Language) is used to structure web pages, while CSS (Cascading Style Sheets) is used for styling."
---
# HTML & CSS Basics for Bug Bounty

## What is HTML & CSS?
HTML (HyperText Markup Language) is used to structure web pages, while CSS (Cascading Style Sheets) is used for styling.  

Before you dive into finding vulnerabilities, you need a basic understanding of how websites are built. That's where HTML and CSS come in. Don't worry, you don't need to become a front-end web developer. Just the basics will do.

### Why It Matters in Bug Bounty?
Bug hunters must understand **HTML & CSS** because:
- **Understanding Web Structure** – Helps analyze website elements and identify vulnerabilities like HTML injection.
- **CSS-Based Leaks** – Exploiting CSS to extract sensitive data (e.g., CSS exfiltration attacks).
- **Bypassing Security Measures** – Helps in detecting improper input validation and CSP (Content Security Policy) misconfigurations.
- **Clickjacking Attacks** – Using CSS to overlay malicious elements on a site.
- **DOM-Based XSS** – Knowing how HTML and CSS interact with JavaScript can expose security flaws.
- **Hidden Elements & Manipulation** – Identifying login forms, API keys, or sensitive data hidden via CSS.
- **UI Redressing** – Creating deceptive interfaces using CSS for phishing-like attacks.

---

## 🔗 **Learning Resources**
📚 **HTML & CSS Documentation**
- [W3schools - HTML](https://www.w3schools.com/html/)  
- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)  
- [W3schools - CSS](https://www.w3schools.com/css/)  
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)    

📺 **Video Resources**
- [HTML & CSS Full Course - SuperSimpleDev](https://youtu.be/G3e-cpL7ofc)  

---
## 🔥 HTML Basics  

### 1️⃣ **HTML Elements**  

HTML is like the skeleton of a web page. It tells the browser what content to display and how to structure it. Think of it as the foundation.

Every HTML document follows a basic structure. It starts with `<!DOCTYPE html>`, which tells the browser it's an HTML5 document. Then comes the `<html>` tag, which wraps everything else.  Inside `<html>`, you have two main sections: `<head>` and `<body>`.

The `<head>` contains information *about* the page, like the title and links to stylesheets. You won't see this content directly on the page.  The `<title>` tag sets the title that appears in the browser tab.

The `<body>` is where the actual content of the page goes. This is what users see.  

An HTML page consists of **elements** enclosed in tags:  

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Bug Bounty Page</title>
</head>
<body>
    <h1>Welcome to Bug Bounty</h1>
    <p>This is an example paragraph.</p>
</body>
</html>
```

Here are some other common tags you'll see:

* `<a>`: Creates links to other pages.  You'll use the `href` attribute to specify the URL.  Like this: `<a href="https://www.example.com">Click me</a>`.
* `<img>`: Displays images. The `src` attribute specifies the image file. For example: `<img src="image.jpg" alt="An image">`.
* `<ul>` and `<ol>`: Create unordered (bullet point) and ordered (numbered) lists.  Use `<li>` for each list item.
* `<div>` and `<span>`: These are container elements. They're used to group other elements and apply styles.

Tags often have attributes that provide additional information. For example, the `<img>` tag has a `src` attribute to specify the image source.  The `class` and `id` attributes are used for styling with CSS.


### 2️⃣ **Forms & Input Fields**  
Forms play a **critical** role in **security testing** (SQLi, XSS, CSRF).  
Forms allow users to interact and send data. This makes them a prime target for bug bounty hunters.

Forms use tags like `<form>`, `<input>`, `<textarea>`, `<select>`, and `<button>`.  The `<input>` tag is versatile – it can be a text field, a password field, a checkbox, a radio button, and more.  Pay attention to attributes like `type`, `name`, `value`, `action`, and especially `method` (which determines how data is sent – GET or POST).

```html
<form action="/submit" method="POST">
    <input type="text" name="username" placeholder="Enter Username">
    <input type="password" name="password" placeholder="Enter Password">
    <input type="submit" value="Login">
</form>
```
👉 **Why it matters?**  
- Can be vulnerable to **XSS** if input is not sanitized.  
- Can be exploited using **CSRF** attacks.  
- Hidden fields can store sensitive data.  

---

## 🎨 CSS Basics  

CSS is like the clothes and makeup of a web page. It styles the HTML elements, controlling things like colors, fonts, and layout.

You can add CSS in a few ways:

* **Inline:** Directly in the HTML tag.  Like this: `<p style="color: blue;">Blue text</p>`. This is generally not recommended.
* **Internal:**  Inside `<style>` tags in the `<head>` section.
* **External:**  In a separate `.css` file, which is linked in the `<head>`. This is the best way to organize your CSS.

Here's an example of an external stylesheet:

```css
h1 {
  color: red;
  font-size: 36px;
}

p {
  color: gray;
}
```

This CSS makes all `<h1>` elements red and 36 pixels large, and all `<p>` elements gray.

CSS uses selectors to target specific HTML elements.  You can select elements by their tag name (like `h1` or `p`), by their class (using a dot, like `.my-class`), or by their ID (using a hash, like `#my-id`).

CSS also has tons of properties and values to control every aspect of an element's appearance. For example, `color` sets the text color, `background-color` sets the background color, `margin` adds space outside an element, and `padding` adds space inside an element.

The box model is a key concept in CSS.  Think of each element as having a box around it, with content, padding, a border, and a margin.  Understanding this helps you control layout.

Sometimes, websites use CSS frameworks like Bootstrap or Tailwind CSS. These frameworks provide pre-built styles and components.  Knowing they exist is helpful, even if you don't use them directly for bug bounty hunting.

👉 **Bug bounty tip:** Hidden elements (`display: none;`) can store **sensitive info**.

### **Clickjacking via CSS**  
Attackers use **CSS transparency tricks** to make users click on hidden elements.

```css
iframe {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```
👉 **Mitigation:** Use **X-Frame-Options: DENY** in HTTP headers.

---

## 💻 Developer Tools

Your browser's developer tools are essential. Right-click on any web page and select "Inspect" or "Inspect Element."  You can then see the HTML structure, the CSS styles, and much more. You can even make temporary changes to the HTML and CSS right there in the browser to see how they affect the page.

The "Network" tab in the developer tools is particularly useful for bug bounty hunting. It shows all the HTTP requests and responses between your browser and the server.  We'll cover that in more detail later.

---

🚀 **Next Step**: Move to [JavaScript Basics for Bug Bounty](./javascript)  