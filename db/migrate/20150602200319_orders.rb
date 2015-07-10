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
      t.string :status
    end
    add_index :orders, :email, unique: true
  end
end
