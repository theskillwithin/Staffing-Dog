const changeFavicon = () => {
  if (window.location.hostname === 'localhost') {
    let favicons = document.querySelectorAll('link[rel="icon"]')
    // If a <link rel="icon"> element already exists,
    // change its href to the given link.
    if (favicons[0] !== null) {
      favicons.forEach(favicon => {
        const size = /favicon-(......)png/.exec(favicon.href)[1]
        // eslint-disable-next-line
        favicon.href = `/images/local-favicon-${size}png`
      })
      // Otherwise, create a new element and append it to <head>.
    } else {
      favicons = document.createElement('link')
      favicons.rel = 'icon'
      favicons.href = '/images/local-favicon-16x16.png'
      document.head.appendChild(favicons)
    }
  }
}

export default changeFavicon
