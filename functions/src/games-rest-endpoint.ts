import * as express from 'express';

const app = express();

// View a contact
app.get('/:gameId', (req, res) => {
  res.status(200).send('got it ' +  req.params.gameId);
})
// View all contacts
app.get('', (req, res) => {
  res.status(200).send('There u goes')
})
// Add new contact
app.post('', (req, res) => {
  res.send('Create a new game');
})
// Update new contact
app.patch('/:gameId', (req, res) => {
  res.send('Update a new game' + req.params.gameId);
})
// Update new contact
app.put('/:productId', (req, res) => {
  res.send('Update a new game' + req.params.gameId);
})
// Delete a contact
app.delete('/:gameId', (req, res) => {
  res.send('Document deleted');
})

export = app;
