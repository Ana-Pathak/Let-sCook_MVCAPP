const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionsSchema = new Schema({
    Topic: {type: String, required: [true, 'topic is required']},
    author: {type: Schema.Types.ObjectId, ref:'User'},
    Name: {type: String, required: [true, 'name is required']},
    Details: {type: String, required: [true, 'details is required'],
                minlength: [10, 'the content should have atleast 10 characters']},
    Date: {type: String, required: [true, 'date is required']},
    Start: {type: String, required: [true, 'start time is required']},
    End: {type: String, required: [true, 'end time is required']},
    Location: {type: String, required: [true, 'location is required']},
    Host: {type: String, required: [true, 'host is required']},
});

module.exports = mongoose.model('connection', connectionsSchema);

