import React, { useState } from 'react';
import axios from 'axios';
import './TextToVideo.css';  // Import the CSS for styling

function TextToVideo() {
  const [prompt, setPrompt] = useState('');
  const [time, setTime] = useState(5);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/generate-video', {
        prompt: prompt,
        time: time,
      });
      
      if (response.data.status === 'success') {
        setVideoUrl(response.data.video_url);
      } else {
        setError('Video generation failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Text to Video</h1>

        <div className="input-group">
          <label className="input-label">Enter Prompt:</label>
          <input
            className="input-field"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter the prompt"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Enter Video Duration (in seconds):</label>
          <input
            className="input-field"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter the time duration"
            min="1"
          />
        </div>

        <button className="submit-button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Generating Video...' : 'Generate Video'}
        </button>

        {error && <p className="error-message">{error}</p>}

        {videoUrl && (
          <div className="video-container">
            <h3>Video Generated:</h3>
            <video className="video" width="600" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextToVideo;
