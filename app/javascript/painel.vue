<template>

  <div id="app">
        <h1>Painel Investment Overview</h1>
        <!-- Implementação do novo SELECT -->
        
        <div class="btn-group">
            <li @click="toggleMenu()" class="dropdown-toggle" v-if="channel.name !== undefined">
              {{ channel.name }}
              <span class="caret"></span>
            </li>
    
            <li @click="toggleMenu()" class="dropdown-toggle" v-if="channel.name === undefined">
              {{placeholderText}}
              <span class="caret"></span>
            </li>
    
            <ul class="dropdown-menu" v-if="showMenu">
                <li v-for="(option, index) in poloniex_info">
                    <a href="javascript:void(0)" @click="updateOption(option, index)">
                        {{ index }}
                    </a>
                </li>
            </ul>
        </div>
        <!-- Fim da implementação-->
      
        <!-- Component da Paridade Selecionada -->
        <div class="componentPair">
          <pair-component :pairCurrent="channel"></pair-component>
        </div>
        
       
        <!-- Tabela de acompanhamento -->
        <div class="tabela">
        
        </div>
            
  </div>
  
</template>

<script>
import _ from 'lodash';
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import axios from 'axios'
import dropdown from 'vue-dropdowns';
import PairComponent from './pair_selected'

Vue.use(VueNativeSock, 'wss://api2.poloniex.com', { 
	'Sec-WebSocket-Protocol': true,
	reconnection: true,
	format: 'json'
	 })
	 
  var poloniex = new Vue()
  var eventHub = new Vue()
  var poloniexSocket = ""
	    
//Recupera o alvo atual
poloniex.$options.sockets.onopen = (event) => {
  poloniexSocket = event.currentTarget

};

//Escuta dados da poloniex
poloniex.$options.sockets.onmessage = (res) => {
	if (res.data == '[1010]'){ 
		//Estado ocioso
	}else{
    eventHub.$emit('updatePair', res)
	}
}
  
function showChannels(){
 console.log(poloniexSocket);
}
	 
export default {
  name: 'PainelComponent',
  components:{
    PairComponent,
  'dropdown': dropdown
     },
   data: function () {
    return {
      channel: '',
      poloniex_info: '',
      poloniex_erro: false,
      showMenu: false,
      placeholderText: 'Selecione uma Criptomoeda'
      }
  },
  computed:{
  
  },
  created:function() {
    
  },
  mounted: function(){
    
     var vm = this;
     this.channel = this.channel;
            if (this.placeholder)
            {
                this.placeholderText = this.placeholder;
            }
  //Envia para o ActionCable
  //App.poloniex.ticker(eventHub.pairs)

  //Get pairs from poloniex
  axios
      .get('https://poloniex.com/public?command=returnTicker')
      .then(response => {
        vm.poloniex_erro = false
        vm.poloniex_info = response.data
         }).catch(erro => {
        vm.poloniex_erro = true
      })
      .then(function(){
       //Complete
       vm.poloniex_info = vm.ObjectSorted(vm.poloniex_info)
     
      })
      
  },
  updated:function() {
   
  },
  methods:{
     	//Atualiza o objeto
    	updateOption:function(option, index) {
        this.channel = {
        name: index, id: option.id
      };
     
        this.showMenu = false;
        this.$emit('updateOption', this.channel);
      },
      toggleMenu:function() {
          this.showMenu = !this.showMenu;
      },
     ObjectSorted:function(object) {
        let result = {};
        _.forEach(Object.keys(object).sort(), function(key) {
          result[key] = object[key];
        });
        return result;
      },
          
    }
}

</script>
