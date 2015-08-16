class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.




  protect_from_forgery with: :null_session
  # protect_from_forgery with: :exception
  skip_before_filter :verify_authenticity_token

  def home
    render 'layouts/application'
  end

  before_action :configure_permitted_parameters, if: :devise_controller?

  def authenticateadmin_current_user
    puts cookies[:auth_headers]
    auth_headers = JSON.parse cookies[:auth_headers]
    current_user = User.find_by uid: auth_headers["uid"]
    puts current_user.admin
    unless current_user.admin?
      render :layout => 'application', :nothing => true
    end
    #redirect_to("/#/") unless
    #render json: {}, status: :unauthorized if get_current_user.nil?
  end
=begin

  def authenticate_current_user
    render json: {}, status: :unauthorized if get_current_user.nil?
  end

  def get_current_user
    return nil unless cookies[:auth_headers]
    auth_headers = JSON.parse cookies[:auth_headers]

    expiration_datetime = DateTime.strptime(auth_headers["expiry"], "%s")
    current_user = User.find_by uid: auth_headers["uid"]

    if current_user &&
        current_user.tokens.has_key?(auth_headers["client"]) &&
        expiration_datetime > DateTime.now

      @current_user = current_user
    end
    @current_user
  end
=end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:account_update) << :city << :name << :telephone  << :age << :sex
    devise_parameter_sanitizer.for(:sign_up) << :sex << :age
  end

end
