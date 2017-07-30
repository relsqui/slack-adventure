import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import * as secrets from './secrets';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.post('/', async (ctx) => {
    if (ctx.request.body.token != secrets.VER_TOKEN) {
        ctx.response.status = 403;
        return;
    }
    ctx.response.status = 200;
    ctx.response.body =  {
        "attachments": [{
            "text": "Here are some buttons.",
            "callback_id": "button_press",
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

router.post('/button', async (ctx) => {
    // Bodyparse doesn't parse this for us because it's a text field inside
    // the JSON response object, it just happens to contain more JSON.
    var payload = JSON.parse(ctx.request.body.payload);
    if (payload.token != secrets.VER_TOKEN) {
        ctx.response.status = 403;
        return;
    }
    ctx.response.status = 200;
    switch(payload.actions[0].name) {
        case "one":
            ctx.response.body = ":one:";
            break;
        case "two":
            ctx.response.body = ":two:";
            break;
    }
});

app.use(router.routes());
app.listen(8080);
