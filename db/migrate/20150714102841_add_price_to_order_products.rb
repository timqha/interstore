class AddPriceToOrderProducts < ActiveRecord::Migration
  def change
    add_column :order_products, :price, :integer
  end
end
