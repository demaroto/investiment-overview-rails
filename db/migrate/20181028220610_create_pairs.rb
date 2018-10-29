class CreatePairs < ActiveRecord::Migration[5.2]
  def change
    create_table :pairs do |t|
      t.integer :pair_id
      t.string :name
      t.string :ask
      t.string :bid
      t.timestamps
    end
  end
end
