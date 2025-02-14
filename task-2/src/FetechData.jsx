import React, { useEffect, useState } from 'react';
import Cards from './Cards';
const FetchData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const response = await fetch("https://api.restful-api.dev/objects");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const result = await  response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <h2>Fetching data and Printing in a Cards</h2>
        <div className='card-container'>
            {/* <h1>API Data</h1>
            <ul>
                {data.map((item) => {
                    // const { price, color } = item.data;
                    return (
                        <li key={item.id}>
                            <p><strong>Name:</strong> {item.name}</p>
                            <p><strong>ID:</strong> {item.id}</p>
                            <p>Data: {JSON.stringify(item.data)}</p>
                        </li>
                    )
                })}
            </ul> */}
            {data.map((item) => (
                
                <Cards key={item.id} id={item.id} name={item.name} data={item.data} />
            ))}
        </div>
        </>
    );
};

export default FetchData;
