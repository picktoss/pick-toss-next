import { PropsWithChildren } from 'react'

export default function LandingLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-md xl:max-w-none">{children}</div>
    </div>
  )
}
