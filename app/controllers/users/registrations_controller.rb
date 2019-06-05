# frozen_string_literal: true
require 'bcrypt'
class Users::RegistrationsController < Devise::RegistrationsController

  include BCrypt

  def create
    if params[:user][:nome].present? && params[:user][:email].present? && params[:user][:password].present?
      if params[:user][:password].length >= 6
        @user = User.new(user_params)
        if @user.save
           warden.set_user(@user, scope: :user)
           redirect_to user_session_path
        end
      else
      @old_nome = params[:user][:nome]
      @old_email = params[:user][:email]
      flash[:notice] = "A senha deve ser maior que 6 caracteres."
      redirect_to new_user_registration_path(old_nome: @old_nome, old_email: @old_email)
      end
    else
      @old_nome = params[:user][:nome]
      @old_email = params[:user][:email]
      flash[:notice] = "Preencha todos os campos"
      redirect_to new_user_registration_path(old_nome: @old_nome, old_email: @old_email)
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
    @user = current_user
    @image = @user.image_url ? @user.image_url : false
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
