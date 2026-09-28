import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = 3000;

// --------------------------------------------------
// __dirname setup for ES Module
// --------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path of requests.json
const filePath = path.join(__dirname, "requests.json");

// --------------------------------------------------
// Middleware
// --------------------------------------------------

// JSON data receive karne ke liye
app.use(express.json());

// public folder ke frontend files serve karne ke liye
app.use(express.static(path.join(__dirname, "public")));

// --------------------------------------------------
// Helper Function: Read requests
// --------------------------------------------------

function readRequests() {
    try {
        const data = fs.readFileSync(filePath, "utf-8");

        if (!data.trim()) {
            return [];
        }

        return JSON.parse(data);

    } catch (error) {

        console.log("Error reading requests.json:", error);

        return [];
    }
}

// --------------------------------------------------
// Helper Function: Write requests
// --------------------------------------------------

function writeRequests(requests) {

    fs.writeFileSync(
        filePath,
        JSON.stringify(requests, null, 2)
    );
}

// ==================================================
// GET /api/requests
// Get all requests
// ==================================================

app.get("/api/requests", (req, res) => {

    const requests = readRequests();

    res.json(requests);
});

// ==================================================
// GET /api/requests/:id
// Get one request
// ==================================================

app.get("/api/requests/:id", (req, res) => {

    const requests = readRequests();

    const id = Number(req.params.id);

    const request = requests.find(
        item => item.id === id
    );

    if (!request) {

        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.json(request);
});

// ==================================================
// POST /api/requests
// Create new request
// ==================================================

app.post("/api/requests", (req, res) => {

    const requests = readRequests();

    const {
        studentName,
        email,
        category,
        description,
        priority
    } = req.body;

    // Validation

    if (
        !studentName ||
        !email ||
        !category ||
        !description ||
        !priority
    ) {

        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Create ID

    let newId = 1;

    if (requests.length > 0) {

        newId =
            Math.max(
                ...requests.map(item => item.id)
            ) + 1;
    }

    // New request object

    const newRequest = {

        id: newId,

        studentName: studentName,

        email: email,

        category: category,

        description: description,

        priority: priority,

        status: "Pending",

        createdAt: new Date().toISOString()
    };

    // Add request

    requests.push(newRequest);

    // Save to JSON file

    writeRequests(requests);

    res.status(201).json({

        message: "Request submitted successfully",

        request: newRequest
    });
});

// ==================================================
// PUT /api/requests/:id
// Update request
// ==================================================

app.put("/api/requests/:id", (req, res) => {

    const requests = readRequests();

    const id = Number(req.params.id);

    const index = requests.findIndex(
        item => item.id === id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Request not found"
        });
    }

    const {
        studentName,
        email,
        category,
        description,
        priority
    } = req.body;

    // Validation

    if (
        !studentName ||
        !email ||
        !category ||
        !description ||
        !priority
    ) {

        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Update request

    requests[index].studentName = studentName;

    requests[index].email = email;

    requests[index].category = category;

    requests[index].description = description;

    requests[index].priority = priority;

    // Save changes

    writeRequests(requests);

    res.json({

        message: "Request updated successfully",

        request: requests[index]
    });
});

// ==================================================
// DELETE /api/requests/:id
// Delete request
// ==================================================

app.delete("/api/requests/:id", (req, res) => {

    const requests = readRequests();

    const id = Number(req.params.id);

    const index = requests.findIndex(
        item => item.id === id
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Request not found"
        });
    }

    // Delete request

    const deletedRequest =
        requests.splice(index, 1)[0];

    // Save updated array

    writeRequests(requests);

    res.json({

        message: "Request deleted successfully",

        request: deletedRequest
    });
});

// ==================================================
// Start Server
// ==================================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});