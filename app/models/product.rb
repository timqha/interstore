class Product < ActiveRecord::Base
	belongs_to :category
	has_many 	 :order_products
	has_many :orders, :through => :order_products

	validates :price, numericality: true
	# НЕ пустые
	validates :name, :price, presence: true

end
