class ProductsController < ApplicationController
  def index
    @product = Product.find(params[:id])
  end

  private

  def product_params
    params.require(:product).permit(:name, :price)
  end
end
