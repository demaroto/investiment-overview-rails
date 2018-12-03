json.extract! contato, :id, :nome, :email, :mensagem, :pontuacao, :created_at, :updated_at
json.url contato_url(contato, format: :json)
