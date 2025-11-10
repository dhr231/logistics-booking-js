const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { body, validationResult } = require('express-validator');
bookings = [];
app.post('/bookings',
    [body('id').exists().withMessage('id is required'),
     body('customer').isString().withMessage('customer must be a string').notEmpty().withMessage('customer cannot be empty'),
     body('service').isString().withMessage('service must be a string').notEmpty().withMessage('service cannot be empty'),
     body('date').isISO8601().withMessage('date must be in yyyy-mm-dd format'),
     body('mode').isIn(['By Road', 'By Air', 'PTL', 'FTL']).withMessage('mode must be one of By Road, By Air, PTL, FTL'),
     body('amount').isNumeric().withMessage('amount must be a number')
    ],
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, customer, service, date, mode, amount } = req.body;

    const newBooking = { id, customer, service, date, mode, amount: Number(amount) };
    bookings.push(newBooking);
    return res.status(201).json(newBooking);
})

app.get('/bookings', (req, res) => {
    res.json(bookings);
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
