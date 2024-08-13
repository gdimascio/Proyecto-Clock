
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.get ("/login", (req, res) => {
    res.send("ATA")
})

app.listen(PORT, () => {
    console.log("Server listening on http://localhost:" + PORT);
})