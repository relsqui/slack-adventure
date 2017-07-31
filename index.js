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
    build_response(ctx, players_by_id[ctx.request.body.user_id]);
});

router.post('/button', async (ctx) => {
    var payload = JSON.parse(ctx.request.body.payload);
    if (payload.token != secrets.VER_TOKEN) {
        ctx.response.status = 403;
        return;
    }
    ctx.response.status = 200;

    var player = player_by_id(payload.user.id);
    player.loc = payload.actions[0].name;
    build_response(ctx, player);
});

function build_response(ctx, player) {
    ctx.response.body = {};
    ctx.response.body.attachments = [map.build_attachment_for(player)]
}

function player_by_id(id) {
    if (!(id in players)) {
        players[id] = {
            'loc': 'center'
        }
    }
    return players[id];
}

app.use(router.routes());
app.listen(8080);
