Interstore::Application.routes.draw do

  namespace :api, defaults: {format: :json} do
    namespace :v1 do

      resources :categories
      resources :products
      resources :orders
      resources :list_orders
      get '/profile', to: 'users#members_only'
    end
  end
  mount_devise_token_auth_for 'User', at: '/api/v1/auth'

  mount_devise_token_auth_for 'Admin', at: 'admin_auth'
  as :admin do
    # Define routes for Admin within this block.
  end



  #devise_for :users
  root 'application#home'
  get  "*path", to: redirect('/')


end
