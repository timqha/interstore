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
                              {name: 'Asus', price: '2223', category_id: '4', params:'black', image_uid: '2015/08/14/9bctm8mm3m_asus_rt_n14u_8938967.jpg', image_name: 'asus_rt_n14u_8938967.jpg'},
                              {name: 'HP', price: '546', category_id: '1', params:'silver', image_uid: '2015/08/14/1qhwykyaz3_record_72135369.jpg', image_name: 'record_72135369.jpg'},
                              {name: 'MSI 622', price: '433', category_id: '1', params:'red', image_uid: '2015/08/14/1rhhjh0pcf_msi_ge622qf_268xua_987319779.jpg', image_name: 'msi_ge622qf_268xua_987319779.jpg'},
                              {name: 'Lenovo e32', price: '453', category_id: '1', params:'black', image_uid: '2015/08/14/7zgyhsra0p_record_401424367.jpg', image_name: 'record_401424367.jpg'},
                              {name: 'MSI', price: '775', category_id: '1', params:'black', image_uid: '2015/08/14/1i72qlk9te_msi_gs602qc_066xua_989709944.jpg', image_name: 'msi_gs602qc_066xua_989709944.jpg' },
                              {name: 'Dell ultra', price: '765', category_id: '2', params:'black', image_uid: '2015/08/14/4o6t0x952i_record_22464554.jpg', image_name: 'record_22464554.jpg'},
                              {name: 'Samsung', price: '231', category_id: '2', params:'white', image_uid: '2015/08/14/1z2hos9xe8_record_690910050.jpg', image_name: '690910050.jpg' },
                              {name: 'Samsung D200', price: '235', category_id: '3', params:'silver', image_uid: '2015/08/14/26e5mhl7ei_record_159070307.jpg', image_name: 'record_159070307.jpg'},
                              {name: 'Sony z3', price: '534', category_id: '3', params:'gold', image_uid: '2015/08/14/969sdw4kiq_record_709326385.jpg', image_name: 'record_709326385.jpg'},
                              {name: 'Samsung 3', price: '111', category_id: '3', params:'black', image_uid: '2015/08/14/3zpka6c7b0_record_269905657.jpg', image_name: 'record_269905657.jpg'},
                              {name: 'lg', price: '50', category_id: '3', params:'brown',image_uid: '2015/08/14/royponzyg_record_621652272.jpg', image_name: 'record_621652272.jpg'},
                              {name: 'Tp-link', price: '35', category_id: '4', params:'white', image_uid: '2015/08/14/hsdr4ri42_tp_link_tl_mr3420_8885128.jpg', image_name: 'tp_link_tl_mr3420_8885128.jpg'},
                              {name: 'D-link', price: '40', category_id: '4', params:'black', image_uid: '2015/08/14/kz56mdf8j_d_link_dir_300_a_c1_9927631.jpg', image_name: 'd_link_dir_300_a_c1_9927631.jpg'},
                              {name: 'TP-Link', price: '60', category_id: '4', params:'grey', image_uid: '2015/08/14/2tpggc7ox4_198555_6024816.jpg', image_name: '198555_6024816.jpg'},
                              {name: 'DELL', price: '444', category_id: '1', params:'green'},
                              {name: 'Samsung', price: '345', category_id: '1', params:'gray'},
                              {name: 'Delfa', price: '221', category_id: '1', params:'gray'},
                              {name: 'Sony', price: '243', category_id: '1', params:'gray'},
                              {name: 'Emachine', price: '657', category_id: '1', params:'yellow'},
                              {name: 'Dell inspirion', price: '345', category_id: '1', params:'grow'},
                              {name: 'Asus ar12', price: '8678', category_id: '1', params:'black'},
                              {name: 'Dell inspirion', price: '433', category_id: '1', params:'white'},
                              {name: 'Samsung nd23', price: '567', category_id: '1', params:'gold'},
                              {name: 'Armsta', price: '345', category_id: '1', params:'black'},
                              {name: 'Zelmer', price: '456', category_id: '1', params:'red'},
                              {name: 'Gefest', price: '322', category_id: '1', params:'red'},
                              {name: 'Maximus', price: '765', category_id: '1', params:'red'},
                          ])
user = User.new(
    :email                 => "test@test.com",
    :name                  => "Dive",
    :telephone             => "+380551234567",
    :city                  => "Киев",
    :admin                 =>true,
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

