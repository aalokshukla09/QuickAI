import React from 'react'
import { Sparkles, Scissors } from 'lucide-react'
import { useState } from 'react'

export const RemoveObject = () => {

  const [input, setInput] = useState("");
  const [object, setobject] = useState("");
  
  const onsubmitHandler = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left column */}
      <form action="" className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' onSubmit={onsubmitHandler}>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4538ff]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>

        <input accept='image/*' 
        type="file" 
        className='w-full p-2 border border-gray-300 rounded-md' 
        placeholder=' Upload image' 
        required onChange={(e) => setInput(e.target.files[0])} />
        <p className="mt-2 text-xs text-gray-400">Supports PNG,JPG nad other formats</p>

         <p className="mt-6 text-sm font-medium">Descibe your Object to remove</p>

        <textarea 
        value={object} 
        rows={4}
        className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' 
        placeholder='e.g., watch or spoon,Only single object name' 
        required onChange={(e) => setobject(e.target.value)} />

        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r
         from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
           <Scissors className='w-5' />Remove Object</button>


      </form>
      {/* Right coloumn */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Scissors className='w-5 h-5 text-[#4538ff]' />
          <h1 className='text-xl font-semibold' >Processed Image</h1>
        </div>
       <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Scissors className='w-9 h-9' />

              <p>Enter a topic and click "Remove Object" to get started</p>
            </div>
          </div>
        

      </div>

    </div>
  )
}
