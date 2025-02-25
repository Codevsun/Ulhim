import NavBar from '../components/feed/nav-bar'
import PersonalInfoCard from '../components/feed/personal-info-card'
import NavigationMenu from '../components/feed/navigation-menu'
import AdditionalNavigationMenu from '../components/feed/additional-navigation-menu'
import Filters from '../components/feed/filters'
import CreatePosts from '../components/feed/create-posts'
import Dashboard from '../components/feed/dashboard'
import RightSidebar from '../components/feed/right-sidebar'
export function HomePage() {
  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Top Navigation Bar */}
      <NavBar />

      <div className="flex pt-16">
        {/* Left Sidebar */}
        <div className="m-2 w-[280px] space-y-8">
          {/* Profile Section */}
          <PersonalInfoCard />

          {/* Navigation Menu */}
          <NavigationMenu />
          {/* Help and Logout Section */}
          <AdditionalNavigationMenu />
        </div>

        {/* Main Content */}
        <div className="m-2 flex-1 rounded-2xl bg-gray-900/20 p-6">
          <Filters />

          {/* Create Post */}
          <CreatePosts />

          {/* Feed Post */}
          <Dashboard />
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  )
}
