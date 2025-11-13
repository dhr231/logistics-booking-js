// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// route: POST /api/bookings
app.post('/api/bookings', (req, res) => {
    const {
        LRNo,
        date,
        from,
        to,
        consignor,
        mode,
        chargedWeight,
        ratePerKg,
        collection,
        delivery
    } = req.body;

    // validation basic
    if (mode !== 'By Air') {
        return res.status(400).json({ error: 'Mode must be By Air for now' });
    }
    if (typeof chargedWeight !== 'number' || chargedWeight <= 0 ||
        typeof ratePerKg !== 'number' || ratePerKg <= 0 ||
        typeof collection !== 'number' || typeof delivery !== 'number') {
        return res.status(400).json({ error: 'Invalid numeric values' });
    }

    // calculation
    const totalBooking = (chargedWeight * ratePerKg) + collection + delivery + 100;

    // response
    return res.status(201).json({
        success: true,
        totalBooking,
        data: req.body
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
