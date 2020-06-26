var redBox, blueBox, yellowBox, resetBox;
var pointer;
var database, mousePosRef, mouse2Ref;
var mousePos = [];
var MouseX, MouseY, mouseRef;
var i = 0;

function setup() {
  createCanvas(400,400);

  pointer = createSprite(0, 0, 5, 5);
  pointer.shapeColor = "black";

  redBox = createSprite(50,40,20,20);
  redBox.shapeColor = "red";

  greenBox = createSprite(150,40,20,20);
  greenBox.shapeColor = "green";

  blueBox = createSprite(250,40,20,20);
  blueBox.shapeColor = "blue";

  resetBox = createSprite(350,40,20,20);

 database = firebase.database();

 mousePosRef = database.ref('mousePosition');
 mousePosRef.on("value",(data)=>{
    mouseRef = data.val();
 })
 
//  mousePos2Ref = database.ref('mousePosition/Position');
//  mousePos2Ref.on("value",(data)=>{
//     mouse2Ref = data.val();
//  })


}

function draw() {
  if(mouseIsPressed){
      var point = {
          x: mouseX,
          y: mouseY
      }
      mousePos.push(point);
  }
    /* for(cod in mouse2Ref){
      for(var i =  0; i < mousePos.length; i++){
        pointer.x = cod.x;
        pointer.y = cod.y;
        console.log(cod[0].x);

  } 
  }  */

  mousePosRef.set({
    "Position": mousePos
  });
  
  /* for(i = 0; i<mousePos.length;i++){
    mousePos2Ref = database.ref('mousePosition/Position/'+i);
    mousePos2Ref.on("value",(data)=>{
       mouse2Ref = data.val();
       pointer.x = mouse2Ref.x;
       pointer.y = mouse2Ref.y;
    })
  } */
  
while(i<mousePos.length){
    mousePos2Ref = database.ref('mousePosition/Position/'+i);
    mousePos2Ref.on("value",(data)=>{
       mouse2Ref = data.val();

       pointer.x = mouse2Ref.x;
       pointer.y = mouse2Ref.y;

       //console.log(mouse2Ref.y);
       i++;
    })
  }


  drawSprites();
}

function mouseClicked(){
  if(pointer.x >40 && pointer.x < 60 && pointer.y < 50 && pointer.y > 30){
    pointer.shapeColor = "red";
    stroke("red");
  }
  if(pointer.x >140 && pointer.x < 160 && pointer.y < 50 && pointer.y > 30){
    pointer.shapeColor = "green";
    stroke("green");
  }
  if(pointer.x >240 && pointer.x < 260 && pointer.y < 50 && pointer.y > 30){
    pointer.shapeColor = "blue";
    stroke("blue");
  }
  if(pointer.x >340 && pointer.x < 360 && pointer.y < 50 && pointer.y > 30){
    background("white");
  }

}