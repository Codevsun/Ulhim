import { Logo } from '../signup/logo'

export default function NavBar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#050508]/80 px-6 py-4 backdrop-blur-sm">
      <Logo />
      <div className="flex flex-1 items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Explore"
          className="w-[600px] rounded-full border border-white/5 bg-white/5 px-6 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
        />
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
