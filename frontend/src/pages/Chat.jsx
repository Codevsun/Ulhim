import { useState } from 'react'
import { Home } from './Home'

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Add user message
      const userMessage = { text: newMessage, sender: 'user' }
      setMessages((prev) => [...prev, userMessage])
      setNewMessage('')
      setIsLoading(true)

      try {
        // Simulate bot response - replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const botResponse = {
          text: "welcome to the Ulhim's chatbot, you can ask about anything regarding your major, skills, suggestions and more! ",
          sender: 'bot',
        }
        setMessages((prev) => [...prev, botResponse])
      } catch (error) {
        console.error('Failed to get bot response:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Home>
      <div className="mx-auto flex h-full max-w-4xl flex-col rounded-xl border border-purple-900/30 bg-black p-6 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-purple-300">AI Assistant</h1>

        <div className="scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-black mb-6 flex-1 space-y-6 overflow-y-auto pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-end space-x-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/50">
                  <span className="text-sm text-purple-300">AI</span>
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'rounded-br-none border border-purple-500/30 bg-purple-900/30 text-purple-100'
                    : 'rounded-bl-none border border-purple-500/30 bg-black text-purple-100'
                } shadow-lg`}
              >
                {message.text}
              </div>
              {message.sender === 'user' && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/50">
                  <span className="text-sm text-purple-300">You</span>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/30 bg-purple-900/50">
                <span className="text-sm text-purple-300">AI</span>
              </div>
              <div className="rounded-2xl rounded-bl-none border border-purple-500/30 bg-black p-4 shadow-lg">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-purple-400"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-purple-400"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSend}
          className="flex gap-3 rounded-xl border border-purple-500/30 bg-black p-4"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-purple-500/30 bg-purple-900/20 p-3 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`rounded-xl border border-purple-500/30 bg-purple-900/50 px-6 py-3 font-medium text-purple-100 transition-all duration-200 ${
              isLoading
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-purple-800/50 hover:shadow-lg active:scale-95 active:transform'
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
