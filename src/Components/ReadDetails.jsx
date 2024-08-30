import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReadDetails = () => {
    const { id } = useParams();  
    const [aboutReads, setAboutReads] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [readingLists, setReadingLists] = useState([]);
    const [filteredReadingLists, setFilteredReadingLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAboutReads = async () => { 
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/app/v1/reading_lists/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,  
                },
            });
            if (!response.ok) {
                const errorMessage = `Failed to fetch reading list: ${response.status} ${response.statusText}`;
                throw new Error(errorMessage); 
            }

            const data = await response.json();
            if (data.status === 'success') {
                setAboutReads(data.data);
            } else {
                console.error('Failed to fetch reading list:', data.message);
            }
        } catch (error) {
            console.error('Error fetching reading list:', error.message);
        }
    }

    const fetchAllReads = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token is missing');
            setIsLoading(false);
            return;
        }
    
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/app/v1/reading_list/reading_list/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,  
                },
            });
    
            if (!response.ok) {
                const errorMessage = `Failed to fetch reading list: ${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }
    
            const data = await response.json();
    
            if (data.status === 'success') {
                setReadingLists(data.data);
                setFilteredReadingLists(data.data);
            } else {
                console.error('Failed to fetch reading list:', data.message);
            }
        } catch (error) {
            console.error('Error fetching reading list:', error.message); 
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllReads();
        fetchAboutReads();
    }, []);

    const toggleDescription = (id) => {
        setFilteredReadingLists((prevLists) =>
            prevLists.map((item) =>
                item._id === id ? { ...item, showDescription: !item.showDescription } : item
            )
        );
    };

    return (
        <div className="course-details">
            {isLoading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div>
                    <img src={aboutReads.reading_list_banner} alt="Reading List Banner" className="course-banner" />
                    <div className="course-info">
                        <img src={aboutReads.reading_list_image} alt="Reading List Image" className="course-image" />
                        <div className="course-text">
                            <h1 className="course-title">{aboutReads.reading_list_title}</h1>
                            <p className="course-description">{aboutReads.reading_list_description}</p>
                            <p className="course-duration">{aboutReads.reading_list_skills}</p>
                        </div>
                    </div>

                    <div className="content-wrapper">
                        {filteredReadingLists.length > 0 ? (
                            filteredReadingLists.map((readingList) => (
                                <div key={readingList._id} className="video-item" onClick={() => toggleDescription(readingList._id)}>
                                    <h3>{readingList.reading_list_item_title}</h3>
                                    {readingList.showDescription && (
                                        <p>{readingList.reading_list_item_description}</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No reading list items found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReadDetails;
