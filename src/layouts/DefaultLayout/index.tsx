import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'
import { NavBar } from '../../components/NavBar'

import { LayoutContainer } from './styles'
export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
      <NavBar />
    </LayoutContainer>
  )
}
