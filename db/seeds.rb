# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#  5.times do |i|
#  Product.create(name: "Product ##{i}", description: "A product.")
#  end
categories = Category.create([
                                 {name: 'Ноутбуки', desc: 'Ноутбуки описание'},
                                 {name: 'Мониторы', desc: 'Мониторы описание'},
                                 {name: 'Телефоны', desc: 'Телефоны описание'},
                                 {name: 'Модемы', desc: 'Модемы описание'}
                             ])

products = Product.create([
                              {name: 'Asus', price: '2223', category_id: '1', params:'red', image_uid: 'null'},
                              {name: 'Dell', price: '546', category_id: '1', params:'green', image_uid: 'null'},
                              {name: 'Lenovo', price: '433', category_id: '1', params:'red', image_uid: 'null'},
                              {name: 'HP', price: '444', category_id: '1', params:'green', image_uid: 'null'},
                              {name: 'Macintosh', price: '775', category_id: '1', params:'gray', image_uid: 'null'},
                              {name: 'Samsung', price: '345', category_id: '1', params:'gray', image_uid: 'null'},
                              {name: 'Delfa', price: '221', category_id: '1', params:'gray', image_uid: 'null'},
                              {name: 'Sony', price: '243', category_id: '1', params:'gray', image_uid: 'null'},
                              {name: 'Emachine', price: '657', category_id: '1', params:'yellow', image_uid: 'null'},
                              {name: 'Dell inspirion', price: '345', category_id: '1', params:'grow', image_uid: 'null'},
                              {name: 'Asus ar12', price: '8678', category_id: '1', params:'black', image_uid: 'null'},
                              {name: 'Dell inspirion', price: '433', category_id: '1', params:'white', image_uid: 'null'},
                              {name: 'Lenovo e32', price: '453', category_id: '1', params:'silver', image_uid: 'null'},
                              {name: 'Samsung nd23', price: '567', category_id: '1', params:'gold', image_uid: 'null'},
                              {name: 'Armsta', price: '345', category_id: '1', params:'black', image_uid: 'null'},
                              {name: 'Zelmer', price: '456', category_id: '1', params:'red', image_uid: 'null'},
                              {name: 'Gefest', price: '322', category_id: '1', params:'red', image_uid: 'null'},
                              {name: 'Maximus', price: '765', category_id: '1', params:'red', image_uid: 'null'},

                              {name: 'Dell ultra', price: '765', category_id: '2', params:'black', image_uid: 'null'},
                              {name: 'Samsung', price: '231', category_id: '2', params:'white', image_uid: 'null'},

                              {name: 'Samsung D200', price: '235', category_id: '3', params:'black', image_uid: 'null'},
                              {name: 'Sony z3', price: '534', category_id: '3', params:'black', image_uid: 'null'},
                              {name: 'Xiomi 3', price: '111', category_id: '3', params:'black', image_uid: 'null'},
                              {name: 'Nokia', price: '50', category_id: '3', params:'black', image_uid: 'null'},

                              {name: 'Tp-link', price: '35', category_id: '4', params:'white', image_uid: 'null'},
                              {name: 'D-link', price: '40', category_id: '4', params:'white', image_uid: 'null'},
                              {name: 'zixel', price: '60', category_id: '4', params:'white', image_uid: 'null'},


                          ])
user = User.new(
    :email                 => "test@test.com",
    :name                  => "Dive",
    :telephone             => "+380551234567",
    :city                  => "Киев",
    :admin                 => true,
    :provider              => "email",
    :password              => "1q2w3e4r",
    :password_confirmation => "1q2w3e4r"
)
user.skip_confirmation!
user.save!

user2 = User.new(
    :email                 => "timqha@rambler.ru",
    :name                  => "Alexander",
    :telephone             => "+380956604322",
    :city                  => "Запорожье",
    :admin                 => true,
    :provider              => "email",
    :password              => "1q2w3e4r",
    :password_confirmation => "1q2w3e4r"
)
user2.skip_confirmation!
user2.save!

order = Order.create([
          {name: user2.name, city: user2.city, telephone: user2.telephone, email: user2.email, status: 0
          },
          {name: user.name, city: user.city, telephone: user.telephone, email: user.email, status: 0
          }
      ])

order[0].order_products.create(product_id: 10, quantity: 3, price: 345)
order[0].order_products.create(product_id: 11, quantity: 2, price: 8678)
order[0].order_products.create(product_id: 9, quantity: 1, price:657)

order[1].order_products.create(product_id: 1, quantity: 5, price: 2223)
order[1].order_products.create(product_id: 5, quantity: 6, price: 775)
order[1].order_products.create(product_id: 4, quantity: 4, price: 444)

