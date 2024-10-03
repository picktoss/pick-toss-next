import { SVGAttributes, memo } from 'react'
import * as SvgElement from './svg-components'

type SvgElementKeys = keyof typeof SvgElement

interface IconProps extends SVGAttributes<SVGElement> {
  name: KebabCase<SvgElementKeys>
  className?: HTMLElement['className']
}

const Icon = memo(function Icon({ name, className, ...props }: IconProps) {
  const IconElement = SvgElement[kebabToPascal(name) as SvgElementKeys]

  return <IconElement className={className} {...props} />
})

type KebabCase<S> = S extends `${infer C}${infer T}`
  ? KebabCase<T> extends infer U
    ? U extends string
      ? T extends Uncapitalize<T>
        ? `${Uncapitalize<C>}${U}`
        : `${Uncapitalize<C>}-${U}`
      : never
    : never
  : S

function kebabToPascal(text: string) {
  return text
    .split('-')
    .map((string) => string.slice(0, 1).toUpperCase() + string.slice(1))
    .join('')
}

export default Icon
