class RemoveProductsIdFromProducts < ActiveRecord::Migration
  def change
    remove_column :products, :products_id, :integer
  end
end
