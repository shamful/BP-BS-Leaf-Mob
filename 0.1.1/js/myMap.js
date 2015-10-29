// geoserver internal test
var geoserverUrl = "http://giswmsdv01:8080/geoserver/lbi_gs/ows?service=WFS&version=1.0.0&request=GetFeature";

function main() {
    
// Add geoserver polygon layers
// functions from geoserverPolygons.js
//islingtonBoundary();  // islington boundary
estateBoundaries();   // estateBoundaries
housingOfficeAreas(); // housing office areas

// Projection
var crs1 = new L.Proj.CRS(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs +units=m +no_defs',
    {
        resolutions: [1600, 800, 400, 200, 100, 50, 25, 10, 5, 2.5, 1, 0.5, 0.25, 0.125, 0.0625]
    }
);

var crs2 = new L.Proj.CRS('EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs', {
  resolutions: [
    5078.125,
    2539.0625,
    1269.53125,
    634.765625,
    317.3828125,
    158.69140625,
    79.345703125,
    39.6728515625,
    19.8364257813,
    9.9182128906,
    4.9591064453
  ],
  transformation: new L.Transformation(1,300000,-1,1300000)
});
    
var crs3 = new L.Proj.CRS('EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs', {
  resolutions: [
    5078.125,
    2539.0625,
    1269.53125,
    634.765625,
    317.3828125,
    158.69140625,
    79.345703125,
    39.6728515625,
    19.8364257813,
    9.9182128906,
    4.9591064453
  ],
  transformation: new L.Transformation(1,300000,-1,1300000)
});
    
    
    
// INIT MAP
window.map = L.map('map', { 
    zoomControl: false,
//    crs: crs1,
    continuousWorld: true,
    worldCopyJump: false,
    attributionControl: false
});

// MAP SETTINGS
    
// Add attribution to top right
L.control.attribution({position:"topright"}).addTo(map);


// Set view of map on load 
var locHome = [51.5489,-0.1080];
var zoom = 13;
map.setView(locHome,zoom);

// Init location plugin - do not add to map
window.locator = L.control.locate().addTo(map);
    
// Enable / add basemaps and populate BS dropdown menu
enableBaselayers();

// routing machine
window.routingMachine = L.Routing.control({
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim({
                geocodingQueryParams: {countrycodes: 'gb' } // restrict search to UK
            })
}).addTo(map);
    
window.geocoder1 = L.Control.geocoder();

// LISTENERS    
// Home button
$('button#home').click( function(){
   map.setView(locHome,zoom); 
});
// Fullscreen toggle
$('button#fullscreenToggle').click( function(){
    fullscreenToggle();
});
// Attribution toggle
$('button#attributionToggle').click( function(){
    $('.leaflet-control-attribution').fadeToggle();
});
// Get user location
$('#getLocation').click( function(){
    if( $(this).hasClass('on') ){
        $(this).removeClass('on').find('a').text('Track My Location');
        locator.stop();
    } else {
        $(this).addClass('on').find('a').text('Stop Tracking');
        locator.start();
    }
});

// Routing Machine Toggle
$('#routingMachineToggle').click( function(){
    $('.leaflet-routing-container').fadeToggle();
    if( $(this).hasClass('on') ){
        $(this).removeClass('on').find('a').text('Direction');
    } else {
        $(this).addClass('on').find('a').text('Hide Directions');
    }
});

}


// change baselayer when user selects baselayer from menu
function switchBaselayer(layerNum){
    // Ask map if chosen layer already on: true / false
    var alreadyOn = map.hasLayer(baselayers[layerNum].layer);
    // If false remove current baselayer by looping thorugh baselayers object and removing all baselayers from map
    // better way to do this? layer ID?
    if(!alreadyOn){
        for(var x in baselayers){
            map.removeLayer(baselayers[x].layer);
        }
    }
    map.addLayer(baselayers[layerNum].layer);
    
    // Add base layer selected to cookie
    document.cookie = "selectedBaseLayer="+layerNum;
}


// BASE MAPS / LAYERS
function enableBaselayers(){

    // Store baselayer tiles
    var OpenStreetMap_HOT = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
    });

    var Stamen_Watercolor = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'png'
    });

    var Stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });

    // Store above tiles in baselayers object - will iterate through object and add to DOM
    window.baselayers = {
        0: {name: "OSM HOT", layer: OpenStreetMap_HOT},
        1: {name: "Stamen Watercolor", layer: Stamen_Watercolor},
        2: {name: "Stamen Toner", layer: Stamen_Toner}
    }

    // Turn on default baselayer or chosen layer from last session
    var selectedBaseLayer = document.cookie.replace(/(?:(?:^|.*;\s*)selectedBaseLayer\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if(selectedBaseLayer){
        map.addLayer(baselayers[selectedBaseLayer].layer);    
    } else {
        map.addLayer(baselayers[0].layer);
    }

    // Populate basemap switcher dropdown menu
    for(x in baselayers){
        console.log(baselayers[x].name);
        $('#baselayersMenu').append('<li><a href="#" onclick="switchBaselayer('+x+')">'+baselayers[x].name+'</a></li>');
        
        // Show a loading css div when basemap tiles are loading
        $(baselayers[x].layer).on('loading', function(){
            $('#loaders').fadeIn();
        });        
        // Hide loading css when baselayer has finished loading
        $(baselayers[x].layer).on('load', function(){
            $('#loaders').fadeOut();
        });
    }
}


$(document).ready(main);