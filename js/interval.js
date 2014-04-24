var data = JSON.parse(localStorage.getItem("history"));
data = data || {};

var mins,secs,TimerRunning,TimerID;
 TimerRunning=false;
 
 function rnd_bmt() {
  var x = 0, y = 0, rds, c;

  // Get two random numbers from -1 to 1.
  // If the radius is zero or greater than 1, throw them out and pick two new ones
  // Rejection sampling throws away about 20% of the pairs.
  do {
  x = Math.random()*2-1;
  y = Math.random()*2-1;
  rds = x*x + y*y;
  }
  while (rds == 0 || rds > 1)

  // This magic is the Box-Muller Transform
  c = Math.sqrt(-2*Math.log(rds)/rds);

  // It always creates a pair of numbers. I'll return them in an array. 
  // This function is quite efficient so don't be afraid to throw one away if you don't need both.
  return [x*c, y*c];
}
i = 1;
while(i < 10)
{
  var x = rnd_bmt();
  if (x[0] > 3 || x[1] > 3)
    console.log(i);

  i++;
}

/*

determine 1 SD - randomness factor
multiply by rnd_bmt() - if outside range, reject
  after certain # just give the mean

| p1% within 1 ssd of n | p2% within 2 sd of n|

random walk

+/-, 1/2, 1/2, 1/2...

*/
console.log(rnd_bmt());

 function Init() //call the Init function when u need to start the timer
 {
    // mins=15;
    // secs=0;

    // {max, min, percent}


    //how many sd away from middle/mean are the ends?
    // interval_a = { name: "work", s: 5,   max: 100, min: 50,  avg: 90,  randomness: 1 };
    // interval_b = { name: "rest", s: 10,  max: 15,  min: 10, avg: 12,  randomness: 1 };
    // interval_c = { name: "rest", s: 10,  max: 3,   min: 3 , avg: 3,   randomness: 1 };

    // For Sound purposes
    last = "Baseline";

    h = {max: 10, min: 3,  avg: 5,  randomness: 1 };
    b = {max: 25, min: 5,  avg: 15,  randomness: 1 };

    opponent = {highInterval: h, baseInterval: b};

    bout = [];

    timeInPeriod = 180;
    timeLeft=timeInPeriod;

    // one "light" period
    while (timeInPeriod > 0)
    {
      // opponent.baseInterval.
      // Math.floor((Math.random()*(opponent.baseInterval.max - opponent.baseInterval.min + 1) ) + opponent.baseInterval.min )
      // console.log("outer while");
      samePoint = true;
      samePointProbability = 0.5;

      while (samePoint)
      {
        // console.log("inner while");
        
        var baseTime = 0;

        for (var i = 0; i < 10; i++)
        {
          baseTime = Math.floor(rnd_bmt()[0] * (opponent.baseInterval.max - opponent.baseInterval.min) / (opponent.baseInterval.randomness * 2) + opponent.baseInterval.avg);  

          if (baseTime >= opponent.baseInterval.min && baseTime <= opponent.baseInterval.max)
            break;

          if (i == 9)
            baseTime = opponent.baseInterval.avg;
        
        }


        if (timeInPeriod - baseTime >= 0)
        {
          bout.push( {name: "Baseline", time: baseTime} );
          timeInPeriod -= baseTime;
        }
        else 
        {
          bout.push( {name: "Baseline", time: timeInPeriod} );
          timeInPeriod -= baseTime;
          break;
        }


        var highTime = 0;

        for (var i = 0; i < 10; i++)
        {
          highTime = Math.floor(rnd_bmt()[0] * (opponent.highInterval.max - opponent.highInterval.min) / (opponent.highInterval.randomness * 2) + opponent.highInterval.avg);  

          if (highTime >= opponent.highInterval.min && highTime <= opponent.highInterval.max)
            break;

          if (i == 9)
            highTime = opponent.highInterval.avg;

          // console.log("loop");
        
        }


        // if (highTime >= opponent.highInterval.min && highTime<= opponent.highInterval.max)
        if (timeInPeriod - highTime >= 0)
        {
          bout.push( {name: "High", time: highTime} );
          timeInPeriod -= highTime;
        }
        else 
        {
          bout.push( {name: "High", time: timeInPeriod} );
          timeInPeriod -= highTime;
          break;
        }

        


        samePoint = Math.random() < samePointProbability;
        samePointProbability -= 0.1;
        console.log(timeInPeriod);
        console.log(samePoint);

      }

      bout.push( {name: "Action Stopped", time: 15} );

    }

    // console.log(bout);

    timesIndex = 0;

    times = [];
    levels = [];

    total = 0;
    var d = new Date();
    date = d.toDateString();
    
    if (!(date in data))
    {
      data[date] = {"Baseline": 0, "High": 0, "Action Stopped": 0, "Total": 0};
    }

    for(var i = 0; i < bout.length; i++)
    {
      levels.push(bout[i].name);
      // console.log(bout[i].name);
      times.push(bout[i].time);
      // console.log(bout[i].time);

      data[date][bout[i].name] += bout[i].time;
      data[date]["Total"] += bout[i].time;
    }

localStorage.setItem("history", JSON.stringify(data));

console.log(data[date])
    originalTimes = times.slice(0);

    $(function(){
      $("#clock").html(Pad(Math.floor(timeLeft/60)) + ":" + Pad(timeLeft%60));
      
      // $("#round").html(curRound+ "/" + numRounds);
    });
    console.log(times);

    StopTimer();
    // StartTimer();
 }
 
 function StopTimer()
 {
    if(TimerRunning)
       clearTimeout(TimerID);
    TimerRunning=false;

 }

 function ToggleTimer()
 {
    if(timeLeft == 0)
    {
      $("#toggle-timer").html("Start");
      Init();
    }
    else if(TimerRunning)
    {
      $("#toggle-timer").html("Continue");
      TimerRunning=false;
      $("#nav").show();
      $("#quitbutton").show();
    }
    else 
    {
      $("#toggle-timer").html("Pause");
      StartTimer();
      $("#nav").hide();
      $("#quitbutton").hide();
    }
 }

 function StartTimer()
 {
    TimerRunning=true;
    ContinueTimer();
 }

 function ContinueTimer()
 {
    if(TimerRunning)
    {
      window.status="Time Remaining "+Pad(mins)+":"+Pad(secs);
      TimerID=self.setTimeout("ContinueTimer()",1000);

      if(timeLeft == 0)
        StopTimer()

      if (timesIndex == times.length)
        StopTimer();

      else
      {

        if (times[timesIndex] == 0)
        {
          timesIndex++;
        }
        else
          times[timesIndex]--;
          if(($("#interval-name").html() != "Action Stopped") && (timeLeft > 0))
          {
            timeLeft--;
          }

          if($("#interval-name").html() == "Action Stopped")
          {
            $(".progress").show();
            $("#break-bar").css("width", times[timesIndex]/15 * 100 + "%");
            console.log(times[timesIndex]);
          }

        $("#interval-name").html(levels[timesIndex]);

        if($("#interval-name").html() == "High")
        {
          $(".progress").hide();
          if (last != "High"){
            PlaySound("beep-08");
            console.log(last);
          }
          last = "High"
          $("body").css("background-color", "#E82709")
        }
        else if($("#interval-name").html() == "Baseline")
        {
          $(".progress").hide();
          if (last != "Baseline"){
            PlaySound("beep-07");
            console.log(last);
          }
          last = "Baseline"
          $("body").css("background-color", "#FFB713")
        }
        else
        {
          if (last != "Action Stopped"){
            PlaySound("beep-09");
            console.log(last);
          }
          last = "Action Stopped"
          $("body").css("background-color", "#1C83F5")
          $(".progress").show();
        }

        $("#clock").html(Pad(Math.floor(timeLeft/60)) + ":" + Pad(timeLeft%60));
      }

    }
 
 }
 
 function Pad(number) //pads the mins/secs with a 0 if its less than 10
 {
    if(number<10)
       number=0+""+number;
    return number;
 }

Init();

function PlaySound(soundObj) {
  var sound = document.getElementById(soundObj);
  sound.Play();
}

function confirmQuit()
{
  var r=confirm("Are you sure you want to quit?");
  if (r==true)
  {
    window.location.replace("index.html");
  }
}

