import React from 'react'
import { Sparkles, Eraser } from 'lucide-react'
import { useState } from 'react';

export const RemoveBackground = () => {

  const [input, setInput] = useState("");

  const onsubmitHandler = async (e) => {
    e.preventDefault();
  }

  return (
<div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left column */}
      <form action="" className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' onSubmit={onsubmitHandler}>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input 
        accept='image/*' 
        type="file" 
        className='w-full p-2 border border-gray-300 rounded-md' 
        placeholder='Describe what you want to generate'
        required onChange={(e) => setInput(e.target.files[0])} />

      <p className="mt-2 text-xs text-gray-400">
          Supports PNG,JPG nad other formats
        </p>

        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r
         from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          <Eraser className='w-5' />Remove background</button>


      </form>

      {/* Right coloumn */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Eraser className='w-5 h-5 text-[#FF4938]' />
          <h1 className='text-xl font-semibold' >Processed Image</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5
           text-gray-400'>
            <Eraser className='w-9 h-9' />
            
            <p>Choose an image and click "Remove Background" to get started</p>
          </div>
        </div>
        
        
      </div>

    </div>
  )
}
