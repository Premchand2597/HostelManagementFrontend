import React from 'react'
import { Outlet } from 'react-router'
import TopNav from '../NavBars/TopNav'
import { Toaster } from 'react-hot-toast'

const BaseLayout = () => {
  return (
    <>
      <Toaster />
      <TopNav/>
      <Outlet/>
    </>
  )
}

export default BaseLayout
