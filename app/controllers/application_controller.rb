class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
   helper_method :resource_name, :resource, :devise_mapping, :resource_class

   

  def resource_name
    :user
  end
  
  def resource
    @resource ||= User.new
  end
  
  def resource_class
    User
  end
  
  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :avatar, :role])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :avatar, :role])
  end
end
