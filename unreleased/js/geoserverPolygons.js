// ========================================================================= //
// Camden geoserver layers
function camdenPlanningApplications(){
    var workspaceName = "Camden";
    var layerName = "PlanningApplicationPoint";
    // set style for boundary
    var myStyle = {
        "fill": false,
        "color": "#000",
        "weight": 2,
        "opacity": 0.7
    };
    // set filter based on data from object properties
    var myFilter;
    
    // get geoserver layers
    addPolygon(workspaceName, layerName, myStyle, myFilter); 
}

// ========================================================================= //
// LBI geoserver layers
function islingtonBoundary(){
    var workspaceName = "lbi_gs";
    var layerName = "LONDON_BOROUGHS";
    // set style for boundary
    var myStyle = {
        "fill": false,
        "color": "#000",
        "weight": 3,
        "opacity": 1
    };
    // set filter based on data from object properties
    var myFilter = function(feature, layer){
                    var display;
                    var census_code = feature.properties.CENSUS_CODE;
                    if(census_code == '00AU'){display='True'}
                    return display;
                };
    // get geoserver layers
    addPolygon(workspaceName, layerName, myStyle, myFilter);
}

function housingOfficeAreas(){
    var workspaceName = "lbi_gs";
    var layerName = "HOUSINGOFFICE";
    // set style for boundary
    var myStyle = {
        "fill": false,
        "color": "#000",
        "weight": 2,
        "opacity": 0.7
    };
    // set filter based on data from object properties
    var myFilter;
    
    // get geoserver layers
    addPolygon(workspaceName, layerName, myStyle, myFilter); 
}

function estateBoundaries(){
    var workspaceName = "lbi_gs";
    var layerName = "PILOT_ESTS";
    // set style for boundary
    var myStyle = {
        "fill": false,
        "color": "#000",
        "weight": 2,
        "opacity": 0.7
    };
    // set filter based on data from object properties
    var myFilter;
    
    // get geoserver layers
    addPolygon(workspaceName, layerName, myStyle, myFilter); 
}

// ========================================================================= //
// Configure layers in above functions and send vars to this function
// Geoserver generic polygon layer
function addPolygon(workspaceName, layerName, myStyle, myFilter){	
    var geojsonUrl = geoserverUrl + "&typeName="+workspaceName+":"+layerName+"&outputFormat=text/javascript";
    
    $.ajax({
        url: geojsonUrl,
        dataType: "jsonp",
        jsonpCallback: 'parseResponse',
        error: function(){alert('Data load error.  Please reload page in new tab / window or contact shamir.khan@islington.gov.uk')},
        success: addToMap  // pass data to function that adds objects to map
    });
    
    function addToMap(data) { 
        // create object and add to map using data from geoserver
        var polygon = L.Proj.geoJson(data, {
            style: myStyle,
            filter: myFilter
        });
        
        polygon.addTo(map);
    }
}