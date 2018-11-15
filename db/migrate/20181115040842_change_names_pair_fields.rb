class ChangeNamesPairFields < ActiveRecord::Migration[5.2]
  def change
    change_table :pairs do |t|
      t.rename :name, :type_trade
      t.rename :acronym, :price
    end
  end
end
