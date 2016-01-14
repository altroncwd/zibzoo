const koa = require('koa');
const static = require('koa-static');

const app = koa();

app.use(static(`${__dirname}/../app/`));

app.listen(3000);
