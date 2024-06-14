import React, { useState, useEffect } from 'react';
import config from '../config';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${config.API_BASE_URL}/get_json_data`)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

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
                            <td>{row.date}</td>
                            <td>{row.trade_code}</td>
                            <td>{row.high}</td>
                            <td>{row.low}</td>
                            <td>{row.open}</td>
                            <td>{row.close}</td>
                            <td>{row.volume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
