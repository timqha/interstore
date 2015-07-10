class CreateListOrders < ActiveRecord::Migration
  def change
    create_table :list_orders do |t|
      t.integer :quantity
      t.integer :product_id
      t.timestamps
    end
    add_index :list_orders, :product_id
  end
end
