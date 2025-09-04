import React from 'react'
// import { dummyCreationData } from '../assets/assets'
import CreationItem from '../components/CreationItem'
import { Sparkle, Gem } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Protect, useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-hot-toast'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const DashBoard = () => {

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true);

  const { getToken } = useAuth();

  const getdashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creation", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }


  useEffect(() => {
    getdashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-scroll p-6'>
      {/* Cards container */}
      <div className='flex justify-start gap-4 flex-wrap'>
        {/* Total Creations */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkle className='w-4 text-white' />
          </div>
        </div>

        {/* Active Plan */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold'>
              <Protect plan='paid' fallback='Free'>Paid</Protect>
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
            <Gem className='w-4 text-white' />
          </div>
        </div>
      </div>

      {/* Recent Creations */}
        {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <span className="w-11 h-11 my-1 rounded-full border-3 border-purple-500 border-t-transparent animate-spin"></span>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mt-6 mb-4">Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      )}
     
    </div>
  )
}
