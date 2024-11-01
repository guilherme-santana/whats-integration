const express = require('express');
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

    if (data && data.entry) {
        data.entry.forEach(entry => {
            const changes = entry.changes;
            changes.forEach(change => {
                const message = change.value.messages && change.value.messages[0];
                if (message) {
                    console.log("Mensagem recebida:", message);
                    // Aqui você pode processar e encaminhar a mensagem para outro serviço
                }
            });
        });
    }

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Webhook escutando na porta 3000');
});
