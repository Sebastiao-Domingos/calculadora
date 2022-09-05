let entrada = document.querySelector('#entrada')
let saida = document.querySelector('#saida')
let ans , igual = false,ligado=false, shift=false;

//Realizar o calculo
function igualidade( type ){
    if( ligado ){
        if( type.innerHTML === "=" || type == "Enter" ){
            let valores = entrada.innerHTML
            if( !shift ) {
                valores = valores.replace('x','*')
                valores = valores.replace(':','/')
                valores = valores.replace('E','10**')
                valores = valores.replace('^','**')
                valores = valores.replace('sin','Math.sin')
                valores = valores.replace('cos','Math.cos')
                valores = valores.replace('tan','Math.tan')
                valores = valores.replace('log' , 'Math.log10')
                valores = valores.replace('ln', 'Math.log')
                //valores = valores.replace('ANS',`${ans}`)
                ans =  eval( `${ valores }` )
            } else {
                valores = valores.replace( '!' , '')
                ans = factorial( Number( valores ) )
            }
            
            igual=true
            saida.innerHTML = ans
        }
    }
}
//Limpar a tela 
function limpar(type){
    if(ligado){
        if(type.innerHTML=="AC"){
            entrada.innerHTML=""
            saida.innerHTML= "0."
        }else{
            let tela = entrada.innerHTML.split("")
            let tel1=""
            
            for( let i = 0; i<tela.length-1 ; i++){
                tel1+=`${tela[i]}`
            }
    
            entrada.innerHTML =tel1
        }
    }
}
// Entrada de dados pelo click
function digitar(type){
    if(ligado){
        if(igual===true){
            entrada.innerHTML=""
            igual=false
        }
        if(type.innerHTML!="ANS" && (typeof type === "object")){
            if(type.innerHTML=="EXP")
                entrada.innerHTML+=`${type.innerHTML[0]}`
            else
                entrada.innerHTML +=`${type.innerHTML}` 
        } else{
            if( type.innerHTML !== "ANS")
                if(!shift)
                    entrada.innerHTML += "**-1"
                else
                    entrada.innerHTML += `!` 
            else
                entrada.innerHTML += `${ans}`
        }
    }
}

//Entrada de dados a partir do teclado
document.addEventListener('keydown',function(event){
    if(ligado){
        if(igual===true){
            entrada.innerHTML=""
            igual=false
        }
        if(event.key === "Enter" || event.key === " ")
            igualidade("Enter")
        else
            if((event.keyCode >=48 && event.keyCode < 58) || (event.keyCode >=96 && event.keyCode <= 111)) 
                entrada.innerHTML+=`${event.key}`
    }                
})
//Ligar a maquina
document.querySelector('#ligar').addEventListener('click',()=>{
    ligado = true
    shift = false
    entrada.innerHTML = ''
    saida.innerHTML = '0.'
    entrada.style.backgroundColor="rgba(0, 255, 255, 0.706)"
    saida.style.backgroundColor ="rgba(0, 255, 255, 0.706)"
})



// Factorial 
 function factorial( valor ){
    if ( valor === 0) return 1
    else 
        return valor * factorial( --valor ) 
 }



// Ativar o shift
document.querySelector('#shift').onclick = function(){
    if(ligado && shift===false){
        shift = true
    }else{
        shift = false
    }
}
// Desligar a maquina
document.querySelector('.ac').addEventListener('click' , ()=>{
    if(ligado && shift){
        entrada.style.backgroundColor="#000"
        saida.style.backgroundColor ="#000"
        ligado==false
    }
})


