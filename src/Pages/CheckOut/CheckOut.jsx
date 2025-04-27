import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const CheckOut = () => {
    const { id } = useParams();  // Access the _id from the URL
    const location = useLocation(); // Access the full URL to get query params
    const searchParams = new URLSearchParams(location.search);
    const biodataId = searchParams.get('biodataId'); // Get the biodataId query parameter

    return (
        <div>
            <h1>Checkout for Biodata ID: {biodataId}</h1>
            <p>Profile _id: {id}</p>
        </div>
    );
};

export default CheckOut;
