class Category < ActiveRecord::Migration
  def change
    create_table :category do |t|
      t.string :category
      t.integer :category_id
    end
    add_index :category, [:category_id]
  end
end
