import React from 'react'
import { Sparkle, Edit } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const WriteArticle = () => {

  const articlelength = [
    { length: 800, text: 'Short (500-800 word)' },
    { length: 1200, text: 'Medium (800-1200 word)' },
    { length: 1600, text: 'Long (1200+ word)' }
  ]

  const [selectedlength, setselectedlength] = useState(articlelength[0])
  const [input, setinput] = useState('')
  const [loading, setloading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken} = useAuth()

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setloading(true)
      const prompt = `Write an article about ${input} in ${selectedlength.text}`

      const { data } = await axios.post('/api/ai/generate-article', { prompt, length: selectedlength.length }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        setContent(data.content)

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
          <Sparkle className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Article Configurtaion</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Article Title</p>
        <input value={input} type="text" className='w-full p-2 border border-gray-300 rounded-md' placeholder='The future of artificial intelligence is ...' required onChange={(e) => setinput(e.target.value)} />



        <p className='mt-6 text-sm font-medium'>Article length</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>

          {articlelength.map((item, index) => {
            return (
              <span key={index} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedlength.length === item.length ? 'bg-[#4A7AFF] text-white' : ''}`} onClick={() => setselectedlength(item)}>{item.text}</span>

            )
          })}

        </div>
        <br />
        <button
            disabled={loading}
            className="flex w-full justify-center cursor-pointer items-center gap-2 text-sm bg-gradient-to-r from-[#226BEE] to-[#65ADFF] text-white px-4 py-2 rounded-2xl "
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Edit className="w-5 " />
            )}
            Generate Article
          </button>


      </form>

      {/* Right coloumn */}
      {/* Right column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Edit className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated article</h1>
        </div>

        
          {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Edit className='w-9 h-9' />
              <p>Enter a topic and click "Generate Article" to get started</p>
            </div>
          </div>
        ) : (
          <div className='flex-1 overflow-y-scroll mt-3 text-sm text-slate-600'>
            <div className='reset-tw'>
            <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
        </div>



    </div>
  )
}
