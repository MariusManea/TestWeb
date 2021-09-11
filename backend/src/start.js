const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const createError = require('http-errors');
const ServerError = require('./WebApp/Models/ServerError.js');

const app = express();
const routes = require('./WebApp/Controllers');
const cors = require('cors');

app.use(cors());
app.use(helmet());
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.use(express.json());
app.use('/api', routes);
app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        let status = 500;
        let message = 'Something Bad Happened';
        if (err instanceof ServerError) {
            message = err.Message;
            status = err.StatusCode;
        }
        return next(createError(status, message));
    }
});

const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});
