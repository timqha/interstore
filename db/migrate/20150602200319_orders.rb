class Orders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :name
      t.string :city
      t.string :telephone
      t.string :email
      t.integer :status, default: 0
      t.timestamps

    end
    add_index :orders, :email#, unique: true
  end
end
