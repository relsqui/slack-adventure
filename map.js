export function describe(loc_id) {
    var loc = locations[loc_id];
    var attachment = {
        'title': loc.name,
        'text': loc.desc,
        'callback_id': 'button_press',
        'actions': []
    }
    for (var exit_label in loc.exits) {
        attachment.actions.push({
            'type': 'button',
            'name': loc.exits[exit_label],
            'text': exit_label,
        });
    }
    return attachment;
}

var locations = {
    'center': {
        'name': 'A Good Starting Place',
        'desc': 'At least, one hopes it is, because this is all there is.',
        'exits': {
            'North': 'forest',
            'East': 'beach',
            'Down': 'hole'
        }
    },

    'forest': {
        'name': 'The Forest',
        'desc': 'It\'s cool, shady, and green. There\'s a cave to the east.',
        'exits': {
            'South': 'center',
            'East': 'cave'
        }
    },

    'cave': {
        'name': 'A Cave',
        'desc': 'It\'s dark. If you believed in old wives\'s tales you might be concerned about being eaten by a grue. But the grues all went extinct a century ago ... didn\'t they?',
        'exits': {
            'West': 'forest'
        }
    },

    'beach': {
        'name': 'On a Beach',
        'desc': 'It\'s very warm here and the sand crunches pleasantly underfoot.',
        'exits': {
            'West': 'center'
        }
    },

    'hole': {
        'name': 'In a Hole',
        'desc': 'It\'s pretty unpleasant down here. Luckily, there\'s a ladder.',
        'exits': {
            'Up': 'center'
        }
    }
}

var template = {

    'id': {
        'name': 'Name',
        'desc': 'A long description with sentences.',
        'exits': {
            'Label': 'destination-id'
        }
    }

}
