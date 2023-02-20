const express = require('express');
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');
const partnerRouter = require('./routes/partnerRouter');
const promotionRouter = require('./routes/promotionRouter');

const hostname = 'localhost';
const port = 3000;

// express() returns an express server application
const app = express();
// run the middleware using the morgan function, configured to use the dev configuration
app.use(morgan('dev'));
app.use(express.json());

app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

// express.static is built-in middleware
// __dirname is a special variable in node, refers to the absolute path of the absolute directory for whichever file you're in
app.use(express.static(__dirname + '/public'));

// app.use takes a callback function, referred to as a MIDDLEWARE function in express
// this middleware function has access to three parameters:
//  req (the request object), res (the response object), and next (a function; not used here)
app.use((req, res) => {
    // console.log(req.headers); // handled by morgan now
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // defaults to this if the client tries to navigate to a broken or non-existent link
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// this will create an instance of the server class, and start listening to it
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});