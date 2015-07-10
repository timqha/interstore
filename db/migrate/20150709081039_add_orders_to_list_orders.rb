class AddOrdersToListOrders < ActiveRecord::Migration
  def change
    add_reference :list_orders, :order, index: true
  end
end
