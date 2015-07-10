class Product < ActiveRecord::Base
	belongs_to :category
	has_many 	 :list_orders
end
