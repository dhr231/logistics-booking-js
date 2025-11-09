const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


bookings = [];
app.post('/bookings', (req, res) => {
    const { id, customer, service, date, mode, amount } = req.body;
    if (!id || !customer || !service || !date || !mode || !amount) {
        return res.status(400).json({ error: "All fields are required." });
    }
    const newBooking = { id, customer, service, date, mode, amount };
    bookings.push(newBooking);
    return res.status(201).json(newBooking);
})

app.get('/bookings', (req, res) => {
    res.json(bookings);
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
