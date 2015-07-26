Interstore::Application.routes.draw do

  scope "api", defaults: {format: :json} do
    resources :categories
    resources :products
    resources :orders
    resources :list_orders

  end
  mount_devise_token_auth_for 'User', at: '/api/auth'
  get '/get_user', to: 'users#get_user'


  #devise_for :users
  root 'application#home'
  get  "*path", to: redirect('/')


end
