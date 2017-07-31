export function build_attachment(loc) {
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

export function build_attachment_for(player) {
    return build_attachment(locations[player.loc]);
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
        'desc': 'It\'s cool, shady, and green.',
        'exits': {
            'South': 'center'
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
