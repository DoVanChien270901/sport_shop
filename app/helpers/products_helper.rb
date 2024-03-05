module ProductsHelper
  def car_image_loading_tag(image_path, options = {})
    opts = (options || {}).merge('data-src': image_path)
    image_tag('slider-loading-nw.gif', opts)
  end
end
