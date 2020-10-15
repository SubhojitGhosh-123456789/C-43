var gameState = "start";

var start, startImg, startB, startBImg;
var inst, instImg, instB, instBImg;
var panel1, p1Img, panel2, p2Img, panel3, p3Img;

var engine, cargo, fuel, astronaut;
var rocket, rocketImg;
var launch, launchImg;
var ground, groundImg;
var press, pressImg;

var distance = 0;
var index = 0;

var bg;

var click, check, countdown, blast;

function preload(){

    startImg = loadImage("start.jpg");
    done = loadImage("done.jpg");
    startBImg = loadImage("startB.jpg");
    instImg = loadImage("inst.jpg");
    instBImg = loadImage("instB.jpg");

    groundImg = loadImage("ground.png");

    p1Img = loadImage("p1.jpg");
    p2Img = loadImage("p2.jpg");
    p3Img = loadImage("p3.jpg");

    rocketImg = loadImage("Rocket.png");
    rocketImg2 = loadImage("Rocket2.png");
    launchImg = loadImage("launchPad.png");

    pressImg = loadImage("Press.jpg");

    bg = loadImage("1.jpg");

    click = loadSound("click.mp3");
    check = loadSound("check.mp3");
    countdown = loadSound("timer.mp3");
    blast = loadSound("blastOff.wav");
}

function setup(){

    createCanvas(1300,600);

    start = createSprite(650,300,900,600);
    start.addImage(startImg);
    start.scale = 0.9;
    start.visible = true;
   
    startB = createSprite(650,550,70,100);
    startB.addImage(startBImg);
    startB.visible = true;

    inst = createSprite(650,300,900,600);
    inst.addImage(instImg);
    inst.scale = 0.9;
    inst.visible = false;
   
    instB = createSprite(650,450,70,100);
    instB.addImage(instBImg);
    instB.scale = 0.8;
    instB.visible = false;

    press = createSprite(650,160,800,10);
    press.addImage(pressImg);
    press.visible = false;

    ground = createSprite(650,620,1300,10);
    ground.addImage(groundImg);
    ground.scale = 2;
    ground.visible = false;

    rocket = createSprite(1000,360,800,10);
    rocket.addImage(rocketImg);
    rocket.scale = 0.4;
    rocket.visible = false;

    launch = createSprite(850,400,800,10);
    launch.addImage(launchImg);
    launch.scale = 0.7;
    launch.visible = false;

    panel1 = createSprite(rocket.x-880,rocket.y-10,900,600);
    panel1.addImage(p1Img);
    panel1.scale = 0.9;
    panel1.visible = false;

    panel2 = createSprite(rocket.x-590,rocket.y+190,900,600);
    panel2.addImage(p2Img);
    panel2.scale = 0.2;
    panel2.visible = false;

    panel3 = createSprite(rocket.x-590,rocket.y-100,900,600);
    panel3.addImage(p3Img);
    panel3.scale = 0.6;
    panel3.visible = false;

    panel4 = createSprite(950,550,300,150);
    panel4.visible = false;


    engine = createButton("Start Engines");
    engine.position(570,300);
    engine.style('width', '200px');
    engine.style('height', '40px');
    engine.style('background', 'red');
    engine.mousePressed(on);
    engine.hide();

    fuel = createButton("Fill Fuel");
    fuel.position(570,150);
    fuel.style('width', '200px');
    fuel.style('height', '40px');
    fuel.style('background', 'red');
    fuel.mousePressed(full);
    fuel.hide();

    astronaut = createButton("Board Astronauts");
    astronaut.position(570,250);
    astronaut.style('width', '200px');
    astronaut.style('height', '40px');
    astronaut.style('background', 'red');
    astronaut.mousePressed(board);
    astronaut.hide();

    cargo = createButton("Load Cargo");
    cargo.position(570,200);
    cargo.style('width', '200px');
    cargo.style('height', '40px');
    cargo.style('background', 'red');
    cargo.mousePressed(load);
    cargo.hide();

}

function draw(){

    background(bg);

    if(gameState === "start"){

        if(mousePressedOver(startB)){
            click.play();
            startState(); 
        }
    
        if(mousePressedOver(instB)){
            click.play();
            instState(); 
        }
    
        drawSprites();
      }

      if(gameState === "play"){

        panel1.visible = true;
        panel2.visible = true;
        panel3.visible = true;
        panel4.visible = true;

        rocket.visible = true;
        launch.visible = true;
        ground.visible = true;

        engine.show();
        fuel.show();
        astronaut.show();
        cargo.show();

        camera.position.y = rocket.y;

        if (index === 4){

          press.visible = true;

          launch.x = 550;
          panel4.x = 650;
          rocket.x = 700;

          panel1.visible = false;
          panel2.visible = false;
          panel3.visible = false;
  
          engine.hide();
          fuel.hide();
          astronaut.hide();
          cargo.hide();

          if(keyWentDown(UP_ARROW)){

            blast.play();
            rocket.addImage(rocketImg2);
            index = index + 1
            rocket.velocityY = -7;
          }
      }

      if(index === 5){

        distance = distance + Math.round(getFrameRate()/60);

        console.log(distance);

        press.visible = false;
        panel1.visible = false;
        panel2.visible = false;
        panel3.visible = false;
  
        engine.hide();
        fuel.hide();
        astronaut.hide();
        cargo.hide();

      }

      if(distance >= 100){
        bg = loadImage("2.jpg"); 
      }

      if(distance >= 200){
        bg = loadImage("3.jpg"); 
      }

      if(distance >= 300){
        bg = loadImage("4.jpg"); 
      }

      if(distance >= 400){
        bg = loadImage("5.jpg"); 
      }

      if(distance >= 495 ){
        index = index + 1.2;
        rocket.velocityY = 0;
        rocket.x = 640;
        rocket.addImage(done);
        rocket.scale = 1;
        distance = 500;
        engine.hide();
        fuel.hide();
        astronaut.hide();
        cargo.hide();
      }

      drawSprites();

    if(index === 5 ){
      fill("yellow");
      textSize(25);
      text("Layers Of The Atmosphere.", 80, rocket.y);
      fill("white");
      textSize(25);
      text("Distance Travelled: " + distance + " metres", 80, rocket.y-260);
      text("Reach Space To Complete The Mission.", 580, rocket.y-260);
      text("Troposphere: 100 metres", 80, rocket.y+50);
      text("Stratosphere: 200 metres", 80, rocket.y+100);
      text("Mesosphere: 300 metres", 80, rocket.y+150);
      text("Thermosphere: 400 metres", 80, rocket.y+200);
      text("Space: 500 metres", 80, rocket.y+250);
    }

  }

}

function startState(){

    start.visible = false;
    startB.visible = false;
  
    inst.visible = true;
    instB.visible = true;
  }
  
  function instState(){

    inst.visible = false;
    instB.visible = false;

    gameState = "play";

  }

  function on(){
    check.play();
    engine.html("Engine On");
    engine.style('background', 'lightgreen');
    index = index +1;
    launch.x = 850;
    if(index === 4){
      countdown.play();
    }

  }

  function full(){
    check.play();
    fuel.html("Fuel Tank Full");
    fuel.style('background', 'lightgreen');
    launch.x = 910;
    index = index +1;
  }

  function board(){
    check.play();
    astronaut.html("Astronauts Boarded");
    astronaut.style('background', 'lightgreen');
    launch.x = 910;
    index = index +1;
  }

  function load(){
    check.play();
    cargo.html("Cargo Loaded");
    cargo.style('background', 'lightgreen');
    launch.x = 910;
    index = index +1;
  }

