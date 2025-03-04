import React from 'react';
import { useLocation } from 'react-router-dom';
import { Info, BarChart2, PieChart, FileText } from 'lucide-react';

const EmotionAnalysisPage = () => {
  // Extract data from navigation state
  const location = useLocation();
  const { analysisResult } = location.state || {};

  // Fallback data in case analysisResult is not available
  const defaultData = {
    confidence_level: 'Low',
    confidence_score: 0.03,
    emotions: {
      angry: 87.91,
      calm: 0.0,
      disgust: 12.07,
      fearful: 0.0,
      happy: 0.0,
      neutral: 0.03,
      sad: 0.0,
    },
  };

  // Use analysisResult if available, otherwise fallback to defaultData
  const { confidence_level, confidence_score, emotions } = analysisResult || defaultData;

  // Normalize emotion percentages for charts
  const emotionPercentages = {
    happiness: emotions.happy,
    confidence: emotions.calm,
    excitement: emotions.fearful,
    neutral: emotions.neutral,
    angry: emotions.angry,
    disgust: emotions.disgust,
    sad: emotions.sad,
  };

  return (
    <section className="py-20 bg-white pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">Emotion Analysis</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">Powerful visualization tools to help you understand emotional patterns in speech.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-gray-100 max-w-5xl mx-auto">
          {/* Analysis Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 border-b border-gray-200">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-500 focus:outline-none">
                Dashboard
              </button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-blue-600 focus:outline-none">
                Detailed Report
              </button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-blue-600 focus:outline-none">
                Timeline
              </button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-blue-600 focus:outline-none">
                Export
              </button>
            </div>
          </div>

          {/* Confidence Score and Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Confidence Score Meter */}
            <div className="bg-neutral-50 p-6 rounded-2xl border border-gray-100 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-500" />
                Confidence Score
              </h3>
              
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    
                    {/* Progress circle with stroke-dasharray and stroke-dashoffset */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="url(#confidence-gradient)" 
                      strokeWidth="10" 
                      strokeLinecap="round" 
                      strokeDasharray="283" 
                      strokeDashoffset={283 - (confidence_score * 283)} 
                      transform="rotate(-90 50 50)" 
                    />
                    
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="confidence-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{Math.round(confidence_score * 100)}%</div>
                      <div className="text-sm text-gray-500">Accuracy</div>
                    </div>
                  </div>
                </div>
                
                <p className="text-neutral-600 text-sm text-center">
                  Confidence level: <span className="font-semibold">{confidence_level}</span>
                </p>
              </div>
            </div>
            
            {/* Emotion Summary */}
            <div className="md:col-span-2 bg-neutral-50 p-6 rounded-2xl border border-gray-100 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                Emotion Summary
              </h3>
              
              <div className="mb-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-neutral-700 text-lg leading-relaxed">
                  The speaker is primarily expressing <span className="font-semibold text-blue-600">anger ({emotions.angry.toFixed(2)}%)</span>, with underlying tones of <span className="font-semibold text-green-500">disgust ({emotions.disgust.toFixed(2)}%)</span>. There are minimal traces of <span className="font-semibold text-neutral-500">neutral ({emotions.neutral.toFixed(2)}%)</span> expression.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <div className="text-sm">
                    <span className="font-medium">Primary emotion:</span>
                    <span className="text-blue-600 font-semibold ml-1">Anger</span>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-sm">
                    <span className="font-medium">Secondary emotion:</span>
                    <span className="text-green-600 font-semibold ml-1">Disgust</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 flex items-center col-span-2">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <div className="text-sm text-neutral-600">
                    Voice tone indicates a strong negative emotional state.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visualization Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                Emotion Distribution
              </h3>
              
              <div className="h-64 flex items-end justify-between space-x-2">
                {Object.entries(emotionPercentages).map(([emotion, percentage]) => (
                  <div key={emotion} className="flex flex-col items-center w-1/6">
                    <div
                      className="w-full rounded-t-lg"
                      style={{
                        height: `${percentage}%`,
                        backgroundColor: emotion === 'angry' ? '#EF4444' : emotion === 'disgust' ? '#F59E0B' : '#3B82F6',
                      }}
                    ></div>
                    <div className="text-xs font-medium text-neutral-500 mt-2 capitalize">{emotion}</div>
                    <div className="text-xs font-semibold text-blue-600">{percentage.toFixed(2)}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-blue-500" />
                Emotion Breakdown
              </h3>
              
              <div className="flex justify-center items-center h-64">
                {/* SVG Pie Chart */}
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {Object.entries(emotionPercentages).map(([emotion, percentage], index) => (
                      <circle
                        key={emotion}
                        r="25"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        stroke={emotion === 'angry' ? '#EF4444' : emotion === 'disgust' ? '#F59E0B' : '#3B82F6'}
                        strokeWidth="50"
                        strokeDasharray={`${percentage} 100`}
                        strokeDashoffset={index === 0 ? 0 : -Object.values(emotionPercentages).slice(0, index).reduce((a, b) => a + b, 0)}
                        transform="rotate(-90 50 50)"
                      />
                    ))}
                    <circle r="15" cx="50" cy="50" fill="white"></circle>
                  </svg>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-medium text-neutral-500">Top Emotion</div>
                      <div className="text-lg font-semibold text-blue-600">Anger</div>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="ml-8">
                  {Object.entries(emotionPercentages).map(([emotion, percentage]) => (
                    <div key={emotion} className="flex items-center mb-2">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: emotion === 'angry' ? '#EF4444' : emotion === 'disgust' ? '#F59E0B' : '#3B82F6',
                        }}
                      ></div>
                      <div className="text-sm text-neutral-600">
                        <span className="font-medium capitalize">{emotion}</span>
                        <span className="text-blue-600 font-semibold ml-1">{percentage.toFixed(2)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Emotion Timeline Graph */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-500" />
              Emotion Timeline
            </h3>
            
            <div className="h-64 relative">
              {/* Timeline X-axis */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 flex justify-between">
                <div className="text-xs text-neutral-500 -ml-1 -mb-5">0s</div>
                <div className="text-xs text-neutral-500 -mb-5">5s</div>
                <div className="text-xs text-neutral-500 -mb-5">10s</div>
                <div className="text-xs text-neutral-500 -mb-5">15s</div>
                <div className="text-xs text-neutral-500 -mb-5">20s</div>
                <div className="text-xs text-neutral-500 -mr-1 -mb-5">25s</div>
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute top-0 left-0 bottom-8 w-px bg-gray-200 flex flex-col justify-between items-end">
                <div className="text-xs text-neutral-500 -ml-6 -mt-2">100%</div>
                <div className="text-xs text-neutral-500 -ml-6">75%</div>
                <div className="text-xs text-neutral-500 -ml-6">50%</div>
                <div className="text-xs text-neutral-500 -ml-6">25%</div>
                <div className="text-xs text-neutral-500 -ml-6 -mb-2">0%</div>
              </div>
              
              {/* Graph Area */}
              <div className="absolute top-0 left-8 right-0 bottom-8">
                {/* Happiness line */}
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0,160 C20,140 40,80 80,40 S160,30 200,40 S280,80 320,60 S400,20 480,40" 
                        fill="none" 
                        stroke="#3B82F6" 
                        strokeWidth="3"
                        className="emotion-line"
                        ></path>
                        
                  {/* Confidence line */}
                  <path d="M0,180 C40,160 80,140 120,130 S200,110 240,120 S320,140 360,130 S440,120 480,110" 
                        fill="none" 
                        stroke="#10B981" 
                        strokeWidth="2"
                        className="emotion-line"
                        strokeDasharray="5,5"></path>
                        
                  {/* Excitement line */}
                  <path d="M0,200 C40,180 80,190 120,170 S200,190 240,170 S320,160 360,180 S440,160 480,150" 
                        fill="none" 
                        stroke="#F59E0B" 
                        strokeWidth="2"
                        className="emotion-line"
                        ></path>
                </svg>
                
                {/* Annotation point */}
                <div className="absolute top-[25%] left-[40%] w-4 h-4 bg-blue-500 rounded-full -ml-2 -mt-2 border-2 border-white"></div>
                <div className="absolute top-[20%] left-[40%] bg-white text-xs p-1 rounded shadow-md border border-gray-200 -ml-12">
                  Peak happiness
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
            <div>
              <button className="px-5 py-2 bg-blue-50 text-blue-600 font-medium rounded-full hover:bg-blue-100 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Export Report
              </button>
            </div>
            
            <div className="flex gap-2">
              <button className="px-5 py-2 bg-neutral-100 text-neutral-600 font-medium rounded-full hover:bg-neutral-200 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Save Analysis
              </button>
              
              <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center shadow-md hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Complete Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmotionAnalysisPage;