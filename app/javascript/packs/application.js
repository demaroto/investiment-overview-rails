console.log('Hello World from Webpacker')
import Vue from 'vue'
import App from '../app.vue'
import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'wss://api2.poloniex.com', { 
	'Sec-WebSocket-Protocol': 'false',
	reconnection: true,
	format: 'json'
	 })

var poloniex = new Vue()
//poloniex.$options.sockets.onmessage = sendObj({'command': 'subscribe', 'channel': '1002'})
poloniex.$options.sockets.onopen = function(event) {
  event.target.sendObj({'command' : 'subscribe', 'channel': 'BTC_ETH'});
  
};


poloniex.$options.sockets.onmessage = (data) => {
	if (data.data == '[1010]'){ 
		console.log('Wait ..')
	}else{
		console.log(data)
	}

}



document.addEventListener('DOMContentLoaded', () => {
  const el = document.body.appendChild(document.createElement('hello'))
  const app = new Vue({
    el,
    render: h => h(App)
  })

})