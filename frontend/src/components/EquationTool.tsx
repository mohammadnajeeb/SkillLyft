import { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface Step {
  latex: string;
  explanation: string;
}

interface EquationToolProps {
  isOpen: boolean;
  onClose: () => void;
  initialEquation?: string;
}

export default function EquationTool({ isOpen, onClose, initialEquation }: EquationToolProps) {
  const [equation, setEquation] = useState(initialEquation || '');
  const [chunks, setChunks] = useState<string[]>([]);
  const [proofSteps, setProofSteps] = useState<Step[]>([]);
  const [currentLatex, setCurrentLatex] = useState('');
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [activeTab, setActiveTab] = useState<'chunk' | 'prove'>('chunk');

  const handleChunkEquation = () => {
    // Split equation into meaningful chunks based on operators and parentheses
    const newChunks = equation
      .replace(/([+\-*/=()])/g, ' $1 ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    setChunks(newChunks);
  };

  const handleAddProofStep = () => {
    if (currentLatex && currentExplanation) {
      setProofSteps([...proofSteps, { latex: currentLatex, explanation: currentExplanation }]);
      setCurrentLatex('');
      setCurrentExplanation('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Equation Tools</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('chunk')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'chunk'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Equation Chunking
          </button>
          <button
            onClick={() => setActiveTab('prove')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'prove'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Proof Writing
          </button>
        </div>

        {/* Chunking Tool */}
        {activeTab === 'chunk' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Equation (LaTeX format)
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={equation}
                  onChange={(e) => setEquation(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="e.g. x^2 + 2x + 1"
                />
                <button
                  onClick={handleChunkEquation}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Chunk Equation
                </button>
              </div>
            </div>

            {equation && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-lg mb-2">Preview:</div>
                <BlockMath math={equation} />
              </div>
            )}

            {chunks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Equation Chunks</h3>
                <div className="grid grid-cols-2 gap-4">
                  {chunks.map((chunk, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <InlineMath math={chunk} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Proof Writing Tool */}
        {activeTab === 'prove' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step (LaTeX)
                </label>
                <input
                  type="text"
                  value={currentLatex}
                  onChange={(e) => setCurrentLatex(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="e.g. \frac{d}{dx}(x^2)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Explanation
                </label>
                <input
                  type="text"
                  value={currentExplanation}
                  onChange={(e) => setCurrentExplanation(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Explain this step..."
                />
              </div>
            </div>

            {currentLatex && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-lg mb-2">Preview:</div>
                <BlockMath math={currentLatex} />
              </div>
            )}

            <button
              onClick={handleAddProofStep}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Add Step
            </button>

            {proofSteps.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Proof Steps</h3>
                <div className="space-y-4">
                  {proofSteps.map((step, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="mb-2">
                        <BlockMath math={step.latex} />
                      </div>
                      <div className="text-gray-700">{step.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
