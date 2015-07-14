class RemoveCartFromOrders < ActiveRecord::Migration
  def change
    remove_column :orders, :cart, :string
    remove_column :orders, :sent, :boolean
  end
end
