import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  disableRoll(target) {
    if (target.currentTarget.checked) {
      $('body').css('overflow','hidden')
    } else {
      $('body').css('overflow','scroll')
    }
  }
}
