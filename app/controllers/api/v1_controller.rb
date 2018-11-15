class Api::V1Controller < ApplicationController
  def index
    render json: {nome: 'Wildemar', idade: '27'}
  end
end
