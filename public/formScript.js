document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#bookingForm');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const lrNo = document.querySelector('#lrNo').value.trim();
        const date = document.querySelector('#date').value;
        const from = document.querySelector('#from').value.trim();
        const to = document.querySelector('#to').value.trim();
        const consignor = document.querySelector('#consignor').value.trim();
        const mode = document.querySelector('#mode').value;
        const chargedWeight = parseFloat(document.querySelector('#chargedWeight').value);
        const ratePerKg = parseFloat(document.querySelector('#ratePerKg').value);
        const collection = parseFloat(document.querySelector('#collection').value);
        const delivery = parseFloat(document.querySelector('#delivery').value);

        // basic validations
        if (!lrNo) { alert('LR No required'); return; }
        if (mode !== 'By Air') { alert('Only By Air mode allowed for now'); return; }
        if (isNaN(chargedWeight) || chargedWeight <= 0) { alert('Invalid Charged Weight'); return; }
        if (isNaN(ratePerKg) || ratePerKg <= 0) { alert('Invalid Rate/kg'); return; }

        const payload = { lrNo, date, from, to, consignor, mode, chargedWeight, ratePerKg, collection, delivery };

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            if (res.ok) {
                alert('Total Booking: ' + result.totalBooking);
            } else {
                alert('Error: ' + result.error);
            }
        } catch (err) {
            console.error(err);
            alert('Network error');
        }
    });
});