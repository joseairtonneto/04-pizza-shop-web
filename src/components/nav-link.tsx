import { Link, type LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()
  const isActive = pathname === props.to

  return (
    <Link
      data-current={isActive}
      className='text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex items-center gap-1.5 text-sm font-medium'
      {...props}
    />
  )
}
