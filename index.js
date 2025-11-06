const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/bookings', (req,res) => {
    // res.send("Server up and running");
    const bookings = [
        {
            id:1,
            customer: "Rahul",
            service: "Logistics",
            date: "2025-11-08",
            amount: 1500
        },
        {
            id:2,
            customer: "Sneha",
            service: "Transport",
            date: "2025-11-09",
            amount: 2000
        }
    ];
    res.json(bookings);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
