const app = require('express')();
const PORT = process.env.PORT || 3000;

jarparur = {
    'name': 'jarparur'
}

app.get("", (req, res) => {
    res.send("EAIKkKkKkK");
});


app.get("/api", (req, res) => {
    res.send(jarparur);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando no port ${PORT}`)
});