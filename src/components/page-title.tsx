import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

interface PageTitleProps {
  title: string
  icon?: StaticImport
}

export default function PageTitle({ title, icon }: PageTitleProps) {
  return (
    <div className="mb-[26px] flex items-start gap-[8px] lg:mb-[28px]">
      <h1 className="text-h3-bold text-gray-09 lg:text-h2-medium">{title}</h1>
      {icon && (
        <div className="relative h-[21.67px] w-[25.05px] lg:h-[30px] lg:w-[34.69px]">
          <Image src={icon} fill alt="" />
        </div>
      )}
    </div>
  )
}
