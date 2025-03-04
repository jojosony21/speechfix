import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, BarChart2, FileText, Upload, Shield, Lightbulb } from 'lucide-react';

const FeaturesPage = () => {
  return (
    <section className="py-20 bg-gray-50 pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">Advanced Features</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">Our Speech Emotion Recognition system combines cutting-edge AI with intuitive design to bring you powerful emotion analysis capabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-6">
              <Mic className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-800">High-Precision Recording</h3>
            <p className="text-neutral-600 mb-4">Capture crystal-clear audio with our advanced noise-cancellation technology for accurate emotion detection.</p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Real-time waveform visualization
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Background noise reduction
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Recording progress indicator
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <BarChart2 className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-800">Multi-Format Visualization</h3>
            <p className="text-neutral-600 mb-4">Understand emotional patterns through beautiful, interactive charts and data visualizations.</p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Bar, pie and line charts
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Emotion timeline tracking
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Interactive data exploration
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center mb-6">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-800">Detailed Reports</h3>
            <p className="text-neutral-600 mb-4">Generate comprehensive emotion analysis reports with a single click for sharing and reference.</p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                PDF and CSV exports
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Shareable results
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Historical comparison
              </li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center mb-6">
              <Upload className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-800">Easy File Upload</h3>
            <p className="text-neutral-600 mb-4">Analyze pre-recorded audio files by simply dragging and dropping them into our interface.</p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Drag & drop interface
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Multiple format support
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Batch processing
              </li>
            </ul>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-800">Privacy-Focused</h3>
            <p className="text-neutral-600 mb-4">Your data never leaves your device - all processing happens locally for maximum privacy and security.</p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No cloud storage
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                End-to-end encryption
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                GDPR compliant
              </li>
            </ul>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center mb-6">
              <Lightbulb className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-800">AI-Powered Insights</h3>
            <p className="text-neutral-600 mb-4">Leverage cutting-edge neural networks to identify subtle emotional cues in speech patterns.</p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                7 primary emotions detected
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Confidence scoring
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Contextual analysis
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/audio-recording" className="inline-flex items-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition duration-300 shadow-lg hover:shadow-xl">
            <span>Try These Features Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPage;