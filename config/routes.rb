Interstore::Application.routes.draw do

  scope "api", defaults: {format: :json} do
    resources :categories
    resources :products
    resources :orders
    resources :list_orders
    mount_devise_token_auth_for 'User', at: 'auth'
  end


  #devise_for :users
  root 'application#home'
  get  "*path", to: redirect('/')


end
