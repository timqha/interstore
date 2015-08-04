
class API::V1::UsersController < ApplicationController
 # before_action :authenticate_user!

  def members_only
    render json: {
               data: {
                   user: current_user,
                #  order: current_user.User.orders.all
               }
           }, status: 200
  end
end

