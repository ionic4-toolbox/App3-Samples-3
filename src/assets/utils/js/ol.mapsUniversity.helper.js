//var http = require('http');
//import convert from "xml-js";
var isVisible = 0;
var isVisibleWay = 0;

let initPoint =0;
let finalPoint=0;
let selectedMode = 'Basic';
let isCoordinateActive=false;
let coordinateGPS = 0;
let layer;

function functionInitLayer(){
    layer = CreateLayer('Point');
}

function setCoordinateGPS(gps){
    this.coordinateGPS = gps;
}

function setModalSelectedRoute(){
    if(isCoordinateActive == false){
        selectedMode = 'Route';
        if(coordinateGPS !=0){
            initPoint = coordinateGPS;
        }
        setCoordinatesMode()
        isCoordinateActive = true;
        document.getElementById('coordBoutomId').style.background = 'blue';
    }else{
        isCoordinateActive = false;
        document.getElementById('coordBoutomId').style.background = '#488aff';
        setInfoMode();
        
    }
}
function setModalSelectedDirectDistance(){
    
    selectedMode = 'Distance';
    setCoordinatesMode();
}

function setModalSelectedDirectProximity(){
    selectedMode = 'Proximity';
    setCoordinatesMode()
}

function insetCoords(coord){
    
    
    if(initPoint == 0){
        initPoint = coord;
        console.log(initPoint);
        if(selectedMode == 'Route'){
            // document.getElementById('ruteInitialPoint').value = initPoint;
            drawPoint(layer,initPoint[0],initPoint[1],null);
        }else
            if(selectedMode == 'Distance'){
                document.getElementById('coordinateLabel').innerHTML ='Coordenadas : '+initPoint;
                drawPoint(layer,initPoint[0],initPoint[1],null);
            }else if(selectedMode == 'Proximity'){
                document.getElementById('coordinateLabel').innerHTML ='Coordenadas : '+initPoint;
                drawPoint(layer,initPoint[0],initPoint[1],null);
            }
    }else{
        if(finalPoint == 0 && selectedMode == 'Route'){
            finalPoint = coord;           
            routeRequest();
            drawPoint(layer,finalPoint[0],finalPoint[1],null);                      
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
    layer = CreateLayer('Point');
    document.getElementById('labelDistance').style.display='none';
   
}

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
        
        directoryRequest(selectedMode,initPoint,null);
    }else{
        alert('Debe llenar Cercano A o establecer un punto')
    }
    setInfoMode();
}


function directoryRequest(modeAux,coord,param){
   
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
     requestNumber = 30;
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

  if(param != null){
      name = param;
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
    if(close != "" && mode == 'Distance'){
        poiLocation = '<POILocation>'+
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
    '</POILocation>';
    }else
    if(close != "" && mode == 'Proximity'){
        poiLocation = '<POILocation>'+
        '<Nearest>'+
        '<POI>'+
        '<POIAttributeList>'+
        '<POIInfoList>'+
        '<POIInfo name="Keyword" value="'+close+'"/>'+
        '</POIInfoList>'+
        '</POIAttributeList>'+
        '</POI>'+
        '</Nearest>'+
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
  
    let req = new XMLHttpRequest();
    req.open('POST','http://192.168.137.1/webSite/OpenLSServer.aspx',true);
    req.onload = function(){ 
        if(param == null){      
            processXmlDirectory(req.responseXML,false);
        }else{
            processXmlDirectory (req.responseXML,true);
        }
    }
    
    req.send(xml);
    

}

function drawPoint(layer,long,lat,attributes){
    
    var feature="";
    if(attributes!=null)
         feature = CreateObject(layer,long,lat,attributes[0]);
        else
         feature = CreateObject(layer,long,lat,null);

    if(initPoint == 0)
        SetIconStyle(feature, 'assets/imgs/pointer4.png', 1, 0.5, 1, 1); 
    else
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
    document.getElementById('labelDistance').innerHTML = 'Distancia : '+distance;
    document.getElementById('labelDistance').style.display='block';
    let lineString = xml.getElementsByTagName('LineString')[0].children[0].innerHTML;
    console.log(lineString);
    drawLineString(lineString); 
      
}

function drawRoute(){
    let init = document.getElementById('ruteInitialPoint').value;
    let fin = document.getElementById('ruteFinalPoint').value;

    if(init != '' && fin !=''){
        directoryRequest('Info',null,init);
        directoryRequest('Info',null,fin);
        setTimeout(function(){
            routeRequest();
        },2000);
    }else
        if(fin != '' && initPoint !=0){
            directoryRequest('Info',null,fin);
            setTimeout(function(){
                routeRequest();
            },2000);
        }else
            if(init != '' && initPoint !=0){
                directoryRequest('Info',null,init);
                setTimeout(function(){
                    routeRequest();
                },2000);
            }
}



function processXmlDirectory(xml,isForRoute){
   
    console.log(xml);
    if(xml.getElementsByTagName('ErrorList').length ==1){
        console.log(xml.getElementsByTagName('ErrorList'));
        alert('No se encontraron elementos');
    }else
    {
        let directoryResponse = xml.getElementsByTagName('DirectoryResponse')[0].children;
        

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
            
            if(isForRoute == false)
                drawPoint(layer,getLongitud(pos),getLatitud(pos),arrAttrinbutes);
            else{
                if(initPoint ==0){
                    let coords = new Array();
                    coords.push(getLongitud(pos));
                    coords.push(getLatitud(pos));
                    initPoint = coords;
                    
                }else{
                    let coords = new Array();
                    coords.push(getLongitud(pos));
                    coords.push(getLatitud(pos));
                    finalPoint = coords;
                    console.log(finalPoint +'---'+initPoint);
                }
            }
                

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
//    function mostrarListaProfesor(){
//        var name = $('#nombreProfesor').val();
//        var lastname = $('#apellidosProfesor').val();
//        var email = $('#correo').val();
//        var facultyId = $('#facultad').val();
//        var scientificCategory = $('#Categoriacientifica').val();
//        var identification = $('#CarnetdeIdentidad').val();
//        var teachingCategory = $('#Categoriadocente').val();
//        var surname = "";

//        $.ajax({
//            url: '?r=site/writexmlprofessor',
//            method: 'get',
//            data: {email:email,facultyId:facultyId,identification:identification,lastname:lastname,name:name,scientificCategory:scientificCategory,surname:surname,teachingCategory:teachingCategory},
//            success: function (result) {
//                var xmlDoc = jQuery.parseXML(result);
//                var profesorCollection = xmlDoc.childNodes[0].childNodes[0].childNodes[0].childNodes;
//                if(profesorCollection.length == 0)
//                    alert("Disculpe no se encontraron profesores con esa caracteristca");
//                 else{

//                var professor ;
//                var direccion ;
//                var correo;
//                var idFacult;
//                var identificacion ;
//                var apellidos ;
//                var nombre;
//                var telefono;
//                var catCientifica ;
//                var surname1;
//                var catDocente;
//                var area1 ;
//                var user1;
//                $('#esconderProf').html("<table id='tableProfessors' class='table-responsive'></table>");
//                for (var i =0;i < profesorCollection.length;i++){
//                    professor = profesorCollection[i];
//                    if(profesorCollection[i].childNodes.length < 12 ){
//                         direccion = professor.childNodes[0].textContent;
//                         correo = "--";
//                         idFacult = professor.childNodes[1].textContent;
//                         identificacion = professor.childNodes[2].textContent;
//                         apellidos = professor.childNodes[3].textContent;
//                         nombre = professor.childNodes[4].textContent;
//                         telefono = professor.childNodes[5].textContent;
//                         catCientifica = professor.childNodes[6].textContent;
//                         surname1 = professor.childNodes[7].textContent;
//                         catDocente = professor.childNodes[8].textContent;
//                         area1 = professor.childNodes[9].textContent;
//                         user1 = professor.childNodes[10].textContent;
//                    }else{
//                     professor = profesorCollection[i];
//                     direccion = professor.childNodes[0].textContent;
//                     correo = slideString(professor.childNodes[1].textContent);
//                     idFacult = professor.childNodes[2].textContent;
//                     identificacion = professor.childNodes[3].textContent;
//                     apellidos = professor.childNodes[4].textContent;
//                     nombre = professor.childNodes[5].textContent;
//                     telefono = professor.childNodes[6].textContent;
//                     catCientifica = professor.childNodes[7].textContent;
//                     surname1 = professor.childNodes[8].textContent;
//                     catDocente = professor.childNodes[9].textContent;
//                     area1 = professor.childNodes[10].textContent;
//                     user1 = professor.childNodes[11].textContent;
//                    }
//                    if(catCientifica == ""){
//                        catCientifica ="--";
//                    }
//                     var trueIdFacult = idVersionFaculty(idFacult,area1);
//                     $('#esconderProf').append(' <a href="#" class="list-group-item">' + nombre + ' '+ apellidos +  '<image class="" src="images/eye.png"  style="color:#285e8e;float: right;margin-left: 8px;text-align: left" data-toggle="modal" data-target="#modalProf" onclick="viewMore('+identificacion+')"></image><image src="images/point.png"  style="color:#285e8e;float: right" onclick="drawSelectedProfessor('+trueIdFacult+')"></image></a> ');
//                }
//             }
//            },
//            error: function () {
//                alert('Disculpe, no hay coneccion con el servidor');
//            }
//        });
//        $('#esconderProf').show();

//    }

function getXmlProfessor()
{
    let email = document.getElementById("email").value;
    let facultyId = document.getElementById("facultyId").value;
    let identification = document.getElementById("identification").value;
    let lastname = document.getElementById("lastName").value;
    let name = document.getElementById("name").value;
    let scientificCategory = document.getElementById("scientificCategory").value;
    let surname = '';
    let teachingCategory = '';

    // let xml = '<?xml version="1.0" encoding="UTF-8"?>'+
    // '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'+
    // 'xmlns:xsd="http://www.w3.org/2001/XMLSchema"'+
    // 'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
    // '<soap:Body>'+
    // '<searchProfessor xmlns="http://www.mes.edu.cu/sigenu/ws/remote/professor">'+
    // '<criteria xmlns="">'+
    // '<email>'+email+'</email>'+
    // '<facultyId>'+facultyId+'</facultyId>'+
    // '<identification>'+identification+'</identification>'+
    // '<lastname>'+lastname+'</lastname>'+
    // '<name>'+name+'</name>'+
    // '<scientificCategory>'+scientificCategory+'</scientificCategory>'+
    // '<surname>'+surname+'</surname>'+
    // '<teachingCategory>'+teachingCategory+'</teachingCategory>'+
    // '</criteria>'+
    // '</searchProfessor>'+
    // '</soap:Body>'+
    // '</soap:Envelope>';

    let xml = '<?xml version="1.0" encoding="utf-8"?>'+
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<soap:Body>'+
    '<searchProfessor xmlns="http://www.mes.edu.cu/sigenu/ws/remote/professor">'+
    '<criteria xmlns="">'+
    '<email></email>'+
    '<facultyId></facultyId>'+
    '<identification></identification>'+
    '<lastname></lastname>'+
    '<name>Eduardo</name>'+
    '<scientificCategory></scientificCategory>'+
    '<surname></surname>'+
    '<teachingCategory></teachingCategory>'+
    '</criteria>'+
    '</searchProfessor>'+
    '</soap:Body>'+
    '</soap:Envelope>'
    console.log(xml);
    
    // let req = new XMLHttpRequest();
    
    // req.open('POST','http://10.8.1.8:8083/ProfessorService.asmx',true);
    // req.setRequestHeader('Content-type','text/xml');
    // req.onload = function(){     
    //     processXmlProfessor(req.responseXML);
    // }
    // req.send(xml);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://10.8.1.8:8083/ProfessorService.asmx",
        "method": "POST",
        "headers": {
          "content-type": "text/xml",
          "cache-control": "no-cache",
          "postman-token": "1388adc5-8e06-9eee-4202-e856f17ee87b"
        },
        "data": "<?xml version=\"1.0\" encoding=\"utf-8\"?><soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap:Body><searchProfessor xmlns=\"http://www.mes.edu.cu/sigenu/ws/remote/professor\"><criteria xmlns=\"\"><email></email><facultyId></facultyId><identification></identification><lastname></lastname><name>Eduardo</name><scientificCategory></scientificCategory><surname></surname><teachingCategory></teachingCategory></criteria></searchProfessor></soap:Body></soap:Envelope>"
      }
      
      $.ajax(settings).done(function (response) {
        
        console.log(response);
      });
}

function processXmlProfessor(xml)
{
    var xmlDoc = jQuery.parseXML(xml);
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
                   $('#professorList').append('<ion-card>'+

                   '<img src="../../assets/imgs/avatar.png">'+
                   '<ion-fab center right top>'+
                     '<button ion-fab onclick="locateProfessor('+area1+')">'+
                       '<ion-icon name="pin"></ion-icon>'+
                     '</button>'+
                   '</ion-fab>'+
                 
                   '<ion-item>'+
                     '<label item-left>Nombre:</label>'+
                     '<p item-left>'+nombre+'</p>'+
                   '</ion-item>'+
                 
                   '<ion-item>'+
                     '<label item-left>Facultad:</label>'+
                     '<p item-left>'+idFacult+'</p>'+
                   '</ion-item>'+
                 
                   '<ion-item>'+
                   '<label item-left>Categoría Científica:</label>'+
                   '<p item-left>'+catCientifica+'</p>'+
                 '</ion-item>'+
           
                 '<ion-item>'+
                   '<label item-left>Categoría Docente:</label>'+
                   '<p item-left>'+catDocente+'</p>'+
                 '</ion-item>'+
                '</ion-card>')
                }
            }
        }

function locateProfessor(area){
    directoryRequest(null,null,area);
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

function renderScreen(){
    var height = $(window).height();
    $("#body").height(height);
    
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

  document.getElementById('divInfoPopupId').style.display = 'block';
    var content = document.getElementById('infoPopup');
	content.innerHTML = info;
                        
 
}

function getInfoFromFeature(feature){
    var props = feature.getProperties();
    var info = '';
    for (i = 0; i < Object.keys(props).length ; i++)
    if (typeof (props[Object.keys(props)[i]]) != 'object' )
        info += "<p>" + Object.keys(props)[i]+ ': '+ props[Object.keys(props)[i]] + "</p>";

        document.getElementById('divInfoPopupId').style.display = 'block';
        var content = document.getElementById('infoPopup');
        content.innerHTML = info;
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
