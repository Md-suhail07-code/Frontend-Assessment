import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='bg-slate-50 min-h-screen flex flex-col space-y-3 justify-center items-center'>
      <h1 className='text-xl font-semibold text-black'>404</h1>
      <p className='text-md text-gray-600'>Page not found</p>
      <button onClick={() => navigate('/')} className='ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-200'>
        Back to Dashboard
      </button>
    </div>
  )
}

export default NotFound
