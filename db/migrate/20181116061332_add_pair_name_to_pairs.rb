class AddPairNameToPairs < ActiveRecord::Migration[5.2]
  def change
    change_table(:pairs) do |t|
      t.string :pair_name
    end
  end
end
