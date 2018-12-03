class DropContatos < ActiveRecord::Migration[5.2]
  def change
    drop_table :contatos
  end
end
