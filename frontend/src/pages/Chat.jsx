import { useState } from 'react'
import { Home } from './Home'

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Add user message
      const userMessage = { text: newMessage, sender: 'user' }
      setMessages(prev => [...prev, userMessage])
      setNewMessage('')
      setIsLoading(true)

      try {
        // Simulate bot response - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const botResponse = { 
          text: "I'm a demo chatbot. In the real implementation, this would be replaced with an actual API response.", 
          sender: 'bot' 
        }
        setMessages(prev => [...prev, botResponse])
      } catch (error) {
        console.error('Failed to get bot response:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Home>
      <div className="flex flex-col h-full max-w-4xl mx-auto bg-black rounded-xl shadow-2xl p-6 border border-purple-900/30">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-300">AI Assistant</h1>
        
        <div className="flex-1 overflow-y-auto mb-6 space-y-6 pr-4 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-black">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex items-end space-x-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/30">
                  <span className="text-purple-300 text-sm">AI</span>
                </div>
              )}
              <div className={`max-w-[70%] p-4 rounded-2xl ${
                message.sender === 'user' 
                  ? 'bg-purple-900/30 text-purple-100 rounded-br-none border border-purple-500/30' 
                  : 'bg-black text-purple-100 rounded-bl-none border border-purple-500/30'
              } shadow-lg`}>
                {message.text}
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/30">
                  <span className="text-purple-300 text-sm">You</span>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/30">
                <span className="text-purple-300 text-sm">AI</span>
              </div>
              <div className="bg-black p-4 rounded-2xl rounded-bl-none border border-purple-500/30 shadow-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="flex gap-3 bg-black p-4 rounded-xl border border-purple-500/30">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 bg-purple-900/20 text-purple-100 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-300/50"
            disabled={isLoading}
          />
          <button 
            type="submit"
            className={`px-6 py-3 bg-purple-900/50 text-purple-100 rounded-xl font-medium transition-all duration-200 border border-purple-500/30 ${
              isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-purple-800/50 hover:shadow-lg active:transform active:scale-95'
            }`}
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>
    </Home>
  )
}