const express = require('express');
const mongoose = require('mongoose');
const Ticket = require('./ticket.js');
const Attendee = require('./attendee.js');

const db = "mongodb+srv://abdelrahim:********@cluster0.9vqtp10.mongodb.net/yourdatabase?retryWrites=true&w=majority";

const connect = async () => {
    try {
        await mongoose.connect(db);
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

connect().then(() => {
    const app = express();
    app.use(express.json());

    app.get('/home', (req, res) => {
        res.status(200).json({ message: 'Welcome to our home page' });
    });



    app.get('/attendees', async (req, res) => {
        try {
            const events = await Attendee.find();
            res.status(200).json({ events });
        } catch (error) {
            console.error('Error fetching attendees:', error);
            res.status(500).json({ message: error.message });
        }
    });



app.get('/attendees/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const event = await Attendee.findONE({email});
        console.log('event = ', event);

        if (!event) {
            res.status(404).json({ message: 'no attendee found with this id' })
        }
        else res.status(200).json(event);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get('/tickets', async (req, res) => {
    try {
        const events = await Ticket.find();
        res.status(200).json({ events });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: error.message });
    }
});



app.patch('/tickets/:id/:name/:age/:email', async (req, res) => {
    try {
        const { id, name, age, email } = req.params;
        let attendee = await Attendee.findOne({ email });

        if (!attendee) {
            attendee = new Attendee({ name, age, email });
            await attendee.save();
        }

        const ticket = await Ticket.findOne({ eventid: id, userid: null });

        if (!ticket) {
            return res.status(404).json({ message: 'No available ticket for the specified event' });
        }

        ticket.userid = email;
        await ticket.save();

        res.status(200).json({ message: 'Ticket booked successfully', attendee, ticket });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});





app.delete('/attendees/:email', async (req, res) => {
    try {
        const {email} = req.params;
        const deleted = await Attendee.findOneAndDelete(email);
        if (deleted) {
            res.status(200).json({ message: 'Deleted Successfully' });
        } else {
            res.status(404).json({ message: 'no attendee found with this id' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


const PORT = 7777;

app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});

});
