class PoloniexChannel < ApplicationCable::Channel
  def subscribed
     stream_from "poloniex_channel"
     
  end

  def unsubscribed
    
  end

  def ticker (data)
    #ActionCable.server.broadcast 'poloniex_channel', message: (data)
    #Message.create! content: data['message']
    PoloniexBroadcastJob.perform_later data
  end
end
