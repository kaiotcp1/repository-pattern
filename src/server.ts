require('dotenv').config()

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });

const app = require('./app');
//dotenv.config({ path: './env' });
console.log('NODE_ENV:', process.env.NODE_ENV);


const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(process.env.NODE_ENV);
});



process.on('unhandledRejection', err => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err);
    server.close(() => {
        process.exit(1);
    });
});
