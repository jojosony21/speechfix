import { useLocation } from 'react-router-dom';
import { Info, BarChart2, FileText, PieChartIcon, BarChartIcon } from 'lucide-react';
import { BarChart, Bar,PieChart,Pie,Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type EmotionKey = 'happiness' | 'calm' | 'excitement' | 'neutral' | 'angry' | 'disgust' | 'sad';
// Define the structure of the emotions object
type Emotions = {
  happy: number;
  calm: number;
  fearful: number;
  neutral: number;
  angry: number;
  disgust: number;
  sad: number;
  [key: string]: number; // Add index signature
};

type AnalysisResult = {
  confidence_level: string;
  confidence_score: number;
  emotions: Emotions;
};

const EmotionAnalysisPage = () => {
  // Extract data from navigation state
  const location = useLocation();
  const { analysisResult } = (location.state || {}) as { analysisResult: AnalysisResult };

  // Fallback to default data if analysisResult is not available
  const { confidence_level, confidence_score, emotions } = analysisResult || {
    confidence_level: 'N/A',
    confidence_score: 0,
    emotions: {
      happy: 0,
      calm: 0,
      fearful: 0,
      neutral: 0,
      angry: 0,
      disgust: 0,
      sad: 0,
    },
  };

  // Normalize emotion percentages for charts
  const emotionPercentages = {
    happiness: emotions.happy,
    calm: emotions.calm,
    excitement: emotions.fearful,
    neutral: emotions.neutral,
    angry: emotions.angry,
    disgust: emotions.disgust,
    sad: emotions.sad,
  };
  const emotionColors: Record<EmotionKey, string>= {
    happiness: '#FBBF24', // Bright Yellow
    calm: '#34D399',      // Soft Green
    excitement: '#F59E0B', // Vibrant Orange
    neutral: '#9CA3AF',   // Light Gray
    angry: '#EF4444',     // Bold Red
    disgust: '#8B5CF6',   // Dark Purple
    sad: '#60A5FA',       // Muted Blue
  };
  console.log(emotionPercentages);
  const data = Object.entries(emotionPercentages).map(([name, value]) => ({
    name,
    value,
    fill: emotionColors[name as keyof typeof emotionColors], // Add fill color
  }));
  
  // Calculate primary and secondary emotions

  const sortedEmotions = Object.entries(emotions).sort((a, b) => b[1] - a[1]);
  const chartData = sortedEmotions.map(([name, value]) => ({ name, value }));
  // Extract primary, secondary, and tertiary emotions
  const primaryEmotion = sortedEmotions[0][0] as keyof Emotions;
  const secondaryEmotion = sortedEmotions[1][0] as keyof Emotions;
  const tertiaryEmotion = sortedEmotions[2][0] as keyof Emotions;

  return (
    <section className="py-20 bg-white pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">Emotion Analysis</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Powerful visualization tools to help you understand emotional patterns in speech.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-gray-100 max-w-5xl mx-auto">
          {/* Analysis Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 border-b border-gray-200">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-500 focus:outline-none">
                Dashboard
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
          
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#confidence-gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (Math.min(Math.max(confidence_score, 0), 100) * 2.83)} // Normalize and clamp
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
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{(confidence_score).toFixed(2)}%</div>
            <div className="text-sm text-gray-500">Confidence</div>
          </div>
        </div>
      </div>
      
      {/* Confidence level text */}
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
                  The speaker is primarily expressing{' '}
                  <span className="font-semibold text-blue-600">
                    {primaryEmotion} ({emotions[primaryEmotion].toFixed(2)}%)
                  </span>
                  , with underlying tones of{' '}
                  <span className="font-semibold text-green-500">
                    {secondaryEmotion} ({emotions[secondaryEmotion].toFixed(2)}%)
                  </span>
                  . There are minimal traces of{' '}
                  <span className="font-semibold text-neutral-500">
                  {tertiaryEmotion} ({emotions[tertiaryEmotion].toFixed(2)}%)
                  </span>{' '}
                  expression.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <div className="text-sm">
                    <span className="font-medium">Primary emotion:</span>
                    <span className="text-blue-600 font-semibold ml-1 capitalize">
                      {primaryEmotion}
                    </span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-sm">
                    <span className="font-medium">Secondary emotion:</span>
                    <span className="text-green-600 font-semibold ml-1 capitalize">
                      {secondaryEmotion}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 flex items-center col-span-2">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <div className="text-sm text-neutral-600">
                    Voice tone indicates a strong {primaryEmotion} emotional state.
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
    <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
  <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
  <YAxis tick={{ fill: '#4B5563' }} />
  <Tooltip />
  <Bar dataKey="value" barSize={40} radius={[8, 8, 0, 0]}>
    {data.map((entry, index) => (
      <rect
        key={`bar-${index}`}
        fill={entry.fill} // Set fill color for each bar
      />
    ))}
  </Bar>
</BarChart>
        </ResponsiveContainer>
      </div>
  </div>
  {/* PieChart */}
<div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
  <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
    <PieChartIcon className="h-5 w-5 mr-2 text-blue-500" />
    Emotion Breakdown
  </h3>
  <div className="flex justify-center items-center h-64">
    {/* Pie Chart Container */}
    <div className="w-60 h-60">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40} // Makes it a donut chart
            fill="#8884d8"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(1)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={emotionColors[entry.name as EmotionKey] || "#3B82F6"}
              />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-lg font-semibold text-blue-600"
          >
          {primaryEmotion}
          </text>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Legend */}
    <div className="ml-8">
      {data.map(({ name, value }) => (
        <div key={name} className="flex items-center mb-2">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: emotionColors[name as EmotionKey] }}
          ></div>
          <div className="text-sm text-neutral-600">
            <span className="font-medium capitalize">{name}</span>
            <span className="text-blue-600 font-semibold ml-1">
              {value.toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</div>
          {/* Emotion Timeline Graph */}
         {/* Horizontal Bar Chart */}
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md mb-8">
  <h3 className="text-lg font-semibold mb-4 text-neutral-700 flex items-center">
    <BarChartIcon className="h-5 w-5 mr-2 text-blue-500" />
    Emotion Distribution
  </h3>
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={chartData}>
        <XAxis type="number" tick={{ fill: "#4B5563" }} />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: "#4B5563" }}
          width={80} // Adjust width to fit emotion names
        />
        <Tooltip />
        <Bar dataKey="value" fill="#3B82F6" barSize={20} radius={[8, 8, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={emotionColors[entry.name as keyof typeof emotionColors] || "#3B82F6"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
            <div>
              <button className="px-5 py-2 bg-blue-50 text-blue-600 font-medium rounded-full hover:bg-blue-100 transition-colors flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Export Report
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-5 py-2 bg-neutral-100 text-neutral-600 font-medium rounded-full hover:bg-neutral-200 transition-colors flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Save Analysis
              </button>
              <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center shadow-md hover:shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
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