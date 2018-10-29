class PainelController < ApplicationController
  before_action :authenticate_user!
    
  def index
    @user = current_user
  	@session = user_session
  	@authenticate = user_signed_in?
  	@messages = @user.message.all
  	@pairs = []
  end
  
 
 
end
