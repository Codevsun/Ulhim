export function Sparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Left twinkle */}
      <div
        className="absolute w-0.5 h-0.5 bg-gradient-to-r from-white/40 via-blue-200/30 to-white/40 rounded-full animate-[twinkle_2s_ease-in-out_infinite]"
        style={{
          left: "25%",
          top: "30%",
          boxShadow: "0 0 15px 5px rgba(255,255,255,0.3)",
        }}
      />
      {/* Right twinkles */}
      <div
        className="absolute w-1 h-1 bg-gradient-to-r from-white/40 via-purple-200/30 to-white/40 rounded-full animate-[twinkle_2.5s_ease-in-out_infinite]"
        style={{
          right: "30%",
          top: "20%",
          animationDelay: "0.5s",
          boxShadow: "0 0 20px 8px rgba(255,255,255,0.25)",
        }}
      />
      <div
        className="absolute w-0.5 h-0.5 bg-gradient-to-r from-white/40 via-blue-200/30 to-white/40 rounded-full animate-[twinkle_2.2s_ease-in-out_infinite]"
        style={{
          right: "15%",
          top: "60%",
          animationDelay: "1s",
          boxShadow: "0 0 18px 6px rgba(255,255,255,0.2)",
        }}
      />
    </div>
  )
}