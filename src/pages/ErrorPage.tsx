import { FC } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

const ErrorPage: FC = () => {
  const error = useRouteError()
  console.log(error)

  const navigate = useNavigate()
  return (
    <div className='space-y-4'>
      <h2 className='text-xl text-gray-500 font-medium'>Error</h2>
      <p className='text-gray-400'>Something went wrong!</p>
      <button className='button' onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  )
}

export default ErrorPage
