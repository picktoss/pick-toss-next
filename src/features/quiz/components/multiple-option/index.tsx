import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { ButtonHTMLAttributes } from 'react'

interface MultipleOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  option: string
  condition: Quiz.Condition
  index: number
}

const MultipleOption = ({
  option,
  index,
  condition = 'IDLE',
  onClick,
  disabled,
}: MultipleOptionProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-full gap-[16px] px-[15px] py-[12px] rounded-[16px] items-center border transition-all',
        condition === 'IDLE' && 'bg-background-base-01 border-border-default',
        condition === 'DISABLED' && 'bg-background-disabled',
        condition === 'WRONG' && 'bg-background-disabled',
        condition === 'RIGHT' && 'bg-green-200 border-border-right',
        condition !== 'IDLE' && 'pointer-events-none'
      )}
    >
      <div
        className={cn(
          'size-[32px] shrink-0 rounded-full flex-center',
          condition === 'IDLE' && 'bg-background-base-03 text-gray-500',
          condition === 'DISABLED' && 'bg-background-container-01 text-gray-300'
        )}
      >
        {(condition === 'IDLE' || condition === 'DISABLED') && ORDER_ICONS[index]}
        {condition === 'RIGHT' && <Icon name="correct-check-round" />}
        {condition === 'WRONG' && <Icon name="wrong-x-round" />}
      </div>
      <Text
        typography="subtitle2-medium"
        className={cn(
          'text-start',
          condition === 'IDLE' && 'text-text-secondary',
          condition === 'DISABLED' && 'text-text-disabled',
          condition === 'WRONG' && 'text-text-disabled',
          condition === 'RIGHT' && 'text-border-right !text-subtitle2-bold'
        )}
      >
        {option}
      </Text>
    </button>
  )
}

export default MultipleOption

const ORDER_ICONS = [
  <svg
    key={0}
    width="11"
    height="12"
    viewBox="0 0 11 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.125 11.3333L4.221 0.133301H6.669L10.749 11.3333H8.461L5.437 2.5973L2.397 11.3333H0.125ZM1.933 8.7893L2.509 7.1093H8.205L8.765 8.7893H1.933Z"
      fill="currentColor"
    />
  </svg>,
  <svg
    key={1}
    width="9"
    height="12"
    viewBox="0 0 9 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.444336 11.8664V0.666382H5.03633C5.815 0.666382 6.471 0.789049 7.00434 1.03438C7.53767 1.27972 7.93767 1.62105 8.20433 2.05838C8.48167 2.48505 8.62033 2.98105 8.62033 3.54638C8.62033 4.11172 8.49767 4.58638 8.25233 4.97038C8.007 5.35438 7.68167 5.65305 7.27633 5.86638C6.88167 6.06905 6.44433 6.18638 5.96434 6.21838L6.22033 6.04238C6.73233 6.06372 7.18567 6.20238 7.58033 6.45838C7.98567 6.70371 8.30033 7.03438 8.52433 7.45038C8.759 7.86638 8.87633 8.31972 8.87633 8.81038C8.87633 9.40772 8.73233 9.93571 8.44433 10.3944C8.15633 10.853 7.74033 11.2157 7.19633 11.4824C6.65233 11.7384 5.98567 11.8664 5.19634 11.8664H0.444336ZM2.60434 10.1064H4.84434C5.431 10.1064 5.88434 9.97305 6.20433 9.70638C6.52433 9.43971 6.68433 9.05572 6.68433 8.55438C6.68433 8.05305 6.519 7.66372 6.18833 7.38638C5.85767 7.09838 5.399 6.95438 4.81234 6.95438H2.60434V10.1064ZM2.60434 5.33838H4.68434C5.24967 5.33838 5.67634 5.21038 5.96434 4.95438C6.263 4.69838 6.41233 4.33572 6.41233 3.86638C6.41233 3.40772 6.263 3.05038 5.96434 2.79438C5.67634 2.52772 5.24434 2.39438 4.66833 2.39438H2.60434V5.33838Z"
      fill="currentColor"
    />
  </svg>,
  <svg
    key={2}
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.22305 12.5261C5.10306 12.5261 4.13772 12.2861 3.32705 11.8061C2.52705 11.3155 1.90839 10.6381 1.47105 9.77414C1.04439 8.89947 0.831055 7.89147 0.831055 6.75014C0.831055 5.60881 1.04439 4.60081 1.47105 3.72614C1.90839 2.85147 2.52705 2.16881 3.32705 1.67814C4.13772 1.18747 5.10306 0.942139 6.22305 0.942139C7.57772 0.942139 8.68706 1.27814 9.55105 1.95014C10.4151 2.62214 10.9537 3.57147 11.1671 4.79814H8.81505C8.67639 4.20081 8.38305 3.73681 7.93505 3.40614C7.49772 3.06481 6.92172 2.89414 6.20706 2.89414C5.54572 2.89414 4.97506 3.05414 4.49505 3.37414C4.02572 3.68347 3.66305 4.12614 3.40705 4.70214C3.15105 5.26747 3.02305 5.95014 3.02305 6.75014C3.02305 7.53947 3.15105 8.22214 3.40705 8.79814C3.66305 9.37414 4.02572 9.81681 4.49505 10.1261C4.97506 10.4355 5.54572 10.5901 6.20706 10.5901C6.92172 10.5901 7.49772 10.4355 7.93505 10.1261C8.37239 9.80614 8.66039 9.36347 8.79906 8.79814H11.1671C10.9537 9.96081 10.4151 10.8728 9.55105 11.5341C8.68706 12.1955 7.57772 12.5261 6.22305 12.5261Z"
      fill="currentColor"
    />
  </svg>,
  <svg
    key={3}
    width="11"
    height="12"
    viewBox="0 0 11 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.893555 11.2222V0.0222168H4.63755C5.93889 0.0222168 7.01089 0.256883 7.85355 0.726217C8.70689 1.18488 9.33622 1.83555 9.74155 2.67822C10.1576 3.51022 10.3656 4.49155 10.3656 5.62222C10.3656 6.75288 10.1576 7.73955 9.74155 8.58222C9.33622 9.41422 8.71222 10.0649 7.86955 10.5342C7.02689 10.9929 5.94955 11.2222 4.63755 11.2222H0.893555ZM3.05355 9.36622H4.52555C5.44289 9.36622 6.16289 9.21688 6.68555 8.91822C7.21889 8.61955 7.59755 8.19288 7.82155 7.63822C8.04555 7.07288 8.15755 6.40088 8.15755 5.62222C8.15755 4.83288 8.04555 4.16088 7.82155 3.60622C7.59755 3.04088 7.21889 2.60888 6.68555 2.31022C6.16289 2.01155 5.44289 1.86222 4.52555 1.86222H3.05355V9.36622Z"
      fill="currentColor"
    />
  </svg>,
]
