# frozen_string_literal: true

module ApplicationHelper
  def smart_phone?
    !!(request.user_agent =~ /(tablet|ipad)|(android(?!.*mobile))|Mobile/)
  end
end
