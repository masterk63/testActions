const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://ingeit:soporteit@cluster0-skp4t.mongodb.net/afiliaciones?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    );
  } catch (error) {
    console.error(`Mongoose default connection error: ${error}`);
  }
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

connect();
