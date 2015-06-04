class Orders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :name
      t.string :city
      t.string :telephone
      t.string :email
      t.string :cart
      t.boolean :sent, default: false
      t.timestamps
    end
  end
end
