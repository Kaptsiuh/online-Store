import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const App: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="container">Header</div>
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
