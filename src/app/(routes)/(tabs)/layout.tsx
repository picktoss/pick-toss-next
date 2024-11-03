import BottomNavigation from '@/shared/components/custom/bottom-navigation'

const TabsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <div className="pb-[88px]">{children}</div>
      <BottomNavigation />
    </>
  )
}

export default TabsLayout
