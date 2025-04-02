import React, { useEffect } from 'react';

const DateTimeNow = ({dateTime, setDateTime}) => {

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <h1>ZADANIE 5 SKLEP</h1>
            <p>{dateTime.toLocaleString()}</p>
        </div>
    );
};

export default DateTimeNow;