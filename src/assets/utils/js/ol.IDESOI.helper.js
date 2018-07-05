/**
 * @fileOverview Various tool functions.
 * @author <a href="mailto:ehernandez@citi.cu">Tec. Erick Hernández Darias</a>
 * @author <a href="mailto:amadruga@citi.cu">Tec. Adrián Madruga Castillo</a> *
 * @version 0.5
 * @copyright IDESOI
 */

/** @type {type} */
var map;
/** @type {type} */
var layerGroup;
/** @type {type} */
var interactionMode = 'info';
/** @type {type} */
var AddressLayer;
/** @type {type} */
var coordinateFormat = 'dd';

var poiInfo = false;

var view;

// Map Initialization
/**
 *
 * @param {type} mapID
 * @param {type} mapExtent
 * @param {type} centerPosition
 * @param {type} zoomLevel
 * @param {type} geocodeControl = true
 * @param {type} coordinateControl = true
 */


function OpenLayersInit(mapID, mapExtent, centerPosition, zoomLevel, geocodeControl, coordinateControl){

	
	// Default Values
	geocodeControl = typeof geocodeControl !== 'undefined' ? geocodeControl : true;
	coordinateControl = typeof coordinateControl !== 'undefined' ? coordinateControl : true;

	// Input parameters
	var projectionName = 'EPSG:4326',
		// Controls
		zoomSlider = new ol.control.ZoomSlider(),
		layerSwitcher = new ol.control.LayerSwitcher({
			tipLabel: 'Leyenda' // Optional label for button
		});

	// Layers Definitions
	// var mapLayers = [
	// 	new ol.layer.Group({
	// 			'title': 'Mapa Base',
	// 			layers: [
	// 				// // new ol.layer.Tile({
	// 				// // 		title: 'DPA 1975',
	// 				// // 		type: 'base',
	// 				// // 		extent: mapExtent,
	// 				// // 		source: new ol.source.TileWMS({
	// 				// // 			params: { 'LAYERS': '2,3,5,6', 'TILED': true, VERSION: '1.1.1' },
	// 				// // 			//crossOrigin: 'anonymous',
	// 				// // 			url: 'http://idesoi.citi.cu/IDESOI/services/Maps/DPACuba1975X/MapServer/WMSServer'
	// 				// // 		})
	// 				// // 	}),
	// 				// // 	new ol.layer.Tile({
	// 				// // 		title: 'DPA 2011',
	// 				// // 		type: 'base',
	// 				// // 		extent: mapExtent,
	// 				// // 		source: new ol.source.TileWMS({
	// 				// // 			params: { 'LAYERS': '2,3,5,6', 'TILED': true, VERSION: '1.1.1' },
	// 				// // 			//crossOrigin: 'anonymous',
	// 				// // 			url: 'http://idesoi.citi.cu/IDESOI/services/Maps/DPACuba2011X/MapServer/WMSServer'
	// 				// // 		})
	// 				// // 	}),
	// 				// // 	new ol.layer.Tile({
	// 				// // 		title: 'Cartas Náuticas Cubanas',
	// 				// // 		type: 'base',
	// 				// // 		extent: mapExtent,
	// 				// // 		source: new ol.source.TileWMS({
	// 				// // 			params: { 'LAYERS': '1,3,5,7,8,9,12,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,40,41,44,46,47,48,49,50,51,52,53,54,55,56,59,60,61,62,63,64,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,93,94,95,96,97,98,99,100,101,102,105,108,110,111,114,115,116,117,118,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,141,142,143,146,147,150,151,152,153,154,155,156,157,158,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,181,182,183,184,186,187,188,189,190,191', 'TILED': true, VERSION: '1.1.1' },
	// 				// // 			//crossOrigin: 'anonymous',
	// 				// // 			url: 'http://idesoi.citi.cu/IDESOI/services/Maps/CartasNauticasCubanasX/MapServer/WMSServer'
	// 				// // 		})
	// 				// // 	}),
	// 				// // 	new ol.layer.Tile({
	// 				// // 		title: 'Blue Marble',
	// 				// // 		type: 'base',
	// 				// // 		extent: mapExtent,
	// 				// // 		source: new ol.source.TileWMS({
	// 				// // 			params: { 'LAYERS': '2,3,4,5,6,7,8,9', 'TILED': true, VERSION: '1.1.1' },
	// 				// // 			//crossOrigin: 'anonymous',
	// 				// // 			url: 'http://idesoi.citi.cu/IDESOI/services/Maps/BlueMarbleX/MapServer/WMSServer'
	// 				// // 		})
	// 				// // 	}),
	// 				// 	new ol.layer.Tile({
	// 				// 		title: 'Google Earth',
	// 				// 		type: 'base',
	// 				// 		extent: mapExtent,
	// 				// 		source: new ol.source.TileWMS({
	// 				// 			params: { 'LAYERS': '2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,40,41,42,44,45,46,47,51,52,54,55,57,58,59,60,61,62,63,64,66,68,69,70', 'TILED': true, VERSION: '1.1.1' },
	// 				// 			//crossOrigin: 'anonymous',
	// 				// 			url: 'http://idesoi.datys.cu/IDESOI/services/Maps/GoogleEarthPlusBaseX/MapServer/WMSServer'
	// 				// 		})
	// 				// 	}),
	// 					new ol.layer.Tile({
	// 						title: 'Planimetría GeoServer',
	// 						type: 'base',
	// 						extent: mapExtent,
	// 						source: new ol.source.TileWMS({
	// 							params: { 'LAYERS': 'idesoi:Basecuba', 'TILED': true, VERSION: '1.1.1' },
	// 							//crossOrigin: 'anonymous',
	// 							url: 'http://localhost:2134/geoserver/idesoi/wms'
	// 						})
	// 					}),
	// 					// new ol.layer.Tile({
	// 					// 	title: 'Planimetría ArcGIS',
	// 					// 	type: 'base',
	// 					// 	extent: mapExtent,
	// 					// 	source: new ol.source.TileWMS({
	// 					// 		params: { 'LAYERS': '1,2,4,5,7,8,11,12,13,14,15,16,18,19,20,22,24,25,26,27,28,29,31,32,34,35,36,37,38,39,43,44,46,47,49,50,51', 'TILED': true, VERSION: '1.1.1' },
	// 					// 		//crossOrigin: 'anonymous',
	// 					// 		url: 'http://idesoi.citi.cu/IDESOI/services/Maps/BaseCubaStyledX/MapServer/WMSServer'
	// 					// 	})
	// 					// })
	// 			]
	// 			})
	// ];
    var wmsSource = new ol.source.TileWMS({
        params: { 'LAYERS': 'idesoi:Basecuba', 'TILED': true, VERSION: '1.1.1' },
        //crossOrigin: 'anonymous',
        url: 'http://192.168.137.1:1234/geoserver/idesoi/wms'
    });

    var mapLayers = new ol.layer.Tile({
            title: 'Planimetría GeoServer',
            type: 'base',
            extent: mapExtent,
            source: wmsSource
        });




	// Coordinate Format
	var myFormat = function () {
		return (
		  function (coord) {
		      if (coordinateFormat == 'dd') {
		          var textCoord = ol.coordinate.toStringXY(coord, 4);
		          var lon = textCoord.substr(0, textCoord.indexOf(' '));
		          var lat = textCoord.substr(textCoord.indexOf(' ') + 1);

		          return lat + ', ' + lon;
		      }  else
		          return ol.coordinate.toStringHDMS(coord);
		  });
	}

	// Mouse Control
	var mousePositionControl;
	if (coordinateControl) {
		var divMousePosition;
		divMousePosition = document.createElement('div');
		divMousePosition.id = 'mouse-position';

		mousePositionControl = new ol.control.MousePosition({
				coordinateFormat: myFormat(),
				projection: projectionName,
				target: divMousePosition,
				undefinedHTML: '&nbsp;'
		});

		// Create button to change Coordinate Format
		var buttonChangeCoordinateFormat = document.createElement('button');
		buttonChangeCoordinateFormat.className = 'mouse-position ol-unselectable ol-control';
	    buttonChangeCoordinateFormat.title = 'Cambiar formatos de coordenadas';
		buttonChangeCoordinateFormat.innerHTML = '<span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>';
		var handleChangeCoordinateFormat = function (e) {
			ChangeCoordinateFormat();
		};
		buttonChangeCoordinateFormat.addEventListener("click", handleChangeCoordinateFormat, false);
		divMousePosition.appendChild(buttonChangeCoordinateFormat);
        if (mapID == null)
		    document.getElementById(mapID).parentNode.insertBefore(divMousePosition, document.getElementById(mapID).nextSibling);
	}

	// Geocode Control
	var geocodeAddressControl;
	if (geocodeControl) {
			var divGeocodeControl;
			divGeocodeControl = document.createElement('div');
			divGeocodeControl.id = 'geocode-control';

			geocodeAddressControl = function (opt_options) {

			var options = opt_options || {};

			var button = document.createElement('button');
			button.title = 'Localizar';
			button.innerHTML = '<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>';
			button.id = 'locBoutom';

			var this_ = this;
			var handleGeocodeAddress = function(e) {
				ShowGeocodeForm();
				//this_.getMap().getView().setRotation(0);
			};

			button.addEventListener('click', handleGeocodeAddress, false);
			button.addEventListener('touchstart', handleGeocodeAddress, false);

			divGeocodeControl.className = 'geocodeAddress ol-unselectable ol-control';
			divGeocodeControl.appendChild(button);

			ol.control.Control.call(this, {
				element: divGeocodeControl,
				target: options.target
			});

		};
		ol.inherits(geocodeAddressControl, ol.control.Control);
	}

	// Map Definitions
	view = new ol.View({
		projection: projectionName,
		center: centerPosition,
		zoom: zoomLevel
	});
	map = new ol.Map({
	  controls: ol.control.defaults({
		attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
		  collapsible: false
		})
	  })/*.extend([mousePositionControl, new app.GeocodeAddressControl()])*/,
	  //interactions : ol.interaction.defaults({doubleClickZoom :false}),
	  layers: [mapLayers],
	  target: mapID,
	  logo: false,
	  view: view
	});

	// -- Display information on singleclick --

	// Create a popup overlay which will be used to display feature info
	// var popup = new ol.Overlay.Popup();
	// map.addOverlay(popup);

	// Add an event handler for the map "singleclick" event
	// map.on('singleclick', function(evt) {
	//
	// 	// Hide existing popup and reset it's offset
	// 	popup.hide();
	// 	popup.setOffset([0, 0]);
    //
	// 	// Attempt to find a feature in one of the visible vector layers
	// 	var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
	// 		return feature;
	// 	});
    //
	// 	if (feature) {
	// 	  if ( interactionMode == 'info')
	 //		ShowInfo (feature, popup, evt.coordinate);
	// 	  else if ( interactionMode == 'delete')
	// 	  {
	// 		var props = feature.getProperties();
	// 		var info= "";
	// 		for (i = 0; i < Object.keys(props).length - 2; i++)
	// 			info += "<p>" +  props[i] + "</p>";
	// 		if (confirm('Esta seguro de borrar el elemento ['+ info +']?'))
	// 			DeleteObject(feature);
	// 	  }
	// 	  else if (interactionMode == 'select')
	// 		SelectObject(feature);
	//
	// 	}
	// 	else if (interactionMode == 'coordinate')
	// 		CaptureCoords(evt.coordinate);
	// });

    map.on('singleclick', function(evt) {

		// popup.hide();
		//  popup.setOffset([0, 0]);
		 
      var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return feature;
      });

	  if(interactionMode == 'info'){
		  
		var viewResolution = /** @type {number} */ (view.getResolution());
		var url = wmsSource.getGetFeatureInfoUrl(
			evt.coordinate, viewResolution, 'EPSG:3857',
			{
			'CORS': 'Access-Control-Allow-Origin',
			'INFO_FORMAT': 'application/json'
			});

		if (url) {
			$.ajax({
			url:url,
			success:function (response) {

				if(response.features.length != 0){

					if(feature == undefined){
						getInfoFromJson(response);
												
						//popup.show(evt.coordinate,info);
					}else{
						getInfoFromFeature(feature);
						//ShowInfo (feature, popup, evt.coordinate);
						
						
					}
				
				
				}
				}
			});
		}
		}else if(interactionMode == 'coordinate'){
			//CaptureCoords(evt.coordinate);
			insetCoords(evt.coordinate);
		}
	});

	
	

/* 	map.on('dblclick', function(evt) {
		CaptureCoords(evt.coordinate);
	}); */

	// Client Layers Definition
	layerGroup = new ol.layer.Group({
		  'title': 'Capas'
	});
	map.addLayer(layerGroup);

	// Control association
	map.addControl(zoomSlider);
	map.addControl(layerSwitcher);
	if (coordinateControl)
		map.addControl(mousePositionControl);
	if (geocodeControl)
		map.addControl(new geocodeAddressControl());

		functionInitLayer();
}


// Functions
/**
 *
 * @param {type} layerName
 * @returns {type}
 */
function CreateLayer(layerName) {
		var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: '',
		}),
	});
	for (i = 0; i < layerGroup.getLayers().getArray().length ; i++ ) {
		var oLayer = layerGroup.getLayers().getArray()[i];
		if (oLayer.getProperties().title == layerName) {
			map.removeLayer(oLayer);
			layerGroup.getLayers().remove(oLayer);
			map.render();
			break;

		}
	}
	var source = new ol.source.Vector();
	var layer = new ol.layer.Vector({
					title: layerName,
					source: source,
					style: style,
		  });
	layerGroup.getLayers().push(layer);
	return layer;
}

function DeleteLayerByName(layerName){
	for (i = 0; i < layerGroup.getLayers().getArray().length ; i++ ) {
		var oLayer = layerGroup.getLayers().getArray()[i];
		if (oLayer.getProperties().title == layerName) {
			map.removeLayer(oLayer);
			layerGroup.getLayers().remove(oLayer);
			map.render();
			break;

		}
	}
}


/**
 *
 * @returns {type}
 */
function GetLayers() {
	return layerGroup.getLayers();
}

/**
 *
 * @param {type} oLayer
 * @returns {type}
 */
function GetAttributesNames(oLayer){
	var atts = [];
	var source = oLayer.getSource();
	for (iFeature = 0; iFeature < source.getFeatures().length ; iFeature++){
		feature = source.getFeatures()[iFeature];
		var props = feature.getProperties();
		for (iProp = 0; iProp < Object.keys(props).length ; iProp++)
		  if (typeof (props[Object.keys(props)[iProp]]) != 'object' ) {
			found= false;
			for (iAtt = 0; iAtt < atts.length ; iAtt++)
			  if (atts[iAtt]== Object.keys(props)[iProp]) {
				found= true;
				break;
			  }
			if (!found)
			  atts.push (Object.keys(props)[iProp]);
		  }
	}
	return atts;
}

/**
 *
 * @param {type} oFeature
 * @returns {type}
 */
function GetAttributes(oFeature){
	var atts = [];
	var props = oFeature.getProperties();
	for (iProp = 0; iProp < Object.keys(props).length ; iProp++)
	  if (typeof (props[Object.keys(props)[iProp]]) != 'object' ) {
		found= false;
		for (iAtt = 0; iAtt < atts.length ; iAtt++)
		  if (atts[iAtt].key== Object.keys(props)[iProp]) {
			found= true;
			break;
		  }
		if (!found)
		  atts.push({key: Object.keys(props)[iProp],
					 value: props[Object.keys(props)[iProp]]
					});
	  }
	return atts;
}

/**
 *
 * @param {type} oLayer
 */
function DeleteLayer(oLayer) {

	map.removeLayer(oLayer);
	layerGroup.getLayers().remove(oLayer);
	map.render();

}

/**
 *
 * @param {type} layerName
 * @param {type} path
 * @returns {type}
 */
function CreateJSONLayer(layerName, path) {
	var a;
	var source = new ol.source.Vector({
			url: path,
			format: new ol.format.GeoJSON()

	});
	var layer = new ol.layer.Vector({
					title: layerName,
					source: source
		  });
	layerGroup.getLayers().push(layer);
	return layer;
}


/*
function CreateJSONLayerFormVariable(layerName, geometry) {

	var source = new ol.source.Vector({
		url: path,
		format: new ol.format.GeoJSON()

	});
	var layer = new ol.layer.Vector({
		title: layerName,
		source: geometry
	});
	layerGroup.getLayers().push(layer);
	return layer;
}*/
/**
 *
 * @param {type} oLayer
 * @param {type} dLon
 * @param {type} dLat
 * @param {type} aAttributes
 * @returns {type}
 */
function CreateLayerOtherColor(layerName,color){
	var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: color,
		}),
	});
	for (i = 0; i < layerGroup.getLayers().getArray().length ; i++ ) {
		var oLayer = layerGroup.getLayers().getArray()[i];
		if (oLayer.getProperties().title == layerName) {
			map.removeLayer(oLayer);
			layerGroup.getLayers().remove(oLayer);
			map.render();
			break;

		}
	}
	var source = new ol.source.Vector();
	var layer = new ol.layer.Vector({
		title: layerName,
		source: source,
		style: style,
	});
	layerGroup.getLayers().push(layer);
	return layer;
}

function CreateObjectFromJSON(olayer,json,aAttributes,layerName){

	var format = new ol.format.GeoJSON();
	var jsonFeature = format.readFeature(json);
	jsonFeature.B.id = null;
	//var coordinates = geomJsonFeature.getCoordinates();
	/*var jsonFeature = new ol.Feature({
		geometry: new ol.geom.Polygon(coordinates)
	});*/
        var color = getColor(layerName);
        var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
            }),
            fill: new ol.style.Fill({
                color: color,
                opacity : 0.9

            })
        });

        jsonFeature.setStyle(style);



        if(aAttributes == null){
            jsonFeature.set(null,olayer);
            var source = olayer.getSource();
            source.addFeature(jsonFeature);

        }else{

            var attributes = aAttributes[0];
            for (i=0;i< attributes.length;i++){
                var key = attributes[i].key;
                var value = attributes[i].value;

                if(value == "<h5 style='color: #2a6496'>null</h5>")
                    value="No disponible";
                jsonFeature.set(key,value);
            }
            jsonFeature.set(''+aAttributes.length+'',olayer);
            var source = olayer.getSource();


            source.addFeature(jsonFeature);
        }



	return jsonFeature;
}

function CreateObjectFromJSONSelected(olayer,json,aAttributes,color){
	var format = new ol.format.GeoJSON();
	var jsonFeature = format.readFeature(json);
	jsonFeature.B.id = null;
	// var coordinates = geomJsonFeature.getCoordinates();
	// var jsonFeature = new ol.Feature({
	// 	geometry: new ol.geom.Polygon(coordinates)
	// });

	///////////////////////////////////////////////////////////////////////////////////////////////////////Explample paralel
	

	return jsonFeature;
}

function CreateLineString(olayer,coordinates){

	var feature = new ol.Feature({
		geometry: new ol.geom.LineString(coordinates)
	});

	var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'BLUE',
			width: 6
		}),
		fill: new ol.style.Fill({
			color: 'BLUE',
			opacity : 0.9

		})
	});

	feature.setStyle(style);
	var source = olayer.getSource();
	source.addFeature(feature);
	return feature;
}

//Funcionalidad del PRojecto Sigcujae
/*
function CreateObjectFromJSONColorReport(olayer,json,aAttributes,faculty){

	var format = new ol.format.GeoJSON();
	var jsonFeature = format.readFeature(json);

	//var coordinates = geomJsonFeature.getCoordinates();
	/*var jsonFeature = new ol.Feature({
		geometry: new ol.geom.Polygon(coordinates)
	});
	var color = getFacultyColor(faculty);
	var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color:color,
		}),
		fill: new ol.style.Fill({
			color: color
		})
	});

	jsonFeature.setStyle(style);

	if(aAttributes == null){
		jsonFeature.set(null,olayer);
		var source = olayer.getSource();
		source.addFeature(jsonFeature);

	}else{

		var attributes = aAttributes[0];
	for (i=0;i< attributes.length;i++){
		var key = attributes[i].key;
		var value = attributes[i].value;

		if(value == "<h5>null</h5>")
			value="No disponible";
		jsonFeature.set(key,value);
	}
		jsonFeature.set(''+aAttributes.length+'',olayer);
		var source = olayer.getSource();


		source.addFeature(jsonFeature);
	}

	return jsonFeature;
}
*/

//Este metodo requiere de fclassArray ordenada segun preferencia, la escala y la fclass de la geometria en uso

function CreateObjectFromJSONColorScale(olayer,json,aAttributes,scale,fclassGeometry,fclassArray){

	var format = new ol.format.GeoJSON();
	var jsonFeature = format.readFeature(json);

	//var coordinates = geomJsonFeature.getCoordinates();
	/*var jsonFeature = new ol.Feature({
		geometry: new ol.geom.Polygon(coordinates)
	});*/
	var color =selectColorObject(fclassArray,fclassGeometry,scale);
	var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: color,
		}),
		fill: new ol.style.Fill({
			color: color
		})
	});
	jsonFeature.setStyle(style);

	if(aAttributes == null){
		jsonFeature.set(null,olayer);
		var source = olayer.getSource();
		source.addFeature(jsonFeature);

	}else{

		var attributes = aAttributes[0];
	for (i=0;i< attributes.length;i++){
		var key = attributes[i].key;
		var value = attributes[i].value;

		if(value == "<h5>null</h5>")
			value="No disponible";
		jsonFeature.set(key,value);
	}
		jsonFeature.set(''+aAttributes.length+'',olayer);
		var source = olayer.getSource();


		source.addFeature(jsonFeature);
	}

	return jsonFeature;
}



function selectColorObject(fclassArray,fclassGeometry,scale){

	var positionFclass =  getPossitionFclassExist(fclassArray,fclassGeometry);
	var definesColor = defineStyle(scale,fclassArray,fclassGeometry);
	var realColor = definesColor[positionFclass];

	return realColor;

}
// devuelve la posision q ocupa la fclass utilizadas
function getPossitionFclassExist(fclassArray,fclassGeometry){
	var stop = false;
	var position = 0;
	for (var i = 0; i < fclassArray.length && stop == false; i++) {
		if(fclassArray[i]==fclassGeometry){
			stop = true;
			position = i;
		}
	}
	return position;
}

//devuelve el conjunto de colores ordenados
function defineStyle(scale,fclassArray,fclassObject){

	var initialColor = null;
	var finalColor = null;
	var definesColor = null;
	if(scale == 'greenToRed'){
		initialColor = '#048F01';
		finalColor = '#8F0001';
		definesColor = rotateColor(fclassArray.length-1,initialColor,finalColor);
	}

	return definesColor;
}



function rotateColor(fclassSize,initialColor,finalColor){
	var intervalA = interval(fclassSize,initialColor,finalColor);
	var definesColor = upHexadByInterval(fclassSize,initialColor,finalColor,intervalA);

	return definesColor;

}

function interval(fclassSize,initialColor,finalColor){
	var maxWitdh = 120 + 225;
	//var maxWitdh = upHexad(initialColor[1],initialColor[2],finalColor[1],finalColor[2]) + downHexad(initialColor[3],initialColor[4],finalColor[3],finalColor[4]);
	var minInterval = maxWitdh/(fclassSize+1);
	return minInterval;
}

function upHexadByInterval(fclassSize,initialColor,finalColor,interval){
	var size = fclassSize;

	var color1 = getNumber(initialColor[1]);
	var color2 = getNumber(initialColor[2]);
	var color3 = getNumber(initialColor[3]);
	var color4 = getNumber(initialColor[4]);
	var finColor1 = getNumber(finalColor[1]);
	var finColor2 = getNumber(finalColor[2]);
	var finColor3 = getNumber(finalColor[3]);
	var finColor4 = getNumber(finalColor[4]);
	var actualColor;
	var arrayColor = [];
	var colorPosition =0;

	if(initialColor != 0)
		arrayColor[colorPosition] = initialColor;
	size--;
	colorPosition++;

	while(size >= 0){
		var stopRed = false;
		var stopGreen = false;
		var intInterval = interval;


		while(intInterval > 0 && stopRed==false){


				if(color2==15){
					color1++;
					color2 =0;
					intInterval--;
					if(color1 == finalColor[1])
						stopRed = true;
				}else{
					color2++;
					intInterval--;
				}
			if(color1==finColor1 && color2==finColor2){
				stopRed = true;
			}

		}
		while(intInterval > 1){

					if (color4 == 0) {
						color3--;
						color4 = 15;
						intInterval--;
					} else {
					color4--;
					intInterval--;
					}


		}

		if(intInterval < 15){
			var co1 = reverseHexagNumber(color1).toString();
			var co2 = reverseHexagNumber(color2).toString();
			var co3 = reverseHexagNumber(color3).toString();
			var co4 = reverseHexagNumber(color4).toString();
			var co5 = finalColor[5].toString();
			var co6 = finalColor[6].toString();
			actualColor = '#'+co1+co2+co3+co4+co5+co6;

			arrayColor[colorPosition] = actualColor;
			colorPosition++;
			size--;
		}


	}

	return arrayColor;
}

function upHexad(colorIni1,colorIni2,colorFin1,colorFin2){
	var stop1 = false;
	var stop2 = false;
	var result = 0;
	var color1 = getNumber(colorIni1);
	var color2 = getNumber(colorIni2);


	while(stop1 == false && stop2 == false){
		if(color1 != colorFin1 || stop2 == false){

			if(color2==15){
				color1++;
				color2 =0;
				result++;
				if(color1 == colorFin1)
					stop1 = true;
			}else{
				color2++;
				result++;
			}


		}
		if(stop1==true && color2 == colorFin2)
			stop2 = true;
	}

	return result;
}

function downHexad(colorIni1,colorIni2,colorFin1,colorFin2){
	var stop1 = false;
	var stop2 = false;
	var result = 0;
	var color1 = getNumber(colorIni1);
	var color2 = getNumber(colorIni2);

	while(stop1 == false || stop2 == false){
		if(color1 != colorFin1 || stop2 == false){

			if(color2==0){
				color1--;
				color2 =15;
				result++;
				if(color1 == colorFin1)
					stop1 = true;
			}else{
				color2--;
				result++;
			}


		}
		if(stop1==true && color2 == colorFin2)
			stop2 = true;
	}

	return result;
}

function reverseHexagNumber(number){

	var result=0;
	if(number == 10)
		 result = "A";
	else
		if(number == 11)
			 result = "B";
		else
			if(number==12)
				 result="C";
			else
				if(number == 13)
					 result = "D";
				else
					if(number == 14)
						 result = "E";
					else
						if(number == 15)
						 	result = "F";
						 else
						 	result = number;

					return result;
}


function getNumber(number){
	var result=0;
	if(number == "A")
		 result = 10;
	else
		if(number == "B")
			 result = 11;
		else
			if(number=="C")
				 result=12;
			else
				if(number == "D")
					 result = 13;
				else
					if(number == "E")
						 result = 14;
					else
						if(number == "F")
						 	result = 15;
						 else
						 	result = number;

					return result;
}


function CreateObjectFromWKT(oLayer, wkt, aAttributes){

    var format = new ol.format.WKT();
    var geomWktFeature = format.readGeometry(wkt);
    var coordinates = geomWktFeature.getCoordinates();
    var wktFeature = new ol.Feature({
            geometry: new ol.geom.Polygon(coordinates)
        });

    for (i = 0; i < aAttributes.length; i++)
        wktFeature.set(aAttributes[i].key, aAttributes[i].value);
    wktFeature.set(''+aAttributes.length+'', oLayer);

    var source = oLayer.getSource();

    source.addFeature(wktFeature);
    return wktFeature;
}

function CreateObject(oLayer, dLon, dLat, aAttributes) {

	var pointFeature = new ol.Feature({
			geometry: new ol.geom.Point([dLon, dLat]),
			
	});
	var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'black',
			radius: 2
			
		}),
		fill: new ol.style.Fill({
			color: 'black'
		}),
		
	});
	
	pointFeature.setStyle(style);
	if(aAttributes!= null) {
		for (i = 0; i < aAttributes.length; i++)
			pointFeature.set(aAttributes[i].key, aAttributes[i].value);
		pointFeature.set('' + aAttributes.length + '', oLayer);
	}
	
	var source = oLayer.getSource();
	source.addFeature(pointFeature);
	return pointFeature;
}

/**
 *
 * @param {type} oLayer
 * @param {type} oFeature
 */
function AddObject(oLayer, oFeature){
	var source = oLayer.getSource();
	source.addFeature(oFeature);
}

/**
 *
 * @param {type} oObj
 */
function DeleteObject(oObj) {
	var props = oObj.getProperties();
	var oLayer = props[Object.keys(props).length - 2];
	var source = oLayer.getSource();
	source.removeFeature(oObj);
	map.render();

}

/**
 *
 * @param {type} oLayer
 */
function DeleteObjects(oLayer) {

	var source = oLayer.getSource();
	source.clear();
	map.render();

}

/**
 *
 * @param {type} oLayer
 * @param {type} oObjOrig
 * @param {type} oObjDest
 * @param {type} aAttributes
 * @returns {type}
 */
function CreateLink(oLayer, oObjOrig, oObjDest, aAttributes) {

	var pointList = [];
	var origGeom = oObjOrig.getGeometry();
	var destGeom = oObjDest.getGeometry();
	var origPoint = origGeom.getCoordinates();
	pointList.push(origPoint);
	var destPoint = destGeom.getCoordinates();
	pointList.push(destPoint);

	var lineFeature = new ol.Feature({
		geometry: new ol.geom.LineString(pointList)
	});
	for (i = 0; i < aAttributes.length; i++)
	  lineFeature.set(aAttributes[i].key, aAttributes[i].value);
	oLayer.getSource().addFeature(lineFeature);
	return lineFeature;
}

/**
 *
 * @param {type} oLayer
 * @param {type} oObjLines
 * @param {type} aAttributes
 * @returns {type}
 */
function CreateRoute(oLayer, oObjLines, aAttributes) {

	var lineFeature = new ol.Feature({
			geometry: new ol.geom.LineString(oObjLines)
	});
	for (i = 0; i < aAttributes.length; i++)
	  lineFeature.set(aAttributes[i].key, aAttributes[i].value);
	oLayer.getSource().addFeature(lineFeature);
	return lineFeature;
}

/**
 *
 * @param {type} pointFeature
 * @param {type} iconSource
 * @param {type} iconScale
 * @param {type} iconXOffset
 * @param {type} iconYOffset
 * @param {type} iconOpacity
 */
function SetIconStyle(pointFeature, iconSource, iconScale, iconXOffset, iconYOffset, iconOpacity) {

	var iconStyle = new ol.style.Style({
		image: new ol.style.Icon({
			anchor: [iconXOffset, iconYOffset],
			src: iconSource,
			scale: 0.2,
			opacity: iconOpacity,
			radius: 2
		
		})
	})
	pointFeature.setStyle(iconStyle);
}

/**
 *
 * @param {type} pointFeature
 * @param {type} circleRadius
 * @param {type} fillColor
 */
function SetCircleStyle(pointFeature, circleRadius, fillColor) {

	var circleStyle = new ol.style.Style({
		image: new ol.style.Circle({
			radius: circleRadius,
			fill: new ol.style.Fill({
				color: fillColor
			})
		})
	});
	pointFeature.setStyle(circleStyle);
}

/**
 *
 * @param {type} lineFeature
 * @param {type} lineWidth
 * @param {type} lineStyle
 * @param {type} lineColor
 */
function SetLinkStyle(lineFeature, lineWidth, lineStyle, lineColor){

	var defaultStyle = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: lineColor,
				width: lineWidth,
				lineDash: CreateLineDash(lineStyle)
			})
		});
	lineFeature.setStyle(defaultStyle);
}

/**
 *
 * @param {type} oLayer
 * @param {type} oFeature
 * @param {type} iconSource
 * @param {type} iconScale
 * @param {type} iconXOffset
 * @param {type} iconYOffset
 * @param {type} iconOpacity
 */
function SetStartIconStyle(oLayer, oFeature,iconSource, iconScale, iconXOffset, iconYOffset, iconOpacity) {

  var coord = oFeature.getGeometry().getCoordinates();
  var Start = CreateObject (oLayer, coord[0][0], coord[0][1], oLayer.getProperties());
  SetIconStyle(Start, iconSource, iconScale, iconXOffset, iconYOffset, iconOpacity);
}

/**
 *
 * @param {type} oLayer
 * @param {type} oFeature
 * @param {type} iconSource
 * @param {type} iconScale
 * @param {type} iconXOffset
 * @param {type} iconYOffset
 * @param {type} iconOpacity
 */
function SetFinishIconStyle(oLayer, oFeature, iconSource, iconScale, iconXOffset, iconYOffset, iconOpacity) {

  var coord = oFeature.getGeometry().getCoordinates();
  Finish= CreateObject (oLayer, coord[coord.length- 1][0], coord[coord.length- 1][1], oLayer.getProperties());
  SetIconStyle(Finish, iconSource, iconScale, iconXOffset, iconYOffset, iconOpacity);
}

function SetInfoMode () {
  interactionMode= 'info';
};

function SetDeleteMode () {
  interactionMode= 'delete';
};

function SetSelectMode () {
  interactionMode= 'select';
};

function SetCoordinateMode () {
  interactionMode= 'coordinate';
};

/**
 *
 * @param {type} feature
 * @returns {type}
 */
function GetCoordinate(feature) {
  var geom = feature.getGeometry();
  return geom.getCoordinates();
};

/**
 *
 * @param {type} feature
 * @param {type} dLon
 * @param {type} dLat
 */
function ChangePosition(feature, dLon, dLat){
	feature.setGeometry(new ol.geom.Point([dLon, dLat]));
}


/* var exportPNGElement = document.getElementById('export-png');
if ('download' in exportPNGElement) {
	exportPNGElement.addEventListener('click', function(e) {
	map.once('postcompose', function(event) {
	  var canvas = event.context.canvas;
	  exportPNGElement.href = canvas.toDataURL('image/png');
	});
	map.renderSync();
  }, false);
} */


//function ExportMap() {

//  map.once('postcompose', function(event) {

//	//var img = new Image;
//	var canvas = event.context.canvas;
//	//img.crossOrigin = "Anonymous";

//	var exportPNGElement = document.createElement('a');
//	exportPNGElement.download = 'Mapa.png';
//	exportPNGElement.href = canvas.toDataURL('image/png');
//	document.body.appendChild(exportPNGElement);
//	exportPNGElement.click();
//	document.body.removeChild(exportPNGElement);
//  });

//  map.renderSync();
//}

/**
 *
 * @param {type} oLayer
 * @param {type} aAttribute
 * @param {type} aValue
 * @returns {type}
 */
function SearchFeature(oLayer, aAttribute, aValue) {
	var features = [];
	var source = oLayer.getSource();
	for (iFeature = 0; iFeature < source.getFeatures().length ; iFeature++){
		feature = source.getFeatures()[iFeature];
		var props = feature.getProperties();
		for (j = 0; j < Object.keys(props).length ; j++)
			if (typeof (props[Object.keys(props)[j]]) != 'object' &&
						Object.keys(props)[j] == aAttribute){
				if (Similar (props[Object.keys(props)[j]], aValue))
					features.push(feature);
				break;
			}
	}
	return features;
}

/**
 *
 * @param {type} feature
 */
function ZoomToFeature(feature, zoom) {
	map.getView().setCenter(feature.getGeometry().getCoordinates());
	map.getView().setZoom(zoom);
}

function ZoomToPolygon(polygon, zoom) {
    map.getView().setCenter(polygon.getGeometry().getInteriorPoint().getCoordinates());
    map.getView().setZoom(zoom);
}

function ZoomToCoordinates(coordinates,zoom){
	map.getView().setCenter(coordinates);
	map.getView().setZoom(zoom);
}

/**
 *
 * @param {type} Street1
 * @param {type} Street2
 * @param {type} Street3
 * @param {type} Km
 * @param {type} Locality
 * @param {type} Municipality
 * @param {type} State
 * @returns {type}
 */
function CreateTokensAddressXML(Street1, Street2, Street3, Km, Locality, Municipality, State) {

	var xw = new XMLWriter('UTF-8');
	xw.formatting = 'indented'; //add indentation and newlines
	xw.indentChar = ' '; // indent with spaces
	xw.indentation = 2; //add 2 spaces per level

	xw.writeStartDocument();
	xw.writeStartElement('XLS');
	xw.writeAttributeString('version', '1.2');
	xw.writeAttributeString('n1:lang', 'en-US');
	xw.writeAttributeString('xmlns:n1', 'http://www.opengis.net/xls');
	xw.writeAttributeString('xmlns', 'http://www.opengis.net/xls');

	xw.writeStartElement('RequestHeader');
	xw.writeEndElement('RequestHeader');

	xw.writeStartElement('Request');
	xw.writeAttributeString('version', '1.2');
	xw.writeAttributeString('requestID', '');
	xw.writeAttributeString('methodName', 'GeocodeService');
	xw.writeAttributeString('maximumResponses', '10');

	xw.writeStartElement('GeocodeRequest');

	xw.writeStartElement('Address');

	xw.writeStartElement('StreetAddress');

	xw.writeStartElement('Building');
	xw.writeAttributeString('buildingName', '');
	xw.writeAttributeString('subdivision', '');
	xw.writeAttributeString('number', '');
	xw.writeEndElement('Building');
	xw.writeElementString('Street', Street1 + ',' + Street2 + ',' + Street3 + ',' + Km);

	xw.writeStartElement('Place');
	xw.writeAttributeString('type', 'CountrySubdivision');
	xw.writeString(State);
	xw.writeEndElement('Place');

	xw.writeStartElement('Place');
	xw.writeAttributeString('type', 'Municipality');
	xw.writeString(Municipality);
	xw.writeEndElement('Place');

	xw.writeStartElement('Place');
	xw.writeAttributeString('type', 'MunicipalitySubdivision');
	xw.writeString(Locality);
	xw.writeEndElement('Place');

	xw.writeEndElement('StreetAddress');

	xw.writeEndElement('Address');

	xw.writeEndElement('GeocodeRequest');

	xw.writeEndElement('Request');

	xw.writeEndElement('XLS');
	xw.writeEndDocument();

	var asString = "";
	asString = new XMLSerializer().serializeToString(xw.getDocument())
	console.log(asString);
	if (typeof XMLSerializer !== 'undefined') {
		return asString = new XMLSerializer().serializeToString(xw.getDocument());
	} else {
		return asString = xw.getDocument().xml;
	}


}

/**
 *
 * @param {type} FreeFormAddress
 * @returns {type}
 */
function CreateFreeFormAddressXML(FreeFormAddress) {

	var xw = new XMLWriter('UTF-8');
	xw.formatting = 'indented'; //add indentation and newlines
	xw.indentChar = ' '; // indent with spaces
	xw.indentation = 2; //add 2 spaces per level

	xw.writeStartDocument();
	xw.writeStartElement('XLS');
	xw.writeAttributeString('version', '1.2');
	xw.writeAttributeString('n1:lang', 'en-US');
	xw.writeAttributeString('xmlns:n1', 'http://www.opengis.net/xls');
	xw.writeAttributeString('xmlns', 'http://www.opengis.net/xls');

	xw.writeStartElement('RequestHeader');
	xw.writeEndElement('RequestHeader');

	xw.writeStartElement('Request');
	xw.writeAttributeString('version', '1.2');
	xw.writeAttributeString('requestID', '');
	xw.writeAttributeString('methodName', 'GeocodeService');
	xw.writeAttributeString('maximumResponses', '10');

	xw.writeStartElement('GeocodeRequest');

	xw.writeStartElement('Address');

	xw.writeStartElement('freeFormAddress');

	xw.writeElementString('freeFormAddress', FreeFormAddress);

	xw.writeEndElement('freeFormAddress');

	xw.writeEndElement('Address');

	xw.writeEndElement('GeocodeRequest');

	xw.writeEndElement('Request');

	xw.writeEndElement('XLS');
	xw.writeEndDocument();

	var asString = "";

	if (typeof XMLSerializer !== 'undefined') {
		return asString = new XMLSerializer().serializeToString(xw.getDocument());
	} else {
		return asString = xw.getDocument().xml;
	}
}

/**
 *
 * @param {type} freeFormAddress
 */
function GeoCodeFreeFormAddress(freeFormAddress) {
	var xmlDocument = CreateFreeFormAddressXML(freeFormAddress);
	$.ajax({
		data: xmlDocument,
		type: "POST",
		url: "http://idesoi-openls1.citi.cu/OpenLSServer/OpenLSServer.aspx",
		dataType: "xml",
		processData: false,
		scriptCharset: 'UTF-8',
		success: function (responseXML) {
			$(responseXML).find('GeocodedAddress').each(function () {
				var address = $(this).find('freeFormAddress').text();
				var pos = $(this).find('pos').text();
				var lon = pos.substr(0, pos.indexOf(' '));
				var lat = pos.substr(pos.indexOf(' ') + 1);
				var geocodeMatchCode = $(this).find('GeocodeMatchCode');
				var accuracy = geocodeMatchCode.attr('accuracy');
				var matchType = geocodeMatchCode.attr('matchType');
				ShowGeocodeResponse(address, lon, lat, accuracy, matchType);
			});
		},
		error: function (xhr, status, error) {
			ShowGeocodeError(xhr, status, error);
		}
	});
}

/**
 *
 * @param {type} street1
 * @param {type} street2
 * @param {type} street3
 * @param {type} km
 * @param {type} locality
 * @param {type} municipality
 * @param {type} state
 */
function GeoCodeTokensAddress(street1, street2, street3, km, locality, municipality, state) {
	var xmlDocument = CreateTokensAddressXML(street1, street2, street3, km, locality, municipality, state);
	$.ajax({
		data: xmlDocument,
		type: "POST",
        url: "http://idesoi-openls1.citi.cu/OpenLSServer/OpenLSServer.aspx",
		dataType: "xml",
		processData: false,
		scriptCharset: 'UTF-8',
		success: function (responseXML) {
			$(responseXML).find('GeocodedAddress').each(function () {
				var address = $(this).find('freeFormAddress').text();
				var pos = $(this).find('pos').text();
				var lon = pos.substr(0, pos.indexOf(' '));
				var lat = pos.substr(pos.indexOf(' ') + 1);
				var geocodeMatchCode = $(this).find('GeocodeMatchCode');
				var accuracy = geocodeMatchCode.attr('accuracy');
				var matchType = geocodeMatchCode.attr('matchType');
				ShowGeocodeResponse(address, lon, lat, accuracy, matchType);
			});
		},
		error: function (xhr, status, error) {
			ShowGeocodeError();
		}
	});
}

/**
 *
 * @param {type} address
 * @param {type} lon
 * @param {type} lat
 * @param {type} accuracy
 * @param {type} matchType
 */
function LocateAddress(address, lon, lat, accuracy, matchType) {
	AddressLayer = CreateLayer("Direcciones");
	var valuesA = [];
	valuesA.push({
		key: "Dirección postal",
		value: address
	});
	valuesA.push({
		key: "Puntuación",
		value: accuracy
	});
	valuesA.push({
		key: "Códigos de resultados",
		value: matchType
	});
	var feature = CreateObject(AddressLayer, lon, lat, valuesA);
	SetIconStyle(feature, 'img/marker-26.png', 1, 0.5, 1, 1);
	ZoomToFeature(feature, 15);
}

function ChangeCoordinateFormat() {
	if (coordinateFormat == 'dd')
		coordinateFormat = 'gms';
	else
		coordinateFormat = 'dd';
}

// Internal Functions
/**
 *
 * @param {type} feature
 * @param {type} popup
 * @param {type} coord
 */
function ShowInfo(feature, popup, coord){
	var geom = feature.getGeometry();
	var props = feature.getProperties();
	var info= "";
	for (i = 0; i < Object.keys(props).length ; i++)
		if (typeof (props[Object.keys(props)[i]]) != 'object' )
			info += "<p>" + Object.keys(props)[i]+ ': '+ props[Object.keys(props)[i]] + "</p>";
	if (geom.constructor ==  ol.geom.LineString || geom.constructor == ol.geom.Point || geom.constructor == ol.geom.Polygon && info != "")
		popup.show(coord, info);
	// Offset the popup so it points at the middle of the marker not the tip
	popup.setOffset([0, -22]);

}

/**
 *
 * @param {type} aStr
 * @param {type} bStr
 * @returns {type}
 */
function Similar(aStr, bStr){
	var bigger;
	var smaller;
	if (aStr.length > bStr.length){
		bigger = aStr.toUpperCase();
		smaller = bStr.toUpperCase();
	} else{
		bigger = bStr.toUpperCase();
		smaller = aStr.toUpperCase();
	}
	return bigger == smaller || InStrSimil(bigger, smaller);
}

/**
 *
 * @param {type} bigStr
 * @param {type} smallStr
 * @returns {type}
 */
function InStrSimil(bigStr, smallStr) {
	for (i = 0; i <= bigStr.length - smallStr.length ; i++){
		var bigSub = bigStr.substr(i, smallStr.length) ;
		var distArray = levenshteinenator(bigSub, smallStr);
		var dist = distArray[ distArray.length - 1 ][ distArray[ distArray.length - 1 ].length - 1 ];
		if (dist < bigSub.length* .30)
		//if (bigStr.substr(i, smallStr.length)== smallStr)
			return true;
	}
	return false;
}

/**
 *
 * @param {type} lineStyle
 * @returns {type}
 */
function CreateLineDash(lineStyle){
	//Dashstyle (“dot”, “dash”, “dashdot”, “longdash”, “longdashdot”, or “solid”)
	if (lineStyle == 'dot')
		return [1, 10];
	if (lineStyle == 'dash')
		return [10, 10];
	if (lineStyle == 'dashdot')
		return [10, 1, 10];
	if (lineStyle == 'longdash')
		return [20, 20];
	if (lineStyle == 'longdashdot')
		return [20, 1, 20];
	return [];
}

function getMap(){
	return map;

}

function getView(){
	return view;
}

function getLayers(){
	return layerGroup;
}

function geoloctionFunction(){

	var layer = CreateLayer('Position');
	var geolocation = new ol.Geolocation();
    geolocation.setTracking(true);


		setTimeout(function(){
			//alert("Acepte la localizacion del navegador");
			var position = geolocation.getPosition();

			$("#loader").hide();
			//var other = geolocation.position_;


				if (typeof position != "undefined") {
					var long = position[0];
					var lat = position[1];

					//alert("the log is "+long);

					//var feature = CreateObject(layer, long, lat, null);


					var rasters = [];


					var stylePinter = new ol.style.Style({
						image: new ol.style.Circle({
							fill: new ol.style.Fill({
								color: 'blue'
							}),
							radius: 5,
							stroke: new ol.style.Stroke({
								color: '#ff0',
								width: 1
							})
						})
					});

					var style = {
						'Point': [new ol.style.Style({
							image: new ol.style.Circle({
								fill: new ol.style.Fill({
									color: 'rgba(255,255,0,0.4)'
								}),
								radius: 20,
								stroke: new ol.style.Stroke({
									color: '#ff0',
									width: 1
								})
							})
						})],
						'PointRaster': [new ol.style.Style({
							image: new ol.style.Circle({
								fill: new ol.style.Fill({
									color: 'rgba(255,255,0,0.4)'
								}),
								radius: 4,
								stroke: new ol.style.Stroke({
									color: '#ff0',
									width: 1
								})
							})
						})],
						'LineString': [new ol.style.Style({
							stroke: new ol.style.Stroke({
								color: '#f00',
								width: 20
							})
						})],
						'MultiLineString': [new ol.style.Style({
							stroke: new ol.style.Stroke({
								color: '#0f0',
								width: 3
							})
						})]
					};


				var pointer = CreateObject(layer, long, lat, null);
					pointer.setStyle(stylePinter);

				//SetIconStyle(feature, 'images/pointer.png', 1, 0.5, 1, 1);

				var previusLong = 0;
				var previusLat = 0;

				setInterval(function(){
					geolocation.setTracking(true);
					
                        position = geolocation.getPosition();
                        long = position[0];
                        lat = position[1];
                        pointer.long = long;
						pointer.lat = lat;
						setCoordinateGPS(position);
						if(long != previusLong && lat != previusLat) {

							var raster = CreateObject(layer, long, lat, null);
							raster.setStyle(style.PointRaster);
					}

				},1000);

				}
				else {
					//$("#appearMessage").fadeIn(2000,'easing',false);

					//$("#messageContent").html('<h3>Disculpe no se ha encontrado su posision</h3>');
					
				}

		},3000);



	//alert(long);
	//var coordsa;
	//if (navigator.geolocation) {
	//	navigator.geolocation.getCurrentPosition(position);
	//
	//	//alert(longitud);
	//}else{
	//	alert('Este navegador es algo antiguo, actualiza para usar el API de localización');}
    //
	//var longitud = position.coords.latitude;
	//var longitude = position.coords.longitude;
    //
    //
	//alert(longitud );



	//var markers = new OpenLayers.Layer.Markers("Markers");
	//map.addLayer(markers);


	//Recenter on user position
	//navigator.geolocation.getCurrentPosition(function(position) {
    //
	//	var lonLat = new ol.proj.transform(position.coords.longitude,position.coords.latitude,'EPSG:4326', 'EPSG:3857');
    //
	//	var icon = new ol.style.Icon({
	//		src: 'images/ONLINE.ICO',
	//	});
	//	ol.style.Icon('images/ONLINE.ICO');
    //
	//	markers.addMarker(new OpenLayers.Marker(lonLat, icon));
    //
	//	//map.getView.setCenter(lonLat, 14);
	//	});


}

