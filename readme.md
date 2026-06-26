# Web Application Development — Tutorial 2 Reference

A syntax and snippet reference covering all topics from Tutorial Week 2: Accessibility, CSS Variables, Layouts, Selectors, Responsive Design, and JavaScript fundamentals including DOM manipulation.

---

## Table of Contents

1. [Accessibility in HTML (a11y)](#1-accessibility-in-html-a11y)
2. [CSS Variables](#2-css-variables)
3. [Units in CSS](#3-units-in-css)
4. [CSS Display & Float](#4-css-display--float)
5. [CSS Flexbox](#5-css-flexbox)
6. [CSS Grid](#6-css-grid)
7. [CSS Positioning](#7-css-positioning)
8. [Responsive Design & Media Queries](#8-responsive-design--media-queries)
9. [Advanced CSS Selectors](#9-advanced-css-selectors)
10. [JavaScript Fundamentals](#10-javascript-fundamentals)
11. [DOM Manipulation](#11-dom-manipulation)
12. [Further Reading](#12-further-reading)

---

## 1. Accessibility in HTML (a11y)

Accessibility (a11y) means building sites usable by everyone — including people using screen readers, keyboard-only navigation, or other assistive technologies. Roughly 1 in 6 people worldwide live with some form of disability. It is not an optional feature; it is part of writing correct HTML.

### Semantic HTML

Use semantic elements instead of generic `<div>` wrappers. Semantic tags carry built-in meaning that screen readers announce automatically.

```html
<!-- Bad -->
<div class="header">...</div>
<div class="nav">...</div>
<div onclick="submit()">Submit</div>

<!-- Good -->
<header>...</header>
<nav>...</nav>
<button type="submit">Submit</button>
```

Key semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<button>`

### Images and Form Labels

```html
<!-- Alt text describes the purpose of the image, not just its appearance.
     Decorative images get alt="" -->
<img src="cat.jpg" alt="An orange tabby cat sleeping on a windowsill" />

<!-- Every input needs an associated <label>.
     Clicking the label should focus the input. -->
<label for="email">Email address</label>
<input type="email" id="email" name="email" />
```

### Keyboard Navigation

Anything clickable must be reachable via `Tab` and operable via `Enter`/`Space`. Prefer real `<button>` and `<a>` elements — they receive keyboard focus automatically.

Use `tabindex` only when a non-interactive element (like a `<div>`) is being used as an interactive one:

```html
<div
  tabindex="0"
  role="button"
  aria-label="Open account settings"
  onclick="navigateToSettings()"
>
  Open Account Button
</div>
```

- `tabindex="0"` — adds the element into the natural tab order
- Pressing `Tab` navigates through elements in tab-index order

### ARIA Attributes

ARIA (Accessible Rich Internet Applications) attributes describe complex UI states to assistive technologies when plain HTML is not enough.

```html
<!-- Icon-only button needs a label -->
<button aria-label="Close newsletter popup">X</button>
```

| Attribute                    | Use Case                                                   | Example                                             |
| ---------------------------- | ---------------------------------------------------------- | --------------------------------------------------- |
| `aria-expanded="true/false"` | Indicates if a collapsible element (e.g. dropdown) is open | `<button aria-expanded="false">Menu</button>`       |
| `aria-hidden="true"`         | Hides element from screen readers entirely                 | `<svg aria-hidden="true">...</svg>`                 |
| `aria-label="text"`          | Directly names an element (useful for icon buttons)        | `<button aria-label="Close dialog">X</button>`      |
| `aria-labelledby="ID"`       | Links an element to another element to use as its label    | `<div role="dialog" aria-labelledby="modal-title">` |

```html
<!-- aria-labelledby example -->
<div role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Settings</h2>
</div>
```

### Color Contrast

- Text must have sufficient contrast against its background for people with visual impairments.
- Never use color alone to convey meaning (e.g. red for errors). Pair color with an icon or text label — approximately 4.5% of people are affected by color blindness.

---

## 2. CSS Variables

CSS variables (custom properties) are declared once and reused throughout the stylesheet. They are especially useful for theming.

### Syntax

```css
/* Declaration — usually on :root to make it globally available */
:root {
  --primary-color: #4f46e5;
  --font-size-base: 16px;
  --spacing-md: 1rem;
}

/* Usage */
.button {
  background-color: var(--primary-color);
  font-size: var(--font-size-base);
  padding: var(--spacing-md);
}
```

- Declared with `--name: value;`
- Read with `var(--name)`
- Cascade and inherit like regular CSS properties

---

## 3. Units in CSS

Units define the size, padding, margin, font-size, and positioning of elements.

### Absolute Units

| Unit | Description                      |
| ---- | -------------------------------- |
| `px` | Pixels — 1px = 1/96th of an inch |

### Relative Units

Relative units scale relative to something else (parent size, root size, or viewport). They are essential for responsive design.

#### Percentage

```css
/* 50% of the parent element's width */
.child {
  width: 50%;
}
```

#### Font-Relative Units

```css
/* em — relative to the current element's font-size.
   Compounds: if parent is 2em and child is 2em, child is 4× base size. */
.element {
  height: 5em; /* 5 × this element's font-size */
}

/* rem — relative to the root <html> font-size.
   No compounding. Consistent across the entire page. */
.element {
  height: 5rem; /* 5 × html element's font-size */
}
```

#### Viewport-Relative Units

| Unit   | Description                          | Example                                |
| ------ | ------------------------------------ | -------------------------------------- |
| `vw`   | 1% of viewport width                 | `width: 100vw` = full viewport width   |
| `vh`   | 1% of viewport height                | `height: 100vh` = full viewport height |
| `vmin` | 1% of the smaller viewport dimension | On 1200×800: `1vmin = 8px`             |
| `vmax` | 1% of the larger viewport dimension  | On 1200×800: `1vmax = 12px`            |

---

## 4. CSS Display & Float

### Display Property

The most important CSS property for controlling layout.

```css
.element {
  display: none;
} /* Hides the element entirely */
.element {
  display: block;
} /* Starts on new line, takes full width */
.element {
  display: inline;
} /* Flows inline, only as wide as content */
.element {
  display: inline-block;
} /* Inline flow, but accepts width/height */
.element {
  display: flex;
} /* Flexbox container */
.element {
  display: grid;
} /* Grid container */
```

Common default values:

- **Block** by default: `<div>`, `<p>`, `<h1>`–`<h6>`, `<section>`, `<header>`
- **Inline** by default: `<span>`, `<a>`, `<strong>`, `<img>`

### Float Property

Floats an element to the left or right, letting content wrap around it.

```css
img {
  float: left; /* float: right | none | inherit */
  margin: 0 1rem 1rem 0;
}
```

---

## 5. CSS Flexbox

Flexbox is a **1-dimensional** layout system — it aligns items in a single row or column.

### Container Properties

```css
.container {
  display: flex;

  /* Direction of the main axis */
  flex-direction: row; /* row | row-reverse | column | column-reverse */

  /* Alignment along the main axis */
  justify-content: flex-start; /* flex-start | center | flex-end | space-between | space-around | space-evenly */

  /* Alignment along the cross axis */
  align-items: stretch; /* flex-start | center | flex-end | stretch | baseline */

  /* Wrapping */
  flex-wrap: nowrap; /* nowrap | wrap | wrap-reverse */

  /* Spacing between items */
  gap: 20px;
  gap: 16px 24px; /* row-gap column-gap */
}
```

### Item Properties

```css
.item {
  flex: 1; /* Shorthand: flex-grow flex-shrink flex-basis */
  flex-grow: 1; /* How much extra space the item takes relative to siblings */
  flex-shrink: 1; /* Whether item shrinks if container is too small */
  flex-basis: auto; /* Default size before free space is distributed */
  align-self: center; /* Override align-items for this specific item */
  order: 0; /* Visual order (default 0; lower = earlier) */
}
```

### Common Patterns

```css
/* Center an item both horizontally and vertically */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Equal-width columns */
.container {
  display: flex;
  gap: 16px;
}
.column {
  flex: 1;
}

/* Sidebar + main content */
.layout {
  display: flex;
}
.sidebar {
  width: 240px;
}
.main {
  flex: 1;
}
```

---

## 6. CSS Grid

Grid is a **2-dimensional** layout system — it handles both rows and columns simultaneously.

### Container Properties

```css
.container {
  display: grid;

  /* Define columns */
  grid-template-columns: 200px 1fr 1fr; /* 3 columns: fixed + two equal */
  grid-template-columns: repeat(3, 1fr); /* Shorthand: 3 equal columns */
  grid-template-columns: repeat(
    auto-fit,
    minmax(200px, 1fr)
  ); /* Responsive auto columns */

  /* Define rows */
  grid-template-rows: auto 1fr auto;

  /* Spacing */
  gap: 16px;
  row-gap: 16px;
  column-gap: 24px;
}
```

### Item Placement

```css
.item {
  /* Span columns */
  grid-column: 1 / 3; /* From line 1 to line 3 (spans 2 columns) */
  grid-column: span 2; /* Span 2 columns from current position */

  /* Span rows */
  grid-row: 1 / 3; /* From row line 1 to 3 */
  grid-row: span 2;
}
```

### Named Template Areas

```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
}
header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
main {
  grid-area: main;
}
footer {
  grid-area: footer;
}
```

---

## 7. CSS Positioning

```css
.element {
  position: static;
} /* Default — not affected by top/left/right/bottom */
.element {
  position: relative;
} /* Offset from its normal position; still in flow */
.element {
  position: absolute;
} /* Removed from flow; positioned relative to nearest positioned ancestor */
.element {
  position: fixed;
} /* Positioned relative to the viewport; stays on scroll */
.element {
  position: sticky;
} /* Behaves like relative until scroll threshold, then fixed */
```

### Offset Properties (used with all except `static`)

```css
.element {
  position: absolute;
  top: 20px;
  right: 0;
  bottom: 0;
  left: 20px;
  z-index: 10; /* Stack order — higher value appears on top */
}
```

### Common Patterns

```css
/* Absolutely center inside a relative parent */
.parent {
  position: relative;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Sticky navigation */
nav {
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Overlay (covers the entire viewport) */
.overlay {
  position: fixed;
  inset: 0; /* shorthand for top/right/bottom/left: 0 */
  background: rgba(0, 0, 0, 0.5);
}
```

---

## 8. Responsive Design & Media Queries

### Viewport Meta Tag (required)

Always include this in `<head>`. It tells the browser to render at the device's actual width.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Media Query Syntax

```css
/* Applies only when viewport is 600px wide or narrower */
@media (max-width: 600px) {
  /* small screen styles */
}

/* Applies when viewport is at least 600px wide */
@media (min-width: 600px) {
  /* medium+ screen styles */
}

/* Multiple conditions */
@media (min-width: 768px) and (max-width: 1023px) {
  /* tablet-only styles */
}
```

### Common Breakpoints

| Name          | Range            |
| ------------- | ---------------- |
| Mobile        | `< 768px`        |
| Tablet        | `769px – 1023px` |
| Desktop       | `≥ 1024px`       |
| Large Desktop | `≥ 1440px`       |

### Mobile-First Design Pattern

Write base styles for mobile first, then progressively enhance for larger screens using `min-width` queries.

```css
/* Base — mobile styles (no media query needed) */
.container {
  display: flex;
  flex-direction: column;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

---

## 9. Advanced CSS Selectors

### Combinators

```css
/* Descendant — any nested level */
article p {
  color: gray;
}

/* Direct child — only immediate children */
nav > ul > li {
  display: inline-block;
}

/* Adjacent sibling — element immediately after */
h2 + p {
  margin-top: 0;
}

/* General sibling — any sibling after, same parent */
h2 ~ p {
  font-size: 14px;
}
```

### Grouped Selectors

```css
h1,
h2,
h3 {
  font-family: "Georgia", serif;
  margin-bottom: 0.5em;
}
```

### Attribute Selectors

```css
input[type="text"] {
  border: 1px solid gray;
} /* exact value */
a[href^="https"] {
  color: green;
} /* starts with */
a[href$=".pdf"] {
  color: red;
} /* ends with */
a[href*="example"] {
  color: blue;
} /* contains */
```

### Pseudo-Classes (state-based)

```css
a:hover {
  text-decoration: underline;
}
input:focus {
  outline: 2px solid blue;
}
li:first-child {
  font-weight: bold;
}
li:last-child {
  border-bottom: none;
}
li:nth-child(odd) {
  background: #f3f4f6;
}
li:nth-child(2n + 1) {
  background: #f3f4f6;
} /* same as odd */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
input:checked + label {
  color: green;
}
a:not(.active) {
  color: gray;
}
```

### Pseudo-Elements (target part of an element)

```css
p::first-line {
  font-weight: bold;
}
p::before {
  content: "→ ";
}
p::after {
  content: " ✔";
}
::selection {
  background: yellow;
}
```

---

## 10. JavaScript Fundamentals

### Variables

```js
let name = "Alice"; // Block-scoped; can be reassigned
const hoursInDay = 24; // Block-scoped; cannot be reassigned
var price = 12.345; // Function-scoped; avoid — causes hoisting issues
```

| Keyword | Scope    | Reassignable | Notes                        |
| ------- | -------- | ------------ | ---------------------------- |
| `let`   | Block    | Yes          | Preferred for mutable values |
| `const` | Block    | No           | Preferred for constants      |
| `var`   | Function | Yes          | Avoid — hoisting causes bugs |

### Primitive Data Types

```js
"Hello"; // String
42; // Number
true / false; // Boolean
null; // Intentional empty value
undefined; // Absence of a meaningful value
Symbol(); // Unique identifier
42n; // BigInt
```

### Object Types

```js
// Plain Object
const student = { name: "Ravi", age: 10 };

// Array
const fruits = ["apple", "banana", "mango"];

// Function (first-class object)
const greet = function () {
  console.log("Hello");
};
```

### Operators

```js
// Arithmetic
+  -  *  /  %  **   ++  --

// Assignment
=   +=   -=   *=   /=

// Comparison (always prefer === and !== for strict type equality)
===  !==   ==   !=   >   <   >=   <=

// Logical
&&   ||   !

// String concatenation
"Hello" + " " + "World"   // "Hello World"

// Special operators
typeof "hello"            // "string"
null ?? "default"         // "default"  (nullish coalescing)
obj?.property             // undefined if obj is null/undefined (optional chaining)
condition ? "yes" : "no"  // ternary
```

### Truthy and Falsy Values

```js
// Falsy (evaluate to false in conditions)
(false, 0, -0, 0n, "", null, undefined, NaN);

// Truthy (everything else, including)
(true, 42, -3.14, "Hello", "0", [], {}, function () {});
```

### Conditionals

```js
let age = 20;
if (age > 18) {
  console.log("Adult");
} else {
  console.log("Child");
}

// else if chain
let marks = 65;
if (marks < 40) {
  console.log("Fail");
} else if (marks < 50) {
  console.log("D");
} else if (marks < 60) {
  console.log("C");
} else if (marks < 70) {
  console.log("B");
} else {
  console.log("A");
}
```

### Loops

```js
// for loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// for...of (recommended for iterating arrays)
const fruits = ["apple", "banana", "mango"];
for (const fruit of fruits) {
  console.log(fruit);
}

// forEach (array method with callback)
fruits.forEach((fruit) => console.log(fruit));
```

### Functions

```js
// 1. Function Declaration (hoisted — can be called before definition)
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // "Hello, Alice!"

// 2. Function Expression (not hoisted)
const add = function (a, b) {
  return a + b;
};
console.log(add(5, 3)); // 8

// 3. Arrow Function (modern, concise)
const multiply = (x, y) => {
  return x * y;
};

// Shorthand: omit `return` and `{}` for single-expression bodies
const square = (n) => n * n;
console.log(square(4)); // 16
```

### Arrays

```js
const numbers = [1, 2, 3, 4, 5];

// Core array methods (all return a new array or value; original is unchanged)
numbers.map((n) => n * 2); // [2, 4, 6, 8, 10] — transform each item
numbers.filter((n) => n % 2 === 0); // [2, 4]            — keep matching items
numbers.reduce((sum, n) => sum + n, 0); // 15               — accumulate to single value
numbers.find((n) => n > 3); // 4                 — first matching item
numbers.findIndex((n) => n > 3); // 3                 — index of first match
numbers.includes(3); // true              — check membership
numbers.some((n) => n > 4); // true              — at least one matches
numbers.every((n) => n > 0); // true              — all match

// Mutating methods
numbers.push(6); // add to end
numbers.pop(); // remove from end
numbers.unshift(0); // add to start
numbers.shift(); // remove from start
numbers.splice(1, 2); // remove 2 items starting at index 1
```

### Objects

```js
const student = {
  name: "Ravi",
  grade: 10,
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};

// Access
console.log(student.name); // dot notation
console.log(student["grade"]); // bracket notation (useful for dynamic keys)

// Destructuring
const { name, grade } = student;

// Spread
const updated = { ...student, grade: 11 };
```

---

## 11. DOM Manipulation

The **Document Object Model (DOM)** is a tree representation of the HTML page in memory. JavaScript reads and modifies this tree; the browser instantly re-renders when changes are made — this is how web pages become interactive.

### Selecting Elements

```js
// By ID (returns a single element)
document.getElementById("main-title");

// By CSS selector (returns the first match)
document.querySelector(".card");
document.querySelector("#submit-btn");
document.querySelector('input[type="email"]');

// By CSS selector (returns a NodeList of all matches)
document.querySelectorAll("button");
document.querySelectorAll(".card");
```

### Modifying Elements

```js
const title = document.querySelector("#main-title");

// Change text content (safe for plain text — no HTML injection risk)
title.textContent = "Hello, World!";

// Change HTML content (use carefully — can open XSS vulnerabilities)
title.innerHTML = "<strong>Hello</strong>";

// Inline styles
title.style.color = "blue";
title.style.fontSize = "24px";

// CSS classes (preferred over inline styles)
title.classList.add("highlight");
title.classList.remove("hidden");
title.classList.toggle("active");
title.classList.contains("active"); // true/false

// Attributes
title.setAttribute("aria-label", "Page title");
title.getAttribute("id");
title.removeAttribute("disabled");
```

### Creating and Inserting Elements

```js
// Create a new element
const card = document.createElement("div");
card.classList.add("card");
card.textContent = "New card";

// Insert into the DOM
document.body.appendChild(card); // add as last child of body
document.querySelector(".list").prepend(card); // add as first child
card.insertAdjacentHTML("afterend", "<p>After card</p>");

// Remove an element
card.remove();
```

### Event Listeners

```js
const btn = document.querySelector("#submit-btn");

// Add a listener
btn.addEventListener("click", (event) => {
  alert("Button was clicked!");
});

// Prevent default browser behaviour (e.g. form submission)
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  // handle form data manually
});

// Remove a listener (must pass same function reference)
function handleClick() {
  console.log("clicked");
}
btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick);
```

### Common Events

| Event                    | Trigger                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| `click`                  | Mouse click or Enter on focused element                              |
| `submit`                 | Form submission                                                      |
| `input`                  | Value change in an input field                                       |
| `change`                 | Input value committed (on blur for text, immediately for checkboxes) |
| `keydown` / `keyup`      | Keyboard key pressed / released                                      |
| `mouseover` / `mouseout` | Mouse enters / leaves an element                                     |
| `focus` / `blur`         | Element gains / loses focus                                          |
| `DOMContentLoaded`       | HTML fully parsed (before images/styles load)                        |
| `load`                   | Page fully loaded including all resources                            |

---

## 12. Further Reading

- [W3Schools HTML Reference](https://www.w3schools.com/html/default.asp)
- [W3Schools CSS Reference](https://www.w3schools.com/css/default.asp)
- [W3Schools JavaScript Reference](https://www.w3schools.com/js/default.asp)
- [MDN Web Docs — HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs — CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
