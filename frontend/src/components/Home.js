import React, { useState, useEffect } from 'react';
import config from '../config';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${config.API_BASE_URL}/get_database_data`)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, []);

    const handleInputChange = (index, id, key, value) => {
        const updatedData = [...data];
        updatedData[index][key] = value;
        setData(updatedData);
        console.log(id);

        fetch(`${config.API_BASE_URL}/update_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, [key]: value }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('Update successful');
            } else {
                console.error('Update error:', data.message);
            }
        })
        .catch(error => console.error('Fetch error:', error));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        
            <h2>Data</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>date</th>
                        <th>trade_code</th>
                        <th>high</th>
                        <th>low</th>
                        <th>open</th>
                        <th>close</th>
                        <th>volume</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="date"
                                    value={row.date}
                                    onChange={(e) => handleInputChange(index, row.id, 'date', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.trade_code}
                                    onChange={(e) => handleInputChange(index, row.id, 'trade_code', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.high}
                                    onChange={(e) => handleInputChange(index, row.id, 'high', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.low}
                                    onChange={(e) => handleInputChange(index, row.id, 'low', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.open}
                                    onChange={(e) => handleInputChange(index, row.id, 'open', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.close}
                                    onChange={(e) => handleInputChange(index, row.id, 'close', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.volume}
                                    onChange={(e) => handleInputChange(index, row.id, 'volume', e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
