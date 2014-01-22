var keepPressTimes = 0;
var referencePressTimes = 0;
var referenceSpeed = 0.5;
var pressTimesArray = [0,0,0,0,0];
var playerPressSpeed = 0;

function updateSpeedF(pressTimes)
{
	if(keepPressTimes<10)		//获得10次参考按键次数
	{
		referencePressTimes += pressTimes;
		keepPressTimes++;
	}
	else if(referenceSpeed < 1)
	{								
		if(referencePressTimes == 0)		//在测试参考速度时，如果玩家没有按键，就返回主页
		{
			keepPressTimes = 0;

            return 0;
		}
		referenceSpeed = referencePressTimes * 0.25;		//得到参考按键速度
		if(referenceSpeed < 1)
		{
			referenceSpeed = 1;
		}					
	}
	
	for(var i = 0; i < pressTimesArray.length - 1;i++)		//获得玩家最近5秒的按键次数
	{
		pressTimesArray[i] = pressTimesArray[i+1];
	}
	pressTimesArray[pressTimesArray.length - 1] = pressTimes;
	pressTimes = 0;

	var speed_Temp = 0;
	for(var i = 0; i < pressTimesArray.length;i++)
	{
		speed_Temp += pressTimesArray[i];
	}
	playerPressSpeed = speed_Temp;	//得到玩家当前按键速度


	if(playerPressSpeed >= referenceSpeed)
	{		
		return 1;
	}
	else 
	{		
		return 2;
	}
}
