import { Home, LayoutDashboard, MonitorCheck } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ModeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <LayoutDashboard className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />
        <nav className=" flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/orders">
            <MonitorCheck className="h-4 w-4" />
            Pedidos
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
