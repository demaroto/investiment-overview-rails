class AddAcronymToPair < ActiveRecord::Migration[5.2]
  def change
    add_column :pairs, :acronym, :integer
  end
end
