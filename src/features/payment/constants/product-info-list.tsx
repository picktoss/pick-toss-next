import Image from 'next/image'
import STARS_IN_BOX from '@/../../public/images/stars-in-box.png'
import STARS_IN_POCKET from '@/../../public/images/stars-in-pocket.png'

export const productInfoList = [
  {
    key: 'box',
    image: <Image src={STARS_IN_BOX} alt="" className="ml-[5px] h-[89px] w-auto" />,
    tagMessage: '+50% 보너스',
    starCount: 100,
    bonusCount: 40,
    paymentAmount: 25000,
  },
  {
    key: 'pocket',
    image: <Image src={STARS_IN_POCKET} alt="" className="h-[89px] w-auto" />,
    tagMessage: '+50% 보너스',
    starCount: 80,
    bonusCount: 30,
    paymentAmount: 15000,
  },
  {
    key: 'another',
    image: <Image src={STARS_IN_POCKET} alt="" className="h-[89px] w-auto" />,
    tagMessage: '+50% 보너스',
    starCount: 80,
    bonusCount: 30,
    paymentAmount: 15000,
  },
]
