# MERN E-commerce App

This is a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides the following features:

- User Registration: Users can create accounts and securely store their information.
- User Login: Registered users can log into their accounts and access personalized features.
- Forgot Password: Users can reset their password if they have forgotten it.
- View Product Catalog: Users can browse through a wide range of available products with details such as descriptions, prices, and images.
- Add Products to Cart: Users can add desired products to a virtual shopping cart for later review.
- Checkout: The application guides users through a series of steps to complete their purchase.
- Enter Shipping Information: Users enter their name, address, and contact details for accurate delivery.
- Enter Payment Details: Users provide secure payment information, such as credit card details.
- Place Order: Users initiate the order processing flow, including verification, payment processing, and order confirmation.
- View Order History: Users can track their purchases and review past orders.
- Product Ratings: Users can rate products based on their purchase experience.
- Product Likes: Users can like products and filter to view only their liked items.
- Discount Points: Users earn points on purchases and can redeem them for discounts on desired products.
- Admin Portal: Admin users can add, delete, update, and manage products displayed to users.
- Product Review: Users can leave reviews for their purchased products, and the average review is calculated and shown in the UI based on all user reviews.


## Folder Structure

### Frontend:

This project uses `React version 18`
The folder structure for the frontend of the application is as follows:

```
├── public
└── src
  ├── assets
  └── components
    ├── Navbar
    └── layout
      ├── Admin
      ├── Auth
      └── User
    └── views
      ├── cart
      ├── checkout
      ├── payment
      └── shop
  ├── contexts
  └── routes
```

- `public`: Contains the public assets and index.html file for the React app.
- `src`: Contains the source code for the frontend.
  - `assets`: Holds static assets such as images, stylesheets, or fonts.
  - `components`: Contains reusable React components used throughout the application.
    - `Navbar`: Navigation component for the application.
    - `layout`: Layout components for different user roles (Admin, Auth, User).
    - `views`: Individual views or pages of the application (cart, checkout, payment, shop).
  - `contexts`: Contexts for state management or global data sharing.
  - `routes`: Handles routing and navigation within the application.

### Backend:

```
├── backend
    ├── config
    ├── controllers
    ├── data
    ├── models
    ├── middleware
    ├── routes
    ├── utils
    └── app.js
```

## Flow

- Starts with `Shop.jsx` at `/` it has all the `Products.jsx` (which has add to cart button)
- Then is the cart view: Shows `/cart` page which renders the `Cart.jsx`
- On clicking the Checkout button is the checkout view. It has `Checkout.jsx` rendered on `/checkout` as address form
- On clicking checkout button it goes to Payment view at `/checkout/payment`. `Payment.jsx` has the card form and mock payment at payment.jsx itself on successful payment there is a POST request for orders linked to the Make Payment button.

## Technologies Used

- MongoDB: Database for storing product information, user data, and order details.
- Express.js: Backend framework for handling API routes and business logic.
- React.js: Frontend library for building user interfaces and components.
- Node.js: Runtime environment for running JavaScript on the server.
- Other libraries and packages as required.

## Local Development Setup Guide:
This section is not applicable if you are taking the assessment on the online HackerRank IDE. Follow these steps only if you need to set up this project for local development on your system.
### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js (version 18 or higher)
- MongoDB Compass

### env variables

- MONGODB_URI = mongodb://localhost:27017/Ecommerce
- TOKEN_KEY =
- REACT_APP_API

### Getting Started

1. `nvm use 18.13.0`
2. Install dependencies: `npm install`
3. Create a .env file in the project root directory:

```Open the .env file and add the following environment variable:
MONGODB_URI=mongodb://localhost:27017/e-commerce-app
```

The `MONGODB_URI` specifies the connection string for the MongoDB server.

3. Start the frontend and backend development server: `npm start`

