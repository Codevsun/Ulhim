export default function PersonalInfoCard() {
  return (
    <div className="rounded-2xl bg-gray-900/20 p-6 mt-4">
      <div className="flex items-center gap-3">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fatimah"
          alt="Profile"
          className="h-12 w-12 rounded-full"
        />
        <div>
          <h3 className="text-white">Fatimah Abdulrahman</h3>
          <p className="text-sm text-gray-500">@FatimahAb</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div className="text-center">
          <div className="text-white">230</div>
          <div className="text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-white">600</div>
          <div className="text-gray-500">Following</div>
        </div>
        <div className="text-center">
          <div className="text-white">23</div>
          <div className="text-gray-500">Posts</div>
        </div>
      </div>
    </div>
  )
}
