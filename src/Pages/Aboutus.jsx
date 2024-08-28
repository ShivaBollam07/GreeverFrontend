import './Styles/Aboutus.css'

function Aboutus() {
    return (
        <div className="about-us">
            <h1>About Greever</h1>
            
            <section className="introduction">
                <h2>Introduction</h2>
                <p>Greever is an online platform that provides various courses and learning resources for users. It includes video lessons and reading lists to help people learn different topics. Our goal is to make learning accessible to everyone through a user-friendly interface.</p>
            </section>
            
            <section className="use-cases">
                <h2>Use Cases</h2>
                <ul>
                    <li>Access a wide range of courses on various topics</li>
                    <li>Learn through video lessons and curated reading lists</li>
                    <li>Track your learning progress</li>
                    <li>Manage your educational profile</li>
                </ul>
            </section>
            
            <section className="how-it-works">
                <h2>How It Works</h2>
                <ol>
                    <li><strong>Browse Courses:</strong> Explore our extensive catalog of courses.</li>
                    <li><strong>Enroll:</strong> Choose the courses that interest you and enroll.</li>
                    <li><strong>Learn:</strong> Access video lessons and reading materials.</li>
                    <li><strong>Track Progress:</strong> Monitor your advancement through each course.</li>
                    <li><strong>Complete:</strong> Finish courses and add them to your profile.</li>
                </ol>
            </section>
            
            <section className="features">
                <h2>Key Features</h2>
                <ul>
                    <li>Diverse course catalog</li>
                    <li>Video lessons</li>
                    <li>Curated reading lists</li>
                    <li>User profiles</li>
                    <li>Progress tracking</li>
                </ul>
            </section>
            
            <section className="api-info">
                <h2>API Information</h2>
                <p>Greever provides a robust API for managing courses, user details, and learning resources. Heres a detailed overview of our main API endpoints:</p>
                
                <h3>Courses API</h3>
                <ul>
                    <li><strong>POST /app/v1/courses</strong>: Allows admins to add a new course. Requires course details in the request body.</li>
                    <li><strong>GET /app/v1/courses/</strong>: Retrieves all available courses. Requires user authentication token.</li>
                    <li><strong>GET /app/v1/courses/:id</strong>: Fetches details of a specific course using its ID. Requires user authentication token.</li>
                </ul>

                <h3>Course Videos API</h3>
                <ul>
                    <li><strong>POST /app/v1/course-videos</strong>: Allows admins to add a new video to a course. Requires video details and course ID.</li>
                    <li><strong>GET /app/v1/course-videos/:courseId</strong>: Retrieves all videos for a specific course. Requires user authentication.</li>
                </ul>

                <h3>Reading Lists API</h3>
                <ul>
                    <li><strong>POST /app/v1/reading-lists</strong>: Creates a new reading list. Requires list details and user authentication.</li>
                    <li><strong>GET /app/v1/reading-lists</strong>: Retrieves all reading lists. Requires user authentication.</li>
                    <li><strong>POST /app/v1/reading-lists-item</strong>: Adds an item to a reading list. Requires item details and list ID.</li>
                </ul>

                <h3>User Details API</h3>
                <ul>
                    <li><strong>POST /app/v1/user-details</strong>: Creates or updates user profile. Requires user details and authentication.</li>
                    <li><strong>GET /app/v1/user-details</strong>: Retrieves user profile information. Requires user authentication.</li>
                </ul>

                <h3>Education and Experience API</h3>
                <ul>
                    <li><strong>POST /app/v1/education</strong>: Adds educational background to user profile. Requires education details and user authentication.</li>
                    <li><strong>POST /app/v1/experience</strong>: Adds work experience to user profile. Requires experience details and user authentication.</li>
                </ul>

                <p>All API endpoints require proper authentication using JWT tokens. For full API documentation, including request and response formats, please go through  <a 
                href="https://documenter.getpostman.com/view/26166586/2sAXjGda8p"
                    //new tab
                    target="_blank" rel="noreferrer" 
                ><span>Greever API Documentation</span></a>
                .</p>
            </section>
            
            <section className="security">
                <h2>Security and Privacy</h2>
                <p>At Greever, we take the security and privacy of our users very seriously. All API requests are authenticated using JWT tokens, ensuring that only authorized users can access sensitive information. User data is encrypted and stored securely, and we adhere to best practices in data protection and privacy regulations.</p>
            </section>

            <section className="future-plans">
                <h2>Future Plans</h2>
                <p>We are continuously working to improve and expand the Greever platform. Some of our planned future enhancements include:</p>
                <ul>
                    <li>Interactive quizzes and assessments</li>
                    <li>Certificates and badges for course completion</li>
                    <li>Job applying and hiring features</li>
                    <li>Mobile app development</li>
                    <li>Integration with third-party learning tools</li>

                </ul>
            </section>

            <section className="contact">
                <h2>Contact Us</h2>
                <p>For more information about Greever, our API, or to discuss potential partnerships, please contact us at:</p>
                <p>Email: greeverlearn@gmail.com</p>
                <p>Phone: +91 79895 69990</p>
                <p>Address: Hyderabad, Telangana</p>
            </section>
        </div>
    );
}

export default Aboutus;