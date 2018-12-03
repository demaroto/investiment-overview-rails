class HomeController < ApplicationController
  #Antes de qualquer ação verificar se está autenticado
  before_action :authenticate_user!, except: [:index]
  
  def index
    @user = current_user
  	@session = user_session
  	@authenticate = user_signed_in?
  	@contato = Contato.new
  end
end
