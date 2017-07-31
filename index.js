import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import * as secrets from './secrets';
import * as map from './map';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

var players = {};

router.post('/', async (ctx) => {
    if (ctx.request.body.token != secrets.VER_TOKEN) {
        ctx.response.status = 403;
        return;
    }
    ctx.response.status = 200;

    var id = ctx.request.body.user_id;
    if (!(id in players)) {
        players[id] = {
            'loc': 'center',
        }
    }
    build_response(ctx, players[id]);
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
    //
    // By the time they get here they should definitely exist.
    var player = players[payload.user.id];
    player.loc = payload.actions[0].name;
    build_response(ctx, player);
});

function build_response(ctx, player) {
    ctx.response.body = {};
    ctx.response.body.attachments = [map.build_attachment_for(player)]
}

app.use(router.routes());
app.listen(8080);
