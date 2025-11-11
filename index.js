const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bookingsRouter = require('./routes/bookings');
app.use('/', bookingsRouter);  // or app.use('/api', bookingsRouter) as you prefer

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));