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
                              {name: 'Asus', price: '2223', category_id: '1', params:'red'},
                              {name: 'Dell', price: '546', category_id: '1', params:'green'},
                              {name: 'Lenovo', price: '433', category_id: '1', params:'red'},
                              {name: 'HP', price: '444', category_id: '1', params:'green'},
                              {name: 'Macintosh', price: '775', category_id: '1', params:'gray'},
                              {name: 'Samsung', price: '345', category_id: '1', params:'gray'},
                              {name: 'Delfa', price: '221', category_id: '1', params:'gray'},
                              {name: 'Sony', price: '243', category_id: '1', params:'gray'},
                              {name: 'Emachine', price: '657', category_id: '1', params:'yellow'},
                              {name: 'Dell inspirion', price: '345', category_id: '1', params:'grow'},
                              {name: 'Asus ar12', price: '8678', category_id: '1', params:'black'},
                              {name: 'Dell inspirion', price: '433', category_id: '1', params:'white'},
                              {name: 'Lenovo e32', price: '453', category_id: '1', params:'silver'},
                              {name: 'Samsung nd23', price: '567', category_id: '1', params:'gold'},
                              {name: 'Armsta', price: '345', category_id: '1', params:'black'},
                              {name: 'Zelmer', price: '456', category_id: '1', params:'red'},
                              {name: 'Gefest', price: '322', category_id: '1', params:'red'},
                              {name: 'Maximus', price: '765', category_id: '1', params:'red'},

                              {name: 'Dell ultra', price: '765', category_id: '2', params:'black'},
                              {name: 'Samsung', price: '231', category_id: '2', params:'white'},

                              {name: 'Samsung D200', price: '235', category_id: '3', params:'black'},
                              {name: 'Sony z3', price: '534', category_id: '3', params:'black'},
                              {name: 'Xiomi 3', price: '111', category_id: '3', params:'black'},
                              {name: 'Nokia', price: '50', category_id: '3', params:'black'},

                              {name: 'Tp-link', price: '35', category_id: '4', params:'white'},
                              {name: 'D-link', price: '40', category_id: '4', params:'white'},
                              {name: 'zixel', price: '60', category_id: '4', params:'white'},


                          ])


order = Order.create([
          {name: 'Pite', city: 'Gasburg', telephone: '06565544444', email: 'pite@gmail.com', status: 'Заказ в обработке'
          },
          {name: 'Dave', city: 'Dublin', telephone: '655555545444', email: 'test@gmail.com', status: 'Заказ в обработке'
          }
      ])

order[0].order_products.create(product_id: 10, quantity: 3, price: 345)
order[0].order_products.create(product_id: 11, quantity: 2, price: 8678)
order[0].order_products.create(product_id: 9, quantity: 1, price:657)

order[1].order_products.create(product_id: 1, quantity: 5, price: 2223)
order[1].order_products.create(product_id: 5, quantity: 6, price: 775)
order[1].order_products.create(product_id: 4, quantity: 4, price: 444)

