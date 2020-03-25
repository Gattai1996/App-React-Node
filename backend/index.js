const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        mensagem: 'Hello, World!',
        programador: 'Bruno Gattai'
    });
});

app.listen(3333);
