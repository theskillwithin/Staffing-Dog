export const setTitle = (page = '', params = {}) => {
  const {
    main = 'Staffing Dog',
    sep = '-',
  } = params

  document.title = `${main} ${sep} ${page}`
}

export const isBrowser = () => !!window
