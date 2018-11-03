/**
 *
 * Grid Animated Background Responsive JS
 * gridanimatedgackground.js v1.2.0
 * Autor: Adriano Campos
 * 
 */

function GridAnimatedBackground(background,column,row,time) {

  column = typeof column !== 'undefined' ? column : 6;
  row = typeof row !== 'undefined' ? row : 4;
  time = typeof time !== 'undefined' ? time : 1000;
  var gab = document.getElementById('GridAnimatedBackground');
  var w = 100/column;
  var h = 100/row;

  //defined control variable
  var imagens = [] ;

  if (background.length > 0) {
    //populate the control variable
    for (var i = 0; i < background.length; i++) {
          imagens.push(background[i]);
          imagens.push(background[i]);
    }
  } else {
    console.log('GAB: images not found');
  } 

  //variable population with transition styles  
  var change_css = ['change_1','change_2'];

  // creates grid columns and rows
  for (var c = 0; c < column; c++) {    

    // create and append to gab
    var divColumn = document.createElement('div');
    divColumn.id = 'column-'+c;
    divColumn.className = 'gab_column';
    divColumn.style.width = w+'%';
    gab.appendChild(divColumn);

    for (var r = 0; r < row; r++) {

      // get image background
      imagem = getImage(); 

      // create and append to divColumn
      var divRow = document.createElement('div');
      divRow.className = 'gab_row container-'+r;
      divRow.style.backgroundImage = 'url('+imagem+')';           
      divRow.style.height = h+'%'; 

      divColumn.appendChild(divRow);     
        
    }
  }

  console.log('GAB: grid create');

  function getImage() {

    if (background.length > 0) { 
      //populate the variable if it is empty
      if(imagens.length == 0){
        for (var i = 0; i < background.length; i++) {
          imagens.push(background[i]);
        }
      }     
      
      //selects a random background that is in the variable 'images' 
      data = imagens[Math.floor(Math.random()*imagens.length)];

      //removes the selected background from the variable 'images'  
      var index = imagens.indexOf(data);
      if (index > -1) {
        imagens.splice(index, 1);
      }

      return data;

    } else {
      return '';
    }

  }

  //perform background swapping and grid animating 
  function GAB_executar() { 

    imagem = getImage();

    //randomly devolve the column and line 
    coluna = Math.floor((Math.random() * column));
    linha = Math.floor((Math.random() * row));
    
    //defines the transition effect at random
    change = change_css[Math.floor(Math.random()*change_css.length)];

    //selects the element that we will modify from the 'column' and the 'row'
    elemento = document.getElementById("column-"+coluna).getElementsByClassName("container-"+linha)[0];      

    //change background of selected item
    elemento.style.backgroundImage = 'url('+imagem+')';    
    
    //verifies whether the element already has applied transition effect and removes, or applies if it has not 
    for (var i = 0; i < change_css.length; i++) {
      if (elemento.classList.contains(change_css[i])) {
           elemento.classList.remove(change_css[i]);
      }
    }

    var n = Math.floor((Math.random() * change_css.length)); 

    if (!elemento.classList.contains(change_css[n])) {
          elemento.classList.add(change_css[n]);
    }

    window.setInterval(100);     
          
  }

  //performs the amination of the grid according to the deferminated time
  window.setInterval(function() {
      GAB_executar();
  }, time);

}