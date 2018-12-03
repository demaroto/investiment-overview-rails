class ContatosController < ApplicationController
  before_action :set_contato, only: [:show, :edit, :update, :destroy]

  # GET /contatos
  # GET /contatos.json
  def index
    @contatos = Contato.all
  end

  # GET /contatos/1
  # GET /contatos/1.json
  def show
  end

  # GET /contatos/new
  def new
    @contato = Contato.new
  end


  def create
    @contato = Contato.new(contato_params)
      if @contato.save
        redirect_to root_path
      else
        redirect_to root_path
      end
   
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contato
      @contato = Contato.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contato_params
      params.require(:contato).permit(:nome, :email, :mensagem, :pontuacao)
    end
end
