App.poloniex = App.cable.subscriptions.create "PoloniexChannel",
  connected: ->
    console.log('Websockets rails rodando')

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    console.log('Recebido', data)

  ticker: (pairs, user_id) ->
    @perform 'ticker', pairs: pairs, id:user_id
