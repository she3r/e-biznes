import React, {useState} from 'react';

const Payments = ({ totalPrice,dateTime }) => {
    const [notification, setNotification] = useState('');
    const controller = new AbortController();
    const timeoutMilliseconds = 3000;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMilliseconds);

    const handlePayment = () => {
        fetch('http://localhost:8080/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Value: totalPrice, Datetime: dateTime.toLocaleString(), ClientID:1 }),
            signal: controller.signal,
        })
            .then(response => {
                clearTimeout(timeoutId);
                return response.json();
            })
            .then(data => {
                console.log('Payment successful:', data);
            })
            .then(data => {
                setNotification('Payment successful!');
                console.log('Payment successful:', data);
                setTimeout(() => setNotification(''), 5000);
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    setNotification(`Request timed out after ${timeoutMilliseconds} ms. Please try again later or contact administrator`);
                } else {
                    setNotification('Error processing payment.');
                }
                console.error('Error processing payment:', error);
                setTimeout(() => setNotification(''), 5000);
            });
    };

    return (
        <div>
            <button onClick={handlePayment}>Send pay request</button>
            {notification && <p>{notification}</p>}
        </div>
    );
};

export default Payments;
