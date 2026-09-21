async function readFile() {
    try {
        const data = await fs.readFile(fileName, "utf8");

        console.log("\nFile Content:");
        console.log(data);
    } catch (error) {
        console.log("Error:", error.message);
    }
}
