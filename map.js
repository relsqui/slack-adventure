export var locations = {
    "center": {
        "name": "A Good Starting Place",
        "desc": "At least, one hopes it is, because this is all there is.",
        "exits": {
            "North": "forest",
            "East": "beach",
            "Down": "hole"
        }
    },

    "forest": {
        "name": "The Forest",
        "desc": "It\"s cool, shady, and green.",
        "exits": {
            "South": "center"
        }
    },

    "beach": {
        "name": "On a Beach",
        "desc": "It\"s very warm here and the sand crunches pleasantly underfoot.",
        "exits": {
            "West": "center"
        }
    },

    "hole": {
        "name": "In a Hole",
        "desc": "It\"s pretty unpleasant down here. Luckily, there\"s a ladder.",
        "exits": {
            "Up": "center"
        }
    }
}

var template = {

    "id": {
        "name": "Name",
        "desc": "A long description with sentences.",
        "exits": {
            "Label": "destination-id"
        }
    }

}
