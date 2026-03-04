import type { PropsWithChildren } from 'react'
import { cn } from '../../../core/utils/cn'
import { useInView } from '../../../presentation/hooks/useInView'

interface RevealProps {
  className?: string
}

export function Reveal({ children, className }: PropsWithChildren<RevealProps>) {
  const { targetRef, inView } = useInView<HTMLDivElement>({ triggerOnce: true })

  return (
    <div ref={targetRef} className={cn('reveal', inView && 'visible', className)}>
      {children}
    </div>
  )
}
