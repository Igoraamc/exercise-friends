const express = require('express');
const { v4:uuid } = require('uuid');
const app = express();
const teams = [];

app.use(express.json());

app.post('/teams', (req, res) => {
  const { name, country,league } = req.body;
  const team = {
    id: uuid(),
    name: name,
    country: country,
    league: league
  };
  teams.push(team);

  return res.status(201).json();
});

app.get('/teams', (req , res) => {
  return res.json(teams);
});



app.listen(3000, () => {
  console.log('server started');
});