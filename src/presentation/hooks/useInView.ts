import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement>(options?: UseInViewOptions) {
  const targetRef = useRef<T | null>(null)
  const [inView, setInView] = useState<boolean>(false)

  useEffect(() => {
    const element = targetRef.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)

          if (options?.triggerOnce !== false) {
            observer.disconnect()
          }
        } else if (options?.triggerOnce === false) {
          setInView(false)
        }
      },
      {
        threshold: options?.threshold ?? 0.2,
        rootMargin: options?.rootMargin ?? '0px 0px -12% 0px',
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options?.threshold, options?.rootMargin, options?.triggerOnce])

  return { targetRef, inView }
}
