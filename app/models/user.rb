class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable :confirmable,
  devise :database_authenticatable, :registerable,  :lockable, :timeoutable,
         :recoverable, :trackable, :validatable
end
