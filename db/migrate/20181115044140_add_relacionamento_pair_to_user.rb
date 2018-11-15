class AddRelacionamentoPairToUser < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :pair, foreign_key: true
  end
end
