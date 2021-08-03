const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const mongoUri = 'mongodb+srv://express:qXdwArbKA1KwrarS@cluster0.teztf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(express.json({ extended: true }));

app.use('/api/board', require('./routes/board.routes'));

async function start() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.log(`ERROR ${error}`);
    process.exit(1);
  }
}

start();
