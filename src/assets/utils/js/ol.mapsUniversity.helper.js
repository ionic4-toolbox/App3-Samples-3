//var http = require('http');
//import convert from "xml-js";
var isVisible = 0;
var isVisibleWay = 0;

let initPoint =0;
let finalPoint=0;
let selectedMode = 'Basic';

function drawAll(){

   // getAreasAjax();
   // getBuildingsAjax();
    getStreetAjax();
   // getPoiAjax();
    // process1();
    // process2();
    //renderScreen();
}

function setModalSelectedRoute(){
    selectedMode = 'Route';
    setCoordinatesMode();
}
function setModalSelectedDirectDistance(){
    
    selectedMode = 'Distance';
    setCoordinatesMode();
}

function setModalSelectedDirectProximity(){
    selectedMode = 'Proximity';
    setCoordinatesMode();
}

function insetCoords(coord){
    let layer = CreateLayer('Point');
    
    if(initPoint == 0){
        initPoint = coord;
        console.log(initPoint);
        if(selectedMode == 'Route'){
            // document.getElementById('ruteInitialPoint').value = initPoint;
            drawPoint(layer,initPoint[0],initPoint[1],null);
        }
    }else{
        if(finalPoint == 0 && selectedMode == 'Route'){
            finalPoint = coord;
            let layers = CreateLayer('Point');
    
            
            // document.getElementById('ruteFinalPoint').value = finalPoint;
            routeRequest();
            drawPoint(layers,finalPoint[0],finalPoint[1],null);
                       
        }
        if(selectedMode == 'Distance'){
            document.getElementById('coordinateLabel').value ="Si";
            drawPoint(layer,initPoint[0],initPoint[1],null);
        }else if(selectedMode == 'Proximity'){
            document.getElementById('coordinateLabel').value ="Si";
            drawPoint(layer,initPoint[0],initPoint[1],null);
        }
    }
}

function setModalSelectedDirectBasic(){
    selectedMode == 'Basic';
}

function setCoordinatesMode(){
    SetCoordinateMode();

}
function setInfoMode(){
    SetInfoMode();
}
function getInitPoint(){
    return initPoint;
}
function setInitPoint(ini){
initPoint = ini;
} 
function setFinalPoint(final){
finalPoint = final;
routeRequest();
}
function getFinalPoint(){
    return finalPoint;
}
function clearPoints(){
    initPoint =0;
    finalPoint=0;
    if(document.getElementById('ruteInitialPoint')!= null && document.getElementById('ruteFinalPoint')!=null){
        document.getElementById('ruteInitialPoint').value = '';
        document.getElementById('ruteFinalPoint').value = '';
    }
        DeleteLayerByName('Ruta');
    DeleteLayerByName('Point');
    
   
}

// //

// function getRouteRequest(){

//   // let data = {
//   //   iniX : document.getElementById('iniX').value,
//   //   iniY : document.getElementById('iniY') ,
//   //   finX : document.getElementById('finX'),
//   //   finY : document.getElementById('finY'),
//   //   route : document.getElementById('route'),
//   //   intRoute : document.getElementById('intRoute'),
//   //   middle :document.getElementById('moddle')

//   // };
//   // let route = routeRequest(data.iniX,data.iniY,data.finX,data.finY,data.route,data.intRoute,data.middle);
  
    
//     let ob = null;

//     let xmlRe = $.parseXML(xml);
//     let chil = xmlRe.getElementsByTagName('DirectoryResponse')[0].children;
//     let array = new Array();
//     var layer = CreateLayer("nuevo");
//     for (let index = 0; index < chil.length; index++) {
//       const element = chil[index];
//       let pos = element.children[0].children[2].children[0].innerHTML;     
//       ob = {
//         long : getLongitud(pos),
//         lat : getLatitud(pos)
//       } 
//       var feature = CreateObject(layer,ob.long,ob.lat,null);
//       let arr = new Array();
//       arr[0] = ob.long;
//       arr[1] = ob.lat;
//       ZoomToCoordinates(arr,18);
//     }
//     //createObjetFromList(array);

// }

function getLongitud(coords){
  
  var long;
  var lat;
    for (let index = 0; index < coords.length; index++) {
      var chart=coords.charAt(index);
      if(chart == " "){        
          long = coords.slice(0,index);
          
          break;
        }
       
      }
      
    
    return long;
}

function getLatitud(coords){
  
  var lat;
    for (let index = 0; index < coords.length; index++) {
      var chart=coords.charAt(index);
      if(chart == " "){        
          
          lat = coords.slice(index+1,coords.length);
          break;
        }
       
      }
      
    
    return lat;
}

function routeRequest(){

    let iniX = initPoint[0];
    let iniY = initPoint[1];
    let finX = finalPoint[0];
    let finY = finalPoint[1];
    let route = "Shortest";
    let intRoute = ""; 
    let middle = "";

    if(intRoute != "") {
        for (var value in intRoute) {

            middle = '<ViaPoint>' +
                '<Position>' +
                '<Point xmlns="http://www.opengis.net/gml" srsName="4326">' +
                '<pos>' + value['intX'] + ' ' + value['intY'] + '</pos>' +
                '</Point>' +
                '</Position>' +
                '</ViaPoint>';
        }

    }

    let xml = '<?xml version="1.0" encoding="utf-8"?> ' +
    '<XLS version="1.2" n1:lang="en-US" xmlns:n1="http://www.opengis.net/xls" xmlns="http://www.opengis.net/xls"> ' +
        '<RequestHeader />' +
            '<Request version="1.2" requestID="" methodName="DetermineRouteService" maximumResponses="5">' +
                '<DetermineRouteRequest distanceUnit="M">' +
                    '<RoutePlan>' +
    '                   <RoutePreference>'+route+'</RoutePreference>' +
    '                       <WayPointList>' +
    '                           <StartPoint>' +
    '                               <Position>' +
    '                                   <Point srsName="4326" xmlns="http://www.opengis.net/gml">' +
    '                                       <pos>'+iniX+' '+iniY+'</pos>' +
    '                                   </Point>' +
                                    '</Position>' +
                                '</StartPoint>'+middle+'<EndPoint>' +
                             '<Position>' +
                                '<Point srsName="4326" xmlns="http://www.opengis.net/gml">' +
                                    '<pos>'+finX+' '+finY+'</pos>' +
                                '</Point>' +
                            '</Position>' +
                            '</EndPoint>' +
                        '</WayPointList>' +
                    '</RoutePlan>' +
                '</DetermineRouteRequest>' +
            '</Request>' +
    '</XLS>';
    let xmlw = $.parseXML(xml);
    let req = new XMLHttpRequest();
    req.open('POST','http://192.168.137.1/webSite/OpenLSServer.aspx',true);
    req.onload = function(){
       
        processXmlRoute(req.responseXML);
    }
    req.send(xml);
}

function sendModalDirectProximity(){

    let element = document.getElementById('directoryProxCercanoA').value;
    
    if(element != null || initPoint != 0){
        directoryRequest(selectedMode,initPoint);
    }else{
        alert('Debe llenar Cercano A o establecer un punto')
    }
    setInfoMode();
}


function directoryRequest(modeAux,coord){
   
  let result = null;
  let name = "";
  let requestNumber = 5;
  let mode = "";
  let category = "";
  let type = "";
  let subType = "";
  let longitud = "";
  let latitud = "";
  let long = "";
  let other = "";
  let phone = "";
  let close = "";
  

  if(modeAux == 'Distance'){
    mode = modeAux;
     name = document.getElementById('directoryDistPlace').value;
     long = document.getElementById('directoryProxMaxDistanse').value;
     if(long == ''){
        long = 100;
     }
     if(coord != 0){
        longitud = coord[0];
        latitud = coord[1];
    }else{
        close = document.getElementById('directoryProxCercanoA').value;
    }
  }else if(modeAux == 'Proximity'){
    mode = modeAux;
    name = document.getElementById('directoryProxPlace').value;
    requestNumber = document.getElementById('directoryProxMaxFind').value;
    if(requestNumber == ''){
        requestNumber = 5;
    }
    if(coord != 0){
        longitud = coord[0];
        latitud = coord[1];
    }else{
        close = document.getElementById('directoryProxCercanoA').value;
    }
  }else if(modeAux == 'Basic'){
    name = document.getElementById('directorySearch').value;
    requestNumber = document.getElementById('directoryMaxResponse').value;
    if(requestNumber == ''){
        requestNumber = 5;
    }
  }
  
  let poiProperty='<POIProperties>';

    if(category != '')
        poiProperty += '<POIProperty name="SIC_category" value="'+category+'"/>';
    if(type != '')
        poiProperty += '<POIProperty name="SIC_type" value="'+type+'"/>';
    if(subType != '')
        poiProperty += '<POIProperty name="SIC_subType" value="'+subType+'"/>';
    if(name != '')
        poiProperty += '<POIProperty name="Keyword" value="'+name+'"/>';
    if(phone != '')
        poiProperty += '<POIProperty name="PhoneNumber" value="'+phone+'"/>';
    if(other != '')
        poiProperty += '<POIProperty name="other" value="'+other+'"/>';
    poiProperty += '</POIProperties>';

    let poiLocation ='';

    if(mode=='Proximity'){
        poiLocation = '<POILocation>\n'+
            '<Nearest>\n'+
            '<Position>\n'+
            '<Point xmlns="http://www.opengis.net/gml">\n'+
            '<pos>'+longitud+' '+latitud+'</pos></Point></Position></Nearest></POILocation>';
    }
    else
    if(mode=='Distance'){
        poiLocation = "<POILocation>\n"+
            '<WithinDistance>\n'+
            '<Position>\n'+
            '<Point xmlns="http://www.opengis.net/gml">\n'+
            '<pos>'+longitud+' '+latitud+'</pos>\n'+
            '</Point>\n'+
            '</Position>\n'+
            '<MaximumDistance value="'+long+'"/></WithinDistance>\n'+
            '</POILocation>';
    }

    let body = poiLocation+poiProperty;

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'+
        '<XLS xmlns="http://www.opengis.net/xls" version="1.2"><RequestHeader/>\n'+
        '<Request maximumResponses="'+requestNumber+'" methodName="DirectoryService" requestID="" version="1.2">\n' +
        '<DirectoryRequest distanceUnit="M">\n'+body+' '+
        '</DirectoryRequest>\n' +
        '</Request>\n' +
        '</XLS>';

    let xmlCloseOption = '<?xml version="1.0" encoding="utf-8"?>'+
    '<XLS version="1.2" n1:lang="en-US" xmlns:n1="http://www.opengis.net/xls" xmlns="http://www.opengis.net/xls">'+
    '<RequestHeader clientName="" clientPassword=""/>'+
    '<Request maximumResponses="'+requestNumber+'" methodName="DirectoryService" requestID="" version="1.2">'+
    '<DirectoryRequest>'+
    '<POILocation>'+
    '<WithinDistance>'+
    '<POI>'+
    '<POIAttributeList>'+
    '<POIInfoList>'+
    '<POIInfo name="Keyword" value="'+close+'"/>'+
    '</POIInfoList>'+
    '</POIAttributeList>'+
    '</POI>'+
    '<MaximumDistance value="'+long+'"/>'+
    '</WithinDistance>'+
    '</POILocation>'+
    '<POIProperties>'+
    '<POIProperty name="Keyword" value="'+name+'"/>'+
    '</POIProperties>'+
    '</DirectoryRequest>'+
    '</Request>'+
    '</XLS>';

    let xmlProxyOption = '<?xml version="1.0" encoding="utf-8"?>'+
    '<XLS version="1.2" n1:lang="en-US" xmlns:n1="http://www.opengis.net/xls" xmlns="http://www.opengis.net/xls">'+
    '<RequestHeader clientName="" clientPassword=""/>'+
    '<Request maximumResponses="'+requestNumber+'" methodName="DirectoryService" requestID="" version="1.2">'+
    '<DirectoryRequest>'+
    '<POILocation>'+
    '<Nearest>'+
    '<POI>'+
    '<POIAttributeList>'+
    '<POIInfoList>'+
    '<POIInfo name="Keyword" value="'+close+'"/>'+
    '</POIInfoList>'+
    '</POIAttributeList>'+
    '</POI>'+
    '</Nearest>'+
    '</POILocation>'+
    '<POIProperties>'+
    '<POIProperty name="Keyword" value="'+name+'"/>'+
    '</POIProperties>'+
    '</DirectoryRequest>'+
    '</Request>'+
    '</XLS>';

    
  
    let req = new XMLHttpRequest();
    req.open('POST','http://192.168.137.1/webSite/OpenLSServer.aspx',true);
    req.onload = function(){
        
        processXmlDirectory(req.responseXML);
    }
    if(close != "" && selectedMode == 'Proximity'){
        req.send(xmlProxyOption);
    }else{
        if(close != "" && selectedMode == 'Distance'){
            req.send(xmlCloseOption);
        }else
            req.send(xml);
    }
    

}

function drawPoint(layer,long,lat,attributes){
    
    var feature="";
    if(attributes!=null)
         feature = CreateObject(layer,long,lat,attributes[0]);
        else
         feature = CreateObject(layer,long,lat,null);

    SetIconStyle(feature, 'assets/imgs/pointer.png', 1, 0.5, 1, 1);

    
    
    
}


function drawLineString(lineString){

    console.log('String de coordenadas'+lineString);

    var layer = CreateLayer('Ruta');   
    var coord = coordinatesSlice(lineString);
    console.log('arreglo del string de coordenadas'+coord);
    let short = new Array();
    let zise = coord.length;
    
    let count =0;
    while(count < zise){
        if(count == zise-1){
        short.push(coord[count-1]);
        short.push(coord[count]);
        CreateLineString(layer,short);
        short = new Array();
        count+=2;
        }else{
            short.push(coord[count]);
            short.push(coord[count+1]);
            CreateLineString(layer,short);
            short = new Array();  
            count+=2;  
           
        }

    }
   
}


function processXmlRoute(xml){ 
    let distance = xml.getElementsByTagName('TotalDistance')[0].attributes[0].value;
    
    alert(distance);

    let lineString = xml.getElementsByTagName('LineString')[0].children[0].innerHTML;
    console.log(lineString);
    drawLineString(lineString);   
}

function processXmlDirectory(xml){
   
    console.log(xml);
    if(xml.getElementsByTagName('ErrorList').length ==1){
        console.log(xml.getElementsByTagName('ErrorList'));
        alert('No se encontraron elementos');
    }else
    {
        let directoryResponse = xml.getElementsByTagName('DirectoryResponse')[0].children;
        let layer = CreateLayer('Point');

        for (let index = 0; index < directoryResponse.length; index++) {
            let arrAttrinbutes = new Array();
            let poiContent = directoryResponse[index];
            let name = poiContent.children[0].attributes[0].nodeValue;
            let phone = poiContent.children[0].attributes[1].nodeValue;
            let description = poiContent.children[0].attributes[2].nodeValue;
            let address = poiContent.children[0].children[1];
            let freeFormAdrees = address.children[0].innerHTML;
            let postalCode = address.children[1].innerHTML;
            let distance = "";
            if(selectedMode == "Distance" || selectedMode == "Proximity"){
                distance = directoryResponse[index].getElementsByTagName('Distance')[0].attributes[0].nodeValue;
            } 
            if(selectedMode == "Distance" || selectedMode == "Proximity")  
                arrAttrinbutes.push([{
                        key: 'Nombre',
                        value: name
                    },{
                        key: 'Descripción',
                        value: description
                    },{
                        key:'Teléfono',
                        value: phone
                    },{
                        key:'Distancia',
                        value:distance
                    }
                            
                ]);
                else
                    arrAttrinbutes.push([{
                        key: 'Nombre',
                        value: name
                    },{
                        key: 'Descripción',
                        value: description
                    },{
                        key:'Teléfono',
                        value: phone
                    }
                            
                ]);

                let point = poiContent.children[0].children[2];
            let pos = point.children[0].innerHTML;

            drawPoint(layer,getLongitud(pos),getLatitud(pos),arrAttrinbutes);

        }
    }
}


function coordinatesSlice(coordString){
    let arr = new Array();
    let arrLocal = new Array();
    

    let aux = 0;
    for (let index = 0; index <= coordString.length; index++) {
        if(coordString.charAt(index) == " "){
            arrLocal.push(coordString.slice(aux,index));
            if(index+20 > coordString.length){
                arrLocal.push(coordString.slice(index+1,coordString.length));
                arr.push(arrLocal);
                break;
            }
            aux = index+1;
        }
        
        if(coordString.charAt(index) == ","){
            arrLocal.push(coordString.slice(aux,index));           
            arr.push(arrLocal);
            arrLocal = new Array();
            aux=index+1;
        }
    }
    return arr;
}



// function routeRequest(iniX,iniY,finX,finY,route,intRoute,middle){
//   let result = null;
//   let data = JSON.stringify({
//     iniX : iniX,
//     iniY : iniY ,
//     finX : finX,
//     finY : finY,
//     route : route,
//     intRoute : intRoute,
//     middle :middle

//   });

//   let headers = new HttpHeaders();
//   headers.set('Content-Type','application/json');

//   this.http.post('http://localhost:8888/Directory',data,{headers}).map(res=>res).subscribe(data=>{
//     console.log(data);
//     result = data;
//   });

//   return result;
// }



function drawBuildingsReport(json){
    var fclassArray = ["Bueno","Regular","Malo"];
    CretaePolygonsScaleColors(json,"Selected",fclassArray,"greenToRed");


    DeleteLayerByName("POI");
    getPoiAjax();

}


function drawBuildings(json){

    CreatePolygonsJSON(json ,"Buildings");
    //CretaePolygonsScaleColors(json,"Buildings");

}


function drawAreas(json){

    CreatePolygonsJSON(json,"Areas");
    //CreatePolygonsJSON(null,areas.SHAPE);

}


function drawStreet(json){

    CreatePolygonsJSON(json,"Street");
}


function drawPoi(json){

    CreatePolygonsJSON(json,"POI");
}


function getBuildingsAjax(){
    //console.log('inicio paralelo proceso2    ' + new Date().getSeconds()+'  '+ new Date().getMilliseconds());
    $.ajax({
        url: "http://localhost:8888/BuildingsList",
        success: function (response) {
            drawBuildings(response);
        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);

        }
    });

}


function getAreasAjax(){
    console.log('inicio paralelo proceso1    ' + new Date().getSeconds()+'  '+ new Date().getMilliseconds());
    $.ajax({
        url: "index.php?r=areas/getareas",

        success: function (response) {
            drawAreas(response);

        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);
        }
    });


}


function getPoiAjax(){
    var layer = CreateLayer("POI");
    $.ajax({
        url: "?r=interestplaces/getpoi",
        success: function (response) {

            for (var i = 0;i<response.length;i++){
                var values = [];
                var shape = response[i].SHAPE;

                var format = new ol.format.GeoJSON();
                var jsonFeature = format.readFeature(shape);

                var coordinates = jsonFeature.getGeometry().getCoordinates();



                var long = coordinates[0];
                var lat = coordinates[1];




                var feature = CreateObject(layer,long,lat,null);

                var key = "<b>Nombre</b>";
                var value = response[i].name;
                if(value == null){
                    value = "No disponible";
                }
                feature.set(key,value);

                key = "<b>Tipo</b>";
                value  = response[i].fclass;

                feature.set(key,value);

                if(response[i].fclass == "Cafetería"){
                    SetIconStyle(feature, '../', 1, 0.5, 1, 1);
                }else if(response[i].fclass == "Teatro"){
                    SetIconStyle(feature, 'images/icons poi/teatro.png', 1, 0.5, 1, 1);
                }else if(response[i].fclass == "Restaurante"){
                    SetIconStyle(feature, 'images/icons poi/restaurante1.png', 1, 0.5, 1, 1);
                }else if(response[i].fclass == "Biblioteca"){
                    SetIconStyle(feature, 'images/icons poi/biblioteca1.png', 1, 0.5, 1, 1);
                }else if(response[i].fclass == "Enfermería"){
                    SetIconStyle(feature, 'images/icons poi/enfermeria1.png', 1, 0.5, 1, 1);
                }else if(response[i].fclass == "Monumento"){
                    SetIconStyle(feature, 'images/icons poi/monumento1.png', 1, 0.5, 1, 1);
                }else if(response[i].fclass == "Parada"){
                    SetIconStyle(feature, 'images/icons poi/parada1.png', 1, 0.5, 1, 1);
                }if(response[i].fclass == "ATM"){
                    SetIconStyle(feature, 'images/icons poi/seguridad1.png', 1, 0.5, 1, 1);
                }if(response[i].fclass == "Librería"){
                    SetIconStyle(feature, 'images/icons poi/libreria1.png', 1, 0.5, 1, 1);
                }if(response[i].fclass == "Restaurante"){
                    SetIconStyle(feature, 'images/icons poi/restaurante1.png', 1, 0.5, 1, 1);
                }else if(response[i].fclass == "Facultad"){

                    if(response[i].name == "Facultad de Arquitectura"){
                        SetIconStyle(feature, 'images/Facultades/Arquitectura.png', 1, 0.5, 1, 1);
                    }else if(response[i].name == "Facultad de Ingeniería Mecánica"){
                        SetIconStyle(feature, 'images/Facultades/mecanica.png', 1, 0.5, 1, 1);
                    }else if(response[i].name == "Facultad de Ingeniería Eléctrica"){
                        SetIconStyle(feature, 'images/Facultades/Electrica.png', 1, 0.5, 1, 1);
                    }else if(response[i].name == "Facultad de Ingeniería Informatica"){
                        SetIconStyle(feature, 'images/Facultades/Informatica.png', 1, 0.5, 1, 1);
                    }else if(response[i].name == "Facultad de Ingeniería Industrial"){
                        SetIconStyle(feature, 'images/Facultades/industrial.png', 1, 0.5, 1, 1);
                    }else if(response[i].name == "Facultad de Ingeniería  Química"){
                        SetIconStyle(feature, 'images/Facultades/quimica.png', 1, 0.5, 1, 1);
                    }else if(response[i].name == "Facultad de Ingeniería Civil"){
                        SetIconStyle(feature, 'images/Facultades/civil.png', 1, 0.5, 1, 1);
                    }else if(response[i].name == "Facultad de Ingeniería en Telecomunicaciones y Electrónica"){
                        SetIconStyle(feature, 'images/Facultades/no.png', 1, 0.5, 1, 1);
                    }else if(response[i].name == "Facultad de Ingeniería Automática"){
                        SetIconStyle(feature, 'images/Facultades/automatica.png', 1, 0.5, 1, 1);
                    }
                }

            }
        },
        error: function (xhr, status, error) {
            //alert("Error:  "+error);
            $('#modalError1').modal('show');
            $('#messageContent1').html('Disculpe a ocurrido un error de conneccion con la Base de Datos');
        }
    });

}


function getStreetAjax(){

    $.ajax({
        url: "index.php?r=street/getstreet",
        success: function (response) {
            drawStreet(response);
        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);
        }
    });

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Metodos para el dibujo de las figuras, luego de realizar una busqueda

function drawSelectedBuilding(id){
    $.ajax({
        url: "index.php?r=building/getbuilding",
        success: function (response) {

            for (var i =0;i < response.length;i++){

                if(response[i].OGR_FID == id){
                    var json = response[i];
                    CreatePolygonsJSONSelected(json,"Buildings","Red");
                    DeleteLayerByName("POI");
                    getPoiAjax();
                }
            }

        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);

        }
    });


    $('#modal2').modal("hide");
}


function drawSelectedPOI(item){


    $.ajax({
        url: "?r=interestplaces/getpoi",
        success: function (response) {

            for (var i = 0; i<response.length;i++){
                if(response[i].OGR_FID == item){
                    var format = new ol.format.GeoJSON();
                    var shape = response[i].SHAPE;

                    var jsonFeature = format.readFeature(shape);
                    var coordinates = jsonFeature.getGeometry().getCoordinates();
                    ZoomToCoordinates(coordinates,19);
                }
            }

        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);
        }
    });

    $('#modal3').modal("hide");
}


function drawSelectedArea(id){

    $.ajax({
        url: "index.php?r=areas/getareas",

        success: function (response) {
            for (var i =0;i < response.length;i++){

                if(response[i].OGR_FID == id){
                    var json = response[i];
                    CreatePolygonsJSONSelected(json,"Areas","Red");
                }
            }

        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);
        }
    });

    $('#modal4').modal("hide");
}

function drawSelectedWay(id){
    $.ajax({
        url: "index.php?r=way/getway",
        success: function (response) {

            for (var i =0;i < response.length;i++){

                if(response[i].OGR_FID == id){
                    var json = response[i];

                   
                    CreatePolygonsJSONSelected(json,"Rutas","Blue");
                    
                }
            }

        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);

        }
    });
}

function drawSelectedProfessor(idFac){
    var asdas = idFac;
    $.ajax({
        url: "?r=site/getbuildfacult",
        data: {id_fac:idFac},
        success: function (response) {

                    CreatePolygonsJSONSelected(response,"Buildings","Red");
            DeleteLayerByName("POI");
            getPoiAjax();
       },
        error: function (xhr, status, error) {
            alert("Error:  "+error);

        }
    });

    $('#modal1').modal("hide");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
function drawSelectedProfessor(id_fac) {

    $.ajax({
        method: 'get',
        data: {id_fac: id_fac},
        url: "index.php?r=site/getbuildfacult",
        success: function (response) {
            drawSelectedBuilding(response);
        },
        error: function (xhr, status, error) {
            alert("Error:  " + error);

        }
    });
$('#modal1').modal("hide");
}
*/
//Reporte que dibuja los edificios por el color de la facultad
function getBuildingAjaxReport(){
    $.ajax({
        url: "index.php?r=building/getbuilding",
        success: function (response) {
            drawBuildingsReport(response);
        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);
        }
    });

}

function getFacultyColor(faculty){
    var result= null;

    if(faculty == 'Facultad de Informática'){
        result = '#eecd07';
    }else
        if(faculty == 'Facultad de Automática y Biomédica'){
            result = '#ee8400';
        }else
        if(faculty == 'Facultad de Telecomunicaciones y Electrónica'){
            result = '#c505ee';
        }else
        if(faculty == 'Facultad de Civil'){
            result = '#60635b';
        }else
        if(faculty == 'Facultad de Eléctrica'){
            result = '#301fe7';
        }else
        if(faculty == 'Facultad de Química'){
            result = '#050414';
        }else
        if(faculty == 'Facultad de Mecánica'){
            result = '#af0a0b';
        }else
        if(faculty == 'Facultad de Industrial'){
            result = 'white';
        }else
        if(faculty == "Facultad de Arquitectura"){
            result = "green";
        }
    return result;
}

function reportColorFaculty(){
    getFacultyByBuilding();
    setTimeout(function(){
        DeleteLayerByName("POI");
        getPoiAjax();
    },2000);

}

//Dibuja los edificios relacionados a una falcultad y les asigna un color definido
function getFacultyByBuilding(){
    var faculty = null;
    var buildFac = null;
    var buildings = null;
    var colorArray = [];
    var buildingsArray = [];

   $.ajax({

        url: "?r=building/getbuilding",
        success: function (response) {

           buildings = response;

        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);

        }
    });

    $.ajax({

        url: "?r=site/getfaculty",
        success: function (response) {
            faculty = response;

        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);

        }
    });

    $.ajax({

        url: "?r=site/getbuildingfacult",
        success: function (response) {
            buildFac = response;

        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);

        }
    });


        setTimeout(function(){

            for (var i = 0;i < buildings.length;i++){
                var build = buildings[i];
                for (var j = 0;j < buildFac.length;j++){
                    if(build.OGR_FID == buildFac[j].id_Edificio){
                        var idFacult = buildFac[j].id_Facultad;
                        for (var k = 0;k < faculty.length;k++) {
                            if(idFacult == faculty[k].id_facultad) {
                                var facultName = faculty[k].nombre;
                                var color = getFacultyColor(facultName);
                                colorArray.push(color);
                                buildingsArray.push(build);
                            }
                        }
                    }
                }

            }
            CreatePolygonsJSONOtherColorArray(buildingsArray,"Buildings",colorArray);

        },2000);

}


//Muestra una lista de los edificios que contiene la base de datos
function mostrarListaEdificio(){
    var edificio = $('#nombreEdificio').val();
    var carrera = $('#nombreCarrera').val();
    var facultad = $('#nombreFacultad').val();
        var first = false;

        if(edificio == "Nombre"){
            edificio = "";
        }
        if(carrera == "Carrera"){
            carrera = "";
        }
        if(facultad == "Facultad"){
            facultad = "";
        }
    $.ajax({
        url: '?r=building/modallocedif',
        method: 'get',
        data: {edificio: edificio, carrera: carrera, facultad: facultad},
        success: function (result) {

            //alert('Bien!!!!!');
            //console.log(result[0]);
            for(var i = 0;i < result.length;i++){
            var name = result[i].name;
            var id = result[i].OGR_FID;
                if(first == false && name != null){
                    $('#esconderEdif').html(' <a href="#" class="list-group-item" onclick=drawSelectedBuilding('+id+')>'+name+'</a>');
                    first = true;
                }else
                    if(name != null)
                        $('#esconderEdif').append(' <a href="#" class="list-group-item" onclick=drawSelectedBuilding('+id+')>'+name+'</a>');
            }



        },
        error: function () {
            alert('Error: ');
        }
    });
    $('#esconderEdif').show();


}

// Mustra una lista de los profesores que brinda el servicio web
   function mostrarListaProfesor(){
       var name = $('#nombreProfesor').val();
       var lastname = $('#apellidosProfesor').val();
       var email = $('#correo').val();
       var facultyId = $('#facultad').val();
       var scientificCategory = $('#Categoriacientifica').val();
       var identification = $('#CarnetdeIdentidad').val();
       var teachingCategory = $('#Categoriadocente').val();
       var surname = "";

       $.ajax({
           url: '?r=site/writexmlprofessor',
           method: 'get',
           data: {email:email,facultyId:facultyId,identification:identification,lastname:lastname,name:name,scientificCategory:scientificCategory,surname:surname,teachingCategory:teachingCategory},
           success: function (result) {
               //console.log(result.sandy);
               var xmlDoc = jQuery.parseXML(result);
               var profesorCollection = xmlDoc.childNodes[0].childNodes[0].childNodes[0].childNodes;
               if(profesorCollection.length == 0)
                   alert("Disculpe no se encontraron profesores con esa caracteristca");
                else{

               var professor ;
               var direccion ;
               var correo;
               var idFacult;
               var identificacion ;
               var apellidos ;
               var nombre;
               var telefono;
               var catCientifica ;
               var surname1;
               var catDocente;
               var area1 ;
               var user1;
               $('#esconderProf').html("<table id='tableProfessors' class='table-responsive'></table>");
               for (var i =0;i < profesorCollection.length;i++){
                   professor = profesorCollection[i];
                   if(profesorCollection[i].childNodes.length < 12 ){
                        direccion = professor.childNodes[0].textContent;
                        correo = "--";
                        idFacult = professor.childNodes[1].textContent;
                        identificacion = professor.childNodes[2].textContent;
                        apellidos = professor.childNodes[3].textContent;
                        nombre = professor.childNodes[4].textContent;
                        telefono = professor.childNodes[5].textContent;
                        catCientifica = professor.childNodes[6].textContent;
                        surname1 = professor.childNodes[7].textContent;
                        catDocente = professor.childNodes[8].textContent;
                        area1 = professor.childNodes[9].textContent;
                        user1 = professor.childNodes[10].textContent;
                   }else{
                    professor = profesorCollection[i];
                    direccion = professor.childNodes[0].textContent;
                    correo = slideString(professor.childNodes[1].textContent);
                    idFacult = professor.childNodes[2].textContent;
                    identificacion = professor.childNodes[3].textContent;
                    apellidos = professor.childNodes[4].textContent;
                    nombre = professor.childNodes[5].textContent;
                    telefono = professor.childNodes[6].textContent;
                    catCientifica = professor.childNodes[7].textContent;
                    surname1 = professor.childNodes[8].textContent;
                    catDocente = professor.childNodes[9].textContent;
                    area1 = professor.childNodes[10].textContent;
                    user1 = professor.childNodes[11].textContent;
                   }
                   if(catCientifica == ""){
                       catCientifica ="--";
                   }
                    var trueIdFacult = idVersionFaculty(idFacult,area1);
                  // $('#tableProfessors').append('<tr ><td>'+direccion+'</td><td>'+correo+'</td><td>'+idFacult+'</td><td>'+identificacion+'</td><td>'+apellidos+'</td><td>'+nombre+'</td><td>'+telefono+'</td><td>'+catCientifica+'</td><td>'+surname1+'</td><td>'+catDocente+'</td><td>'+area1+'</td><td>'+user1+'</td></tr>');
                   $('#esconderProf').append(' <a href="#" class="list-group-item">' + nombre + ' '+ apellidos +  '<image class="" src="images/eye.png"  style="color:#285e8e;float: right;margin-left: 8px;text-align: left" data-toggle="modal" data-target="#modalProf" onclick="viewMore('+identificacion+')"></image><image src="images/point.png"  style="color:#285e8e;float: right" onclick="drawSelectedProfessor('+trueIdFacult+')"></image></a> ');
               }
            //var colection = xmlDoc.evaluate("/soap/soap/professorCollection/professors[1]/email",xmlDoc,null,XPathResult.ANY_TYPE,null).textContent;

             /* console.log(result[0]);
               for(var i = 0;i < result.length;i++){
                   var nombre = result[i].nombre;
                   var apellidos = result[i].apellidos;
                   var facultad = result[i].id_Facultad;
                   $('#esconderProf').append(' <a href="#" class="list-group-item" onclick="drawSelectedProfessor('+facultad+')">' + nombre + ' '+ apellidos + '</a>');
               }*/
               }
           },
           error: function () {
               alert('Disculpe, no hay coneccion con el servidor');
           }
       });
       $('#esconderProf').show();

   }

//Divide un String siempre que contenga una coma
function slideString(correo){
    var temp =0;
    var correo1 = "";
    for (var j = 0;j<correo.length;j++){
        if(correo.charAt(j) == ","){
            correo1 += correo.slice(temp,j)+"  ";
            temp = j;
        }
    }
    if(correo1 == ""){
        correo1 = correo;
    }

    return correo1;
}

//Mustra una lista de los puntos de interes que se encuentren en la base de datos
function mostrarListaPOI(){

       var nombre = $('#nombrePOI').val();
       var tipo = $('#TipoPoi').val();
    var first = false;
       $.ajax({
           url: '?r=interestplaces/modallocpoi',
           method: 'get',
           data: {nombre: nombre, tipo: tipo},
           success: function (result) {
              // alert('Bien!!!!!');
              // console.log(result[0]);
               for(var i = 0;i < result.length;i++){
                   var nombre2 = result[i].name;
                   if(nombre2 == null){
                       nombre2 = "No disponible";
                   }
                   //var tipo1 = result[i].fclass;

                   var id = result[i].OGR_FID;
                   if(first == false){
                       $('#esconderPOI').html(' <a href="#" class="list-group-item" onclick=drawSelectedPOI('+id+')>' + nombre2 + '</a>');
                       first = true;
                   }else
                       $('#esconderPOI').append(' <a href="#" class="list-group-item" onclick=drawSelectedPOI('+id+')>' + nombre2 + '</a>');
               }


           },
           error: function () {
               alert('Error: ');
           }
       });
       $('#esconderPOI').show();


   }

//Muestra una lista de las areas que se encuentren en la base de datos
   function mostrarListaAreas(){
       var nombre = $('#nombreArea').val();
       var tipo = $('#tipoArea').val();
       var first = false;
       $.ajax({
           url: '?r=areas/modallocarea',
           method: 'get',
           data: {nombre: nombre, tipo: tipo},
           success: function (result) {

               if(result == "No se encontraron elementos"){
                   alert("No existen coincidencias");
               }else{
              // alert('Bien!!!!!');
               //console.log(result[0]);
               for(var i = 0;i < result.length;i++){
                   var nombre = result[i].name;
                   var id = result[i].OGR_FID;
                 //  var shape =  result[i].SHAPE;
                   if(first == false){
                       $('#esconderArea').html(' <a href="#" class="list-group-item" onclick=drawSelectedArea('+id+')>'+ nombre +'</a>');
                       first = true;
                   }else
                       $('#esconderArea').append(' <a href="#" class="list-group-item" onclick=drawSelectedArea('+id+')>'+ nombre +'</a>');
                    }
               }
           },
           error: function () {
               alert('Error: ');
           }
       });
       $('#esconderArea').show();

   }
/*
   function getXmlProfessor(email,facultyId,identification,lastname,name,scientificCategory,surname,teachingCategory){
       var email = email;
       var facultyId = facultyId;
       var identification = identification;
       var lastname = lastname;
       var name= name ;
       var scientificCategory = scientificCategory;
       var surname = surname;
       var teachingCategory = teachingCategory;

       $.ajax({
           url: '?r=site/writexmlprofessor',
           method: 'GET',
           data: {email:email,facultyId:facultyId,identification:identification,lastname:lastname,name:name,scientificCategory:scientificCategory,surname:surname,teachingCategory:teachingCategory},

           success: function (result) {
               //Ya
               alert("ya funciona mira consola");
               console.log(result);

               //sendXml(result);
           },
           error: function () {
               alert('Error: No hay conexion con el servicio de Profesores');
           }
       });

   }
*/

function CretaePolygonsReport(jsonObjectArray,type){

    var initial = CreateLayer('FacultyReport');
    // Parámetros de entrada
    //Scale = 0.5;
    //OffsetHor = 0.5;
    //OffsetVert = 0.5;
    //Opacity = 0.8;

    for (var i = 0;i < jsonObjectArray.length;i++){
        var json = jsonObjectArray[i];
        var SHAPE = json.SHAPE;
        var id_Build = json.OGR_FID;
        var faculty = getFacultyByBuilding(id_Build);
        var valuesA = getValues(type,json);

        jsonFeature = CreateObjectFromJSONColorReport(initial, SHAPE,valuesA,faculty);
    }
}

//Muestra informacion adicional de los profesores listados
function viewMore(identificacionSelected){

    var name = "";
    var lastname = "";
    var email = "";
    var facultyId = "";
    var scientificCategory = "";
    var identification = identificacionSelected;
    var teachingCategory = "";
    var surname = "";

    $.ajax({
        url: '?r=site/writexmlprofessor',
        method: 'get',
        data: {email:email,facultyId:facultyId,identification:identification,lastname:lastname,name:name,scientificCategory:scientificCategory,surname:surname,teachingCategory:teachingCategory},
        success: function (result) {
            //console.log(result.sandy);
            var xmlDoc = jQuery.parseXML(result);
            var profesorCollection = xmlDoc.childNodes[0].childNodes[0].childNodes[0].childNodes;

                var professor ;
                var direccion ;
                var correo;
                var idFacult;
                var identificacion ;
                var apellidos ;
                var nombre;
                var telefono;
                var catCientifica ;
                var surname1;
                var catDocente;
                var area1 ;
                var user1;


                    professor = profesorCollection[0];
                    if(profesorCollection[0].childNodes.length < 12 ){
                        direccion = professor.childNodes[0].textContent;
                        correo = "--";
                        idFacult = professor.childNodes[1].textContent;
                        identificacion = professor.childNodes[2].textContent;
                        apellidos = professor.childNodes[3].textContent;
                        nombre = professor.childNodes[4].textContent;
                        telefono = professor.childNodes[5].textContent;
                        catCientifica = professor.childNodes[6].textContent;
                        surname1 = professor.childNodes[7].textContent;
                        catDocente = professor.childNodes[8].textContent;
                        area1 = professor.childNodes[9].textContent;
                        user1 = professor.childNodes[10].textContent;
                    }else{
                        professor = profesorCollection[0];
                        direccion = professor.childNodes[0].textContent;
                        correo = professor.childNodes[1].textContent;
                        idFacult = professor.childNodes[2].textContent;
                        identificacion = professor.childNodes[3].textContent;
                        apellidos = professor.childNodes[4].textContent;
                        nombre = professor.childNodes[5].textContent;
                        telefono = professor.childNodes[6].textContent;
                        catCientifica = professor.childNodes[7].textContent;
                        surname1 = professor.childNodes[8].textContent;
                        catDocente = professor.childNodes[9].textContent;
                        area1 = professor.childNodes[10].textContent;
                        user1 = professor.childNodes[11].textContent;
                    }
                    if(catCientifica == ""){
                        catCientifica ="--";
                    }
                    var idTrueFacult = idVersionFaculty(idFacult,area1);

                    getFacultyModal(idTrueFacult);

                    //$('#modal11').hide();
                    $("#listProperties").html('<h1 class="white" style="color: black">'+nombre+' '+apellidos+'</h1>');
                    $('#modalProf').show();
                    $("#listProperties").append('<br><br><p href="#" style="text-align: left;">Dirección : ' + direccion +  '</p> ');
                    $("#listProperties").append('<br><br><p href="#" style="text-align: left;">Correo : ' + correo +  '</p> ');

                    $("#listProperties").append('<br><br><p href="#" style="text-align: left;">Area de trabajo : ' + area1 +  '</p> ');
                    $("#listProperties").append('<br><br><p href="#" style="text-align: left;">Identificación : ' + identificacion +  '</p> ');
                    $("#listProperties").append('<br><br><p href="#" style="text-align: left;">Telefono : ' + telefono +  '</p> ');
                    $("#listProperties").append('<br><br><p href="#" style="text-align: left;">Categoría Cientifica : ' + catCientifica +  '</p> ');
                    $("#listProperties").append('<br><br><p href="#" style="text-align: left;">Categoría Docente : ' + catDocente +  '</p> ');


            //<td>'+correo+'</td><td>'+idFacult+'</td><td>'+identificacion+'</td><td>'+apellidos+'</td><td>'+nombre+'</td><td>'+telefono+'</td><td>'+catCientifica+'</td><td>'+surname1+'</td><td>'+catDocente+'</td><td>'+area1+'</td><td>'+user1+'</td>
                //var colection = xmlDoc.evaluate("/soap/soap/professorCollection/professors[1]/email",xmlDoc,null,XPathResult.ANY_TYPE,null).textContent;

                /* console.log(result[0]);
                 for(var i = 0;i < result.length;i++){
                 var nombre = result[i].nombre;
                 var apellidos = result[i].apellidos;
                 var facultad = result[i].id_Facultad;
                 $('#esconderProf').append(' <a href="#" class="list-group-item" onclick="drawSelectedProfessor('+facultad+')">' + nombre + ' '+ apellidos + '</a>');
                 }*/

        },
        error: function () {
            alert('Disculpe, no hay coneccion con el servidor');
        }
    });

}

function getFacultyModal(id){
    var result = null;
    var find = false;
    $.ajax({
        url: "?r=site/getfaculty",
        success: function (response) {
                var fac = response;
                for (var i = 0; i < fac.length && find == false;i++){
                    if(fac[i].id_facultad == id){
                        result = fac[i].nombre;
                        $("#listProperties").append('<br><br><p href="#" style="text-align: left;">Facultad : ' + result +  '</p> ');
                        find = true;
                    }else
                        result = id;
                }


           // return result;
        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);
        }
    });


}

function renderScreen(){
    var height = $(window).height();
    $("#body").height(height);
    //if(height > 600)
        //$(".ol-zoomslider").style('top:'+ height/2);
}


function getColor(tipe){
    var color;
    var hexColor;
    var opacity = 0.5;
    if(tipe == "Buildings"){
        hexColor = "#7A7A7A";
        color = ol.color.asArray(hexColor);
        color = color.slice();
        color[3] = opacity;
    }
    else
        if(tipe == "Street"){
            color = "#B8A127";

        }
    else if(tipe == "Areas"){
            color = "#aacc73";
            //color = ol.color.asArray(hexColor);
            //color = color.slice();
            //color[3] = opacity;
        }
    return color;
}


function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function showReports(){
    if(isVisible == 0){
        $("#ulReport").show();
        isVisible =1;
    }else {
        $("#ulReport").hide();
        isVisible =0;
    }

}

function showWays(){
    if(isVisibleWay == 0){
        $("#ulWay").show();
        isVisibleWay =1;
        $("#menu-initial").css("overflow-y","scroll");

    }else {
        $("#ulWay").hide();
        isVisibleWay =0;
        $("#menu-initial").css("overflow-y","hidden");
    }
}

//Devuelve el edificio o los edificios q cumplan con las condiciones seleccionadas
function getBuildingAjaxSelect(){

    $.ajax({
        url: "index.php?r=building/getbuilding",

        success: function (response) {
            var name;
            var fac;
            $("#nombreEdificio").find('option').remove();
            $("#nombreFacultad").find('option').remove();
            $("#nombreCarrera").find('option').remove();
            for (var i =0;i < response.length;i++){
                if(i==0){
                    name = "Nombre";
                    $("#nombreEdificio").append('<option>' + name + '</option>');
                }
                else{
                    name = response[i-1].name;
                    if(name == null){
                        name = "No disponible";
                    }
                    if(name != "No disponible")
                        $("#nombreEdificio").append('<option>' + name + '</option>');
                }
            }

            var facultad = ["Facultad","Facultad de Informática","Facultad de Civil","Facultad de Industrial",
                    "Facultad de Mecánica", "Facultad de Telecomunicaciones y Electrónica", "Facultad de Automática y Biomédica",
                    "Facultad de Arquitectura","Facultad de Eléctrica","Facultad de Química"];
            for (var j =0;j < 10;j++)
            {
                fac = facultad[j];
               $("#nombreFacultad").append('<option>' + fac + '</option>');
            }

            var carrera = ["Carrera","Ingeniería Informática","Ingeniería Civil","Ingeniería Industrial",
                    "Ingeniería Mecánica", "Ingeniería en Telecomunicaciones y Electrónica", "Ingeniería Automática" ,"Ingeniería Biomédica",
                    " Arquitectura","Ingeniería Eléctrica","Ingeniería Química","Ingeniería Hidráulica"];
            for (var j =0;j < 12;j++)
            {
                fac = carrera[j];

                $("#nombreCarrera").append('<option>' + fac + '</option>');
            }
        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);
        }
    });

}

//Devuelve el POI o los POI q cumplan con las condiciones seleccionadas
function getPoiAjaxSelect(){

    $.ajax({
        url: "index.php?r=interestplaces/getpoi",

        success: function (response) {
            var name;
            $("#nombrePOI").find('option').remove();
            $("#TipoPoi").find('option').remove();

            for (var i =0;i < response.length;i++){
                if(i==0){
                    name = "Nombre";
                    $("#nombrePOI").append('<option>' + name + '</option>');

                }
                else{

                    name = response[i-1].name;
                    if(name != null)
                        $("#nombrePOI").append('<option>' + name + '</option>');

                }
            }
            var type ;
            for (var j =0;j < 10;j++)
            {  type = ["Tipo","Cafetería","Teatro","Restaurante","ATM","Biblioteca","Librería","Enfermería","Monumento","Parada"];
                $("#TipoPoi").append('<option>' + type[j] + '</option>');
            }
        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);
        }
    });

}

//Devuelve el areas o los areas q cumplan con las condiciones seleccionadas
function getAreasAjaxSelect(){

    $.ajax({
        url: "index.php?r=areas/getareas",

        success: function (response) {
            var name;
            $("#nombreArea").find('option').remove();
            $("#tipoArea").find('option').remove();
            for (var i =0;i < response.length;i++){
                if(i==0){
                    name="Nombre";
                    $("#nombreArea").append('<option>' + name + '</option>');

                }else{

                    name = response[i].name;
                    if(name != null)
                        $("#nombreArea").append('<option>' + name + '</option>');
                }

            }
            var type ;
            for (var j =0;j < 6;j++)
            {  type = ["Tipo","Parqueo","Parque","Industrial","Jardín", "Deportivo"];
                $("#tipoArea").append('<option>' + type[j] + '</option>');
            }
        },
        error: function (xhr, status, error) {
            alert("Error:  "+error);
        }
    });

}

function idVersionFaculty(id,area){
    var idFacult;

    if(id == "Z0000"){
        idFacult = 1;
    }else
        if(id == "U0000"){
            idFacult = 2;
        }else if(id == "X0000"){
            idFacult = 3;
        }else if(id == "W0000"){
            idFacult = 4;

        }else if(id == "Unknown"){
            var fac = findFacultyByArea(area);
            if(fac == "Facultad de Telecomunicaciones y Electrónica"){
                idFacult = 5;
            }else{
                if(fac == "Facultad de Automática y Biomédica"){
                idFacult = 6;
                }else
                    idFacult = 13;
            }



        }else if(id == "Y0000"){
            idFacult = 7;
        }else if(id == "T0000"){
            idFacult = 8;
        }else if (id == "V0000"){
            idFacult = 9;
        }

    return idFacult;
}

//Busca las facultades que pertezcan a un area determinada
function findFacultyByArea(area){
    var i =0;
    var stop = false;
    var result;
    while(i < area.length && stop == false){
        var final = i+4;
        var word = area.slice(i,final);
        if(word.toLowerCase() == "tele"){
            result = "Facultad de Telecomunicaciones y Electrónica";
            stop = true;
        }else
            if(word.toLowerCase() == "auto"){
                result = "Facultad de Automática y Biomédica";
                stop = true;
            }

        i++;
    }
    return result;
}

function closeBoutom(id){

    $(id).modal("hide");
}

function getTableName(response){
    var feature = response.features;
    var actual = feature[0].properties;
    var id = feature[0].id;
    var tableName = '';
  
    for (var i=0;i<id.length;i++){
      if(id.charAt(i) == '.'){
        tableName = id.slice(0,i);
  
      }
    }

    return tableName;
}

function getInfoFromJson(response){
  var info = '';
  var feature = response.features;
  var actual = feature[0].properties;
  var tableName = getTableName(response);

  if(tableName == 'buildings'){
      info = '<h5>Nombre</h5><p>'+actual.name+'</p>';
      info += '<h5>Tipo</h5><p>'+actual.fclass+'</p>';
      info += '<h5>Facultad</h5><p>'+actual.name_faculty+'</p>';

  }else if(tableName == 'areas'){
    info = '<h5>Nombre</h5><p>'+actual.name+'</p>';
    info += '<h5>Tipo</h5><p>'+actual.fclass+'</p>';

  }else if(tableName == 'interest_places'){
    info = '<h5>Nombre</h5><p>'+actual.name+'</p>';
    info += '<h5>Tipo</h5><p>'+actual.fclass+'</p>';
  }
  return info;
}

// function mandarXML(){
//   var modo ='Proximidad';
//   var categoria='';
//   var tipo='';
//   var subtipo='';
//   var nombre='CITI';
//   var telefono='';
//   var cantRespuestas=10;
//   var latitud='82.65874';
//   var longitud='42.3658';
//   var distancia='';
//   var other='';

//   var poiProperty='<POIProperties>';

//   if(categoria != '')
//     poiProperty += '<POIProperty name="SIC_category" value="'+categoria+'"/>';
//   if(tipo != '')
//     poiProperty += '<POIProperty name="SIC_type" value="'+tipo+'"/>';
//   if(subtipo != '')
//     poiProperty += '<POIProperty name="SIC_subType" value="'+subtipo+'"/>';
//   if(nombre != '')
//     poiProperty += '<POIProperty name="POIName" value="'+nombre+'"/>';
//   if(telefono != '')
//     poiProperty += '<POIProperty name="PhoneNumber" value="'+telefono+'"/>';
//   if(other != '')
//     poiProperty += '<POIProperty name="other" value="'+other+'"/>';
//   poiProperty += '</POIProperties>';

//   var poiLocation ='';

//   if(modo=='Proximidad'){
//     poiLocation = '<POILocation> ' +
//       '<Nearest>' +
//       '<Position>' +
//       '<Point xmlns="http://www.opengis.net/gml">' +
//       '<pos>'+longitud+' '+latitud+'</pos> </Point> </Position> </Nearest> </POILocation>';
//   }
//   else
//   if(modo=='Distancia'){
//     poiLocation = '<POILocation>' +
//       '<WithinDistance> ' +
//       '<Position> ' +
//       '<Point xmlns="http://www.opengis.net/gml"> ' +
//       '<pos>'+longitud+' '+latitud+'</pos> ' +
//       '</Point> ' +
//       '</Position> ' +
//       '<MaximumDistance value="'+distancia+'"/> </WithinDistance> ' +
//       '</POILocation>';
//   }

//   var body = poiLocation+poiProperty;




//   // var xml = builder.create('XLS').att('version','1.2').att('n1:lang','en-US').att('xmlns:n1','http://www.opengis.net/xls')
//   //     .att('xmlns','http://www.opengis.net/xls').ele('RequestHeader').att('clientName','').att('clientPassword','')
//   //     .up().ele('Request').att('requestID','123').att('maximumResponses','10').att('version','1.2').att('methodName','DirectoryService')
//   //     .ele('DirectoryRequest').ele('PIOLocation').ele('WithinDistance').ele('POI').ele('POIAttributeList').ele('POIInfoList')
//   //     .ele();

//   var xmlString = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
//     '<XLS xmlns="http://www.opengis.net/xls" version="1.2"> <RequestHeader/> ' +
//     '<Request maximumResponses="'+cantRespuestas+'" methodName="DirectoryService" requestID="" version="1.2"> ' +
//     '<DirectoryRequest distanceUnit="M">'+body+' '+
//     '</DirectoryRequest> ' +
//     '</Request> ' +
//     '</XLS>';



//   $.ajax({
//     url: "http://192.168.137.2:1826/OpenLSServer.aspx",
//     method: 'post',
//     data: xmlString,
//     success: function (response) {
//       console.log(response);
//       },
//     error: function (xhr, status, error) {
//       alert("Error:  "+error);
//     }
//   });
// }
