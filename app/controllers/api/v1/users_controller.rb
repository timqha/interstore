
class API::V1::UsersController < ApplicationController
 # before_action :authenticate_user!

  def members_only
    render json: {
               data: {
                   message: "Welcome #{current_user.name}",
                   user: current_user,
                #  order: current_user.User.orders.all
               }
           }, status: 200
  end
end

