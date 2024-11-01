const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = '67252624097c6';

app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Verifica o token
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

app.post('/webhook', (req, res) => {
    const data = req.body;

    if (data) {
        if(enviarDados()){
            res.sendStatus(200);
        }else{
            res.sendStatus(500);
        }
    }
});

app.listen(3000, () => {
    console.log('Webhook escutando na porta 3000');
});

async function enviarDados() {
    try {
        const response = await axios.post('https://discord.com/api/webhooks/1252338890749247589/zn5_n1TV_xPlrY69SM_gFseW0kNQFFt1G3kebDkpA48954XfVxxo4zgi2NKYlQWjM1iD', {
            content: 'Dados enviados'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Resposta do serviço:", response.data);
        return true
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
        return false;
    }
}