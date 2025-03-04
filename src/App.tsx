import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import AudioRecordingPage from './pages/AudioRecordingPage';
import EmotionAnalysisPage from './pages/EmotionAnalysisPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/audio-recording" element={<AudioRecordingPage />} />
          <Route path="/emotion-analysis" element={<EmotionAnalysisPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;