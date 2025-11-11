const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');


const bookings = [];
// validation chain
const bookingValidation = [
    body('LR').exists().withMessage('LR No. is required'),
    body('customer').isString().withMessage('customer must be a string').notEmpty().withMessage('customer cannot be empty'),
    body('service').isString().withMessage('service must be a string').notEmpty().withMessage('service cannot be empty'),
    body('date').isISO8601().withMessage('date must be in yyyy-mm-dd format'),
    body('mode').isIn(['By Road', 'By Air', 'PTL', 'FTL']).withMessage('mode must be one of By Road, By Air, PTL, FTL'),
    body('amount').isNumeric().withMessage('amount must be a number'),
];

router.post('/bookings', bookingValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, customer, service, date, mode, amount } = req.body;
    const booking = { id, customer, service, date, mode, amount };
    bookings.push(booking);
    // your logic to store booking (in memory for now or array)
    // bookings.push({ id, customer, service, date, mode, amount });
    return res.status(201).json({ message: 'Booking created', booking });
});

router.get('/bookings', (req, res) => {
    return res.json({ bookings });
});

module.exports = router;