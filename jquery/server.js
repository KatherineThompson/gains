'use strict';

const koa = require('koa'),
    koaStatic = require('koa-static'),
    chalk = require('chalk'),
    app = koa();

app.use(function*(next) {
    if(this.path.startsWith('/ajax-debug')) {
        console.log(`Serving debugging request to ${chalk.cyan(this.path)}`);
        this.body = {
            headers: this.headers,
            path: this.path,
            querystring: this.querystring,
            method: this.method,
            body: this.request.body
        };
        return;
    }

    yield next;
});
app.use(koaStatic(__dirname));

app.listen(8080, () => console.log(`Server open: ${chalk.green('127.0.0.1:8080')}`));