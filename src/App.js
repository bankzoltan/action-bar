import 'reset-css/reset.css';
import './App.css';

import React, { useEffect, useRef, useState } from 'react';

function App() {
    const countries = ["Czech Republic", "Argentina", "Finland", "Pakistan", "Bangladesh", "Netherlands", "Denmark", "Portugal", "Hungary", "Chile"];
    const names = ["Grace", "Aiden", "Mateo", "Ava", "Lucas", "Ellie", "Mila", "Ethan", "Lillian", "Scarlett", "Michael", "Elijah", "Samuel", "Riley", "Jackson", "Charlotte", "David", "Noah", "Sebastian", "Nora"];
    const companies = ["TikTok", "Salesforce", "Netflix", "Honda", "SpaceX", "Deloitte", "Ford", "Procter & Gamble", "Tesla", "Samsung", "Volkswagen", "Zoom", "Toyota", "Coca-Cola", "Siemens"];

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const [rows] = useState(
        Array.from({ length: 30 }, () => ({
            country: getRandomItem(countries),
            name: getRandomItem(names),
            company: getRandomItem(companies),
        }))
    );

    const [selectedRows, setSelectedRows] = useState([]);
    const stickyRef = useRef(null);
    const [isPinned, setIsPinned] = useState(false);

    const handleCheckboxChange = (index) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(index)) {
                return prevSelectedRows.filter((rowIndex) => rowIndex !== index);
            } else {
                return [...prevSelectedRows, index];
            }
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (stickyRef.current) {
                const rect = stickyRef.current.getBoundingClientRect();
                const actionBarHeight = 50;

                setIsPinned(rect.bottom >= window.innerHeight - actionBarHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="App">
            <div className="container">
                <div className={`action-bar ${isPinned ? 'pinned' : ''} ${selectedRows.length > 0 ? '' : 'invisible'}`} ref={stickyRef}>
                    <div className={`action-bar__content ${selectedRows.length > 0 ? 'show' : ''}`}>
                        <span className="selection-counter">{selectedRows.length} selected</span>
                        <button onClick={() => setSelectedRows([])}>Deselect All</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>Country</th>
                        <th>Name</th>
                        <th>Company</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className={selectedRows.includes(index) ? 'selected' : ''}
                            onClick={() => handleCheckboxChange(index)}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(index)}
                                    onChange={() => handleCheckboxChange(index)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </td>
                            <td>{row.country}</td>
                            <td>{row.name}</td>
                            <td>{row.company}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
