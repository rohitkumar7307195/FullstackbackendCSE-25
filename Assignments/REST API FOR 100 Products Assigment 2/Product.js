
import express from "express";

const app = express();

app.use(express.json());

// ========================================
// 100 PRODUCTS


let products = [
    { id: 1, name: "Laptop", price: 55000, category: "Electronics" },
    { id: 2, name: "Mobile Phone", price: 25000, category: "Electronics" },
    { id: 3, name: "Keyboard", price: 1500, category: "Electronics" },
    { id: 4, name: "Mouse", price: 800, category: "Electronics" },
    { id: 5, name: "Monitor", price: 12000, category: "Electronics" },
    { id: 6, name: "Headphones", price: 2000, category: "Electronics" },
    { id: 7, name: "Smart Watch", price: 5000, category: "Electronics" },
    { id: 8, name: "Tablet", price: 18000, category: "Electronics" },
    { id: 9, name: "Power Bank", price: 1200, category: "Electronics" },
    { id: 10, name: "USB Cable", price: 400, category: "Electronics" },

    { id: 11, name: "T-Shirt", price: 700, category: "Clothing" },
    { id: 12, name: "Jeans", price: 1500, category: "Clothing" },
    { id: 13, name: "Shirt", price: 1200, category: "Clothing" },
    { id: 14, name: "Jacket", price: 2500, category: "Clothing" },
    { id: 15, name: "Hoodie", price: 1800, category: "Clothing" },
    { id: 16, name: "Shorts", price: 800, category: "Clothing" },
    { id: 17, name: "Track Pants", price: 1000, category: "Clothing" },
    { id: 18, name: "Sweater", price: 1600, category: "Clothing" },
    { id: 19, name: "Cap", price: 500, category: "Clothing" },
    { id: 20, name: "Socks", price: 300, category: "Clothing" },

    { id: 21, name: "Running Shoes", price: 3000, category: "Footwear" },
    { id: 22, name: "Sports Shoes", price: 3500, category: "Footwear" },
    { id: 23, name: "Formal Shoes", price: 2500, category: "Footwear" },
    { id: 24, name: "Sneakers", price: 2800, category: "Footwear" },
    { id: 25, name: "Slippers", price: 500, category: "Footwear" },
    { id: 26, name: "Sandals", price: 900, category: "Footwear" },
    { id: 27, name: "Boots", price: 4000, category: "Footwear" },
    { id: 28, name: "Flip Flops", price: 400, category: "Footwear" },
    { id: 29, name: "Loafers", price: 2200, category: "Footwear" },
    { id: 30, name: "Walking Shoes", price: 1800, category: "Footwear" },

    { id: 31, name: "Backpack", price: 1200, category: "Bags" },
    { id: 32, name: "School Bag", price: 900, category: "Bags" },
    { id: 33, name: "Laptop Bag", price: 1800, category: "Bags" },
    { id: 34, name: "Travel Bag", price: 2500, category: "Bags" },
    { id: 35, name: "Hand Bag", price: 1500, category: "Bags" },
    { id: 36, name: "Sling Bag", price: 1000, category: "Bags" },
    { id: 37, name: "College Bag", price: 1300, category: "Bags" },
    { id: 38, name: "Gym Bag", price: 1100, category: "Bags" },
    { id: 39, name: "Office Bag", price: 2000, category: "Bags" },
    { id: 40, name: "Camera Bag", price: 2200, category: "Bags" },

    { id: 41, name: "Notebook", price: 100, category: "Stationery" },
    { id: 42, name: "Pen", price: 20, category: "Stationery" },
    { id: 43, name: "Pencil", price: 10, category: "Stationery" },
    { id: 44, name: "Eraser", price: 5, category: "Stationery" },
    { id: 45, name: "Sharpener", price: 10, category: "Stationery" },
    { id: 46, name: "Marker", price: 30, category: "Stationery" },
    { id: 47, name: "Highlighter", price: 40, category: "Stationery" },
    { id: 48, name: "Calculator", price: 500, category: "Stationery" },
    { id: 49, name: "File Folder", price: 50, category: "Stationery" },
    { id: 50, name: "Stapler", price: 80, category: "Stationery" },

    { id: 51, name: "Water Bottle", price: 500, category: "Home" },
    { id: 52, name: "Coffee Mug", price: 250, category: "Home" },
    { id: 53, name: "Dinner Plate", price: 150, category: "Home" },
    { id: 54, name: "Spoon Set", price: 300, category: "Home" },
    { id: 55, name: "Cooking Pan", price: 1200, category: "Home" },
    { id: 56, name: "Pressure Cooker", price: 2500, category: "Home" },
    { id: 57, name: "Frying Pan", price: 1000, category: "Home" },
    { id: 58, name: "Knife Set", price: 800, category: "Home" },
    { id: 59, name: "Lunch Box", price: 400, category: "Home" },
    { id: 60, name: "Storage Box", price: 600, category: "Home" },

    { id: 61, name: "Football", price: 800, category: "Sports" },
    { id: 62, name: "Cricket Bat", price: 2500, category: "Sports" },
    { id: 63, name: "Cricket Ball", price: 300, category: "Sports" },
    { id: 64, name: "Tennis Racket", price: 1800, category: "Sports" },
    { id: 65, name: "Badminton Racket", price: 1200, category: "Sports" },
    { id: 66, name: "Basketball", price: 900, category: "Sports" },
    { id: 67, name: "Yoga Mat", price: 700, category: "Sports" },
    { id: 68, name: "Skipping Rope", price: 250, category: "Sports" },
    { id: 69, name: "Gym Gloves", price: 500, category: "Sports" },
    { id: 70, name: "Dumbbells", price: 1500, category: "Sports" },

    { id: 71, name: "Face Wash", price: 300, category: "Beauty" },
    { id: 72, name: "Shampoo", price: 400, category: "Beauty" },
    { id: 73, name: "Conditioner", price: 450, category: "Beauty" },
    { id: 74, name: "Body Lotion", price: 350, category: "Beauty" },
    { id: 75, name: "Face Cream", price: 500, category: "Beauty" },
    { id: 76, name: "Perfume", price: 1200, category: "Beauty" },
    { id: 77, name: "Hair Oil", price: 250, category: "Beauty" },
    { id: 78, name: "Lip Balm", price: 150, category: "Beauty" },
    { id: 79, name: "Comb", price: 100, category: "Beauty" },
    { id: 80, name: "Hair Dryer", price: 1800, category: "Beauty" },

    { id: 81, name: "Novel", price: 400, category: "Books" },
    { id: 82, name: "Programming Book", price: 900, category: "Books" },
    { id: 83, name: "Python Book", price: 700, category: "Books" },
    { id: 84, name: "C++ Book", price: 800, category: "Books" },
    { id: 85, name: "JavaScript Book", price: 850, category: "Books" },
    { id: 86, name: "React Book", price: 950, category: "Books" },
    { id: 87, name: "DSA Book", price: 1000, category: "Books" },
    { id: 88, name: "Database Book", price: 750, category: "Books" },
    { id: 89, name: "Networking Book", price: 850, category: "Books" },
    { id: 90, name: "Operating System Book", price: 900, category: "Books" },

    { id: 91, name: "Table Lamp", price: 700, category: "Furniture" },
    { id: 92, name: "Study Chair", price: 3500, category: "Furniture" },
    { id: 93, name: "Study Table", price: 5000, category: "Furniture" },
    { id: 94, name: "Bookshelf", price: 4500, category: "Furniture" },
    { id: 95, name: "Office Chair", price: 6000, category: "Furniture" },
    { id: 96, name: "Bedside Table", price: 2500, category: "Furniture" },
    { id: 97, name: "Sofa", price: 15000, category: "Furniture" },
    { id: 98, name: "Dining Table", price: 12000, category: "Furniture" },
    { id: 99, name: "Wardrobe", price: 10000, category: "Furniture" },
    { id: 100, name: "Computer Table", price: 4500, category: "Furniture" }
];

// ========================================
// GET - ALL PRODUCTS
// ========================================

app.get("/products", (req, res) => {
    res.json(products);
});

// ========================================
// GET - PRODUCT BY ID
// ========================================

app.get("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// ========================================
// POST - ADD PRODUCT
// ========================================

app.post("/products", (req, res) => {

    const product = req.body;

    products.push(product);

    res.json(product);
});

// ========================================
// PUT - UPDATE PRODUCT
// ========================================

app.put("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex !== -1) {

        products[productIndex] = {
            id: id,
            ...req.body
        };

        res.json(products[productIndex]);

    } else {

        res.status(404).json({
            message: "Product not found"
        });
    }
});

// ========================================
// DELETE - DELETE PRODUCT
// ========================================

app.delete("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex !== -1) {

        const deletedProduct = products.splice(productIndex, 1);

        res.json(deletedProduct[0]);

    } else {

        res.status(404).json({
            message: "Product not found"
        });
    }
});

// ========================================
// START SERVER
// ========================================

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
