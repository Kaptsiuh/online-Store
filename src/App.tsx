import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'

const App: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className='shadow'>
        <div className="container py-4 md:py-5
         flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            <Link to="/">Online Store</Link>
          </h1>
          <div className='flex items-center gap-x-4'>
            <div>total: <span className='font-medium'>0$</span></div>
            <Link to="/cart">
              <span className="h-8 w-8 bg-orange-500 flex items-center justify-center rounded-full text-white font-bold">
                {0}
              </span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer>
        <div className="container">footer</div>
      </footer>
    </div>
  )
}

export default App
