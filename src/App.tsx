import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useCartContext } from './context/CartContext'

const App: FC = () => {
  const { totalCount, totalPrice } = useCartContext()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="shadow">
        <div
          className="container py-4 md:py-5
         flex justify-between items-center"
        >
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            <Link to="/">Online Store</Link>
          </h1>
          <div className="flex items-center gap-x-4">
            <div>
              total: <span className="font-medium">{totalPrice}$</span>
            </div>
            <Link to="/cart">
              <span className="h-8 w-8 bg-orange-500 flex items-center justify-center rounded-full text-white font-bold">
                {totalCount}
              </span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4">
          <Outlet />
        </div>
      </main>
      <footer className="bg-gray-800">
        <div className="container text-white flex items-center justify-between max-md:flex-col">
          <div>
            <a href="https://rs.school/js/">RSS</a>
          </div>
          <div className="flex">
            <a href="https://github.com/Kaptsiuh" className="flex m-4 items-center">
              <img src="../src/assets/github.svg" alt="github" className="w-8 m-2" />
              <p>Kaptsiuh</p>
            </a>
            <a href="https://github.com/kovalev-ds" className="flex m-4 items-center">
              <img src="../src/assets/github.svg" alt="github" className="w-8 m-2" />
              kovalev-ds
            </a>
          </div>
          <div>© Online Store 2022</div>
        </div>
      </footer>
    </div>
  )
}

export default App
