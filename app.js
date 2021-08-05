const app = require('express')();
const fs = require('fs');
const PORT = process.env.PORT || 3000;

supportedUrls = JSON.parse(fs.readFileSync(`api.json`))['urls']

app.get("", (req, res) => {
    apiHome = `JARPARUR API | by matjs | URLs = ${supportedUrls.join(', ')}`
    res.send(apiHome);
});

app.get("/api", (req, res) => {
    let data = JSON.parse(fs.readFileSync('api.json'));
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data, null, 4));
});

app.get("/api/:topic/", (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync(`api/${req.params['topic']}.json`))
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(data, null, 4));
    } catch (error) {
        res.send(`A URL inserida (${req.path}) não existe. URLs disponíveis:  ${supportedUrls.join(', ')}`)
    }
});

app.get("/api/:topic/:subTopic/", (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync(`api/${req.params['topic']}/${req.params['subTopic']}.json`))
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(data, null, 4));
    } catch (error) {
        res.send(`A URL inserida (${req.path}) não existe. URLs disponíveis:  ${supportedUrls.join(', ')}`)
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando no port ${PORT}`)
});