import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '~/hooks'
import Navbar from './Navbar'
import Player from './Player'
import Sidebar from './Sidebar'
import Viewbar from './Viewbar'
import Footer from './Footer'
import Notification from './Notification'

const DefaultLayout: React.FC = () => {
  const { theme } = useAppSelector(
    (state) => state.settings
  )
  const { view } = useAppSelector((state) => state.global)
  const { track } = useAppSelector(
    (state) => state.trackPlay
  )

  return (
    <div
      className={`app ${theme ? 'dark__theme' : 'light__theme'}`}
    >
      <Navbar />
      <div
        className={
          track ? 'container hastrack' : 'container'
        }
      >
        <Sidebar />
        <div className='main'>
          <Outlet />
          <Footer />
        </div>
        {view.isView && <Viewbar />}
      </div>
      <Player />
      <Notification />
    </div>
  )
}

export default DefaultLayout
