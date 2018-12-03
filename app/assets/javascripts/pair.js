//= require jquery
$(function(){
    function _updateBdPair(){
        let pairs = {};
        $.get('https://poloniex.com/public?command=returnTicker', function(data){
            pairs = data;
        }).done(function(){
            console.log(pairs);
        }).fail(function(erro){
            console.log('Erro Pair.js', erro);
        });
        
    }

    
});
