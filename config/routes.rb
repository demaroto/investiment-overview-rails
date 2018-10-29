require 'sidekiq/web'
Rails.application.routes.draw do
  get 'painel/index'
  devise_for :users
  root to: 'home#index'
  mount ActionCable.server => '/cable'
  mount Sidekiq::Web => '/sidekiq'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
