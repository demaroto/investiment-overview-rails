class AddIndexDefaultKindToUser < ActiveRecord::Migration[5.2]
  def change
    change_column_default :users, :kind, 'common'
  end
end
