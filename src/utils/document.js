import { useEffect } from 'react'

export const setTitle = (page = '', params = {}) => {
  const { main = 'Staffing Dog', sep = '-' } = params

  document.title = `${main} ${sep} ${page}`
}

export const setHtmlClass = className => {
  const htmlTag = document.documentElement

  if (htmlTag.classList && htmlTag.classList.add) {
    htmlTag.classList.add(className)
  } else if (` ${htmlTag.className} `.indexOf(` ${className} `) < 0) {
    htmlTag.className += ` ${className} `
  }
}

export const removeHtmlClass = className => {
  const htmlTag = document.documentElement

  if (htmlTag.classList && htmlTag.classList.remove) {
    htmlTag.classList.remove(className)
  }
}

export const isBrowser = () => !!window

export const useDocumentTitle = (title, onChange = []) => {
  useEffect(() => {
    setTitle(title)
  }, onChange)
}

export const useHtmlClass = (className, changeOn = []) => {
  useEffect(() => {
    setHtmlClass(className)

    return () => removeHtmlClass(className)
  }, changeOn)
}
