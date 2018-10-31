class Message < ApplicationRecord
    enum visualized: [ :no, :yes ]
  belongs_to :user
  #after_create_commit { PoloniexBroadcastJob.perform_later self }
 
  
end
