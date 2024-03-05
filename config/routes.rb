# frozen_string_literal: true

Rails.application.routes.draw do
  root 'home#index'

  get 'products/:id', to: 'products#index', as: 'product_detail'
end
