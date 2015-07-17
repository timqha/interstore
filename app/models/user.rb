class User < ActiveRecord::Base

  include DeviseTokenAuth::Concerns::User
=begin
  before_save -> do
    self.uid = SecureRandom.uuid
    skip_confirmation!
  end
=end

  has_many :orders, dependent: :destroy
  # Include default devise modules.
  devise :database_authenticatable, :registerable,:confirmable,
          :recoverable, :rememberable, :trackable, :validatable,
           :omniauthable

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable :confirmable,

end
