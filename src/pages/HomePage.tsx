import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Upload, FileText, Shield, Zap, PieChart } from 'lucide-react';

const HomePage = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 bg-blue-500 opacity-10 w-96 h-96 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 bg-green-400 opacity-10 w-96 h-96 rounded-full -ml-16 -mb-16 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 bg-orange-400 opacity-5 w-64 h-64 rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-400 via-green-300 to-orange-300 text-transparent bg-clip-text">
              Speech Emotion Recognition AI
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
              Understand the emotional context behind words with our advanced AI system. Analyze speech patterns to detect emotions with precision and gain valuable insights for better communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/audio-recording" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-full transition duration-300 shadow-lg hover:shadow-xl text-center">
                Try It Now
              </Link>
              <Link to="/features" className="px-8 py-4 bg-transparent hover:bg-neutral-700 text-white border border-white/20 font-semibold rounded-full transition duration-300 text-center">
                Learn More
              </Link>
            </div>
            <div className="mt-8 flex items-center flex-wrap gap-2 text-gray-400 text-sm">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                99.7% Accuracy
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Secure Processing
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                10K+ Users
              </span>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative bg-neutral-800 bg-opacity-50 p-8 rounded-2xl border border-neutral-700 shadow-2xl">
              <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                Live Demo
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Speech Analysis</h3>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
              </div>
              
              <div className="bg-neutral-900 p-6 rounded-xl mb-6 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                  <Mic className="h-16 w-16 text-white" />
                </div>
                
                <div className="w-full bg-neutral-800 h-24 rounded-lg flex items-center justify-center p-2 overflow-hidden relative">
                  {/* Waveform visualization */}
                  <div className="flex items-center justify-center space-x-1 h-full w-full">
                    {[...Array(13)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`${i % 2 === 0 ? 'bg-blue-400' : 'bg-green-400'} w-1 rounded-full`} 
                        style={{ 
                          height: `${Math.sin(i * 0.8) * 40 + 50}%`,
                          animation: `waveform ${1 + Math.random() * 0.5}s ease-in-out infinite`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 flex-wrap">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-sm font-medium flex items-center transition-all">
                  <Mic className="h-4 w-4 mr-2" />
                  Start Recording
                </button>
                <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-full text-sm font-medium flex items-center transition-all">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Audio
                </button>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-sm font-medium flex items-center transition-all">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center mt-16 gap-10">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-neutral-800 rounded-full flex items-center justify-center mr-4">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Privacy First</h3>
              <p className="text-sm text-gray-400">Your audio never leaves your device</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="h-12 w-12 bg-neutral-800 rounded-full flex items-center justify-center mr-4">
              <Zap className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Real-time Analysis</h3>
              <p className="text-sm text-gray-400">Process speech in milliseconds</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="h-12 w-12 bg-neutral-800 rounded-full flex items-center justify-center mr-4">
              <PieChart className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Advanced Visualization</h3>
              <p className="text-sm text-gray-400">Intuitive charts and graphs</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes waveform {
          0%, 100% { height: 10%; }
          50% { height: 80%; }
        }
      `}</style>
    </section>
  );
};

export default HomePage;