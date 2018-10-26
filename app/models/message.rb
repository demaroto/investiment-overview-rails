class Message < ApplicationRecord
    enum visualized: [ :no, :yes ]
  belongs_to :user
end
