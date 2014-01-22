var arrowLength=5;
var stage;
var gameCanvas;
var ctx;
var output;
var textBox_rate;
var textBox_pressTimes;
var textBox_result;
var textBox_passTime;
var textBox_FPS;
var textBox_volume;

var gameState="ready";
var playState="";
var pressRate=0;
var spaceKeyState="";
var CspaceKeyState;
var preSpaceKeyState;
var spacePressedCount=0;
var totalSpacePressedCount=0;
var time=0;
var time2=0;
var totalTime=0;
var goodOrBad="null";
var caculateTime=60;
var timeIcount=0;
var timeArrow;
var progressBarValue=0;
var isStartPlay=false;
var volume=1;
var isBarStart;
var thePlayerRate=2;
var gameFrameRate=60;
var textBox_height=30;
var myVideo;
var videoIndex=1;
var volume_up_value=0.1;
var volume_down_value=0.06;
var readyTime=10;
var keys;
var videoListLenght=7;
function textBox()
{
   	this.output=stage.addChild(new createjs.Text("","18px monospace","#000"));
    this.output.lineHeight=15;
    this.output.lineWidth=500;
    this.output.textBaseline="top";
    this.output.x=10;
    this.output.y=5;
    this.output.text="";
}


function init(){
	//code here

        //load the video playlist
 ////////////////////////create FileSystemObject, this is only use in IE///////////////////////////////
    // var fso=new ActiveXObject("Scripting.FileSystemObject");
    // var f1=fso.createxfile("c://myjstext.txt",true);
    // if(f1)alert("sceccess!");

    
 //////////////////////use the FileSystemAPI to load playlist//////////////////////////////////////////   
  // if (window.webkitRequestFileSystem) {
  //                    window.webkitRequestFileSystem(window.PERSISTENT, 1024*1024,onInitFs,errorHandler);
  //               } 
  //                else {
  //                   window.requestFileSystem(window.PERSISTENT, 1024*1024, onInitFs, errorHandler);
  //               }
   
//////////////////////use the Node.js to read the dir//////////////////////////////////////////////////
       // var nodejs_fs = require('fs');
       // var dir="myVideo";
       // var files = nodejs_fs.readdirSync(dir);
       // alert("files[0]");

/////////////////////use php to list files//////////////////////////////////////////////////////////////
//   <?php
// $dir = "/myVideo";
// $dh  = opendir($dir);
// while (false !== ($filename = readdir($dh))) {
//     $files[] = $filename;
// }

// sort($files);

// print_r($files);

// ?>
    
      isBarStart=false;

      $( "#progressbar" ).progressbar({
       value: 0
      });

      myVideo=document.getElementById("myVideo");
   
      myVideo.addEventListener('ended',function(){
      videoIndex++;
      
      if(videoIndex>videoListLenght)videoIndex=1;
      this.pause();
      
      this.src="videos/0"+(videoIndex)+".mp4";
      myVideo.play();
      playNext();
      
      
    },false);
    $('#filelist li').removeClass('active');
    $('#filelist li').eq(0).addClass('active');


   for(var i=0;i<videoListLenght;i++)
   {
     $('#filelist li').eq(i).click(function(){
       myVideo.pause();
       myVideo.src=$('#filelist li').eq(i).attr('videourl');
       myVideo.play();
       $('#filelist li').removeClass('active');
       $(this).addClass('active');
       videoIndex=i+1;
      });

   }


     $(window).keydown(
        function(e){
            if(e.keyCode ==32)spaceKeyState="down";       
        }
    );
    $(window).keyup(
        function(e){
             if(e.keyCode ==32)spaceKeyState="up";
        }
    );

    stage=new createjs.Stage("gameCanvas");

    //each arrow element to hold the pressed times in one seconed 
    timeArrow=new Array(arrowLength);
    for(var i=0;i<arrowLength;i++)
     {
      timeArrow[i]=0;
     }
    
    createjs.Ticker.addEventListener("tick",gameUpdate);
    //createjs.Ticker.setInterval(30);
    createjs.Ticker.setFPS(gameFrameRate);
    //stage.update();
    //var ME=new createjs.MouseEvent(click,0,0,gameCanvas,)
    //UI code
    output=stage.addChild(new createjs.Text("","18px monospace","#000"));
    output.lineHeight=15;
    output.lineWidth=100;
    output.textBaseline="top";
    output.x=stage.canvas.width-output.lineWidth-10;
    output.y=20;

    textBox_rate=new textBox();

    textBox_result=new textBox();
    textBox_result.output.y=textBox_height;
    
    textBox_pressTimes=new textBox();
    textBox_pressTimes.output.y=textBox_height*2;
    
    textBox_passTime=new textBox();
    textBox_passTime.output.y=textBox_height*3;

    textBox_FPS=new textBox();
    textBox_FPS.output.y=textBox_height*4;
 
    textBox_volume=new textBox();
    textBox_volume.output.y=textBox_height*5;
}

function gameUpdate(){

    CspaceKeyState=spaceKeyState;

    stage.update();
    
    switch(gameState)
    {
        case "ready":
        
        //place start code here
        textBox_rate.output.text="please press spaceKey to start!";
        
       if(CspaceKeyState=="up"&&preSpaceKeyState=="down")
        {
          gameState="play";
          isBarStart=true;
        }
        break;

        //calculate player speed
        case "start":
         textBox_rate.output.text="calculating your speed...... ";
        
        if(isBarStart==true&&time2<gameFrameRate*11){
            time2++;
        }

        if(CspaceKeyState=="up"&&preSpaceKeyState=="down")
        {
            spacePressedCount++;
        }
        
         if(time2>=gameFrameRate*readyTime&&isStartPlay==false)
         {
            myVideo.play();
            isStartPlay=true;
            thePlayerRate=spacePressedCount/readyTime;
            spacePressedCount=0;
            gameState="play";
         }
         if(time2<=gameFrameRate*10){
                $( "#progressbar" ).progressbar({
                  value: time2/6
                });
              }
        break;

        case "play":

        time++;
        totalTime++;
        
        if(CspaceKeyState=="up"&&preSpaceKeyState=="down")
        {
            spacePressedCount++;
        }
        
        if(time>=caculateTime)
        {
            updataSpeed(spacePressedCount);
            //moving the arrow
            // for(var i=arrowLength-1;i>0;i--)
            // {
            //     timeArrow[i]=timeArrow[i-1];
            // }

            // timeArrow[0]=spacePressedCount;

            //  for(var i=0;i<arrowLength;i++)
            // {
            //     totalSpacePressedCount+=timeArrow[i];
            // }
             //if totaltime > 10 seconed
            if(totalTime>=(arrowLength*gameFrameRate)){
              pressRate=(totalSpacePressedCount/arrowLength).toFixed(1);
            }
            else{
               pressRate=(totalSpacePressedCount/(totalTime/gameFrameRate)).toFixed(1);
            }

            time=0;
            spacePressedCount=0;
            textBox_rate.output.text="current rate: "+pressRate;
            textBox_pressTimes.output.text="pressed in latest "+arrowLength+"s: "+totalSpacePressedCount;
            //textBox1.output.text="spaceKey pressed current rate: "+pressRate+"   pressed:"+timeArrow[0];
            totalSpacePressedCount=0;

            
            if( pressRate>=thePlayerRate){
             volume+=volume_up_value;
             if(volume>1)volume=1;
            myVideo.volume=volume;
            }
             else{
            volume-=volume_down_value;
             if(volume<0)volume=0;
            myVideo.volume=volume;
             }
              
        }
       
        // if(totaltime>600)
            if( pressRate>=thePlayerRate){
                goodOrBad="good!";
            }
            else{
                goodOrBad="bad!";
             }

        //var result=Math.round((totalTime/60)*10)/10;
      var result=(totalTime/gameFrameRate).toFixed(1);     
        textBox_result.output.text="good or bad? : "+goodOrBad;
        textBox_passTime.output.text="passed time:"+result+" s";
        textBox_FPS.output.text="FPS:"+Math.round(createjs.Ticker.getFPS()*10)/10+"             playerSpeed: "+thePlayerRate;
        textBox_volume.output.text="Volume:"+(myVideo.volume*100).toFixed()+"%"+"         videoIndex: "+videoIndex;
        break;

        case "gameOver":
        //deal endthing
        break;
        default:      
    }

     preSpaceKeyState=spaceKeyState;
}

// function updateSpeed(nowSpeed,refSpeed,speed)
// {
//     if(nowSpeed >= refSpeed)
//     {   
//       var upSpeed = parseInt(recordPlayerSpeed * 0.1);
//       if(upSpeed < 2)
//       {
//         upSpeed = 2;
//       }

//       if(speed < recordPlayerSpeed) //在失败后，加快增加速度
//       {
//         speed += upSpeed;
//         //speed += 12;
//       }
//       else
//       {
//         speed += 2;
//       }

//       if(speed > (playerSpeedPerLevel*10))
//       {
//         speed = playerSpeedPerLevel*10;
//       }
//     }
//     else 
//     {   
//       var downSpeed = parseInt(recordPlayerSpeed * 0.05);
//       if(downSpeed < 3)
//       {
//         downSpeed = 3;
//       }

//       if(speed >= (downSpeed * 2))
//       {
//         speed -= (downSpeed * 2);
//       }
//       else
//       {
//         speed = 0;
//       }

//       if(recordPlayerSpeed >= downSpeed)
//       {
//         recordPlayerSpeed -= downSpeed;
//       }
//       else 
//       {
//         recordPlayerSpeed = 0;
//       }
//     }

//     if(speed > recordPlayerSpeed) recordPlayerSpeed = speed;
//     playerSpeed = parseInt(((speed + playerSpeedPerLevel - 1)/(playerSpeedPerLevel*10))*NoOfLevel)
// }

function initVideo(elem){}

function playNext(){
    $('#filelist li').removeClass('active');
    $('#filelist li').eq(videoIndex-1).addClass('active');
}

