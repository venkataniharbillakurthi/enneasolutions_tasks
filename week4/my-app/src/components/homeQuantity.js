import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomeQuantity = () => {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const carts = useSelector(store => store.cart.items);

    useEffect(() => {
        let total = 0;
        carts.forEach(item => (total += item.quantity));
        setTotalQuantity(total);
    }, [carts]);

    return (
        <div>
            <p>{totalQuantity}</p>
        </div>
    );
};

export default HomeQuantity;
