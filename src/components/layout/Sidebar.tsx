import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Brain, 
  BarChart2, 
  Folder, 
  PlaySquare, 
  HelpCircle, 
  User, 
  CreditCard, 
  Home, 
  LayoutDashboard 
} from 'lucide-react';
import UserProfileSection from './UserProfileSection';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex-shrink-0 p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-[#F5B544]" />
          <span className="font-medium">InterviewBee</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <nav className="p-2">
          <div className="mb-2 px-3 text-sm text-gray-500">Dashboard</div>
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isActive('/dashboard') 
                ? 'bg-[#FFF8EE] text-[#F5B544]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <Link 
            to="/dashboard2" 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isActive('/dashboard2')
                ? 'bg-[#FFF8EE] text-[#F5B544]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard 2</span>
          </Link>
          
          <Link 
            to="/interviews" 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isActive('/interviews')
                ? 'bg-[#FFF8EE] text-[#F5B544]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart2 className="w-5 h-5" />
            <span>My Interviews</span>
          </Link>
          
          <Link 
            to="/documents"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isActive('/documents')
                ? 'bg-[#FFF8EE] text-[#F5B544]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Folder className="w-5 h-5" />
            <span>My Documents</span>
          </Link>

          <div className="mt-8 mb-2 px-3 text-sm text-gray-500">Support</div>
          <Link 
            to="/tutorials"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isActive('/tutorials')
                ? 'bg-[#FFF8EE] text-[#F5B544]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <PlaySquare className="w-5 h-5" />
            <span>Tutorials</span>
          </Link>
          
          <Link 
            to="/faqs"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isActive('/faqs')
                ? 'bg-[#FFF8EE] text-[#F5B544]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>FAQs</span>
          </Link>

          <div className="mt-8 mb-2 px-3 text-sm text-gray-500">My Account</div>
          <Link 
            to="/profile"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isActive('/profile')
                ? 'bg-[#FFF8EE] text-[#F5B544]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          
          <Link 
            to="/subscription"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              isActive('/subscription')
                ? 'bg-[#FFF8EE] text-[#F5B544]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Subscription Plan</span>
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <button className="w-full py-2 bg-[#FFF8EE] text-[#F5B544] rounded-lg hover:bg-[#F5B544] hover:text-white transition-colors mb-4">
          + Upgrade Plan
        </button>
        <UserProfileSection />
      </div>
    </div>
  );
}

export default Sidebar;