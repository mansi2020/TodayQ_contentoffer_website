
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

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or feedback, please contact [your-email@example.com].
