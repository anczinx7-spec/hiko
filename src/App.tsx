import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Chat Assistant
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Powered by Google Gemini AI
            </p>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to the AI Chatbot
              </h2>
              <p className="text-gray-600 mb-4">
                Click the chat button in the bottom right corner to start a conversation with the AI assistant.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-gray-800 mb-2">Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Powered by Google Gemini AI</li>
                  <li>• Real-time conversational responses</li>
                  <li>• Clean and intuitive interface</li>
                  <li>• Easily embeddable on any website</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}

export default App;
