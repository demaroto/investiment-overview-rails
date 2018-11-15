class AddRelacionamentoUsersPairs < ActiveRecord::Migration[5.2]
  def change
     add_reference :pairs, :user, foreign_key: true
  end
end
