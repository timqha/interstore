class CategoriesController < ApplicationController
  before_action :authenticate_user!, only: [:destroy, :update, :create ]
  before_action :set_category, only: [:show, :edit, :update, :destroy]
  #skip_before_filter :verify_authenticity_token, :only => [:create, :new, :destroy, :update]
  respond_to :json, :html
  # GET /categories
  # GET /categories.json
  def index
    @categories = Category.all.as_json
    @max = Product.maximum(:price)

    @categories.each do |category|
      category['max'] = @max.as_json
    end
    render json: @categories, status: :ok
  end

  # GET /categories/1
  # GET /categories/1.json
  def show
    #@category = Category.find(params[:id])
    @products = @category.products.all
    @max = @category.products.maximum(:price)
    @colors = @category.products.select(:params).distinct
    respond_to do |format|
      format.json { render :json => {:category => @category,
                                     :products => @products,
                                     :colors => @colors,
                                     :maxprice => @max
                           } }
    end
  end

  # GET /categories/new
  def new
    @category = Category.new
    render json: @category, status: :ok
  end

  # GET /categories/1/edit
  def edit
  #  @category = Category.find(params[:id])

    respond_to do |format|
      format.json { render :json => {:category => @category} }
    end
  end

  # POST /categories
  # POST /categories.json
  def create
    @category = Category.new(category_params)

    respond_to do |format|
      if @category.save
        format.html { redirect_to @category, notice: 'Category was successfully created.' }
        format.json { render json: @category, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /categories/1
  # PATCH/PUT /categories/1.json
  def update
    respond_to do |format|
      if @category.update(category_params)
        format.html { redirect_to @category, notice: 'Category was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1
  # DELETE /categories/1.json
  def destroy
    @category.destroy
    respond_to do |format|
      format.html { redirect_to categories_url }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_category
    @category = Category.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def category_params
    params.require(:category).permit(:name)
  end
end
