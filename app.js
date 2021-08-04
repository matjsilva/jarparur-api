const app = require('express')();
const PORT = process.env.PORT || 3000;

supportedLanguages = ['pt-BR']
apiAllUrls = ['/api', '/api/classes', '/api/races', '/api/regions', '/api/empires', '/api/religions', '/api/spells']
supportedUrls = ['/api']

apiData = {
    'name': 'Jarparur API',
    'version': '1.0.0',
    'author': 'matjs',
    'languages': supportedLanguages,
    'urls': supportedUrls
}

app.get("", (req, res) => {
    res.send("JARPARUR API\nby matjs");
});


app.get("/api", (req, res) => {
    res.send(apiData);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando no port ${PORT}`)
});