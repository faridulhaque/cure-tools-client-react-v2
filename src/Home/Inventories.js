import React, { useEffect, useState } from 'react';

const Inventories = () => {
    const [inventories, setInventories] = useState([]);
    useEffect(() =>{
        fetch('data.json')
        .then(res => res.json())
        .then(data=> setInventories(data))
    }, [])
    return (
        <div>
            
        </div>
    );
};

export default Inventories;