class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  skip_before_filter :verify_authenticity_token
  protect_from_forgery with: :null_session
  # protect_from_forgery with: :exception
  def home
    render 'layouts/application'
  end
end
