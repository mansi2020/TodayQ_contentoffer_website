# Publisher Portal for Content Offerings

## hosted Link : https://today-q-contentoffer-frontend.vercel.app/

## Project Description
This project is a publisher portal that allows publishers to upload their content offerings. It includes a home screen listing these offerings and a checkout feature where users can add offerings to a cart and complete transactions. All data created or modified is saved to a database.

## Features

### Publisher Content Management

#### Content Offering Submission
- Form for publishers to add new content offerings with metadata like title, description, price, etc.
- Ability to save each offering to the database.

#### Home Screen/Listings Page
- Display all content offerings on the home screen with necessary details.

### Checkout Feature

#### Cart and Checkout
- Users can add content offerings to a cart.
- Checkout page summarizes items in the cart, shows the total price, and saves the transaction to the database upon completion.
- Users can upload a document with a specific offering.

## Installation and Setup

### Prerequisites
- Node.js
- npm or yarn
- MongoDB or any other database of your choice

### Steps

1. **Clone the repository**
    ```sh
    git clone https://github.com/yourusername/publisher-portal.git
    cd publisher-portal
    ```

2. **Install dependencies**
    ```sh
    npm install
    # or
    yarn install
    ```

3. **Set up the database**
    - Ensure MongoDB is installed and running.
    - Create a database named `publisherPortal`.
    - Update the MongoDB URI in `server/config/db.js` with your connection string.

4. **Start the server**
    ```sh
    npm run server
    ```

5. **Start the client**
    ```sh
    npm start
    # or
    yarn start
    ```

## Project Structure

## API Endpoints

### Content Offerings
- **GET /api/content**
  - Fetch all content offerings.

- **POST /api/content**
  - Add a new content offering.

### Orders
- **POST /api/order/add**
  - Add a new order.

## Components

### Publisher Content Management

#### ContentForm
- A form where publishers can add new content offerings.

### Home Screen/Listings Page

#### Home
- Displays all content offerings.

### Checkout Feature

#### Cart
- Manages the user's cart and displays cart items.

#### Checkout
- Summarizes items in the cart and handles the transaction.

## Context
- `useContentContext`: Provides content and cart management functionality.

## Styling
- CSS files are located in `client/src/styles` and component-specific styles are within each component's folder.

## How to Contribute

1. **Fork the repository**
2. **Create a new branch**
    ```sh
    git checkout -b feature-branch
    ```
3. **Make your changes**
4. **Commit your changes**
    ```sh
    git commit -m "Add new feature"
    ```
5. **Push to your branch**
    ```sh
    git push origin feature-branch
    ```
6. **Create a pull request**

