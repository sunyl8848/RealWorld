const express = require('express');
const morgan = require('morgan');
const errorHandle = require('./middleware/error-handle');
const rootRouter = require('./router');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));


app.use('/api', rootRouter);

// Can`t find router error.
app.use((req, res, next)=>{
    res.status(401).end();
})

// Error handle.
app.use(errorHandle());

app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
})
