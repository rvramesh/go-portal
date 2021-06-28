import React from 'react';
import { SWRConfig } from 'swr';
import './App.css';
import Background from './Components/BackgroundImage/Background';

const fetcher = async (url: RequestInfo) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  return res.json();
};

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}>
      <Background></Background>
      <div className="relative">
        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            <p className="text-lg text-black font-semibold">Erin Lindford</p>
            <p className="text-gray-500 font-medium">Product Engineer</p>
          </div>
          <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
            Message
          </button>
        </div>
      </div>
    </SWRConfig>
  );
}

export default App;
