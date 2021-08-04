const app = require('express')();
const PORT = process.env.PORT || 3000;

app.get("", (req, res) => {
    res.send("EAIKkKkKkK");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando no port ${PORT}`)
});