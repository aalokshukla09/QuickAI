import React from 'react'
import { Sparkles, Edit, Hash } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const BlogTitles = () => {

  const [selectedCategory, setselectedCategory] = useState('General')
  const [input, setinput] = useState('')
  const [loading, setloading] = useState(false)
  const [content, setcontent] = useState('')
  
  const { getToken } = useAuth()

   const blogCategories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Science',
    'Sports',
    'Entertaiment'

  ]

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setloading(true)
      const prompt=`Generate a blog title fo rthe keyword ${input} in the category ${selectedCategory}`
      const {data}=await axios.post('/api/ai/generate-blog-title',{prompt},{
        headers:{Authorization: `Bearer ${await getToken()}`}
      })
      if (data.success) {
        setcontent(data.content)

      } else {
        toast.error(data.message)
      }

    } catch (error) {
       toast.error(error.message)
    }
    setloading(false)
  }
  

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left column */}
      <form action="" className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' onSubmit={onsubmitHandler}>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>AI title Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Keyword</p>
        <input value={input} type="text" className='w-full p-2 border border-gray-300 rounded-md' placeholder='The future of artificial intelligence is ...' required onChange={(e) => setinput(e.target.value)} />


        <p className='mt-6 text-sm font-medium'>Category</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>

          {blogCategories.map((item) => {
            return (
              <span key={item} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? "bg-purple-400 text-white" : ""}`} onClick={() => setselectedCategory(item)}>{item}</span>

            )
          })}

        </div>
        <br />
        <button disabled={loading} className="flex w-full justify-center cursor-pointer items-center gap-2 text-sm bg-gradient-to-r from-[#c81eea] to-[#65ADFF] text-white px-4 py-2 rounded-2xl ">
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Hash className="w-5 " />
            )}
            Generate Titles
          </button>

      </form>

      {/* Right coloumn */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Edit className='w-5 h-5 text-purple-500' />
          <h1 className='text-xl font-semibold' >Generated Title</h1>
        </div>

        
          {
          !content?(<div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5
text-gray-400'>
            <Hash className='w-9 h-9' />

            <p>Enter a topic and click "Generate Title " to get started</p>
          </div>
        </div>):(
          <div className='flex-1 overflow-y-scroll mt-3 text-sm text-slate-600'>
            <div className='reset-tw'>
              <Markdown>
            {content}
            </Markdown>
            </div>
          </div>
        )
        }
        
      </div>

    </div>
  )
}

