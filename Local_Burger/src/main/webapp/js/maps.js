    	/**
    	 * Initializes the Google Maps API
    	 */
  		function mapInitialize() {
  			console.log("mapInitialize");
  			var mapCanvas = document.getElementById('map');
  			var starterLatLng = {lat: 47.6097, lng: -122.3331};
  		    var mapOptions = {
  		          center: starterLatLng,
  		          zoom: 8,
  		          mapTypeId: google.maps.MapTypeId.ROADMAP
  		        };
  		    var map = new google.maps.Map(mapCanvas, mapOptions);
  		  	
  		    jobMarker = new google.maps.Marker({position: starterLatLng, map: map, title: 'Job', draggable: true});



  		  // Add some markers to the map.
  		  map.data.setStyle(function(feature) {
  		    return {
  		      title: feature.getProperty('name'),
  		      optimized: false
  		    };
  		  });
  		    
  		  var geoJSON = {
  		    	  type: 'FeatureCollection',
  		    	  features: [{
  		    	    type: 'Feature',
  		    	    geometry: {type: 'Point', coordinates: [-87.650, 41.850]},
  		    	    properties: {name: 'Chicago'}
  		    	  }, {
  		    	    type: 'Feature',
  		    	    geometry: {type: 'Point', coordinates: [-149.900, 61.218]},
  		    	    properties: {name: 'Anchorage'}
  		    	  }, {
  		    	    type: 'Feature',
  		    	    geometry: {type: 'Point', coordinates: [-99.127, 19.427]},
  		    	    properties: {name: 'Mexico City'}
  		    	  },   		    	
  		    		{
  		    		    type: 'Feature',
  		    		    geometry: {type: 'Point', coordinates: [-0.126, 51.500]},
  		    		    properties: {name: 'London'}
  		    		  }, {
  		    		    type: 'Feature',
  		    		    geometry: {type: 'Point', coordinates: [28.045, -26.201]},
  		    		    properties: {name: 'Johannesburg'}
  		    		  }, {
  		    		    type: 'Feature',
  		    		    geometry: {type: 'Point', coordinates: [15.322, -4.325]},
  		    		    properties: {name: 'Kinshasa'}
  		    		  }, {
  		    		    type: 'Feature',
  		    		    geometry: {type: 'Point', coordinates: [151.207, -33.867]},
  		    		    properties: {name: 'Sydney'}
  		    		  }, {
  		    		    type: 'Feature',
  		    		    geometry: {type: 'Point', coordinates: [0, 0]},
  		    		    properties: {name: '0°N 0°E'}
  		    		  }]
  		    		};
  		  	map.data.addGeoJson(geoJSON);    
    	}

    	function getJobsJson(){
    		var geoJSON = { "type": "FeatureCollection",
    			    "features": [
    			                 { "type": "Feature",
    			                   "geometry": {"type": "Point", "coordinates": [47.6097, -122.3331]},
    			                   "properties": {"prop0": "value0"}
    			                   }
    			                  ]
    			                };
    		return geoJSON;
    	}
    	
