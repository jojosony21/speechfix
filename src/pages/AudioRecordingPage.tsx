import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Upload, FileText, BarChart2, Play, Volume2 } from 'lucide-react';

const AudioRecordingPage = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const waveformContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRecording) {
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRecording]);

  const generateRandomWaveform = useCallback(() => {
    if (!waveformContainerRef.current) return;

    const containerWidth = waveformContainerRef.current.offsetWidth;
    const barWidth = 4;
    const gap = 4;
    const totalSpacePerBar = barWidth + gap;
    const numberOfBars = Math.floor(containerWidth / totalSpacePerBar);

    const waveform = [];
    for (let i = 0; i < numberOfBars; i++) {
      waveform.push(Math.random());
    }
    setWaveformData(waveform);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (hasRecording || uploadedFile) {
        generateRandomWaveform();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasRecording, uploadedFile, generateRandomWaveform]);

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          chunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
          
          // Convert the recorded audio to WAV format
          const audioContext = new AudioContext();
          const arrayBuffer = await audioBlob.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          const wavBlob = await audioBufferToWav(audioBuffer);
  
          setAudioBlob(wavBlob);
          setAudioUrl(URL.createObjectURL(wavBlob));
          chunksRef.current = [];
          generateRandomWaveform();
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      setHasRecording(true);
    }
  };
  
  const resetRecording = () => {
    setHasRecording(false);
    setRecordingTime(0);
    setAudioBlob(null);
    setAudioUrl(null);
    setWaveformData([]);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const wavBlob = await convertToWav(file);
      setUploadedFile(wavBlob);
      setAudioUrl(URL.createObjectURL(wavBlob));
      generateRandomWaveform();
    }
  };

  const convertToWav = async (file: File): Promise<Blob> => {
    const audioContext = new AudioContext();
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const wavBlob = await audioBufferToWav(audioBuffer);
    return wavBlob;
  };
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const audioBufferToWav = async (buffer: AudioBuffer): Promise<Blob> => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const length = buffer.length;
  
    const wavBuffer = new ArrayBuffer(44 + length * numChannels * 2);
    const view = new DataView(wavBuffer);
  
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length * numChannels * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, length * numChannels * 2, true);
  
    let offset = 44;
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      const channel = buffer.getChannelData(i);
      for (let j = 0; j < channel.length; j++) {
        const sample = Math.max(-1, Math.min(1, channel[j]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
        offset += 2;
      }
    }
  
    return new Blob([view], { type: 'audio/wav' });
  };
  const removeFile = () => {
    setUploadedFile(null);
    setAudioUrl(null);
    setWaveformData([]);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const generateReport = async () => {
    setIsProcessing(true);
  
    try {
      const formData = new FormData();
  
      if (audioBlob) {
        formData.append('file', audioBlob, 'recording.wav');
      }
  
      if (uploadedFile) {
        formData.append('file', uploadedFile, uploadedFile.name);
      }
  
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload audio file');
      }
  
      const result = await response.json();
      console.log('Analysis result:', result);
  
      navigate('/emotion-analysis', { state: { audioBlob, uploadedFile, analysisResult: result } });
    } catch (error) {
      console.error('Error uploading audio file:', error);
      alert('Failed to process the audio file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        audioRef.current.play();
        updatePlaybackProgress();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updatePlaybackProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationFrameRef.current = requestAnimationFrame(updatePlaybackProgress);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const getPlaybackProgress = () => {
    if (audioRef.current && audioRef.current.duration) {
      return (audioRef.current.currentTime / audioRef.current.duration) * 100;
    }
    return 0;
  };

  const saveRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recording.wav';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <section className="py-20 bg-neutral-900 text-white pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-green-300 to-orange-300 text-transparent bg-clip-text">Audio Recording & Analysis</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">Record your voice or upload audio files to analyze emotions with our advanced AI algorithms.</p>
        </div>

        <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700 shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side - Recording Controls */}
            <div className="w-full md:w-1/2">
              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Mic className="h-6 w-6 mr-2 text-blue-400" />
                  Record Audio
                </h3>

                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={toggleRecording}
                    className={`w-24 h-24 flex items-center justify-center ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} rounded-full mb-6 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-red-500/30 ${isRecording ? 'animate-pulse' : ''}`}
                  >
                    {isRecording ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                      </svg>
                    ) : (
                      <Mic className="h-12 w-12 text-white" />
                    )}
                  </button>

                  {isRecording && (
                    <div className="text-2xl font-mono mb-4">{formatTime(recordingTime)}</div>
                  )}

                  <p className="text-gray-300 text-center mb-4">
                    {isRecording ? 'Recording...' : hasRecording ? 'Recording stopped' : 'Tap to start recording'}
                  </p>

                  {isRecording && (
                    <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-300"
                        style={{ width: `${Math.min((recordingTime / 60) * 100, 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                {hasRecording && (
                  <div className="flex justify-center gap-3 mt-4">
                    <button
                      onClick={resetRecording}
                      className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-full text-sm font-medium transition-all"
                    >
                      Record Again
                    </button>
                    <button
                      onClick={saveRecording}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-sm font-medium transition-all"
                    >
                      Save Recording
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Upload className="h-6 w-6 mr-2 text-blue-400" />
                  Upload Audio File
                </h3>

                <div
                  className="border-2 border-dashed border-neutral-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-all"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <Upload className="h-10 w-10 mx-auto mb-3 text-neutral-400" />
                  <p className="text-neutral-400 mb-2">Drag and drop your audio file here</p>
                  <p className="text-neutral-500 text-sm mb-4">Supported formats: MP3, WAV, OGG</p>
                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    accept="audio/*"
                    onChange={handleFileUpload}
                  />
                  <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-full text-sm font-medium transition-all">
                    Browse Files
                  </button>
                </div>

                {uploadedFile && (
                  <div className="mt-4 p-3 bg-neutral-800 rounded-lg">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300 truncate flex-1">{uploadedFile.name}</span>
                      <button
                        onClick={removeFile}
                        className="text-neutral-500 hover:text-neutral-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Waveform and Controls */}
            <div className="w-full md:w-1/2">
              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <BarChart2 className="h-6 w-6 mr-2 text-blue-400" />
                  Waveform Visualization
                </h3>

                <div
                  ref={waveformContainerRef}
                  className="bg-neutral-800 rounded-lg h-[40vh] flex items-center justify-center p-4 mb-4 overflow-hidden"
                >
                  {waveformData.length === 0 ? (
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                      <p className="text-neutral-500 text-sm">No audio recorded or uploaded yet</p>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-end gap-[4px]">
                      {waveformData.map((value, index) => (
                        <div
                          key={index}
                          className={`${
                            index <= (getPlaybackProgress() / 100) * waveformData.length 
                              ? 'bg-blue-400' 
                              : 'bg-neutral-600'
                          } rounded-full`}
                          style={{ 
                            height: `${value * 100}%`, 
                            width: '4px'
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>

                {(hasRecording || uploadedFile) && (
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={togglePlayback}
                      className="text-neutral-300 hover:text-white"
                    >
                      <Play className="h-8 w-8" />
                    </button>

                    <div className="flex-1 mx-4">
                      <div className="relative">
                        <div className="h-2 bg-neutral-700 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full"
                            style={{ width: `${getPlaybackProgress()}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-400 mt-1">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(audioRef.current?.duration || 0)}</span>
                        </div>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-16"
                    />
                  </div>
                )}
              </div>

              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-blue-400" />
                  Start Analysis
                </h3>

                <div className="flex flex-col items-center">
                  <button
                    onClick={generateReport}
                    disabled={isProcessing || (!hasRecording && !uploadedFile)}
                    className={`w-full py-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-xl transition duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 mb-4 flex items-center justify-center ${(!hasRecording && !uploadedFile) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Audio...
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5 mr-2" />
                        Generate Emotion Report
                      </>
                    )}
                  </button>

                  <p className="text-neutral-400 text-sm">
                    Ready to analyze emotions in your recording? Click the button above to process the audio and generate a detailed report of detected emotions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl || undefined} />

      <style jsx>{`
        @keyframes waveform {
          0%, 100% { height: 10%; }
          50% { height: 80%; }
        }
      `}</style>
    </section>
  );
};

export default AudioRecordingPage;