import http from "http";
import fs from "fs";

const PORT = 3000;
const FILE = "students.json";

// Create students.json if it doesn't exist
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
}

// HTML Form
const formHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Student Record System</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 40px;
        }

        .container {
            width: 500px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px gray;
        }

        h1 {
            text-align: center;
        }

        label {
            display: block;
            margin-top: 15px;
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            box-sizing: border-box;
        }

        button {
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            background-color: green;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: darkgreen;
        }

        .link {
            text-align: center;
            margin-top: 20px;
        }

        a {
            color: blue;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>Student Record System</h1>

    <form method="POST" action="/add-student">

        <label>Student Name</label>
        <input type="text" name="name" required>

        <label>Roll Number</label>
        <input type="text" name="roll" required>

        <label>Course</label>
        <input type="text" name="course" required>

        <label>Email</label>
        <input type="email" name="email" required>

        <button type="submit">
            Add Student
        </button>

    </form>

    <div class="link">
        <a href="/students">View All Students</a>
    </div>

</div>

</body>
</html>
`;

// Create HTTP server
const server = http.createServer((req, res) => {

    // Home page
    if (req.method === "GET" && req.url === "/") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(formHTML);
    }

    // Add student
    else if (req.method === "POST" && req.url === "/add-student") {

        let body = "";

        // Receive data
        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        // When complete data is received
        req.on("end", () => {

            const data = new URLSearchParams(body);

            const student = {
                name: data.get("name"),
                roll: data.get("roll"),
                course: data.get("course"),
                email: data.get("email")
            };

            // Read existing students
            fs.readFile(FILE, "utf8", (err, fileData) => {

                let students = [];

                if (!err && fileData) {
                    students = JSON.parse(fileData);
                }

                // Add new student
                students.push(student);

                // Save data
                fs.writeFile(
                    FILE,
                    JSON.stringify(students, null, 2),
                    (err) => {

                        if (err) {
                            res.writeHead(500, {
                                "Content-Type": "text/plain"
                            });

                            res.end("Error saving student record.");
                            return;
                        }

                        // Redirect to students page
                        res.writeHead(302, {
                            "Location": "/students"
                        });

                        res.end();
                    }
                );
            });
        });
    }

    // Display students
    else if (req.method === "GET" && req.url === "/students") {

        fs.readFile(FILE, "utf8", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error reading student records.");
                return;
            }

            const students = JSON.parse(data);

            let html = `
            <!DOCTYPE html>
            <html>

            <head>
                <title>Student Records</title>

                <style>
                    body {
                        font-family: Arial;
                        padding: 30px;
                        background: #f2f2f2;
                    }

                    .container {
                        width: 900px;
                        margin: auto;
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                    }

                    h1 {
                        text-align: center;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }

                    th, td {
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: center;
                    }

                    th {
                        background: #333;
                        color: white;
                    }

                    a {
                        display: inline-block;
                        margin-top: 20px;
                    }
                </style>

            </head>

            <body>

            <div class="container">

            <h1>Student Records</h1>

            <table>

                <tr>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Course</th>
                    <th>Email</th>
                </tr>
            `;

            students.forEach((student) => {

                html += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.roll}</td>
                    <td>${student.course}</td>
                    <td>${student.email}</td>
                </tr>
                `;
            });

            html += `
            </table>

            <a href="/">
                Add Another Student
            </a>

            </div>

            </body>
            </html>
            `;

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(html);
        });
    }

    // 404 route
    else {

        res.writeHead(404, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>404 - Page Not Found</h1>
            <a href="/">Go Home</a>
        `);
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});