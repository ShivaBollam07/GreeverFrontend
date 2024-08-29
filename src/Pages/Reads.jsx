import { useEffect, useState } from 'react';
import './Styles/Reads.css';

function Reads() {
    const [readingLists, setReadingLists] = useState([]);
    const [filteredReadingLists, setFilteredReadingLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchReadingLists = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:3000/app/v1/reading_lists', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Use token from local storage
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reading lists');
                }

                const data = await response.json();
                setReadingLists(data.data); 
                setFilteredReadingLists(data.data); 
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchReadingLists();
    }, []);

    const handleSearchChange = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = readingLists.filter(list => 
            list.reading_list_title.toLowerCase().includes(term) ||
            list.reading_list_description.toLowerCase().includes(term) ||
            (list.reading_list_skills && list.reading_list_skills.toLowerCase().includes(term))
        );
        setFilteredReadingLists(filtered);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="MainDiv2">
            <h1 className="ReadsHeader">Reads</h1>
            <p className="ReadsDescription">Explore curated reading lists on various topics</p>
            <br />

            <div style={{ marginBottom: '20px', textAlign: 'left', marginLeft: '20px' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search reading lists..."
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '100%',
                        maxWidth: '400px',
                        display: 'block',
                        margin: '0'
                    }}
                />
            </div>

            <div className="ReadsContainer">
                {filteredReadingLists.length > 0 ? (
                    filteredReadingLists.map((list, index) => (
                        <div className="ReadCard" key={index}>
                            <img src={list.reading_list_image} alt={list.reading_list_title} />
                            <h2>{list.reading_list_title}</h2>
                            <p>{list.reading_list_description}</p>
                            <p>Skills: <span>{list.reading_list_skills}</span></p>
                        </div>
                    ))
                ) : (
                    <p>No reading lists found</p>
                )}
            </div>
        </div>
    );
}

export default Reads;
