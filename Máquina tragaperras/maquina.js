window.onload=inicio;
var credito=Math.floor(Math.random()*4)+9;
var imagenes=["ESPAÑA.png","FRANCIA.png","PORTUGAL.png","ITALIA.png","ALEMANIA.png","INGLATERRA.png","EEUU.png"];
var premios=[6,2,3,2,2,3,3];
var numeros_actuales=[];
var activos=false;

function inicio(){
    document.getElementById("tirar").onclick=lanzar_incio;
    document.getElementById("cruz").onclick=cerrar;
for (let k=0; k<document.getElementsByClassName("boton").length;k++){
    document.getElementsByClassName("boton")[k].onclick=lanzar_uno;

}
   
 actualizar()
}

function lanzar_incio(){
    if(credito>0){
        sonar("otra.mp3");
        activos=true;
    numeros_actuales=[];
for (let k=0; k<document.getElementsByClassName("boton").length;k++){
    numeros_actuales.push(escoger_numero());
    mostrar_imagen(k,numeros_actuales[k]);
}
comparar();
}
}

function lanzar_uno(){
    if(credito>0 && activos==true){
        sonar("otra.mp3");
     let hijos=this.parentNode.parentNode.children;
     for (k=0;k<hijos.length;k++){
        if(this.parentNode == hijos[k]){
            numeros_actuales[k]=escoger_numero(numeros_actuales[k]);
            mostrar_imagen(k,numeros_actuales[k]);
            comparar();
            break;
        }
     }
}
}
 
function escoger_numero(actual){
    do{
    var azar=Math.floor(Math.random()*imagenes.length);
    } while(azar==actual)
    
    return azar; 
}

function mostrar_imagen(num,im){
 document.getElementsByClassName("imagen")[num].getElementsByTagName("img")[0].src="img/"+imagenes[im];
}
 
function comparar(){
if (numeros_actuales[0]==numeros_actuales[1] && numeros_actuales[1]==numeros_actuales[2]){
    activos=false;
    let p=premios[numeros_actuales[0]]
    let mensaje=`Has ganado ${p} monedas<div>`;
    mostrar_mensaje(mensaje);
    for (let k=0; k<p ; k++){
        mensaje += `<img src= "imagenes/moneda.jpg ">`;
    
    }
    mensaje+=`</div>`;
    mostrar_mensaje(mensaje);
    sonar("Spain.mp3");
    credito+=premios[numeros_actuales[0]];
}
credito--;
actualizar();
}
 
function actualizar(){
document.getElementById("dinero").innerHTML=credito;
document.getElementById("monedas").innerHTML="";
for (let k=1;k<=credito;k++){
    document.getElementById("monedas").innerHTML +=`<img src= "imagenes/moneda.jpg">`;
}
if(credito<1){
    mostrar_mensaje("<b>¡Te quedaste sin dinero, mete más!</b><div class=`subtitulo`>INSERT COIN</div>");
    sonar("comunista.mp3")
}
}
 
function mostrar_mensaje(m){
     document.getElementById("velo").style.display="flex";
     document.getElementById("mensaje").innerHTML= m;
}

function cerrar(){
    document.getElementById("velo").style.display="none";
    document.getElementById("sonido").pause();
}
 
function sonar(audio){
    document.getElementById("sonido").src="audios/"+audio;
    document.getElementById("sonido").play();
}
 