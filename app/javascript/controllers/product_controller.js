import { Controller } from "@hotwired/stimulus"
import ImageLib from '../lib/image_lib'
import Cookies from '../lib/cookies'

export default class extends Controller {
  static targets = [ 'dialog', 'dialogContent', 'dialogProdSize']

  connect() {

    // lazy load image
    ImageLib.lazyLoad('.photo_slider img', (self) => {
      self.style.opacity = 1
    })

    // handle image slider
    $('.product-img__slider').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      lazyLoad: 'ondemand',
      adaptiveHeight: true,
      // asNavFor: '.product-nav__slider',
      nextArrow: '<i class="far fa-arrow-right arrow-next"></i>',
      prevArrow: '<i class="far fa-arrow-left arrow-prev"></i>',
      customPaging: function(slick, index) {
        if ( $('#overlay_last_slick').length ) {
          if ((slick.slideCount-1) != (index)) {
            return (index + 1) + '/' + (slick.slideCount-1)
          }
        } else {
          return (index + 1) + '/' + (slick.slideCount)
        }
      }
    })

    // handle ui size selection
    this.element.querySelectorAll('.js-size-selector input').forEach(input => {
      input.addEventListener("change", (event) => {
        let sizeList = {
          s: 'S (1m60 - 1m65 | 55kg - 61kg)',
          m: 'M (1m66 - 1m72 | 62kg - 68kg)',
          l: 'L (1m72 - 1m77 | 69kg - 75kg)',
          xl: 'XL (1m77 - 1m83 | 76kg - 88kg)',
          xxl: 'XXL (1m83 - 1m90 | 88kg - 100kg)'
        }
        if (event.target.checked) {
          $('.option-heading__title').text(sizeList[event.target.value])
        }
      })
    })
  }

  reduce(event) {
    event.preventDefault()
    let quantily = $('.quantity__control')[0]
    let value = parseInt(quantily.value)
    if(value > 1 ) {
      quantily.value = value - 1
    }
  }

  augure(event) {
    event.preventDefault()
    let quantily = $('.quantity__control')[0]
    let value = parseInt(quantily.value)
    quantily.value = value + 1
  }

  addToCart(event) {
    event.preventDefault()

    var cartItems = Cookies.get('cart_items')
    var currentProduct = {}
    let formData = $('#form-order').serializeArray()
    if (!cartItems) {
        cartItems = '[]'
    }
    for (var i = 0; i < formData.length; i++) {
      currentProduct[formData[i].name] = formData[i].value
    }
    cartItems = JSON.parse(cartItems)

    cartItems.forEach(item => {
      if(item.id == currentProduct.id && item.shorts_size == currentProduct.shorts_size) {
        item.quantily  = (parseInt(item.quantily) + parseInt(currentProduct.quantily)).toString()
        currentProduct.added = true
      }
    })

    if (!currentProduct.added) {
      cartItems.push(currentProduct)
    }

    Cookies.set('cart_items', JSON.stringify(cartItems), { expires: 7 })

    // show popup add to cart
    this.dialogProdSizeTarget.textContent = `${currentProduct.shorts_size.toUpperCase()} / ${currentProduct.quantily}`
    this.dialogTarget.style.visibility = 'visible'

  }

  clickOutSide(event) {
    if (!this.dialogContentTarget.contains(event.target)) {
      event.target.style.visibility = 'hidden'
    }
  }
}
