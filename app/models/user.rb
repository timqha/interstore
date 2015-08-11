class User < ActiveRecord::Base

  enum sex: [:undefined, :female, :male]

  has_many :orders#, dependent: :destroy
  # Include default devise modules.
  devise :database_authenticatable, :registerable,:confirmable,
          :recoverable, :rememberable, :trackable, :validatable,
           :omniauthable, :timeoutable

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable :confirmable,

  include DeviseTokenAuth::Concerns::User

end
