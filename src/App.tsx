import React, { useState } from 'react';
import { Demo } from './components/Demo';
import { MyOwnData } from './components/MyOwnData';

function App() {
  const [activeView, setActiveView] = useState<'demo' | 'myown'>('demo');

  return (
    <div>
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveView('demo')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'demo'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Original Demo
            </button>
            <button
              onClick={() => setActiveView('myown')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'myown'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Own Data
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeView === 'demo' && <Demo />}

      {activeView === 'myown' && <MyOwnData />}
    </div>
  );
}

export default App;
