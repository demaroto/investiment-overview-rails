class PoloniexBroadcastJob < ApplicationJob
  queue_as :default
 
  def perform(message)
    ActionCable.server.broadcast 'poloniex_channel', message: message
  end
  
 
end
