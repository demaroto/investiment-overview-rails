require 'sidekiq/web'
Rails.application.routes.draw do
  namespace :api do
    get 'v1/pairs' => 'v1#pairs', as: 'api_v1_pairs'
    get 'v1/pairs/:id' => 'v1#show', as: 'api_v1_show'
    post 'v1/pairs' => 'v1#create', as: 'api_v1_create'
    delete 'v1/pairs/:id' => 'v1#destroy', as: 'api_v1_destroy'
  end
  get '/config/pair', :to => 'pair#index'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  #devise_for :users
   devise_for :users, :controllers => { registrations: 'users/registrations', sessions: "users/sessions", passwords: 'users/passwords' } do
    get "/", :to => "users/sessions#create"
  end

  authenticated :user do
    root to: 'painel#index'
  end
  
 

  unauthenticated :user do
    devise_scope :user do
       root to: 'home#index'
    end
  end
end
