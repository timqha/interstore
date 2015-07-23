class User < ActiveRecord::Base

  include DeviseTokenAuth::Concerns::User

  has_many :orders#, dependent: :destroy
  # Include default devise modules.
  devise :database_authenticatable, :registerable,:confirmable,
          :recoverable, :rememberable, :trackable, :validatable,
           :omniauthable

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable :confirmable,

end
