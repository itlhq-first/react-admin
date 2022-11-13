import { createBrowserRouter } from 'react-router-dom'
import LayoutPage from '../page/Layout'
import Home from '../page/Home'
import Table from '../page/Table'
import Chart from '../page/Chart'
import Carousel from '../page/Carousel'
import Animation from '../page/Animation'
import RichText from '../page/RichText'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/table',
        element: <Table />,
      },
      {
        path: '/chart',
        element: <Chart />,
      },
      {
        path: '/animation',
        element: <Animation />,
      },
      {
        path: '/carousel',
        element: <Carousel />,
      },
      {
        path: '/richText',
        element: <RichText />,
      },
    ],
  },
])

export default router
