class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.text :desc
      t.timestamps
      t.integer :category_id
    end
    add_index :categories, [:category_id]
  end
end
