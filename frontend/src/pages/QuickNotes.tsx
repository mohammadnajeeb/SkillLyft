import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import BottomNav from '../components/BottomNav';

interface Note {
  id: string;
  content: string;
  timestamp: Date;
  tags: string[];
}

// TinyMCE Configuration
const TINYMCE_API_KEY = 'vpwom12x5a1umgyygbv7giucwkrxidwd2z2v8d07863jd36r';

const editorConfig = {
  apiKey: TINYMCE_API_KEY,
  height: 300,
  menubar: true,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons'
  ],
  toolbar: 'undo redo | formatselect | ' +
    'bold italic forecolor backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat table image media | help',
  content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }',
  table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol'
};

export default function QuickNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const navigate = useNavigate();

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote.trim(),
      timestamp: new Date(),
      tags: [...tags]
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
    setTags([]);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputTag.trim()) {
      setTags(prev => [...prev, inputTag.trim()]);
      setInputTag('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="flex items-center text-xl font-semibold text-gray-900">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Quick Notes
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Note Input */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add a Note</h2>
              <form onSubmit={handleAddNote} className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Editor
                    value={newNote}
                    onEditorChange={(content: string) => setNewNote(content)}
                    init={editorConfig}
                  />
                </div>
                
                {/* Tags */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-primary-100 text-primary-800 rounded-md text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags (press Enter)"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    newNote.trim()
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Save Note
                </button>
              </form>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
              {notes.map(note => (
                <div key={note.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: note.content }} />
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-primary-100 text-primary-800 rounded-md text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {note.timestamp.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border-t border-gray-200">
        <BottomNav activePage="notes" />
      </div>
    </div>
  );
}
