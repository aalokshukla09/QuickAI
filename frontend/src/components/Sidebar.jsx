import React from 'react'
import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, ScissorsIcon, SquarePen, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: 'write-article', label: 'Write Article', Icon: SquarePen },
    { to: 'blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: 'generate-images', label: 'Generate Images', Icon: Image },
    { to: 'remove-background', label: 'Remove background', Icon: Eraser },
    { to: 'remove-Object', label: 'Remove object', Icon: ScissorsIcon },
    { to: 'review-resume', label: 'Review Resume', Icon: FileText },
    { to: 'community', label: 'Community', Icon: Users },
  ]

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} 
      transition-all duration-300 ease-in-out`}
    >
      {/* Top user info & nav */}
      <div className='my-7 w-full'>
        <img src={user.imageUrl} alt="" className='w-13 rounded-full mx-auto' />
        <h1 className='mt-1 text-center'>{user.fullName}</h1>

        <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded transition-colors duration-200 
                ${isActive
                  ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                  : 'hover:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className={isActive ? 'text-white' : 'text-gray-800'}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className='w-full border-t border-gray-200 px-7 p-4 flex items-center justify-between'>
        <div className='flex gap-2 items-center cursor-pointer' onClick={openUserProfile}>
          <img src={user.imageUrl} alt="" className='w-8 rounded-full'/>
          <div>
            <h1 className='text-sm font-medium'>{user.fullName}</h1>
            <p className='text-xs text-gray-500'>
              <Protect plan='paid' fallback="Free"
              >Paid </Protect>Plan
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="p-2 rounded hover:bg-gray-100 transition"
          title="Log out"
        >
          <LogOut className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}

export default Sidebar