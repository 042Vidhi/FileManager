import { useEffect, useState } from 'react';

const useDateFormat = (date) => {
    const [format, setFormat] = useState('');

    useEffect(() => {
        const formatDate = () => {
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const formattedDate = new Date(date).toLocaleDateString('en-US', options);
            setFormat(formattedDate);
        };

        formatDate();
    }, [date]);

    return format;
};

export default useDateFormat;
