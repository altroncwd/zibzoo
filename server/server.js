const koa = require('koa');
const static = require('koa-static');
const port = process.env.PORT || 3000;

const app = koa();

app.use(static(`${__dirname}/../app/`));

app.listen(port);
