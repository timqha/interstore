class ListOrdersController < ApplicationController
  before_action :set_list_order, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token, :only => [:create, :new, :destroy, :update]

  respond_to :json
  def index
    @list_orders = ListOrders.all
    render json: @list_orders, status: :ok
  end

  def show

    respond_to do |format|
      format.json { render :json => {:list_order => @list_order}}
    end
  end

  def new
    @list_order = ListOrders.new
    render json: @list_order, status: :ok
  end

  def edit
    respond_to do |format|
      format.json { render :json => {:list_order => @list_order}}
    end
  end

  def create
    @list_order = ListOrders.new(list_order_params)
    respond_to do |format|
      if @list_order.save
        format.json { render json: @list_order, status: :created, location: @line_item }
      else
        format.json { render json: @list_order.errors, status: :unprocessable_entity }
      end

    end
  end


  def update
    respond_to do |format|
      if @list_order.update(list_order_params)
        format.json { head :no_content }
      else
        format.json { render json: @list_order.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @list_order.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
  def set_list_order
    @list_order = ListOrders.find(params[:id])
  end

  def list_order_params
    params.require(:list_order).permit(:orders_id, :product_id, :quantity )
  end
end
