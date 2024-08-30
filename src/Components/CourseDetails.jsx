import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import './Styles/CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [course, setCourse] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/app/v1/video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            course_id: id,
          }),
        });
        const data = await response.json();
        if (data.status === 'success') {
          setVideos(data.data);
        } else {
          console.error('Failed to fetch videos:', data.message);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/app/v1/courses/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.status === 'success') {
          setCourse(data.data);
        } else {
          console.error('Failed to fetch course details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchVideos();
    fetchCourseDetails();
  }, [id]);

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="course-details">
      <img
        src={course?.course_banner}
        alt="Course Banner"
        className="course-banner"
      />
      <div className="course-info">
        <img
          src={course?.course_image}
          alt="Course Image"
          className="course-image"
        />
        <div className="course-text">
          <h1 className="course-title">{course?.course_title}</h1>
          <p className="course-description">{course?.course_description}</p>
          <p className="course-duration">Duration: {course?.course_duration}</p>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="video-list">
          <h2>Video List</h2>
          {videos.length > 0 ? (
            <div className="video-items">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="video-item"
                  onClick={() => handleVideoSelect(video.video)}
                >
                  <h3>{video.video_title}</h3>
                  <p>{video.video_description}</p>
                  <p className="duration">Duration: {video.video_duration}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-videos">No videos available</p>
          )}
        </div>
        <div className="video-player">
          <h2>Video Player</h2>
          {selectedVideoUrl ? (
            <div className="player-wrapper">
              <ReactPlayer
                url={selectedVideoUrl}
                controls
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <p className="no-video-selected">Select a video to play</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
