class Products < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.integer :price
      t.string :data
      t.string :params
      t.string :image_uid
      t.string :image_name
      t.boolean :visible, default: true
      t.integer :category_id
      t.timestamps
    end

  end
end
