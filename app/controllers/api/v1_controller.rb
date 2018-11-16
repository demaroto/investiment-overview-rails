class Api::V1Controller < ApplicationController
  before_action :set_user
  skip_before_action :verify_authenticity_token
  
  def pairs
    @pairs = @user.pairs
    if(@pairs.length == 0)
      render json: {data: @pairs}, status: 204
    else
      render json: {data: @pairs}, status: 200
    end
  end
  
  def show
    if Pair.find(params[:id]).user_id == @user.id
      @pairs = @user.pairs.find(params[:id])
      render json: @pairs, status: 200
    else
      render json: [], status: 404
    end
  end
  
  def create
    @pair = Pair.new(pair_params)
    @pair.user_id = @user.id
    if @pair.save
      render json: {data: 'Adicionado com sucesso!'}, status: 201
    else
      render json: {data: 'Erro ao inserir na base de dados.'}, status: 400
    end
  end
  
  def destroy
    if Pair.find(params[:id]).user_id == @user.id
      @pair = Pair.find(params[:id])
      pair_name = @pair.pair_name
        if @pair.destroy
          render json: {data: "Item #{pair_name} removido com sucesso!"}, status: 200
        else
          render json: {data: 'Não foi possível remover este item'}, status: 400
        end
    else
      render json: {data: 'Oops não foi possível remover'}, status: 404
    end
  end
  
  private
  def pair_params
    params.permit(:pair_id, :type_trade, :price, :pair_name)
  end
  
  def set_user
    @authenticate = user_signed_in?
    if @authenticate
      @user = current_user
    else
      render json: {data: 'Você precisa estar autenticado para realizar esta ação'}, status: 401
    end
  end
end
