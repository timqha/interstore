Interstore::Application.routes.draw do

  scope "api", defaults: {format: :json} do
    resources :categories
    resources :products
    resources :orders
    resources :list_orders

  end
  namespace :api do
    namespace :v1 do


      get '/profile', to: 'users#members_only'
    end
  end
  mount_devise_token_auth_for 'User', at: '/api/v1/auth'



  #devise_for :users
  root 'application#home'
  get  "*path", to: redirect('/')


end
