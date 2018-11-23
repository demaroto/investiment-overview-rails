# frozen_string_literal: true
require 'bcrypt'
class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  before_action :password_is, only: [:update]
  
  include BCrypt
  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    @user = User.new(user_params)
    if @user.save
       warden.set_user(@user, scope: :user)
      redirect_to user_session_path
    end
    
  end
  
    #PUT /resource
    def update
      @user = User.find(current_user.id)
        if user_params[:password].length == 0
          @user.image = params[:image]
          if @user.update({nome: user_params[:nome], email: user_params[:email], image: user_params[:image]})
            flash[:notice] = 'Dados atualizados com sucesso!'
            redirect_to root_path
            
            
          else
            flash[:notice] = 'Erro ao atualizar os dados'
            redirect_to edit_user_registration_path
            
          end
        else
          if @user.update(user_params)
            flash[:notice] = 'Dados atualizados com sucesso!'
            redirect_to new_user_session_path
          else
            flash[:notice] = 'Erro ao atualizar os dados'
            redirect_to edit_user_registration_path
          end
        end
    
      
    end

  # GET /resource/edit
  def edit
    
    @authenticate = user_signed_in?
  end

  def password_is
    @password = params[:user][:current_password]
    mypass = Password.new(@user.encrypted_password)
    
      if mypass == @password
          
      else
        flash[:notice] = 'Digite sua senha atual'
        redirect_to edit_user_registration_path
      end
      
  end
    
 

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
  def edit_params
    
  end
  
  def user_params
    params.require(:user).permit(:nome, :email, :password, :image)
  end
end
