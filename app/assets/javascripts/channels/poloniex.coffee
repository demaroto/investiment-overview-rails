App.poloniex = App.cable.subscriptions.create "PoloniexChannel",
  connected: ->
    console.log('Websockets rails rodando')

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    #console.log('Recebido', data)

  ticker: (pairs) ->
    document.querySelector("#pairs").innerHTML = "<p>ID PAIR"+pairs[2][0]+"</p><p>ASK PAIR"+pairs[2][2]+"</p><p>BID PAIR "+pairs[2][3]+"</p>"
    #@perform 'ticker', pairs: pairs
