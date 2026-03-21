# Inventory Management System

A full-stack web application for managing product inventory with a Spring Boot REST API backend and React frontend.

## Features

- ✅ Add new products with name, quantity, and price
- ✅ View all products in a sortable table
- ✅ Edit existing products
- ✅ Delete products with confirmation
- ✅ Low stock warnings (quantity < 5)
- ✅ MySQL database persistence
- ✅ RESTful API with CORS support
- ✅ Responsive UI with real-time updates

## Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.4
- **Language**: Java 17
- **Build Tool**: Maven
- **ORM**: Hibernate/JPA
- **Database**: MySQL 8.0
- **Server Port**: 8080

### Frontend
- **Framework**: React 19.2.4
- **HTTP Client**: Axios
- **Build Tool**: React Scripts 5.0.1
- **Server Port**: 3000

## Project Structure

```
inventorymanagement/
├── backend/               # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/demo/
│   │   │   │   ├── DemoApplication.java
│   │   │   │   ├── config/
│   │   │   │   ├── controller/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   └── services/
│   │   │   └── resources/application.properties
│   │   └── test/
│   └── pom.xml
├── frontend/              # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.js
│   │   │   ├── ProductList.js
│   │   │   └── ProductEdit.js
│   │   ├── services/
│   │   │   └── ProductServices.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── database/             # Database scripts (if any)
```

## Prerequisites

- Java 17 or higher
- Node.js 16+ and npm
- MySQL 8.0
- Maven

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/inventory-management.git
cd inventory-management
```

### 2. Setup Backend
```bash
cd backend
mvn clean install
```

### 3. Setup MySQL Database
```sql
CREATE DATABASE IF NOT EXISTS inventory_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Configure Database Connection
Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/inventory_db
spring.datasource.username=root
spring.datasource.password=your_password
```

### 5. Setup Frontend
```bash
cd ../frontend
npm install
```

## Running the Application

### Start Backend
```bash
cd backend
java -jar target/demo-0.0.1-SNAPSHOT.jar
# or
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

### Start Frontend (in a new terminal)
```bash
cd frontend
npm start
```
Frontend runs on: `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |
| GET | `/` | API documentation |

## Usage

1. Open `http://localhost:3000` in your browser
2. Fill in the product form (Name, Quantity, Price)
3. Click "Add Product"
4. View products in the table below
5. Click "Edit" to modify a product
6. Click "Delete" to remove a product
7. Products with quantity < 5 are highlighted as "Low Stock"

## Database Schema

### Product Table
```sql
CREATE TABLE product (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DOUBLE NOT NULL
);
```

## Viewing Data in MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server (localhost:3306)
3. In the left panel, find and expand `inventory_db`
4. View the `product` table to see all inventory items

## Error Handling

- Input validation on both frontend and backend
- User-friendly error messages
- Console logging for debugging
- HTTP error handling with appropriate status codes

## Future Enhancements

- User authentication and authorization
- Product categories and filtering
- Advanced search functionality
- Bulk import/export features
- Stock movement history
- Email alerts for low stock
- Mobile app version

## License

MIT License

## Contact

For questions or support, please open an issue on GitHub.
