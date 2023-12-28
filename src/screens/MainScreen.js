import React from 'react';
import { useUser } from '../UserContext';
import './MainScreen.css';
import  { useState } from 'react';
import axios from 'axios';

function MainScreen() {
  const { user } = useUser();
  const [imageURL, setImageURL] = useState('');
  const [textInput, setTextInput] = useState('');
  const [imageAnalysis, setImageAnalysis] = useState([]);
  const [textAnalysis, setTextAnalysis] = useState([]);
  const APIKEY =
  process.env.API_KEY;
  const handleImageAnalysis = async () => {
    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAZKf0t6YWgrShhEjOFV55I9WlU04UH7PM`,
        {
          requests: [
            {
              image: {
                source: { imageUri: imageURL },
              },
              features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
            },
          ],
        }
      );

      setImageAnalysis(response.data.responses[0].labelAnnotations);
    } catch (error) {
      console.error('Vision API error', error);
    }
  };

  const handleTextAnalysis = async () => {
    try {
      const response = await axios.post(
        `https://language.googleapis.com/v1/documents:analyzeEntities?key=AIzaSyAZKf0t6YWgrShhEjOFV55I9WlU04UH7PM`,
        {
          document: {
            content: textInput,
            type: 'PLAIN_TEXT',
          },
        }
      );

      setTextAnalysis(response.data.entities);
      console.log(response.data)
    } catch (error) {
      console.error('NLP API error', error);
    }
  };

  return (
    <div className="main-screen">
      <div className="sidebar">
        <h2>User Credentials</h2>
        <img
          src={user.picture} 
          alt="User Profile"
          className="user-profile-picture"
        />
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <div className="content">
        <h1>Welcome to the GCP LAB</h1>
        <div>
          <h2>Image Analysis:</h2>
          <input
            type="text"
            placeholder="Enter Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
          <button onClick={handleImageAnalysis}>Analyze Image</button>
          <ul>
            {imageAnalysis.map((label, index) => (
              <li key={index}>{label.description}</li>
            ))}
          </ul>
          {imageURL && (
    <div className="img-container">
      <img src={imageURL} alt="User-Entered Image" />
    </div>
  )}
        </div>
        <div>
          <h2>Text Analysis:</h2>
          <input
            type="text"
            placeholder="Enter Text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button onClick={handleTextAnalysis}>Analyze Text</button>
          <ul>
            {textAnalysis.map((entity, index) => (
              <li key={index}>{entity.name}</li>
            ))}
          </ul>
        </div>
        {/* Add user-generated image analysis and text analysis here */}
      </div>
    </div>
  );
}

export default MainScreen;