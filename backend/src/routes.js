const express = require('express');

const routes = express.Router();
const users = [
    {
        id: 1,
        name: 'Jc',
        email:'jc@dev.com',
        password: '12345'
    }
]

routes.post('/login', (req,res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
       return res.status(200).json(user);
    }
    return res.status(401).json({message: 'Email ou senha invalido(a), tente novamente.'});
});

module.exports = routes;
