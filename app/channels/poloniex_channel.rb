class PoloniexChannel < ApplicationCable::Channel
  def subscribed
     stream_from "poloniex_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def ticker (data)
    #Message.create! content: data['message'], user_id: id
  end
end
