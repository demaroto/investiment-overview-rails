class Api::V1Controller < ApplicationController
  before_action :set_user
  
  def pairs
    @pairs = @user.pairs
    render json: @pairs
  end
  
  def show
    if Pair.find(params[:id]).user_id == @user.id
      @pair = @user.pairs.find(params[:id])
      render json: @pair
    else
      render json: []
    end
  end
  
  def create
    @pair = Pair.new(pair_params)
    if @pair.save
      render json: {message: 'Adicionado com sucesso!'}, status: 200
    else
      render json: {message: 'Erro ao inserir na base de dados.'}, status: 400
    end
  end
  
  private
  def pair_params
    params.require(:pair).permit(:pair, :type_trade, :price, :user_id)
  end
  
  def set_user
    @user = current_user
  end
end
