import { useState } from 'react';

export default function CodeSandbox() {
  const [code, setCode] = useState(`# Example Reward Model
import torch
import torch.nn as nn

class RewardModel(nn.Module):
    def __init__(self, input_size):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, 128),
            nn.ReLU(),
            nn.Linear(128, 1)
        )
    
    def forward(self, x):
        return self.network(x)
`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput('Model initialized successfully!');
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        <div className="flex flex-col">
          <div className="mb-2 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700">Code Editor</h3>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`
                px-4 py-2 rounded-md text-sm font-medium text-white
                ${isRunning 
                  ? 'bg-gray-400'
                  : 'bg-primary-600 hover:bg-primary-700'}
              `}
            >
              {isRunning ? 'Running...' : 'Run'}
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 font-mono text-sm p-4 bg-gray-800 text-gray-100 rounded-md"
            spellCheck={false}
          />
        </div>
        
        <div className="flex flex-col">
          <h3 className="mb-2 text-sm font-medium text-gray-700">Output</h3>
          <div className="flex-1 font-mono text-sm p-4 bg-gray-800 text-gray-100 rounded-md">
            {output || 'No output yet...'}
          </div>
        </div>
      </div>
    </div>
  );
}