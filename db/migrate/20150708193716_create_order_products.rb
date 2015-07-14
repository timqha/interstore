class CreateOrderProducts < ActiveRecord::Migration
  def change
    create_table :order_products do |t|

      t.belongs_to :product, index: true
      t.belongs_to :order, index: true
      t.integer :quantity
      t.timestamps
    end
  end
end
