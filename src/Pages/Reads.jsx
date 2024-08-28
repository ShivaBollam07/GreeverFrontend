import './Styles/Reads.css'

function Reads() {
    const readingLists = [
        {
            reading_list_title: "Git",
            reading_list_description: "Learning Git is Git",
            reading_list_skills: "GitControl, Gitlabs, Github, Version Control",
            reading_list_image: "https://th.bing.com/th/id/OIP.9WZPLb2B4rKSbK52Zg8hnAHaEo?rs=1&pid=ImgDetMain",
            no_of_items: 5
        },
        {
            reading_list_title: "Python",
            reading_list_description: "Learning Python is Python",
            reading_list_skills: "Python, Python3, Python2, Python Libraries",
            reading_list_image: "https://logos-world.net/wp-content/uploads/2021/10/Python-Logo.png", 
            no_of_items: 10
        },
        {
            reading_list_title: "React",
            reading_list_description: "Learning React is React",
            reading_list_skills: "React, React Libraries, React Components",
            reading_list_image: "https://coursework.vschool.io/content/images/2017/08/react-banner.png", 
            no_of_items: 15
        },
        {
            reading_list_title: "Django",
            reading_list_description: "Learning Django is Django",
            reading_list_skills: "Django, Django Libraries, Django Components",
            reading_list_image: "https://logos-world.net/wp-content/uploads/2021/10/Python-Logo.png",
            no_of_items: 20
        },
        {
            reading_list_title: "JavaScript",
            reading_list_description: "Learning JavaScript is JavaScript",
            reading_list_skills: "JavaScript, JS, JS Libraries, JS Components",
            reading_list_image: "https://th.bing.com/th/id/OIP.jK2sOzGg1b1xW6-1iRUg1wHaE8?rs=1&pid=ImgDetMain",
            no_of_items: 25
        },
        {
            reading_list_title: "HTML",
            reading_list_description: "Learning HTML is HTML",
            reading_list_skills: "HTML, HTML5, HTML Components",
            reading_list_image: "https://th.bing.com/th/id/OIP.4Hg2c2z1gZ8bq9VJLJz3LQHaEo?rs=1&pid=ImgDetMain",
            no_of_items: 30
        },
        {
            reading_list_title: "CSS",
            reading_list_description: "Learning CSS is CSS",
            reading_list_skills: "CSS, CSS3, CSS Components",
            reading_list_image: "https://th.bing.com/th/id/OIP.9WZPLb2B4rKSbK52Zg8hnAHaEo?rs=1&pid=ImgDetMain",
            no_of_items: 35
        }
    ];

    return (
        <div className="MainDiv2">
            <h1 className="ReadsHeader">Reads</h1>
            <p className="ReadsDescription">Explore curated reading lists on various topics</p>
            <div className="ReadsContainer">
                {readingLists.map((list, index) => (
                    <div className="ReadCard" key={index}>
                        <img src={list.reading_list_image} alt={list.reading_list_title} />
                        <h2>{list.reading_list_title}</h2>
                        <p>{list.reading_list_description}</p>
                        <p>Skills: <span>{list.reading_list_skills}</span></p>
                        <p>Items to read: <span>{list.no_of_items}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reads;