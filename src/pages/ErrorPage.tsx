import { FC } from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage: FC = () => {
  const error = useRouteError()

  console.log(error);

  return <div>Error Page</div>
}

export default ErrorPage
