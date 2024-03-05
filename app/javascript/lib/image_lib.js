const ImageLib = (function() {
  const lazyLoad = (targetElement, callback) => {
    if('IntersectionObserver' in window) {
      const params = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
      let lazyImgs = $(targetElement)

      const observer = new IntersectionObserver((entries, _ob) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            load(entry.target, callback)
            observer.unobserve(entry.target)
          }
        })
      }, params)

      lazyImgs.each((_i, img) => {
        observer.observe(img)
      })
    } else {
      console.error('Do not support IntersectionObserver')
    }
  }

  function load(img, callback) {
    const url = img.getAttribute('data-src')
    img.setAttribute('src', url)
    callback(img)
  }

  return {
    lazyLoad: lazyLoad,
  };
})();

export default ImageLib
