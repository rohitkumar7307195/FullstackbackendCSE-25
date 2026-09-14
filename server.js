
import express from "express";

const app = express();

const PORT = 3000;

// public folder ko serve karega
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});