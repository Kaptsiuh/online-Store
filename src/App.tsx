import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const App: FC = () => {
  return (
    <>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  )
}

export default App
