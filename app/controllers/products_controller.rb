class ProductsController < ApplicationController


  before_action :set_product, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token, :only => [:create, :update, :destroy]
  respond_to :html, :json
  # GET /products.json
  def index
    @products = Product.all.as_json

    @categories = Category.all.map { |c| [c.name, c.id] }

    #@productslast = Product.last(10)
    respond_to do |format|
      format.json { render :json => {:categories => @categories,
                                     :products => @products
                           } }
    end
  end

  # GET /products/1
  # GET /products/1.json
  def show

    respond_to do |format|
      format.json  { render :json => { :product => @product}}
    end
  end

  # GET /products/new
  def new
    @product = Product.new
    @categories = Category.all.map { |c| [c.name, c.id] }
    render json: @product, status: :ok
  end

  # GET /products/1/edit
  def edit
    @categories = Category.all.map { |c| [c.name, c.id] }

    respond_to do |format|
      format.json  { render :json => { :product => @product}}
    end
  end

  # POST /products
  # POST /products.json
  def create
    @product = Product.new(product_params)
    respond_to do |format|
      if @product.save
        format.json { render json: @product, status: :created, location: @product }
      else
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
  def update
    respond_to do |format|
      if @product.update(product_params)
        format.json { head :no_content }
      else
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_url }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def product_params
    params.require(:product).permit(:name, :price, :category_id, :params)
  end
end
