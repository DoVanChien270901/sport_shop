class ApplicationController < ActionController::Base
  include ActionView::Helpers::NumberHelper
  layout :set_layout
  include ApplicationHelper

  private

  def set_layout
    smart_phone? ? 'sp_application' : 'sp_application'
  end
end
