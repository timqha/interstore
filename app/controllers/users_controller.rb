class UsersController < ApplicationController
  before_action :authenticate_user!

  def get_user
    render json: {
               data: {
                   message: "Welcome #{current_user.email}",
                   user: current_user,
                   users: @users = User.all
               }
           }, status: 200
  end
end