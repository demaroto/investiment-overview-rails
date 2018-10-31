class CreatePairs < ActiveRecord::Migration[5.2]
  def change
    create_table :pairs do |t|
      t.integer :pair_id
      t.string :name
      t.string :acronym
    end
  end
end
