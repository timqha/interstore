class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token, :only => [:create, :new, :destroy, :update]

respond_to :json
  def index
    @orders = Order.all
    render json: @orders, status: :ok
  end

  def show

    respond_to do |format|
      format.json { render :json => {:order => @order}}
    end
  end

  def new
    @order = Order.new
    render json: @order, status: :ok
  end

  def edit
    respond_to do |format|
      format.json { render :json => {:order => @order}}
    end
  end

  def create
    @order = Order.new(order_params)
    respond_to do |format|
      if @order.save
        format.json { render json: @order, status: :created, location: @category }
      else
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end

    end
  end


  def update
    respond_to do |format|
      if @order.update(order_params)
        format.json { head :no_content }
      else
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @order.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def set_order
      @order = Order.find(params[:id])
    end

    def order_params
      params.require(:order).permit(:name, :city, :telephone, :email, :cart, :sent)
    end
end
