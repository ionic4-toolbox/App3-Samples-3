var currentFeature;
var currentLayer;
// Cambios de la fecha 2015.10.16
// Añadir parámetros a la funcion OpenLayersInit(mapID, mapExtent, centerPosition, zoomLevel)
// Eliminar capturar coordenadas con el evento "doubleclick"
// Cambios en la función SelectObject()
// Añadido funcionalidad SearchObject()
function getHello(){
	return "hello";
}
function MapInit(){
  	OpenLayersInit('olmap', [-180.0, -90.0, 180.0, 90.0], [ -82.3636,23.1340], 15, true , true);
	currentLayer = new CreateLayer("Initial");
  //  OpenLayersInit('olmap2', [-180.0, -90.0, 180.0, 90.0], [ -82.3636,23.1402], 15, true , true);

//	var allLayers = ['BaseCuba'] [];

    /*var format = new ol.format.WKT();
    var feature = format.readFeature(
        'POLYGON ((-82.363482 23.141924, -82.36349 23.141948, -82.36351 23.141942, -82.363509 23.141915, -82.363482 23.141924))');*/
    //feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');

    /*var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [feature]
        })
    });*/
//var Indicadores = CreateLayer('Indicadores');
//	// Parámetros de entrada
//	Scale = 0.5;
//	OffsetHor = 0.5;
//	OffsetVert = 0.5;
//	Opacity = 0.8;
//	var valuesA = [];
//	valuesA.push({
//		key:   "URL",
//		value: "<h2><a href='about:blank'>Tu MAdre en tanga</a></h2>"
//	});
//	valuesA.push({
//		key:   "Cantidad",
//		value: 10
//	});
//    var wkt = 'POLYGON ((-82.363482 23.141924, -82.36349 23.141948, -82.36351 23.141942, -82.363509 23.141915, -82.363482 23.141924))';
//    A1 = CreateObjectFromWKT(Indicadores, wkt, valuesA);
    //A = CreateObject(Indicadores, -82.3688, 23.1338, valuesA);
	//SetIconStyle (A, 'img/marker-26.png', Scale, OffsetHor, OffsetVert, Opacity);

	//var valuesB = [];
	//valuesB.push({
	//	key:   "URL",
	//	value: "about:blank"
	//});
	//valuesB.push({
	//	key:   "Indicador",
	//	value: "2"
	//});
	//valuesB.push({
	//	key:   "Cantidad",
	//	value: 15
	//});
	//B = CreateObject(Indicadores, -82.759, 22.816, valuesB);

	//var valuesC = [];
	//valuesC.push({
	//	key:   "URL",
	//	value: "about:blank"
	//});
	//valuesC.push({
	//	key:   "Indicador",
	//	value: "3"
	//});
	//valuesC.push({
	//	key:   "Cantidad",
	//	value: 20
	//});
	//C = CreateObject(Indicadores, -82.152, 22.965, valuesC);

	//var OtrosIndicadores = CreateLayer('Otros Indicadores');

	//var valuesD = [];
	//valuesD.push({
	//	key:   "URL",
	//	value: "about:blank"
	//});
	//valuesD.push({
	//	key:   "Indicador",
	//	value: "Bonzo Erick"
	//});
	//valuesD.push({
	//	key:   "Cantidad",
	//	value: 25
	//});
	//D = CreateObject(OtrosIndicadores, -80.447, 22.139, valuesD);

	//var valuesE = [];
	//valuesE.push({
	//	key:   "URL",
	//	value: "about:blank"
	//});
	//valuesE.push({
	//	key:   "Indicador",
	//	value: "Erick Hernández Darias"
	//});
	//valuesE.push({
	//	key:   "Cantidad",
	//	value: 25
	//});
	//E = CreateObject(OtrosIndicadores, -79.444, 21.935, valuesE);

	//var valuesF = [];
	//valuesF.push({
	//	key:   "URL",
	//	value: "about:blank"
	//});
	//valuesF.push({
	//	key:   "Indicador",
	//	value: "Erick López"
	//});
	//valuesF.push({
	//	key:   "Cantidad",
	//	value: 25
	//});
	//F = CreateObject(OtrosIndicadores, -75.204, 20.150, valuesF);

	//OffsetVert = 1;
	////SetIconStyle(F, 'img/marker.png', Scale, OffsetHor, OffsetVert, Opacity);
	//SetIconStyle (Indicadores, 'img/marker.png', Scale, OffsetHor, OffsetVert, Opacity);
	//SetIconStyle (OtrosIndicadores, 'img/red.png', Scale, OffsetHor, OffsetVert, Opacity);

	//var Enlaces = CreateLayer('Enlaces')
	////Dashstyle (“dot”, “dash”, “dashdot”, “longdash”, “longdashdot”, or “solid”)

	//var valuesAB = [];
	//valuesAB.push({
	//	key:   "URL",
	//	value: "<a href='about:blank'>Enlace A y B</a>"
	//});
	//valuesAB.push({
	//	key:   "Cantidad",
	//	value: 1
	//});

	//LinkAB = CreateLink(Enlaces, A, B, valuesAB);

	////SetLinkStyle(LinkAB, 3, 'dashdot', '#FF0000');
	//var valuesAC = [];
	//valuesAC.push({
	//	key:   "URL",
	//	value: "<a href='about:blank'>Enlace A y C</a>"
	//});
	//valuesAC.push({
	//	key:   "Nombre",
	//	value: "Enlace 1"
	//});
	//valuesAC.push({
	//	key:   "Cantidad",
	//	value: 1
	//});
	//LinkAC = CreateLink(Enlaces, A, C, valuesAC);
	//SetLinkStyle(Enlaces, 3, 'dashdot', '#FF0000');

	//var Rutas = CreateLayer('Rutas')
	//var valuesABC = [];
	//valuesABC.push({
	//	key:   "URL",
	//	value: "<a href='about:blank'>RutaABC</a>"
	//});
	//valuesABC.push({
	//	key:   "Nombre",
	//	value: "RutaABC"
	//});
	//valuesABC.push({
	//	key:   "Cantidad",
	//	value: 1
	//});
	//RutaABC = CreateRoute(Rutas, [[-82.359, 23.135],[-82.759, 22.816],[-82.152, 22.965]], valuesABC);
	//SetLinkStyle(Rutas, 5, 'dashdot', '#FFFF00');
	//OffsetHor = 0;
	//OffsetVert = 1;
	//SetStartIconStyle(Rutas, RutaABC, 'img/flag.png', Scale, OffsetHor, OffsetVert, Opacity);
	//OffsetHor = 0.5;
	//OffsetVert = 1;
	//SetFinishIconStyle(Rutas, RutaABC, 'img/marker.png', Scale, OffsetHor, OffsetVert, Opacity);

	//var JSONLayer = CreateJSONLayer('JSON Layer', 'data/Alamar-CITI.geojson');
	//var JSONLayer1 = CreateJSONLayer('JSON Layer1', 'data/Lisa-CITI.geojson');
	//var JSONLayer2 = CreateJSONLayer('JSON Layer2', 'data/SanMiguel-Regla-CITI.geojson');
	//SetLinkStyle(JSONLayer, 3, 'solid', '#0000FF');
	//SetLinkStyle(JSONLayer1, 3, 'solid', '#00FF00');
	//SetLinkStyle(JSONLayer2, 3, 'solid', '#FF0000');

	////DeleteObject(A);
	////DeleteObjects(Indicadores);
	////DeleteLayer(Indicadores);
	//FillLayers();
	//FillAttributes();

	//drawAll();
  //renderScreen();
}



// Función delegada llamada en modo "Get Point" para capturar
// la coordenada en el mapa durante el evento "click".
function CaptureCoords(coord){
	console.log('Longitud: ' + coord[0] + ' Latitud: ' + coord[1]);
}

//////////////////////////////////////////////////////////////////////////////////
function CreatePolygons(info ,wkt){
    var Indicadores = CreateLayer('Indicadores');
    // Parámetros de entrada
    //Scale = 0.5;
    //OffsetHor = 0.5;
    //OffsetVert = 0.5;
    //Opacity = 0.8;
    var valuesA = [];
    valuesA.push({
        key:  "Direccion",
        value: "<h2>" + info + "</h2>"
    });
    wktFeature = CreateObjectFromWKT(Indicadores, wkt, valuesA);
    ZoomToPolygon(wktFeature,19);

}
function createObjetFromList(objectList){
	var Object = CreateLayer('Objects');

	for (let index = 0; index < objectList.length; index++) {
		const element = objectList[index];
		console.log(element);
		jsonFeature = CreateObject(Object,element.long,element.lat,null);
		
	}
}

function CreatePolygonsJSONSelected(json,type,color){
	var seleted = CreateLayer('Selected');

	// Parámetros de entrada
	//Scale = 0.5;
	//OffsetHor = 0.5;
	//OffsetVert = 0.5;
	//Opacity = 0.8;
	//var valuesA =
	var valuesA = getValues(type,json);
	var shape = json.SHAPE;
	jsonFeature = CreateObjectFromJSONSelected(seleted,shape,valuesA,color);
	//if(type!="POI")
		ZoomToPolygon(jsonFeature,19);




}
function CreatePolygonsJSONOtherColorArray(jsonArray,type,colorArray){
	var seleted = CreateLayer('Selected');

	// Parámetros de entrada
	//Scale = 0.5;
	//OffsetHor = 0.5;
	//OffsetVert = 0.5;
	//Opacity = 0.8;
	//var valuesA =
	for (var i=0;i<jsonArray.length;i++){
		var valuesA = getValues(type,jsonArray[i]);
		var shape = jsonArray[i].SHAPE;
		var color = colorArray[i];
		jsonFeature = CreateObjectFromJSONSelected(seleted,shape,valuesA,color);
	}

}

function CreatePolygonsJSON(jsonArray,layerName){
	//var initial = CreateLayer(layerName);
	// Parámetros de entrada
	//Scale = 0.5;
	//OffsetHor = 0.5;
	//OffsetVert = 0.5;
	//Opacity = 0.8;
	var jsonArrayDiv = parseInt((jsonArray.length)/2);

	// for (var i = 0;i < jsonArray.length;i++){
	// 	var json = jsonArray[i];
	// 	//variable que contiene la geometria
	// 	var SHAPE = json.SHAPE;
	// 	var valuesA = getValues(layerName,json);
    //
	// 	jsonFeature = CreateObjectFromJSON(currentLayer, SHAPE,valuesA,layerName);
	// }
	////////////////////////////////////////////////////////////////////////////////////////Paralelizado
    var numThread = 2;
    var MT = new Multithread(numThread);
    var process1 = MT.process(function(){},function(){
        for (var i = 0;i < jsonArrayDiv;i++){
            var json = jsonArray[i];
            //variable que contiene la geometria
            var SHAPE = json.SHAPE;
            var valuesA = getValues(layerName,json);

            jsonFeature = CreateObjectFromJSON(currentLayer, SHAPE,valuesA,layerName);
        }
	});
    var process2 = MT.process(function(){},function(){
        for (var i = jsonArrayDiv;i < jsonArray.length;i++){
            var json = jsonArray[i];
            //variable que contiene la geometria
            var SHAPE = json.SHAPE;
            var valuesA = getValues(layerName,json);

            jsonFeature = CreateObjectFromJSON(currentLayer, SHAPE,valuesA,layerName);
        }
	});
    process1();
    process2();

    console.log('Fin      '+new Date().getSeconds() + '  '+new Date().getMilliseconds());
}
/*
function CreatePolygonsAreas(jsonObjectArray,type){
	var initial = CreateLayer('Areas');
	// Parámetros de entrada
	//Scale = 0.5;
	//OffsetHor = 0.5;
	//OffsetVert = 0.5;
	//Opacity = 0.8;

	for (var i = 0;i < jsonObjectArray.length;i++){
		var json = jsonObjectArray[i];
		var SHAPE = json.SHAPE;
		var valuesA = getValues(type,json);

		jsonFeature = CreateObjectFromJSON(initial, SHAPE,valuesA);
	}

}
function CreatePolygonsPOI(jsonObjectArray,type){
	var initial = CreateLayer('POI');
	// Parámetros de entrada
	//Scale = 0.5;
	//OffsetHor = 0.5;
	//OffsetVert = 0.5;
	//Opacity = 0.8;

	for (var i = 0;i < jsonObjectArray.length;i++){
		var json = jsonObjectArray[i];
		var SHAPE = json.SHAPE;
		var valuesA = getValues(type,json);

		jsonFeature = CreateObjectFromJSON(initial, SHAPE,valuesA);
	}

}

function CreatePolygonsStreet(jsonObjectArray,type){
	var initial = CreateLayer('Street');
	// Parámetros de entrada
	//Scale = 0.5;
	//OffsetHor = 0.5;
	//OffsetVert = 0.5;
	//Opacity = 0.8;

	for (var i = 0;i < jsonObjectArray.length;i++){
		var json = jsonObjectArray[i];
		var SHAPE = json.SHAPE;
		var valuesA = getValues(type,json);

		jsonFeature = CreateObjectFromJSON(initial, SHAPE,valuesA);
	}

}
*/

function getFeature(){
	return jsonFeature;
}

function CretaePolygonsScaleColors(jsonArray,layerName,fclassArray,scale){

	var initial = CreateLayer(layerName);
	//unica disponible por el momento

	// Parámetros de entrada
	//Scale = 0.5;
	//OffsetHor = 0.5;
	//OffsetVert = 0.5;
	//Opacity = 0.8;

	for (var i = 0;i < jsonArray.length;i++){
		var json = jsonArray[i];
		var SHAPE = json.SHAPE;
		var id_Build = json.OGR_FID;
		//var faculty = getFacultyByBuilding(id_Build);
		var valuesA = getValues("Buildings",json);
		var fclass = json.estadconst;

		jsonFeature = CreateObjectFromJSONColorScale(initial,SHAPE,valuesA,scale,fclass,fclassArray);
	}
}

//funcion totalmente modificable (segun los valores que decean mostrar)
function getValues(type,Object){
	var valueResult = [];
	if(type == "Buildings"){
		var name = Object.name;
		var cantAulas = Object.cantaula;
		var catPisos = Object.catpisos;
		var altura = Object.altura;
		var uso = Object.uso;
		var estadcost = Object.estadconst;


		if(name == null){
			name = "No disponible";
		}
		if(cantAulas == null){
			cantAulas = "No disponible";
		}
		if(catPisos == null){
			catPisos = "No disponible";
		}
		if(altura == null){
			altura = "No disponible";
		}
		if(uso == null){
			uso = "No disponible";
		}
		if(estadcost == null){
			estadcost = "No disponible";
		}

		valueResult.push([
			{
				key:  "<b>Nombre</b>",
				value: name
			},{
				key:  "<b>Cantidad de aulas</b>",
				value: cantAulas
			},{
				key:  "<b>Cantidad de pisos</b>",
				value: catPisos
			},{
				key:  "<b>Altura</b>",
				value: altura
			},{
				key:  "<b>Uso</b>",
				value:  uso
			},{
				key:  "<b>Estado constructivo</b>",
				value: estadcost
			}
		]);
	}
	if(type=="Areas"){
		var name = Object.name;
		var fclass = Object.fclass;
		if(name == null){
			name = "No Disponible";
		}
		if(fclass==null){
			fclass = "No Disponible"
		}
		valueResult.push([
			{
				key:  "<b>Nombre</b>",
				value: name
			},{
				key:  "<b>Type</b>",
				value:  fclass
			}
		]);
	}

	if(type=="Street"){
		var name = Object.name;
		var fclass = Object.fclass;
		if(name == null){
			name = "No Disponible";
		}
		if(fclass==null){
			fclass = "No Disponible"
		}
		valueResult.push([
			{
				key:  "<b>Nombre</b>",
				value:  name
			},{
				key:  "<b>Type</b>",
				value: fclass
			}
		]);
	}
	if(type=="Street"){
		var name = Object.name;
		var fclass = Object.fclass;
		if(name == null){
			name = "No Disponible";
		}
		if(fclass==null){
			fclass = "No Disponible"
		}
		valueResult.push([
			{
				key:  "<b>Nombre</b>",
				value: name
			},{
				key:  "<b>Tipo</b>",
				value: fclass
			}
		]);
	}
	if(type=="POI"){
		var name = Object.name;
		var fclass = Object.fclass;
		if(name == null){
			name = "No Disponible";
		}
		if(fclass==null){
			fclass = "No Disponible"
		}
		valueResult.push([
			{
				key:  "<b>Nombre</b>",
				value: name
			},{
				key:  "<b>Type</b>",
				value:  fclass
			}
		]);
	}
	if(type=="Rutas") {
		var descipcion = Object.info;
		var nameOpc =  Object.nombre;

		if(descipcion == null){
			descipcion = "No Disponible";
		}

		valueResult.push([
			{
				key:  "<b>Nombre</b>",
				value: nameOpc
			},
			{
				key:  "<b>Descripción</b>",
				value: descipcion
			}

		]);
	}

	return valueResult;
}


//////////////////////////////////////////////////////////////////////////////



// Función delegada llamada en modo "Select" para asignarle a currentFeature
// el objeto seleccionado y para mostrar, por ejemplo,
// los valores de los atributos del objeto seleccionado.
function SelectObject(feature){
	var coord = GetCoordinate(feature);
	var attributes = GetAttributes(feature);
	var container = document.getElementById("container");
	// Clear previous contents of the container
	while (container.hasChildNodes())
		container.removeChild(container.lastChild);
	for (iAtt = 0; iAtt < attributes.length ; iAtt++){
		container.appendChild(document.createTextNode(attributes [iAtt].key));
		var input = document.createElement("input");
		input.type = "text";
		input.name = "member" + iAtt;
		input.value= attributes [iAtt].value;
		container.appendChild(input);
		// Append a line break
		container.appendChild(document.createElement("br"));
	}
	document.getElementById('Longitud').value = coord[0];
	document.getElementById('Latitud').value = coord[1];
	currentFeature= feature;
}

// Función que marca aquellos objetos de una capa elegida cuyo atributo seleccionado
// tenga un valor similar al dado.
// El estilo debe definirse en dependencia del tipo de la geometría de la capa (Línea o Punto).
function SearchObject(){
	attName = document.getElementById('Attributes').value;
	attValue = document.getElementById('Value').value;
	layersSelect = document.getElementById('Layers');
	var layerName = layersSelect.options[layersSelect.selectedIndex].text;
	var layers = GetLayers();
	for (i = 0; i < layers.getArray().length ; i++ ) {
		var currentLayer = layers.getArray()[i];
		if (currentLayer.getProperties().title == layerName) {
			var selectedFeatures = CreateLayer('Selected Features');
			features = SearchFeature(currentLayer, attName, attValue);
			Scale = 0.5;
			OffsetHor = 0.5;
			OffsetVert = 1;
			Opacity = .8;
			SetIconStyle (selectedFeatures, 'img/marker-26.png', Scale, OffsetHor, OffsetVert, Opacity);
			//SetLinkStyle(selectedFeatures, 3, 'solid', '#000000');

			for (iFeature = 0; iFeature < features.length ; iFeature++ )
			  AddObject(selectedFeatures, features [iFeature]);
			return;
		}
	}
}

// Llena el combobox con los nombres de los atributos de la capa seleccionada
// en el combobox de capas.
function FillAttributes(){
  layersSelect = document.getElementById('Layers');
  var layerName = layersSelect.options[layersSelect.selectedIndex].text;
  var layers = GetLayers();

  for (i = 0; i < layers.getArray().length ; i++ )
   if (layers.getArray()[i].getProperties().title == layerName) {
	 var attributes = GetAttributesNames(layers.getArray()[i]);
	 attSelect = document.getElementById('Attributes');
	 attSelect.innerHTML = "";
	 for (j = 0; j < attributes.length ; j++ )
		attSelect.options[attSelect.options.length] = new Option(attributes[j], attributes[j]);
   }

}

// Llena el combobox con los nombres de las capas.
function FillLayers(){
	var layers = GetLayers();
	layersSelect = document.getElementById('Layers');
	for (i = 0; i < layers.getArray().length ; i++ )
		layersSelect.options[layersSelect.options.length] = new Option(layers.getArray()[i].getProperties().title,
																	   layers.getArray()[i].getProperties().title);
}

// Cambia las coordenadas de un objeto seleccionado.
function ChangeCoordinate(){
  dLon = document.getElementById('Longitud').value;
  dLat = document.getElementById('Latitud').value;
  ChangePosition(currentFeature, dLon, dLat)
}

function ShowGeocodeForm() {
	$('#myModal').modal('show');
}

function ShowGeocodeResponse(address, lon, lat, accuracy, matchType) {
	var text;
	if (matchType == '')
		text = "<a href='#' class='list-group-item disabled'>" + address + "</a>";
	else
		text = "<a href='#' class='list-group-item' onclick='$(\"#myModal\").modal(\"hide\"); LocateAddress(\"" + address + "\", \"" + lon + "\", \"" + lat + "\", \"" + accuracy + "\", \"" + matchType + "\")'</a>";
	$(text).html(address).appendTo("#Autom");
}

function ClearGeoCodedAdresses() {
	$('#Autom').each(function() {
	    $("#Autom > a").remove();
	});
}

function ShowGeocodeError(xhr, status, error) {
	alert("The XML File could not be processed correctly.");
}

















