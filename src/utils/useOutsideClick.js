import { useLayoutEffect } from 'react'

function useOutsideClick(ref, handler, when = true) {
  function handle(e) {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      handler(e)
    }
  }
  useLayoutEffect(
    // eslint-disable-next-line
    () => {
      if (when) {
        document.addEventListener('click', handle)
        return () => {
          document.removeEventListener('click', handle)
        }
      }
    },
    [ref, handler, when],
  )
}

export default useOutsideClick
