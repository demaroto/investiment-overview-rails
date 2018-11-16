class ChangeColumnToPair < ActiveRecord::Migration[5.2]
  def change
    change_table(:pairs) do |t|
      t.change(:pair_id, :string)
    end
  end
end
