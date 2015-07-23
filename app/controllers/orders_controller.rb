class OrdersController < ApplicationController


  before_filter :authenticate_user!, only: [:destroy, :update, :create ]
  before_action :set_order, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token, :only => [:create, :new, :destroy, :update]

  respond_to :json


  def index

    @orders = Order.all

    n=0
    listorders = []
    while n<@orders.count do
      # Объявляем хеш можно также Hash.new
      temp = {}
      # Заносим все данные о заказе
      temp = @orders[n].as_json
      products = []
      totals = 0
      # Заносим данные о продуктах массив объектов
      #temp["products"] = @orders[n].order_products.as_json

      # Данные о продуктах в красивой форме
      @orders[n].order_products.as_json.each do |order|
        # product = order.attributes delete as_json
        total = 0
        product = {}
        product["quantity"] = order["quantity"]
        product["product_id"] = order["product_id"]
        product["price"] = order["price"]
        total += order["price"]*order["quantity"]
        product["total"] = total
        products.push(product)
        totals += total
      end
      # Общая сумма заказа
      temp["totals"] = totals
      # Все продукты что есть в заказе
      temp["products"] = products
      listorders[n]= temp.as_json
      n += 1
    end


    render :json => {:order => listorders}, status: :ok

  end

  def show

    respond_to do |format|
      format.json { render :json => {:order => @order} }
    end
  end

  def new
    @order = Order.new
    render json: @order, status: :ok
  end

  def edit
    respond_to do |format|
      format.json { render :json => {:order => @order} }
    end
  end

  def create

    @order = Order.new(order_params)
    params[:order][:products].each do |product|
      @order.order_products.build(:product_id => product["product_id"], :quantity => product["quantity"], :price => product["price"])
    end

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
    @order.order_products.each do |order|
      order.destroy
    end


    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
  def set_order
    @order = Order.find(params[:id])
  end


  def order_params
    params.require(:order).permit(:name, :city, :telephone, :email, :status)
  end

  # product.list_orders.build(order_id: 1, product_id: 2, quantity: 4)
  # product.list_orders.find_by(product_id: 2).update(quantity: 8)
  # product.list_orders.find_by(product_id: 2).destroy
end
