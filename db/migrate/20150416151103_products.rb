class Products < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :price
      #t.decimal :price, precision: 8, scale: 2
      t.string :data
      t.string :params
      t.boolean :visible, default: true
      t.integer :category_id
      t.integer :products_id
      t.timestamps
    end
    add_index :products, [:products_id]
  end
end
