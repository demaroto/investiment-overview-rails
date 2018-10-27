 console.log('Hello World from Webpacker')
import Vue from 'vue'
import App from '../app.vue'
//import VueNativeSock from 'vue-native-websocket'
/*
Vue.use(VueNativeSock, 'wss://api2.poloniex.com', { 
	'Sec-WebSocket-Protocol': true,
	reconnection: true,
	format: 'json'
	 })
	
	 var poloniex = new Vue()
//Envia dados para poloniex

poloniex.$options.sockets.onopen = function(event) {
  //event.target.sendObj({'command' : 'subscribe', 'channel': 'BTC_ETH'});
  
};


//Escuta dados da poloniex
poloniex.$options.sockets.onmessage = (data) => {
	if (data.data == '[1010]'){ 
		console.log('Waiting ..')
	}else{
		console.log(data)
	}

}
 */
document.addEventListener('turbolinks:load', () => {
  const app = new Vue({
    el: "#vue",
    components: {App},
    render: h => h(App),
    mounted:() => {
    		console.log('Mounted app')
    	}
  })

})
/*
vm.$on('test', function (msg) {
  console.log(msg)
})

vm.$emit('test', 'hi')

*/