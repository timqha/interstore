class Order < ActiveRecord::Base
  enum status: [ :active, :confirmed, :archived, :canceled ]
  belongs_to :user
  has_many :order_products
  has_many :products, :through => :order_products

end
