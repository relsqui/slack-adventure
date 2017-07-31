import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

import * as secrets from "./secrets";
import {locations} from "./map";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

var players = {};

router.post("/", async (ctx) => {
    if (ctx.request.body.token != secrets.VER_TOKEN) {
        ctx.response.status = 403;
        return;
    }
    ctx.response.status = 200;
    var id = ctx.request.body.user_id;
    if (!(id in players)) {
        players[id] = {
            "loc": "center",
        }
    }

    var user = players[id];
    var loc = locations[user.loc];
    ctx.response.body =  {
        "attachments": [{
            "title": loc.name,
            "text": loc.desc,
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

router.post("/button", async (ctx) => {
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
