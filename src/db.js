const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbUrl = `mongodb+srv://adimuhamadfirmansyah:${process.env.MONGOATLAS_PASSWORD}@cluster0.s6ps41r.mongodb.net/cobaOauth`;
const connect = async () => {
  mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', () => {
    console.log('could not connect');
  });
  db.once('open', () => {
    console.log('> Successfully connected to database');
  });
};
module.exports = { connect };
