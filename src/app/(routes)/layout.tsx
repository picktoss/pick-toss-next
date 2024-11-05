interface RoutesLayoutProps {
  children: React.ReactNode
}

const RoutesLayout = ({ children }: Readonly<RoutesLayoutProps>) => {
  return <>{children}</>
}

export default RoutesLayout
