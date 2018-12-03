class CreateContatos < ActiveRecord::Migration[5.2]
  def change
    create_table :contatos do |t|
      t.string :nome
      t.string :email
      t.text :mensagem
      t.integer :pontuacao

      t.timestamps
    end
  end
end
