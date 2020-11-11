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

app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { name, country, league } = req.body; 
  const teamIndex = teams.findIndex(team => team.id == id); 
  
  if (teamIndex < 0){
    return res.status(400).json({ message: 'the ID cannot be found'}); 
  }

  teams[teamIndex] = {
    id: id, 
    name: name, 
    country: country, 
    league: league
  }; 
  
  return res.status(200).json(teams[teamIndex]); 
}); 

app.delete('/teams/:id', (req, res) => {
  const {id} = req.params;

  const teamIndex = teams.findIndex(team => team.id == id);

  if (teamIndex < 0) {
    return res.status(400).json({ message: 'the id cannot be found'})
  }

  teams.splice(teamIndex, 1);
  return res.status(200).json();
});


app.listen(3000, () => {
  console.log('server started');
});