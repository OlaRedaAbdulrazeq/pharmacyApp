# 🏥 PharmacyApp

A web-based pharmacy and health store management system built with **AngularJS**, offering a multi-category product storefront for customers and a dedicated admin panel for managing products, inventory, and orders.

## Project Overview

PharmacyApp is a single-page application (SPA) that simulates an online pharmacy and health store platform. It sells products across **multiple categories** (e.g. medicines, vitamins, skincare, medical devices, and more) — not limited to medicines alone. It is divided into two separate AngularJS applications:

- **Customer App** (`app.js` / `index.html`) — allows users to browse products by category, manage a shopping cart, and place orders.
- **Admin Panel** (`adminApp.js` / `adminPanel.html`) — allows administrators to perform CRUD operations on products across all categories, manage inventory, and review orders.

---

## Tech Stack

| Technology | Role |
|---|---|
| **AngularJS** | Frontend MVC framework |
| **Bootstrap 5.3** | Responsive UI components and grid layout |
| **Chart.js** | Data visualization (category popularity charts) |
| **HTML5** | Templating and structure |
| **CSS3** | Custom styling on top of Bootstrap |
| **JavaScript (ES5)** | Application logic |
| **imgBB API** | Image hosting for medicine photos |

---

## Architecture

PharmacyApp follows the **MVC (Model-View-Controller)** pattern as prescribed by AngularJS:

```
┌────────────────────────────────────────────┐
│                  Browser                   │
│                                            │
│   index.html / adminPanel.html  (Entry)    │
│          │                  │              │
│     app.js              adminApp.js        │
│   (Customer SPA)        (Admin SPA)        │
│          │                  │              │
│   ┌──────┴───────┐   ┌──────┴───────┐     │
│   │  Controllers  │   │  Controllers  │     │
│   │  Services     │   │  Services     │     │
│   │  Directives   │   │  Directives   │     │
│   │  Views        │   │  Views        │     │
│   └──────────────┘   └──────────────┘     │
└────────────────────────────────────────────┘
```

Both apps share the same folder structure but operate independently with their own module definitions, routing, and controllers.

---

## Project Structure

```
pharmacyApp/
│
├── index.html              # Customer-facing app entry point
├── adminPanel.html         # Admin panel entry point
│
├── app.js                  # Customer AngularJS module & route config
├── adminApp.js             # Admin AngularJS module & route config
│
├── controllers/            # AngularJS controllers
│  
├── services/               # AngularJS services (data, business logic)
│
├── directives/             # Custom AngularJS directives
│
├── views/                  # HTML partial templates
│
├── js/                     # Third-party or utility JavaScript files
│
├── assets/                 # Static assets (images, icons, etc.)
│
└── .vscode/                # Editor configuration
```

---

## Features

### Customer App

- **Browse Products by Category** — Explore products across multiple categories such as medicines, vitamins, skincare, medical devices, and more.
- **Search & Filter** — Find products quickly using search or category filters.
- **Shopping Cart** — Add items to a cart, update quantities, and remove items.
- **Order Placement** — Review cart contents and place an order.
- **Responsive UI** — Clean, user-friendly interface built with Bootstrap 5.3 for a smooth shopping experience.

### Admin Panel

- **Product Management (CRUD)** — Create, read, update, and delete product records across all categories, including image upload via imgBB.
- **Category Management** — Organize products under different categories (medicines, vitamins, skincare, etc.).
- **Inventory Control** — Monitor stock levels and update quantities per product.
- **Order Management** — View and verify customer orders.
- **Admin Dashboard** — Overview of key metrics and quick actions.
- **Most Purchased Categories Chart** — A Chart.js chart on the dashboard visualizing which product categories are ordered most frequently, giving admins a quick sales insight at a glance.

---

## Setup & Installation

### Prerequisites

Make sure you have the following installed:

- A modern web browser (Chrome, Firefox, Edge)
- A local web server (see options below)
- [Node.js](https://nodejs.org/) *(optional, for using `http-server`)*
- [Git](https://git-scm.com/)

> **Bootstrap 5.3** and **Chart.js** are loaded via CDN — no separate installation needed.

### 1. Clone the Repository

```bash
git clone https://github.com/OlaRedaAbdulrazeq/pharmacyApp.git
cd pharmacyApp
```

### 2. Install a Local Server *(recommended)*

Because AngularJS loads HTML partials via HTTP requests, you need to serve the app through a local server rather than opening files directly in the browser.

**Option A — Using `http-server` (Node.js):**

```bash
npm install -g http-server
```

**Option B — Using Python's built-in server:**

```bash
# Python 3
python -m http.server 8080
```

**Option C — Using VS Code Live Server extension:**

Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and click **"Go Live"** from the bottom status bar.

---

## Running the App

### Customer App

Start your local server from the project root and navigate to:

```
http://localhost:8080/index.html
```

### Admin Panel

In the same server session, navigate to:

```
http://localhost:8080/adminPanel.html
```

> **Note:** Both apps run from the same server instance — no separate setup is needed.

---

## Code Structure & Components

### Entry Points

| File | Description |
|---|---|
| `index.html` | Bootstraps the customer AngularJS app. Loads all scripts and defines the root `ng-app` directive. |
| `adminPanel.html` | Bootstraps the admin AngularJS app. Loads admin-specific scripts and defines the admin `ng-app` directive. |
| `app.js` | Defines the customer-facing AngularJS module, injects dependencies, and configures the `$routeProvider` for client-side routing. |
| `adminApp.js` | Defines the admin AngularJS module and configures admin-specific routes. |

### Controllers

Located in the `controllers/` directory. Controllers act as the glue between services (data/logic) and views (templates). Each controller is responsible for a specific section of the UI.

**Typical customer controllers include:**

| Controller | Responsibility |
|---|---|
| `homeController` | Displays the product catalogue and category listing on the home page |
| `cartController` | Manages cart state — add, remove, update items |
| `productController` | Shows individual product detail views |
| `orderController` | Handles order submission logic |

**Typical admin controllers include:**

| Controller | Responsibility |
|---|---|
| `adminProductController` | CRUD operations on product records across all categories |
| `adminCategoryController` | Manages product categories |
| `adminOrderController` | Lists and manages customer orders |
| `adminDashboardController` | Aggregates statistics for the dashboard view |

### Services

Located in the `services/` directory. Services in AngularJS are singletons that handle data access and shared business logic. They are injected into controllers via dependency injection.

**Typical services include:**

| Service | Responsibility |
|---|---|
| `productService` | Fetches, creates, updates, and deletes product data across categories |
| `categoryService` | Manages product category data |
| `cartService` | Manages the shopping cart state across views |
| `orderService` | Processes and stores order information |

### Directives

Located in the `directives/` directory. Custom AngularJS directives extend HTML with reusable UI components and behaviors.

**Examples of what directives may encapsulate:**

- Product card components rendered across multiple category views
- Custom input validation behavior
- Reusable UI widgets (e.g., quantity selectors, category badges)

### Views

Located in the `views/` directory. These are HTML partial templates loaded dynamically by the AngularJS router (`$routeProvider`). Each view corresponds to a route and is paired with a controller.

**Typical views include:**

| View | Description |
|---|---|
| `home.html` | Product catalogue with category browsing |
| `cart.html` | Shopping cart summary |
| `product.html` | Individual product detail page |
| `adminDashboard.html` | Admin overview page with charts |
| `adminProducts.html` | Product management table (CRUD) |
| `adminCategories.html` | Category management |
| `adminOrders.html` | Order review and management |

### imgBB Image Upload

When adding a new product, the admin can upload a product image directly from the form. The image is hosted externally on **[imgBB](https://imgbb.com/)** — no local file storage is needed.

**How it works:**

1. The admin selects an image file from the "Add Product" form.
2. The file is converted to **Base64** in the browser.
3. A `POST` request is sent to the imgBB API with the Base64-encoded image and the admin's API key.
4. imgBB responds with a hosted image URL, which is then saved alongside the product record.

**Example API call pattern:**

```javascript
var formData = new FormData();
formData.append('image', base64ImageData);

$http.post('https://api.imgbb.com/1/upload?key=YOUR_API_KEY', formData, {
  headers: { 'Content-Type': undefined }
}).then(function(response) {
  var imageUrl = response.data.data.url;
  // save imageUrl with the product record
});
```

---

### Chart.js Integration

The admin dashboard uses **Chart.js** to render a **"Most Purchased Categories"** chart. This gives admins a visual breakdown of which product categories generate the most orders across the entire store.

**How it works:**

1. The admin dashboard controller collects order data from the order service and aggregates totals by product category.
2. The aggregated data is passed to a Chart.js instance, configured on a `<canvas>` element inside the dashboard view.
3. The chart updates reactively when new order data is available.

**Example setup pattern:**

```javascript
var ctx = document.getElementById('categoryChart').getContext('2d');
new Chart(ctx, {
  type: 'bar', // or 'pie' / 'doughnut'
  data: {
    labels: ['Medicines', 'Vitamins', 'Skincare', 'Medical Devices', 'Personal Care'],
    datasets: [{
      label: 'Units Ordered',
      data: [200, 120, 85, 60, 95],
      backgroundColor: ['#0d6efd', '#198754', '#dc3545', '#ffc107', '#6f42c1']
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  }
});
```

---

## Routing

Both apps use AngularJS's `ngRoute` module for client-side routing.

**Customer App routes (defined in `app.js`):**

```javascript
$routeProvider
  .when('/', { templateUrl: 'views/home.html', controller: 'homeController' })
  .when('/cart', { templateUrl: 'views/cart.html', controller: 'cartController' })
  .when('/product/:id', { templateUrl: 'views/product.html', controller: 'productController' })
  .otherwise({ redirectTo: '/' });
```

**Admin App routes (defined in `adminApp.js`):**

```javascript
$routeProvider
  .when('/dashboard', { templateUrl: 'views/adminDashboard.html', controller: 'adminDashboardController' })
  .when('/medicines', { templateUrl: 'views/adminMedicines.html', controller: 'adminMedicineController' })
  .when('/orders', { templateUrl: 'views/adminOrders.html', controller: 'adminOrderController' })
  .otherwise({ redirectTo: '/dashboard' });
```

> **Note:** The exact route paths may vary. Refer to `app.js` and `adminApp.js` for the definitive route definitions.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---
