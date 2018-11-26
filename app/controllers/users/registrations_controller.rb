# frozen_string_literal: true
require 'bcrypt'
class Users::RegistrationsController < Devise::RegistrationsController

  include BCrypt

  def create
    @user = User.new(user_params)
    if @user.save
       warden.set_user(@user, scope: :user)
      redirect_to user_session_path
    end
    
  end
  
    def update
      @user = User.find(current_user.id)
        unless user_params[:password].present?
          @user.image = params[:image]
          if @user.update({nome: user_params[:nome], email: user_params[:email], image: user_params[:image]})
            self.messase 'Dados atualizados com sucesso!'
            redirect_to edit_user_registration_path
          end
        else
          case self.password_is
          when true
            if @user.update(user_params)
              self.messase 'Dados e senha atualizados com sucesso!'
              redirect_to new_user_session_path
            else
              self.messase 'Oops.. Ocorreu um erro. Tente novamente!'
            end
          when false
          redirect_to edit_user_registration_path
          end
        end
    end

  def edit
    
    @authenticate = user_signed_in?
  end

  def password_is
    @password = params[:user][:current_password]
    mypass = Password.new(@user.encrypted_password)
      case @password.present?
        when true
          if mypass == @password 
            true
          else
            self.messase 'Senha atual incorreta!'
            false
          end
        when false
          self.messase 'Digite sua senha atual!'
          false
        else
        
      end
  end
  
  def messase msg
    flash[:notice] = msg
  end
  
  def user_params
    params.require(:user).permit(:nome, :email, :password, :image)
  end
end
