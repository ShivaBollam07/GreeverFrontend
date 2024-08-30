import { useEffect, useState } from 'react';
import './Styles/Courses.css';
import { useNavigate } from 'react-router-dom';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token'); 
                
                const response = await fetch('http://localhost:3000/app/v1/courses/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    }
                });

                const data = await response.json();

                if (data.status === 'success') {
                    if (data.data == null) {
                        console.log("No courses available");
                    } else {
                        setCourses(data.data); 
                        setFilteredCourses(data.data); 
                    }
                } else {
                    console.error('Failed to fetch courses:', data.message);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses(); 
    }, []);

    const handleSearchChange = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = courses.filter(course => 
            course.course_title.toLowerCase().includes(term) ||
            course.course_description.toLowerCase().includes(term) ||
            (course.course_skills && course.course_skills.toLowerCase().includes(term))
        );
        setFilteredCourses(filtered);
    };

    return (
        <div className="MainDiv1">
            <h1 className="CoursesHeader">Courses</h1>
            <p className="CoursesDescription">Browse through our collection of courses on various topics</p>
            <br />
            <div style={{ marginBottom: '20px', textAlign: 'left', marginLeft: '20px' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search courses..."
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

            <div className="CoursesContainer">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <div className="CourseCard" key={course._id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            navigate(`/courses/${course._id}`);
                        }}
                        >
                            <img src={course.course_image} alt={course.course_title} />
                            <h2>{course.course_title}</h2>
                            <p>{course.course_description}</p>
                            <p>Course Duration: <span>{course.course_duration}</span></p>
                        </div>
                    ))
                ) : (
                    <p>No courses found</p>
                )}
            </div>
        </div>
    );
}

export default Courses;
