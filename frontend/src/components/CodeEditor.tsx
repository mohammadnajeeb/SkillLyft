// Removed unused React import

interface CodeEditorProps {
  className?: string;
}

export default function CodeEditor({ className = '' }: CodeEditorProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center px-4">
          <div className="flex items-center space-x-2 py-2">
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-700">RLHF_Code.ipynb</span>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#1e1e1e] text-white">
        {/* Code editor toolbar */}
        <div className="border-b border-gray-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-white px-2 py-1 text-sm">File</button>
              <button className="text-gray-400 hover:text-white px-2 py-1 text-sm">Edit</button>
              <button className="text-gray-400 hover:text-white px-2 py-1 text-sm">View</button>
              <button className="text-gray-400 hover:text-white px-2 py-1 text-sm">Run</button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Code content */}
        <div className="p-4 font-mono text-sm">
          <div className="flex items-center space-x-4 mb-4">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700">
              ▶ Run
            </button>
            <span className="text-gray-400">Python 3 | base</span>
          </div>
          <div className="pl-4 border-l-2 border-gray-700 space-y-2">
            <div className="flex">
              <span className="text-gray-500 w-8">1</span>
              <span>
                <span className="text-blue-400">def</span>{" "}
                <span className="text-yellow-300">train_reward_model</span>
                <span className="text-gray-400">(</span>
                <span className="text-orange-300">data</span>
                <span className="text-gray-400">):</span>
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500 w-8">2</span>
              <span className="pl-4 text-gray-400"># Start coding</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal section */}
      <div className="h-32 bg-black text-white">
        <div className="flex items-center px-4 py-2 border-b border-gray-800">
          <span className="text-sm font-medium">Terminal</span>
        </div>
        <div className="p-4 font-mono text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">$</span>
            <span className="text-gray-300">python</span>
          </div>
          <div className="text-green-400 mt-2">
            Welcome to Skill Lyft Shell<br />
            user@01&gt; _
          </div>
        </div>
      </div>
    </div>
  );
}
