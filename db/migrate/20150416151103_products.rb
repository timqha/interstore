class Products < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :price
      t.string :data
      t.string :params
      t.string :image_uid
      t.boolean :visible, default: true
      t.integer :category_id
      t.timestamps
    end

  end
end
