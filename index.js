import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import request from 'request-promise-native';

import * as secrets from './secrets';

const koa = new Koa();
const app = new Router();

app.use(bodyParser());

app.post('/', async (ctx) => {
    if (ctx.request.body.token != secrets.VER_TOKEN) {
        ctx.response.status = 403;
        return;
    }
    ctx.response.status = 200;
    ctx.response.body =  {
        "text": "The top part.",
        "attachments": [{
            "text": "The bottom part.",
            "actions": [
                {
                    "name": "one",
                    "type": "button",
                    "text": "one"
                },
                {
                    "name": "two",
                    "type": "button",
                    "text": "two"
                }
            ]
        }]
    };
});

koa.use(app.routes());
koa.listen(8080);
