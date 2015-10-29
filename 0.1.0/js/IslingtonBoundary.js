// GEOSERVER ISLINGTON BOUNDARY LAYER
function islington(){	
  
    var geojsonUrl = geoserverUrl + "&typeName=lbi_gs:LONDON_BOROUGHS&outputFormat=text/javascript";
  
    $.ajax({
        url: geojsonUrl,
        dataType: "jsonp",
        jsonpCallback: 'parseResponse',
        error: function(){alert('Data load error.  Please refresh page OR contact shamir.khan@islington.gov.uk')},
        success: configureLayer  //pass data to function that adds to map
    });
    
    function configureLayer(data) {
        // set style for boundary
        var myStyle = {
            "fill": false,
            "color": "#000",
            "weight": 3,
            "opacity": 0.7
        };
        
        var islingtonPolygon = L.Proj.geoJson(data, {
            
            style: myStyle,
            
            filter: function(feature, layer){
                var display;
                var census_code = feature.properties.CENSUS_CODE;
                    
                if(census_code == '00AU'){display='True'}
                return display;
            }
        });
        
        islingtonPolygon.addTo(map);
    }
}