import { PropsWithChildren } from 'react'

export default function LandingLayout({ children }: PropsWithChildren) {
  return <div className="bg-white">{children}</div>
}
