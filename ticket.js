// ticket.js
const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    eventid: {
        type: Number,
        required: true,
    },
    userid: {
        type: String,
    }
});


const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
