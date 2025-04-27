import { useState } from 'react'
import CompanyLayout from '../components/company/CompanyLayout'

export default function CompanyMessages() {
    const [activeTab, setActiveTab] = useState('inbox')
    const [searchQuery, setSearchQuery] = useState('')
    
    // Mock data for messages
    const messages = [
        {
            id: 1,
            student: {
                id: 1,
                name: 'Ahmed Al-Farsi',
                image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
                major: 'Computer Science'
            },
            subject: 'Regarding Frontend Developer Position',
            preview: 'I am interested in the Frontend Developer position you posted...',
            date: '2023-11-05',
            unread: true
        },
        {
            id: 2,
            student: {
                id: 2,
                name: 'Fatima Khalid',
                image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
                major: 'Software Engineering'
            },
            subject: 'AI Challenge Inquiry',
            preview: 'I have some questions about the AI challenge requirements...',
            date: '2023-11-03',
            unread: false
        },
        {
            id: 3,
            student: {
                id: 3,
                name: 'Omar Saeed',
                image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar',
                major: 'Information Systems'
            },
            subject: 'Thank you for the opportunity',
            preview: 'I wanted to thank you for the interview opportunity...',
            date: '2023-11-01',
            unread: false
        }
    ]

    // Filter messages based on search query
    const filteredMessages = messages.filter(message => 
        message.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <CompanyLayout>
            <div className="container mx-auto px-4 py-6">
                <h1 className="mb-6 text-2xl font-bold text-white">Messages</h1>
                
                {/* Search and Tabs */}
                <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none sm:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    
                    <div className="flex space-x-2">
                        <button
                            className={`rounded-lg px-4 py-2 text-sm font-medium ${
                                activeTab === 'inbox'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                            onClick={() => setActiveTab('inbox')}
                        >
                            Inbox
                        </button>
                        <button
                            className={`rounded-lg px-4 py-2 text-sm font-medium ${
                                activeTab === 'sent'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                            onClick={() => setActiveTab('sent')}
                        >
                            Sent
                        </button>
                        <button
                            className={`rounded-lg px-4 py-2 text-sm font-medium ${
                                activeTab === 'drafts'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                            onClick={() => setActiveTab('drafts')}
                        >
                            Drafts
                        </button>
                    </div>
                </div>
                
                {/* Messages List */}
                <div className="rounded-lg border border-white/10 bg-white/5">
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((message, index) => (
                            <div
                                key={message.id}
                                className={`flex cursor-pointer items-center border-white/5 p-4 hover:bg-white/10 ${
                                    index !== filteredMessages.length - 1 ? 'border-b' : ''
                                } ${message.unread ? 'bg-white/10' : ''}`}
                            >
                                <div className="mr-4 flex-shrink-0">
                                    <img
                                        src={message.student.image}
                                        alt={message.student.name}
                                        className="h-12 w-12 rounded-full"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-white">
                                            {message.student.name}
                                            {message.unread && (
                                                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                                            )}
                                        </h3>
                                        <span className="text-sm text-gray-400">{message.date}</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-300">{message.subject}</p>
                                    <p className="text-sm text-gray-400">{message.preview}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-6 text-center text-gray-400">
                            No messages found. Try a different search term.
                        </div>
                    )}
                </div>
                
                {/* Compose Button */}
                <div className="mt-6 flex justify-end">
                    <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        <svg
                            className="mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        Compose Message
                    </button>
                </div>
            </div>
        </CompanyLayout>
    )
}