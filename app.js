const app = require('express')();
const PORT = process.env.PORT || 3000;

// data
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
supportedUrls = ['/api', '/api/classes']

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

// utils
urlToDict = {
    '/api/classes': apiClassesData,
    '/api/classes/': apiClassesData,
}

app.get("", (req, res) => {
    apiHome = `JARPARUR API | by matjs | URLs = ${supportedUrls.join(', ')}`

    res.send(apiHome);
});

app.get("/api", (req, res) => {
    res.send(apiData)
});

app.get("/api/:topic/", (req, res) => {
    if(urlToDict[[req.path]] != undefined){
        res.send(urlToDict[[req.path]]);   
    } else{
        res.send(`A URL inserida (${req.path}) não foi encontrado. URLs disponíveis:  ${supportedUrls.join(', ')}`)
    }
});

app.get("/api/:topic/:subTopic/", (req, res) => {
    if(urlToDict[[req.path]] != undefined){
        res.send(urlToDict[[req.path]]);
    } else{
        res.send(`A URL inserida (${req.path}) não foi encontrado. URLs disponíveis: ${supportedUrls.join(', ')}`)
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando no port ${PORT}`)
});