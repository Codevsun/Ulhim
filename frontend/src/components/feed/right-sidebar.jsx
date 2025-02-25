export default function RightSidebar() {
  return (
    <div className="m-2 w-[320px] rounded-2xl bg-gray-900/20 p-6">
      <div className="mb-8">
        <h3 className="mb-4 text-lg text-white">In Progress</h3>
        <div className="overflow-hidden rounded-xl border border-white/5 bg-white/5">
          <img
            src="/path-to-task-automation.png"
            alt="Task Automation"
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h4 className="mb-1 text-white">Task Automation</h4>
            <p className="text-sm text-gray-400">Libraries</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg text-white">Suggested People</h3>
          <button className="text-sm text-purple-200">See all</button>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Mohammed Ali', username: '@MohAli' },
            { name: 'Rami Ahmed', username: '@RamiAH' },
            { name: 'Joud Salem', username: '@Joudsalem' },
            { name: 'Salman Mohammed', username: '@Salman2002' },
            { name: 'Yara Abdullah', username: '@AbYara' },
          ].map((person) => (
            <div key={person.username} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}`}
                  alt={person.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <h4 className="text-sm text-white">{person.name}</h4>
                  <p className="text-xs text-gray-500">{person.username}</p>
                </div>
              </div>
              <button className="rounded-full bg-purple-500/10 px-4 py-1 text-sm text-purple-400 transition-colors hover:bg-purple-500/20">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg text-white">My Friends</h3>
          <button className="text-sm text-purple-200">See all</button>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Sara Abdullah', username: '@SaraAbdullah' },
            { name: 'Rahaf Abdullah', username: '@RahafAbdul' },
            { name: 'Daad Sami', username: '@DaSami' },
            { name: 'Shams hamad', username: '@SuHamad' },
            { name: 'Maab Mohammed', username: '@MaabMoh' },
          ].map((friend) => (
            <div key={friend.username} className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`}
                alt={friend.name}
                className="h-8 w-8 rounded-full"
              />
              <div>
                <h4 className="text-sm text-white">{friend.name}</h4>
                <p className="text-xs text-gray-500">{friend.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
