// file description

$(document).ready(function() {

/* -----------------------------------------------------------------------
	MapboxGL map object and source layers
----------------------------------------------------------------------- */

	// mapbox access token
	mapboxgl.accessToken = 'pk.eyJ1IjoianBvbWVyYW50eiIsImEiOiJjaXdjazZnaDQwNzM1Mm9wZXl4dnRtcHptIn0.8MxZjQZnzdc1gHukh_757Q';
	
	// define the mapboxgl map object and initial parameters
	var map = new mapboxgl.Map({
	    container: 'map', // container id
	    style: 'mapbox://styles/jpomerantz/cix9mg3gu00b52poh3tvu5fbj', //stylesheet location
	    minZoom: 10.5,
		center: [-122.465, 37.755], // starting latlon position
    	zoom: 11.48 // starting zoom
	    // maxBounds: [[-122.618025, 37.660094],[-122.283068, 37.857349]] // max panning extents
	});

	
	// define additional data sources not included in mapbox studio style
	// create map layers from sources
	map.on('style.load', function() {
		// map.addSource("1857_shore", {
		//   "type": "geojson",
		//   "data": '1857.geojson'
		// });
		// map.addSource("springs", {
		//   "type": "geojson",
		//   "data": 'springs.geojson'
		// });

		// map.addSource("contours", {
		//   "type": "geojson",
		//   "data": 'contours.geojson'
		// });
		// map.addLayer({
		//   "id": "contours",
		//   "type": "line",
		//   "source": "contours",
		//   "layout": {
		//       "line-join": "round",
		//       "line-cap": "round"
		//   },
		//   "paint": {
		//       "line-color": "#ad4a36",
		//       "line-opacity": 0.5,
		//       "line-width": {
		//       	"base": 1,
		//     		"stops": [[11, 0], [18, 1.5]]
		//       }
		//   }
		// }, 'mapbox-iwsstuart-44ys0zp4');

		map.addSource("contours-simple", {
			"type": "geojson",
			"data": 'contours_simple.geojson'
		});
		map.addLayer({
			"id": "contours-simple",
			"type": "line",
			"source": "contours-simple",
			"layout": {
			    "line-join": "round",
			    "line-cap": "round"
			},
			"paint": {
			    "line-color": "#ad4a36",
			    "line-opacity": {
			    	"base": 0.5,
			  		"stops": [[10, 0.15], [12, 0.25], [14, 0.5]]
			    },
			    "line-width": {
			    	"base": 1,
			  		"stops": [[10, 0.1], [13.9, 0.2], [14, 0]]
			    }
			}
		});
		
		map.addSource("bay-and-marsh-fill", {
			"type": "vector",
			"url": 'mapbox://iwsstuart.50uz2cwq'
		});
		map.addLayer({
			"id": "bay-and-marsh-fill",
			"type": "fill",
			"source": "bay-and-marsh-fill",
			"source-layer": "Bay_and_marsh_fill",
			"paint": {
			    "fill-color": "#899292",
			    "fill-opacity": 0.3
			}
		}, 'fresh-water-past');

		map.addSource("sf-city-boundary", {
			"type": "vector",
			"url": 'mapbox://iwsstuart.aq6vwvdl'
		});
		map.addLayer({
			"id": "sf-city-boundary",
			"type": "fill",
			"source": "sf-city-boundary",
			"source-layer": "SF_city_boundary",
			"paint": {
			    "fill-color": "#F4D4C3",
			    "fill-opacity": 1
			}
		}, 'hillshade_highlight_bright');

		map.addSource("sf-city-boundary-line", {
			"type": "vector",
			"url": 'mapbox://iwsstuart.ahaqmie8'
		});
		map.addLayer({
			"id": "sf-city-boundary-line",
			"type": "line",
			"source": "sf-city-boundary-line",
			"source-layer": "SF_city_boundary_south",
			"paint": {
				"line-color": "#B29280",
			    "line-width": {
			    	"base": 1,
			  		"stops": [[10, 0.8], [14, 1.8]]			    
			    }
			}
		}, 'hillshade_highlight_bright');

		map.addSource("mapbox-satellite", {
			"type": "raster",
			"url": 'mapbox://mapbox.satellite'
		});
		map.addLayer({
			"id": "mapbox-satellite",
			"type": "raster",
			"source": "mapbox-satellite",
			"source-layer": "Mapbox Satellite",
			"minzoom": 12.5,
			"layout": {
				"visibility": "none"
			},
			"paint": {
				"raster-opacity": 0.8
			}
		}, 'developed-freshwater');

		map.addSource("satellite-lowzoom", {
			"type": "image",
			"url": "sfbay_satellite.jpg",
			"coordinates": [
				[-122.7187920171146658,38.0522311419269954],
				[-122.1187596171146623,38.0522311419269954],
				[-122.1187596171146623,37.4521987419269919],
				[-122.7187920171146658,37.4521987419269919]
			]
		});
		map.addLayer({
			"id": "satellite-lowzoom",
			"type": "raster",
			"source": "satellite-lowzoom",
			"maxzoom": 13,
			"layout": {
				"visibility": "none"
			},
			"paint": {
				"raster-opacity": 0.8
			}
		}, 'developed-freshwater');

		// map.addSource("satellite", {
		// 	"type": "raster",
		// 	"url": "mapbox://iwsstuart.5f5wbk4k"
		// });
		// map.addLayer({
		// 	"id": "satellite",
		// 	"type": "raster",
		// 	"source": "satellite"
		// }, 'marsh-past');

		// map.addSource("marsh-now", {
		// 	"type": "vector",
		// 	"url": "mapbox://iwsstuart.0nxfqu5j"
		// });
		// map.addLayer({
		// 	"id": "marsh-now",
		// 	"type": "fill",
		// 	"source": "marsh-now",
		// 	"paint": {
		// 	    "fill-color": "#5a976c"
		// 	    // "line-opacity": {
		// 	    // 	"base": 0.5,
		// 	  		// "stops": [[10, 0.2], [14, 0.6]]
		// 	    // },
		// 	    // "line-width": {
		// 	    // 	"base": 1,
		// 	  		// "stops": [[10, 0.1], [13.9, 0.2], [14, 0]]
		// 	    // }
		// 	}
		// }, 'iwsstuart.4p4x2agq');
	});


/* -----------------------------------------------------------------------
	Map object interactivity and control panel functionality
----------------------------------------------------------------------- */

	// function for turning on map layers
	// called when a control panel layer is clicked
	function layersOn() {
		if (layerId == "streets") {
			map.setLayoutProperty('road-rail-tracks', 'visibility', 'visible');
			map.setLayoutProperty('road-rail', 'visibility', 'visible');
			map.setLayoutProperty('road-motorway', 'visibility', 'visible');
			map.setLayoutProperty('road-trunk', 'visibility', 'visible');
			map.setLayoutProperty('road-main', 'visibility', 'visible');
			map.setLayoutProperty('road-street_limited', 'visibility', 'visible');
			map.setLayoutProperty('road-motorway_link', 'visibility', 'visible');
			map.setLayoutProperty('road-service-driveway', 'visibility', 'visible');
			map.setLayoutProperty('road-street-low-zoom', 'visibility', 'visible');
			map.setLayoutProperty('road-path', 'visibility', 'visible');
			map.setLayoutProperty('bridge-motorway', 'visibility', 'visible');
			map.setLayoutProperty('bridge-main', 'visibility', 'visible');
			map.setLayoutProperty('bridge-motorway_link', 'visibility', 'visible');
			map.setLayoutProperty('bridge-rail-tracks', 'visibility', 'visible');
		}
		if (layerId == "todays-natural-water") {
			map.setLayoutProperty('springs', 'visibility', 'visible');
			map.setLayoutProperty('natural-freshwater', 'visibility', 'visible');
			map.setLayoutProperty('natural-freshwater-stroke', 'visibility', 'visible');
		}
		if (layerId == "fresh-water-past") {
			map.setLayoutProperty('fresh-water-past', 'visibility', 'visible');
		}				
		if (layerId == "sloughs") {
			map.setLayoutProperty('tidal-sloughs', 'visibility', 'visible');
			map.setLayoutProperty('marsh-past', 'visibility', 'visible');
		}
		if (layerId == "reservoirs-past") {
			map.setLayoutProperty('reservoirs-past', 'visibility', 'visible');
			map.setLayoutProperty('reservoirs-past-stroke', 'visibility', 'visible');
		}	
		if (layerId == "contours") {
			map.setLayoutProperty('contours-simple', 'visibility', 'visible');
			map.setLayoutProperty('contours', 'visibility', 'visible');
		}
		if (layerId == "developed-freshwater") {
			map.setLayoutProperty('developed-freshwater', 'visibility', 'visible');
			map.setLayoutProperty('developed-freshwater-stroke', 'visibility', 'visible');
		}
		if (layerId == "reservoirs") {
			map.setLayoutProperty('reservoirs-tanks-treatment', 'visibility', 'visible');
			map.setLayoutProperty('reservoirs-tanks-treatment-stroke', 'visibility', 'visible');
		}
		if (layerId == "bay-fill") {
			map.setLayoutProperty('bay-and-marsh-fill', 'visibility', 'visible');
		}
	}

	// function for turning off map layers
	// called when a control panel layer is clicked
	function layersOff() {
		if (layerId == "streets") {
			map.setLayoutProperty('road-rail-tracks', 'visibility', 'none');
			map.setLayoutProperty('road-rail', 'visibility', 'none');
			map.setLayoutProperty('road-motorway', 'visibility', 'none');
			map.setLayoutProperty('road-trunk', 'visibility', 'none');
			map.setLayoutProperty('road-main', 'visibility', 'none');
			map.setLayoutProperty('road-street_limited', 'visibility', 'none');
			map.setLayoutProperty('road-motorway_link', 'visibility', 'none');
			map.setLayoutProperty('road-service-driveway', 'visibility', 'none');
			map.setLayoutProperty('road-street-low-zoom', 'visibility', 'none');
			map.setLayoutProperty('road-path', 'visibility', 'none');
			map.setLayoutProperty('bridge-motorway', 'visibility', 'none');
			map.setLayoutProperty('bridge-main', 'visibility', 'none');
			map.setLayoutProperty('bridge-motorway_link', 'visibility', 'none');
			map.setLayoutProperty('bridge-rail-tracks', 'visibility', 'none');
		}
		if (layerId == "todays-natural-water") {
			map.setLayoutProperty('springs', 'visibility', 'none');
			map.setLayoutProperty('natural-freshwater', 'visibility', 'none');
			map.setLayoutProperty('natural-freshwater-stroke', 'visibility', 'none');
		}
		if (layerId == "fresh-water-past") {
			map.setLayoutProperty('fresh-water-past', 'visibility', 'none');
		}
		if (layerId == "sloughs") {
			map.setLayoutProperty('tidal-sloughs', 'visibility', 'none');
			map.setLayoutProperty('marsh-past', 'visibility', 'none');
		}
		if (layerId == "reservoirs-past") {
			map.setLayoutProperty('reservoirs-past', 'visibility', 'none');
			map.setLayoutProperty('reservoirs-past-stroke', 'visibility', 'none');
		}
		if (layerId == "contours") {
			map.setLayoutProperty('contours-simple', 'visibility', 'none');
			map.setLayoutProperty('contours', 'visibility', 'none');
		}
		if (layerId == "developed-freshwater") {
			map.setLayoutProperty('developed-freshwater', 'visibility', 'none');
			map.setLayoutProperty('developed-freshwater-stroke', 'visibility', 'none');
		}
		if (layerId == "reservoirs") {
			map.setLayoutProperty('reservoirs-tanks-treatment', 'visibility', 'none');
			map.setLayoutProperty('reservoirs-tanks-treatment-stroke', 'visibility', 'none');
		}
		if (layerId == "bay-fill") {
			map.setLayoutProperty('bay-and-marsh-fill', 'visibility', 'none');
		}
	}

	// toggle expanding lists on header click in control panel
	$('.header').click(function() {
		var group = $(this).parent();
		group.children('ul').toggle();
		group.children('.header').children('span').toggleClass('glyphicon-triangle-right');	
		group.children('.header').children('span').toggleClass('glyphicon-triangle-bottom');	
	});
	
	var groupId, layerId, controlId; // initiate variables for map layer toggling function

	// toggle map layers on layer click in control panel
	$('.list-group .list-group-item.layer').click(function() {
		layerId = $(this).attr('id');
		groupId = $(this).attr('id');
		if ($(this).hasClass('on')) {
			$(this).toggleClass('on');
			layersOff();	
			if ($(this).hasClass('comparison')) {
				map.setLayoutProperty(layerId, 'visibility', 'none');
				var startOpacity = map.getPaintProperty(layerId, 'raster-opacity').toFixed(2);
				startLeft = startOpacity * sliderWidth;
				controlId = "#" + layerId + "-opacity";
				$(controlId).toggleClass('active');	
				if (layerId == "mapbox-satellite") {
					map.setLayoutProperty('satellite-lowzoom', 'visibility', 'none');				
				}
			}		
		} else {
			$(this).toggleClass('on');
			layersOn();	
			if ($(this).hasClass('comparison')) {
				map.setLayoutProperty(layerId, 'visibility', 'visible');
				controlId = "#" + layerId + "-opacity";
				var startOpacity = map.getPaintProperty(layerId, 'raster-opacity').toFixed(2);
				startLeft = startOpacity * sliderWidth;
				$(controlId).toggleClass('active');
				$(controlId + ' .handle').css('left', startLeft + 'px');
				$(controlId + ' .num-text').html(startOpacity);	
				if (layerId == "mapbox-satellite") {
					map.setLayoutProperty('satellite-lowzoom', 'visibility', 'visible');				
				}			
			}
		}		
	});

	// initiate variables for opacity slider
	var handle, start = false, startLeft;
	var sliderWidth = $('.opacity-bar').width(), handleWidth = $('.handle').width();
	var opacityText;

	// reset layerId and toggle 'current' class on opacity control mouseover
	$('.items li.control').mouseover(function() {
		layerId = $(this).attr('id').replace('-opacity', '');
		$(this).toggleClass('current');
	});
	$('.items li.control').mouseout(function() {
		$(this).toggleClass('current');
	});

	// change handle position, update layer opacity, and set opacity text value when slider handle is moved
	document.onmousemove = function(e) {
		if (!start) return;
	    // Adjust handle position
	    handle.style.left = Math.max(0, Math.min(sliderWidth - 4, startLeft + parseInt(e.clientX, 10) - start)) + 'px';
	    // Adjust map layer opacity
		map.setPaintProperty(layerId, 'raster-opacity', handle.offsetLeft / (sliderWidth - 4));
		var opacityVal = parseFloat(map.getPaintProperty(layerId, 'raster-opacity')).toFixed(2);
	    // Adjust opacity value text
		if (opacityVal == 1 || opacityVal == 0) { 
			opacityVal = parseInt(opacityVal); 
		}
		$(opacityText).html(opacityVal);
	};

	// get starting parameters on opacity handle mousedown
	$('.handle').mousedown(function(e) {
		handle = this;
		opacityText = $('.current p');
		start = parseInt(e.clientX, 10);
		startLeft = this.offsetLeft;
		// layerId = $(this).parents('.list-group-item').attr('id').replace('-opacity','');	
	});

	// clear 'start' variable for reset on next handle click
	document.onmouseup = function(e) {
	    start = null;
	};

	// toggle info tooltips in control panel
	$('[data-toggle="tooltip"]').tooltip({ placement: 'right', container: 'body' });
	$('[data-toggle="tooltip"]').hover(function() {
		$('.tooltip').css('margin-left','15px');
	});

/*
	// map label toggle function
	$('#labels').click(function() {
		if ($(this).hasClass('on')) {
			map.setLayoutProperty('place_label_city_large_n', 'visibility', 'none');
			map.setLayoutProperty('place_label_neighborhood', 'visibility', 'none');
			map.setLayoutProperty('road-label-large', 'visibility', 'none');
			map.setLayoutProperty('road-label-med', 'visibility', 'none');
			map.setLayoutProperty('road-label-sm', 'visibility', 'none');
		} else {
			map.setLayoutProperty('place_label_city_large_n', 'visibility', 'visible');
			map.setLayoutProperty('place_label_neighborhood', 'visibility', 'visible');			
			map.setLayoutProperty('road-label-large', 'visibility', 'visible');
			map.setLayoutProperty('road-label-med', 'visibility', 'visible');
			map.setLayoutProperty('road-label-sm', 'visibility', 'visible');
		}
	});

	// change pointer on map feature hover to indicate tooltip
	map.on('mousemove', function (e) {
		if (map.hasClass('grayscale')) {
		    map.featuresAt(e.point, {layer: 'phys-waterbodies', radius: 5}, function (err, features) {
		        map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
		    });
		}
	});		

	// show tooltips on click
	map.on('click', function (e) {
		if (map.hasClass('grayscale')) {
			map.featuresAt(e.point, {radius: 5, layer: 'phys-waterbodies'}, function (err, features) {
		        if (err) throw err;
		        console.log(features);
		    	var tooltip = new mapboxgl.Popup({closeButton:false})
			        .setLngLat(e.lngLat)
			        .setHTML('<h6 id="tooltip">' + features[0].properties.BODY_TYPE + '</h6>'
			        	+ '<h5>' + features[0].properties.BODY_NAME + '</h5>')
			        .addTo(map);
		    });
		}
	});
*/

});