import mongoose from 'mongoose';

const URI = process.env.DB_URI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected');
})
