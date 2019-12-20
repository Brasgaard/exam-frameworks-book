const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

/**** Configuration ****/
const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/qa-site';

app.use(express.static(path.resolve('..', 'client', 'build')));
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console

// Open paths that does not need login. Any route not included here is protected!
let openPaths = [
    /^(?!\/api).*/gim, // Open everything that doesn't begin with '/api'
    { url: '/api/books/', methods: ['GET']  }  // Open GET questions, but not POST.
];

// Validate the user using authentication. checkJwt checks for auth token.
const secret = process.env.SECRET || "the cake is a lie";
if (!process.env.SECRET) console.error("Warning: SECRET is undefined.");


/**** Database access layers *****/
const BookDAL = require('./dal/book_dal')(mongoose);
const userDAL = require('./dal/user_dal')(mongoose);
const categoryDAL = require('./dal/category_dal')(mongoose);

// HAD  TO ADD MONGO_URL HERE ELSE DATABASE DIDNT WORK PROPERLY. BUT I DID USE HEROKU TO HIDE IT  IN THE START VIA SETTINGS AND INPUT VALUES

/**** Start ****/
mongoose.connect('mongodb+srv://alex:hejmeddig@cluster0-zo6r1.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        console.log("Database connected");
        await BookDAL.bootstrap();
        await userDAL.bootstrapTestusers();
        await categoryDAL.bootstrap();

        /**** Routes ****/
        const usersRouter = require('./routers/user_router')(userDAL, secret);
        app.use('/api/users', usersRouter);

        const bookRouter = require('./routers/book_router')(BookDAL);
        app.use('/api/books', bookRouter);


        const categoryRouter = require('./routers/category_router')(categoryDAL);
        app.use('/api/categories', categoryRouter);

        // "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html)
        // It's important to specify this route as the very last one to prevent overriding all of the other routes
        app.get('*', (req, res) =>
            res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
        );

        // When DB connection is ready, let's open the API
        await app.listen(PORT);
        console.log(`QA API running on port ${PORT}!`)
    })
    .catch(error => { console.error(error) });
