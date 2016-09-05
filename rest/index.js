const koa = require('koa'),
    koaBunyan = require('koa-bunyan'),
    koaStatic = require('koa-static'),
    koaBodyparser = require('koa-bodyparser'),
    bunyan = require('bunyan'),
    path = require('path'),
    bunyanFormat = require('bunyan-format'),
    formatOut = bunyanFormat({outputMode: 'short'}),
    _ = require('lodash'),

    app = koa(),
    logger = bunyan.createLogger({name: 'rest-backend', stream: formatOut});

app.use(koaBunyan(logger));
app.use(koaStatic(path.join(__dirname, 'static')));

const items = [
    {name: 'Item 1', createdAt: new Date() - 500000, id: 0},
    {name: 'Item 2', createdAt: new Date(), id: 1}
];

app.use(koaBodyparser());

app.use(function*(next) {
    if (this.path === '/api/items' && this.method === 'GET') {
        this.body = items;
        return yield next;
    }

    if (this.path === '/api/item' && this.method === 'POST') {
        const newItem = {
            name: this.request.body.name,
            createdAt: new Date(),
            
            // Can anyone spot the problem with this approach? :)
            id: _.maxBy(items, 'id').id + 1 
        };
        items.push(newItem);
        this.body = newItem;
        return yield next;
    }

    if (this.path === '/api/item' && this.method === 'DELETE') {
        this.body = _.remove(items, {id: this.request.body.id});
        return yield next;
    }

    if (this.path === '/api/item' && this.method === 'PUT') {
        const itemToEdit = _.find(items, {id: this.request.body.id});
        itemToEdit.name = this.request.body.name;
        this.body = itemToEdit;
        return yield next;
    }
});

const port = 3000;
app.listen(port, () => {
    logger.info({port}, 'Server listening');
});


