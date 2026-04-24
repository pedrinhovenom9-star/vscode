const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let produtos = [];
let id = 1;

app.get('/ping', (req, res) => res.json({ ok: true }));

// CREATE
app.post('/produtos', (req, res) => {
  const novo = { id: id++, ...req.body };
  produtos.push(novo);
  res.json(novo);
});

// READ
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// UPDATE
app.put('/produtos/:id', (req, res) => {
  const index = produtos.findIndex(p => p.id == req.params.id);
  produtos[index] = { ...produtos[index], ...req.body };
  res.json(produtos[index]);
});

// DELETE
app.delete('/produtos/:id', (req, res) => {
  produtos = produtos.filter(p => p.id != req.params.id);
  res.json({ ok: true });
});

app.listen(3001, () => console.log('🔥 Backend rodando SEM banco'));