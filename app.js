const app = require('express')();
const fs = require('fs');
const cors = require('cors');
const admin = require('firebase-admin');
const PORT = process.env.PORT || 3000;

const serviceAccount = require('./jarparur-firebase-adminsdk-wvrbl-3851eef79d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

supportedUrls = JSON.parse(fs.readFileSync(`api.json`))['urls']

app.use(cors({
    origin: ['*']
}));

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

app.get("/api/:topic/:secondTopic/:subTopic", (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync(`api/${req.params['topic']}/${req.params['secondTopic']}/${req.params['subTopic']}.json`));
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(data, null, 4));
    } catch (error) {
        res.send(`A URL inserida (${req.path}) não existe. URLs disponíveis:  ${supportedUrls.join(', ')}`)
    }
})

app.get("/api/game/:gameID/users/:userID", (req, res) => {
    error = {
        'message': 'Jogo não encontrado. Tente buscar pela ID dos jogos disponíveis em /api/game'
    }

    gameHasNoUsers = {
        'message': 'Este jogo não possui um banco de dados contendo informações dos jogadores.'
    }

    userNotFound = {
        'message': 'Usuário não encontrado na base de dados.'
    }

    if(req.params['gameID'] == "jarparur-bot"){
        db.collection('players').doc(req.params['userID']).get().then((userSnapshot) => {
            userData = userSnapshot.data()

            if(userData != undefined){
                res.header("Content-Type",'application/json');
                res.send(JSON.stringify(userData, null, 4));
            } else{
                res.header("Content-Type",'application/json');
                res.send(userNotFound)
            }
        });
    } else if(req.params['gameID'] == "jarparur-cli"){
        res.header("Content-Type",'application/json');
        res.send(gameHasNoUsers)
    }else{
        res.header("Content-Type",'application/json');
        res.send(error)
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando no port ${PORT}`)
});