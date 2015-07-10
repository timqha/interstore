class Order < ActiveRecord::Base
  belongs_to :user
  has_many :list_orders, dependent: :destroy

end
