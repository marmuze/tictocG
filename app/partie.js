var mongoose = require('mongoose')

// Define collection and schema for partiejoue Item
var partieJoue = new mongoose.Schema({
        nbcoup: {
            type: Number
        },
        draw: {
            type: Boolean
        },
        win:{
            type:String
        }
    },
    {
        collection: 'partiejoue'
    })

module.exports = mongoose.model('partiejoue', partieJoue);
