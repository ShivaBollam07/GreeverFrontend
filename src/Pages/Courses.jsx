import './Styles/Courses.css';

function Courses() {
    const courses = [
        {
            title: "Introduction to Deep Learning",
            description: "Explore deep learning techniques and neural networks",
            duration: "8 hrs",
            videos: 12,
            image: "https://th.bing.com/th?id=OSK.HEROZpuXPAaz8p4xA4sVc48gtmCDgwHmk03m01wPPAK5JpY&w=472&h=280&c=13&rs=2&o=6&cb=13&pid=SANGAM"
        },
        {
            title: "Python for Data Science",
            description: "Learn Python programming for data analysis and visualization",
            duration: "6 hrs",
            videos: 10,
            image: "https://th.bing.com/th/id/OIP.JF5LAyPzzwgiCe_AjKH7IgHaD4?w=313&h=180&c=7&r=0&o=5&pid=1.7"
        },
        {
            title: "Web Development with React",
            description: "Build interactive web applications using React",
            duration: "10 hrs",
            videos: 15,
            image: "https://th.bing.com/th/id/OIP.dCKbodeEWBDCryofpMS4CgHaCh?rs=1&pid=ImgDetMain"
        },
        {
            title: "Machine Learning Fundamentals",
            description: "Understand the basics of machine learning and algorithms",
            duration: "7 hrs",
            videos: 11,
            image: "https://th.bing.com/th/id/OIP.wNARWHbDERUTCTpLKFuroQAAAA?rs=1&pid=ImgDetMain"
        },
        {
            title: "Data Structures and Algorithms",
            description: "Learn about common data structures and algorithms",
            duration: "9 hrs",
            videos: 14,
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20230627113746/DSA-full-form.png"
        }
    ];

    return (
        <div className="MainDiv1">
            <h1 className="CoursesHeader">Courses</h1>
            <p className="CoursesDescription">Browse through our collection of courses on various topics</p>
            <div className="CoursesContainer">
                {courses.map((course, index) => (
                    <div className="CourseCard" key={index}>
                        <img src={course.image} alt={course.title} />
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <p>Course Duration: <span>{course.duration}</span></p>
                        <p><span>{course.videos}</span> Videos</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;