$( document ).ready(function() {
    locationWeather();
  });

//initialize variables
var api = "";
var unit = "imperial";
var unitType = "°F"
var unitType2 = "°C";
var icon = "";
var bg = "";
var rgbaVal = "rgba(0,85,135,0.7)";

//Get user's local time
var time = new Date();
time = time.toString().split(" ");
time = time[4];
var time = time.split(":");
var firstDigit = time[0];

//Get users location and update api link
function locationWeather(){
  $.getJSON("http://ip-api.com/json", function(json2) {
//Get Coordinates
 var lat = json2.lat;
 var lon = json2.lon;
 //Update API
 api = "http://api.wunderground.com/api/ba96d1f91e918bc4/conditions/q/" + lat + "," + lon + ".json";
 weatherData(api);
 console.log(api);
});
}

//Extract Json info and call update
function weatherData() {
 $.getJSON(api, function (data) {
    var raw = JSON.stringify(data);
    var json = JSON.parse(raw);
    updateWeather(json); //Update Weather parameters
    updateStyles(json); //Change styles to match weather parameters
    //Dev reference Logs
    console.log(firstDigit);
    console.log(json.current_observation.weather);
});
}


//Update weather
function updateWeather(json) {
   $('#location').html(json.current_observation.display_location.full);
   $('#weatherType').html(json.current_observation.weather);
   $('#temperature').html(Math.round(json.current_observation.temp_f) + unitType);
   //Toggle between c and f
   $('p').on('click', function(){
    $('p').toggleClass('C');
    $('p').toggleClass('F');
    if ($(this).hasClass('C')) {
      $('#temperature').html(Math.round((json.current_observation.temp_f - 32) * .556) + unitType2);
    }
    if($(this).hasClass('F')) {
      $('#temperature').html(Math.round(json.current_observation.temp_f) + unitType);
    }

  });
}

//Change background and icons to match weather
function updateStyles(json) {
  if (['Overcast', 'Clear', 'Partly Cloudy', 'Mostly Cloudy', 
    'Scattered Clouds'].indexOf(json.current_observation) === -1) {
      if (firstDigit <= 06 || firstDigit >= 20) {
        icon = "images/icons/cloudy-night-icon.png";
        bg = "images/backgrounds/nightBg.jpeg"; 
        rgbaVal = "rgba(0,0,0,0.5)";      
      } 
      else {
      icon = "images/icons/partly-cloudy-day-icon.png";
      bg = "images/backgrounds/sunnyBg.jpeg";
      }
    updateDisplay(icon, bg, rgbaVal);
  } 
  else if (['Drizzle', 'Light Drizzle', 'Heavy Drizzle', 'Rain', 
    'Heavy Rain', 'Light Rain', 'Rain Mist', 'Light Rain Mist', 
    'Heavy Rain Mist', 'Rain Showers', 'Light Rain Showers', 
    'Heavy Rain Showers'].indexOf(json.current_observation) === -1) {
      if (firstDigit <= 06 || firstDigit >= 20) {
    icon = "images/icons/Night-rain-icon.png";
    bg = "images/backgrounds/rainNightBg.jpeg";
        rgbaVal = "rgba(0,0,0,0.5)";      
      } 
      else {
      icon = "images/icons/rain-icon.png";
      bg = "images/backgrounds/rainBg.jpeg";
      }
    updateDisplay(icon, bg, rgbaVal);
  }
  else if (['Thunderstorm', 'Heavy ThunderStorm', 'Light Thunderstorm', 
    'Thunderstorms and Rain', 'Heavy Thunderstorms and Rain', 'Light Thunderstorms and Rain',
    'Thunderstorms and Snow', 'Heavy Thunderstorms and Snow', 'Light Thunderstorms and Snow',
    'Thunderstorms and Ice Pellets', 'Heavy Thunderstorms and Ice Pellets', 'Light Thunderstorms and Ice Pellets', 
    'Thunderstorms with Hail', 'Heavy Thunderstorms with Hail', 'Light Thunderstorms with Hail',
    'Thunderstorms with Small Hail', 'Heavy Thunderstorms with Small Hail', 'Light Thunderstorms with Small Hail',
    'Freezing Drizzle', 'Heavy Freezing Drizzle', 'Light Freezing Drizzle',
    'Freezing Rain', 'Heavy Freezing Rain', 'Light Freezing Rain'].indexOf(json.current_observation) === -1) {
    icon = "images/icons/thunder-icon.png";
    bg = "images/backgrounds/thunderBg.jpeg";
    rgbaVal = "rgba(0,0,0,0.5)"; 
    updateDisplay(icon, bg, rgbaVal);
  }  
  else if (['Snow', 'Light Snow', 'Heavy Snow', 'Snow Grains', 
    'Heavy Snow Grains', 'Light Snow Grains', 
    'Ice Crystals', 'Light Ice Crystals', 'Heavy Ice Crystals', 
    'Ice Pellets', 'Light Ice Pellets', 'Heavy Ice Pellets', 
    'Hail', 'Light Hail', 'Heavy Hail', 'Snow Showers', 
    'Light Snow Showers', 'Heavy Snow Showers', 'Blowing Snow', 'Heavy Blowing Snow', 'Light Blowing Snow', 
    'Snow Blowing Snow Mist', 'Heavy Snow Blowing Snow Mist', 'Light Snow Blowing Snow Mist',
    'Ice Pellet Showers', 'Heavy Ice Pellet Showers', 'Light Ice Pellet Showers', 
    'Hail Showers', 'Heavy Hail Showers', 'Light Hail Showers', 
    'Small Hail Showers', 'Light Small Hail Showers', 
    'Heavy Small Hail Showers'].indexOf(json.current_observation) === -1) {
      if (firstDigit <= 06 || firstDigit >= 20) {
        icon = "images/icons/Snow-night.png";
        bg = "images/backgrounds/snowNightBg.jpeg"; 
        rgbaVal = "rgba(0,0,0,0.5)";      
      } 
      else {
      icon = "images/icons/snow-icon.png";
      bg = "images/backgrounds/snowBg.jpeg";
      }
    updateDisplay(icon, bg, rgbaVal);
  }
}

//Update display to match weather variables
function updateDisplay(icon, bg, rgbaVal) {
    $('#weatherType').html("<img id = 'icon' src=" + icon + ">");
    $('body').css("background-image", "url(" + bg + ")");
    $('.display').css("background", "" + rgbaVal);
}

