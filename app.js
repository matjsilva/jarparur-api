const app = require('express')();
const PORT = process.env.PORT || 3000;

supportedLanguages = ['pt-BR']
apiAllUrls = [
    '/api', 
    '/api/classes', 
    '/api/races', 
    '/api/dimensions', 
    '/api/worlds',
    '/api/regions',
    '/api/empires',
    '/api/factions',
    '/api/heroes',
    '/api/relics', 
    '/api/religions', 
    '/api/spells']
supportedUrls = ['/api']

// /api
apiData = {
    'name': 'Jarparur API',
    'version': '1.0.0',
    'author': 'matjs',
    'languages': supportedLanguages,
    'urls': supportedUrls
}

// /api/classes
apiClassesData = {
    'all': ['warrior', 'bjoreten', 'barbarian', 'ranger', 'mage', 'paladin', 'cleric', 'monk', 'bard', 'witch', 'assassin']
}

app.get("", (req, res) => {
    res.send("JARPARUR API\nby matjs");
});

// Visão Geral da API
app.get("/api", (req, res) => {
    res.send(apiData);
});

// Classes
app.get("/api/classes", (req, res) => {
    res.send(apiClassesData);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando no port ${PORT}`)
});