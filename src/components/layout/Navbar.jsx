import CardNav from './CardNav'
import { navItems } from '../../data/navigation'

export default function Navbar({ onLogoClick, isLoading }) {
  return (
    <CardNav items={navItems} onLogoClick={onLogoClick} isLoading={isLoading} />
  )
}
