//Save Incomming message
//var rsp = router.routeMessage('2- Save Incoming Messages', connectorMessage.getRawData());


var msg_type = msg['MSH']['MSH.9']['MSH.9.1'].toString();
channelMap.put('msg_type',msg_type);
channelMap.put('Case', msg['PID']['PID.3'][0]['PID.3.1'].toString()+"_"+msg['ORC'][0]['ORC.2']['ORC.2.1'].toString());
channelMap.put('PID', msg['PID']['PID.2']['PID.2.1'].toString());
channelMap.put('PID2', msg['PID']['PID.3']['PID.3.1'].toString());
channelMap.put('PID3', msg['PID']['PID.4']['PID.4.1'].toString());
// Se añade mapeo de codigo de plan para utilizarlo como filtro
channelMap.put('CodigoPlan', msg['PV1']['PV1.7']['PV1.7.1'].toString());
channelMap.put('Empresa',msg['PV1']['PV1.7']['PV1.7.2'].toString());
//var CodigoPlan = msg['PV1']['PV1.7']['PV1.7.1'].toString();

if (msg_type =='ORU'){
	//map time CDS request 
	channelMap.put('CDS1 Request',DateUtil.getCurrentDate("yyyyMMddHHmmssSSS"));
	//create Json Object
	var jsonObjFromHL7 = {};
	jsonObjFromHL7.caseId = msg['PID']['PID.3'][0]['PID.3.1'].toString()+"_"+msg['ORC'][0]['ORC.2']['ORC.2.1'].toString();

	jsonObjFromHL7.site = msg['MSH']['MSH.4']['MSH.4.1'].toString();
	  var aux_message = {};
	  aux_message.caseId = jsonObjFromHL7.caseId;
	  aux_message.uuidCDS = UUIDGenerator.getUUID();
	  aux_message.site = msg['PV1']['PV1.8']['PV1.8.1'].toString();
	  aux_message.PID = msg['PID']['PID.2']['PID.2.1'].toString();
	  aux_message.PID2 = msg['PID']['PID.3']['PID.3.1'].toString();
	  aux_message.PID3 = msg['PID']['PID.4']['PID.4.1'].toString();
	  aux_message.episodeDate = msg['ORC']['ORC.7']['ORC.7.1'].toString();
	  aux_message.SampleID = msg['ORC'][0]['ORC.3']['ORC.3.1'].toString();
	  aux_message.FechaRegistroOrden =  msg['ORC'][0]['ORC.7']['ORC.7.1'].toString();
	  aux_message.MedicoPeticionarioID = msg['PV1']['PV1.9']['PV1.9.1'].toString();
	  aux_message.SedeSynlabPresentacion = msg['PV1']['PV1.10']['PV1.10.1'].toString();
	  aux_message.CodigoPlanCliente = msg['PV1']['PV1.7']['PV1.7.1'].toString();

	
	
	var episodeArray = new Array();
	//create episode
	var episodeObject = {};
	   //episodeDate
	   episodeObject.episodeDate = DateUtil.getDate("yyyyMMddHHmmss", msg['ORC']['ORC.7']['ORC.7.1'].toString() ).getTime();
	   //episodeID
	   episodeObject.episodeId = msg['ORC']['ORC.2']['ORC.2.1'].toString();
	   //Primary Attributes Array
	   var attributeArr =  new Array();
	   //Primary Attributes - Visit Id
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="SampleID" 
	   attributeObjectgeneral.value = msg['ORC'][0]['ORC.3']['ORC.3.1'].toString();
	   attributeArr.push(attributeObjectgeneral);
	    //Primary Attributes - Previous Interp
	    var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="PreviousInterp" 
	   var select = "select report, actions, caseid from response where caseid = '"+jsonObjFromHL7.caseId+"' order by id desc "
	   channelMap.put('select',select)
		var dbConn;
		var result;
		channelMap.put('1',DateUtil.getCurrentDate("yyyyMMddHHmmssSSS"))	
					
		try {
		  dbConn = DatabaseConnectionFactory.createDatabaseConnection("com.mysql.jdbc.Driver", 'jdbc:mysql://localhost:3306/statistics', 'root', 'P@ssw0rdSynlab');
		  channelMap.put('2',DateUtil.getCurrentDate("yyyyMMddHHmmssSSS"))	
		  result = dbConn.executeCachedQuery(select);
		  channelMap.put('3',DateUtil.getCurrentDate("yyyyMMddHHmmssSSS"))	
		  if (result.next()){
		  	attributeObjectgeneral.value = result.getString(1)+" "+result.getString(2)
		  }else{
		  	attributeObjectgeneral.value = ""
		  }
		} finally {
		  if (dbConn) {
			dbConn.close();
		  }
		}
	   	channelMap.put('4',DateUtil.getCurrentDate("yyyyMMddHHmmssSSS"))	
	   
	   attributeArr.push(attributeObjectgeneral); 
	    
	    //Primary Attributes - Sample Collection Datetime 
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="FechaMensajeHL7" 
	   attributeObjectgeneral.value = DateUtil.convertDate("yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss", msg['MSH']['MSH.7']['MSH.7.1'].toString()+"00");
	   attributeArr.push(attributeObjectgeneral); 
	   
	   //Primary Attributes - OrderDateTime 
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="FechaRegistroOrden" 
	   if (msg['ORC'][0]['ORC.7']['ORC.7.1'].toString()!=""){
	     attributeObjectgeneral.value = DateUtil.convertDate("yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss", msg['ORC'][0]['ORC.7']['ORC.7.1'].toString());
	   }else{
	   	
	   }
	   attributeArr.push(attributeObjectgeneral);  
	   //Primary Attributes - PID
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="PID" 
	   attributeObjectgeneral.value = msg['PID']['PID.2']['PID.2.2'].toString();
	   attributeArr.push(attributeObjectgeneral);
	    //Primary Attributes - PID2
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="PID2" 
	   attributeObjectgeneral.value =  msg['PID']['PID.3']['PID.3.1'].toString();
	   attributeArr.push(attributeObjectgeneral);
	   //Primary Attributes - PID3
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="PID3" 
	   attributeObjectgeneral.value = msg['PID']['PID.4']['PID.4.1'].toString();
	   attributeArr.push(attributeObjectgeneral);
	    //Primary Attributes - Patient Name
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="Nombre Paciente" 
	   attributeObjectgeneral.value = msg['PID']['PID.6']['PID.6.1'].toString().replace("\"","'")+', '+msg['PID']['PID.6']['PID.6.2'].toString().replace("\"","'");
	   attributeArr.push(attributeObjectgeneral);
	   //Primary Attributes - Patient CDS Name
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="Nombre Paciente CDS" 
	   attributeObjectgeneral.value = msg['PID']['PID.5']['PID.5.2'].toString().replace("\"","'");
	   attributeArr.push(attributeObjectgeneral);
	  /* //Primary Attributes - Patient Location
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="Localización Paciente" 
	   if (msg['PV1']['PV1.3']['PV1.3.1'].toString()!= null && msg['PV1']['PV1.3']['PV1.3.1'].toString()!= ""){
	   attributeObjectgeneral.value = msg['PV1']['PV1.3']['PV1.3.1'].toString();
	   }else{
	   	
	   }
	   attributeArr.push(attributeObjectgeneral);  
	   */ 
	   //Primary Attributes - Patient Name
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="Tipo Episodio" 
	   attributeObjectgeneral.value = msg['PID']['PID.1']['PID.2.1'].toString().replace("\"","'");
	   attributeArr.push(attributeObjectgeneral);
	   //Primary Attributes - Visit Admit Datetime
	/*   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="Visit Admit Datetime" 
	   if (msg['PV1']['PV1.44']['PV1.44.1'].toString() != null && msg['PV1']['PV1.44']['PV1.44.1'].toString()!= ""){
	     attributeObjectgeneral.value = DateUtil.convertDate("yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss", msg['PV1']['PV1.44']['PV1.44.1'].toString());
	   }else{
	   	
	   }
	   attributeArr.push(attributeObjectgeneral);  
	  */ 
	   //Primary Attributes - ReqPhysicianID
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="MedicoPeticionarioID" 
	   attributeObjectgeneral.value = msg['PV1']['PV1.9']['PV1.9.1'].toString();
	   attributeArr.push(attributeObjectgeneral);  

	   //Primary Attributes - ReqPhysicianName
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="MedicoPeticionarioNombre" 
	   attributeObjectgeneral.value = msg['PV1']['PV1.9']['PV1.9.2'].toString();
	   attributeArr.push(attributeObjectgeneral);  

	   //Primary Attributes - Sede Synlab Presentación
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="SedeSynlabPresentacion" 
	   attributeObjectgeneral.value = msg['PV1']['PV1.10']['PV1.10.1'].toString();
	   attributeArr.push(attributeObjectgeneral);  

	   //Primary Attributes - Código Plan Cliente
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="CodigoPlanCliente" 
	   attributeObjectgeneral.value = msg['PV1']['PV1.7']['PV1.7.1'].toString();
	   attributeArr.push(attributeObjectgeneral);  

	   //Primary Attributes - Descripción Plan Cliente
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="DescripcionPlanCliente" 
	   attributeObjectgeneral.value = msg['PV1']['PV1.7']['PV1.7.2'].toString();
	   attributeArr.push(attributeObjectgeneral);  

	   //Primary Attributes - Empresa Convenio - Nit
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="NIT" 
	   attributeObjectgeneral.value = msg['PV1']['PV1.8']['PV1.8.1'].toString();
	   aux_message.NIT = msg['PV1']['PV1.8']['PV1.8.1'].toString();
	   attributeArr.push(attributeObjectgeneral);  

	   //Primary Attributes - Empresa Convenio - Razón Social
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="RazonSocial" 
	   attributeObjectgeneral.value = msg['PV1']['PV1.8']['PV1.8.2'].toString();
	   aux_message.RazonSocial = msg['PV1']['PV1.8']['PV1.8.2'].toString();
	   attributeArr.push(attributeObjectgeneral);  
	   /*
	   //Primary Attributes - Discharge Admit Datetime
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="Discharge Admit Datetime" 
	   if (msg['PV1']['PV1.45']['PV1.45.1'].toString() != null && msg['PV1']['PV1.45']['PV1.45.1'].toString() != ""){
	     attributeObjectgeneral.value = DateUtil.convertDate("yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss", msg['PV1']['PV1.45']['PV1.45.1'].toString());
	   }else{
	   	attributeObjectgeneral.value = "";
	   }
	   attributeArr.push(attributeObjectgeneral);  
*/
	   
	   if ( msg['PID']['PID.7']['PID.7.1'].toString() != null &&  msg['PID']['PID.7']['PID.7.1'].toString() != ""){
	     //Primary Attributes - Patient DoB
	     var attributeObjectgeneral = {};
	     attributeObjectgeneral.externalName="BIRTHDATE" 
	     attributeObjectgeneral.value = DateUtil.convertDate("yyyyMMdd", "yyyy-MM-dd", msg['PID']['PID.7']['PID.7.1'].toString());
	     attributeArr.push(attributeObjectgeneral);  
	     //Primary Attributes - Age
	     var attributeObjectgeneral = {};
	     attributeObjectgeneral.externalName="EdadPaciente" 
	     if(msg['OBR'][0]['OBR.7']['OBR.7.1'].toString() != null &&  msg['OBR'][0]['OBR.7']['OBR.7.1'].toString() !=""){
	       attributeObjectgeneral.value =Math.round((DateUtil.getDate("yyyyMMddHHmmss", msg['OBR'][0]['OBR.7']['OBR.7.1'].toString()).getTime()-DateUtil.getDate("yyyyMMdd", msg['PID']['PID.7']['PID.7.1'].toString()).getTime())/1000/60/60/24/365);
	     	aux_message.EdadPaciente =attributeObjectgeneral.value;
	     }else{
	       attributeObjectgeneral.value =Math.round((DateUtil.getDate("yyyyMMddHHmmss", msg['ORC'][0]['ORC.7']['ORC.7.4'].toString()).getTime()-DateUtil.getDate("yyyyMMdd", msg['PID']['PID.7']['PID.7.1'].toString()).getTime())/1000/60/60/24/365);
	       aux_message.EdadPaciente =attributeObjectgeneral.value;
	     }
	     attributeArr.push(attributeObjectgeneral);
	     //Primary Attributes - Age days
	     var  attributeObjectgeneral = {};
	     attributeObjectgeneral.externalName="Edad en Días" 
	     if(msg['OBR']['OBR.7'][0]['OBR.7.1'].toString() != null &&  msg['OBR'][0]['OBR.7']['OBR.7.1'].toString() !=""){
	       attributeObjectgeneral.value =Math.round((DateUtil.getDate("yyyyMMddHHmmss", msg['OBR'][0]['OBR.7']['OBR.7.1'].toString()).getTime()-DateUtil.getDate("yyyyMMdd", msg['PID']['PID.7']['PID.7.1'].toString()).getTime())/1000/60/60/24);
	     }else{
	       attributeObjectgeneral.value =Math.round((DateUtil.getDate("yyyyMMddHHmmss",  msg['ORC'][0]['ORC.7']['ORC.7.4'].toString()).getTime()-DateUtil.getDate("yyyyMMdd", msg['PID']['PID.7']['PID.7.1'].toString()).getTime())/1000/60/60/24);
	     }
	     attributeArr.push(attributeObjectgeneral);
	   }
	   //Primary Attributes - Patient Gender
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="PatientSex" 
	   attributeObjectgeneral.value = msg['PID']['PID.8']['PID.8.1'].toString();
	   aux_message.PatientSex = msg['PID']['PID.8']['PID.8.1'].toString();
	   attributeArr.push(attributeObjectgeneral);  
	   //Primary Attributes - Episode Ordered Tests
/*	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="EpisodeOrderedTests" 
	   attributeObjectgeneral.value = '';
	   var select = "SELECT order_list from repository.orders where order_id ='"+msg['ORC']['ORC.3']['ORC.3.1'].toString()+"' ";
	   var dbConn;
	   var result;
	   try {
		dbConn = DatabaseConnectionFactory.createDatabaseConnection('com.mysql.jdbc.Driver', 'jdbc:mysql://localhost:3306/rd_staging', 'root', '1Password');
		result = dbConn.executeCachedQuery(select);
	     if (result.next()){
	        attributeObjectgeneral.value = result.getString('order_list');
	     }
	    } finally {
		if (dbConn) {
			dbConn.close();
		}
	   }
	   attributeArr.push(attributeObjectgeneral);  
	*/           
	   //Primary Attributes - SAMPLE
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="Sample"
	   aux_sample="";
	   for each (seg in msg..SPM) {
		 aux_sample += seg['SPM.4']['SPM.4.1'].toString()+",";
	   }
	   attributeObjectgeneral.value = aux_sample.substring(0, aux_sample.length - 1 );
	   attributeArr.push(attributeObjectgeneral);
	   //Primary Attributes - Sample Collection Datetime 
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="FechaDeToma" 
	   attributeObjectgeneral.value = DateUtil.convertDate("yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss", msg['OBR'][0]['OBR.7']['OBR.7.1'].toString());
	   attributeArr.push(attributeObjectgeneral); 
	   //Primary Attributes - Sample Received Datetime
	   
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="FechaRecepcionMuestra"
	   if (msg['SPM'].toString().length > 0 && msg['SPM'][0]['SPM.18']['SPM.18.1'].toString() !="" &&  msg['SPM'][0]['SPM.18']['SPM.18.1'].toString() !=null){ 
	     attributeObjectgeneral.value = DateUtil.convertDate("yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss", msg['SPM'][0]['SPM.18']['SPM.18.1'].toString());
	   }else{
	   	attributeObjectgeneral.value = "";
	   }
	   attributeArr.push(attributeObjectgeneral);    
	   //Primary Attributes - Test Ordered
	   
	   var aux_TestOrdered="";
	   var aux_TestOrderedName="";
	   var z = 0;
	   for each (seg in msg..OBR) {
	   	  
		 if (aux_TestOrdered.indexOf(seg['OBR.4']['OBR.4.1'].toString()) >= 0){
		 	
		 }else{
		   aux_TestOrdered += seg['OBR.4']['OBR.4.1'].toString()+",";	
		   aux_TestOrderedName += seg['OBR.4']['OBR.4.2'].toString()+",";	
		   
		 }
		 z++;
	   }
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="CodigoExamen"
	   attributeObjectgeneral.value = aux_TestOrdered.substring(0, aux_TestOrdered.length - 1 );
	   attributeArr.push(attributeObjectgeneral);
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="NombreExamen"
	   attributeObjectgeneral.value = aux_TestOrderedName.substring(0, aux_TestOrderedName.length - 1 );
	   attributeArr.push(attributeObjectgeneral);
	   
	/*   //Primary Attributes - Ordering Provider 
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="Ordering Provider" 
	   attributeObjectgeneral.value = msg['ORC'][0]['ORC.12']['ORC.12.1'].toString()+" - "+msg['ORC'][0]['ORC.12']['ORC.12.3'].toString()+" "+msg['ORC'][0]['ORC.12']['ORC.12.2'].toString();
	   attributeArr.push(attributeObjectgeneral);      
	   //Primary Attributes - Ordering Organization 
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="Ordering Organization" 
	   attributeObjectgeneral.value = msg['ORC'][0]['ORC.17']['ORC.17.2'].toString();
	   attributeArr.push(attributeObjectgeneral);
	   */
	   //Primary Attributes - Results
	     var aux_DateResults = ""; 
	     var auxSeg = ""; 
	     var auxComment ="";
	     var auxObx ="";
	   for each (seg in msg.children()) {
	   	
	   	if (seg.name().toString() == "OBR") {
	   		if ( aux_DateResults < seg['OBR.14']['OBR.14.1'].toString()){
		 	aux_DateResults = seg['OBR.14']['OBR.14.1'].toString();
		 }
		 if (auxSeg == 'NTE'){
		   if (auxComment !=""){
			  var attributeObjectgeneral = {};
		       attributeObjectgeneral.externalName="Comentario de "+auxObx;
		       attributeObjectgeneral.value = auxComment;
		       attributeArr.push(attributeObjectgeneral);
			}	
		 }
		 auxComment ="";
	   	}
	   	if (seg.name().toString() == "OBX") {
		 
		 if (auxSeg == 'NTE'){
		   if (auxComment !=""){
			  var attributeObjectgeneral = {};
		       attributeObjectgeneral.externalName="Comentario de "+auxObx;
		       attributeObjectgeneral.value = auxComment;
		       attributeArr.push(attributeObjectgeneral);
			}	
		 }
		 auxComment ="";
           var attributeObject = {};
		 //attributeObject.externalName = seg['OBX.3']['OBX.3.2'].toString();
		 attributeObject.externalName = seg['OBX.3']['OBX.3.2'].toString();
		 if ( attributeObject.externalName.indexOf("%")==0){attributeObject.externalName=attributeObject.externalName.replace('%','\\%')}
		 auxObx = seg['OBX.3']['OBX.3.2'].toString();
		 attributeObject.value = seg['OBX.5']['OBX.5.1'].toString();
		 attributeObject.units = seg['OBX.6']['OBX.6.1'].toString();
		 attributeObject.range = transformRange2(seg['OBX.7']['OBX.7.1'].toString());
		 attributeArr.push(attributeObject);
		 
	     }
	     if (seg.name().toString() == "NTE") {
	   		auxComment +=seg['NTE.3']['NTE.3.1'].toString()+" ";
	   	}
	     auxSeg = seg.name().toString();
	   }
	
	    if (aux_DateResults != ""){
	   	 //Primary Attributes - Sample Collection Datetime 
		   var attributeObjectgeneral = {};
		   attributeObjectgeneral.externalName="FechaDeValidacion" 
		   attributeObjectgeneral.value = DateUtil.convertDate("yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss", aux_DateResults);
		   attributeArr.push(attributeObjectgeneral); 
	   }

	   if (auxComment !=""){
	     var attributeObjectgeneral = {};
		attributeObjectgeneral.externalName="Comentario de "+auxObx;
		attributeObjectgeneral.value = auxComment;
		attributeArr.push(attributeObjectgeneral);
	  }
	   
	  //Load attributes to episode
	  episodeObject.attributeWithValues = attributeArr;
	  episodeArray.push(episodeObject);
	  
	  //Load Historical data
	  
	
	  var jsonPatient = {}
	  /*
	  jsonPatient.patientId="1247467";
	  jsonPatient.startDate = "2023-01-01"
	  jsonPatient.application = "CDS"
	  */
	  jsonPatient.patientId=msg['PID']['PID.2']['PID.2.2'].toString();
	  jsonPatient.startDate = "2023-01-01"
	  jsonPatient.application = "CDS"
	  var resp = router.routeMessage('requestHistorical', JSON.stringify(jsonPatient));
	
	 try {
	  var historic = JSON.parse(resp.getMessage());

	  var episodeHArray = new Array();
	  episodeHArray = historic.OrderHistory;
	  connectorMap.put('episodeHArray',JSON.stringify(episodeHArray));
	  for (t in episodeHArray){
	   var episodeObject = {};
	   //episodeDate
	   episodeObject.episodeDate = DateUtil.getDate("yyyy-MM-dd HH:mm:ss", episodeHArray[t].OrderEventDateTime  ).getTime();
	   //episodeID
	   episodeObject.episodeId = episodeHArray[t].OrderID;
	   //Primary Attributes Array
	   var attributeArr =  new Array();
	   //Primary Attributes - Visit Id
	   var attributeObjectgeneral = {};
	   attributeObjectgeneral.externalName="SampleID" 
	   attributeObjectgeneral.value = episodeHArray[t].OrderID;
	   attributeArr.push(attributeObjectgeneral);

	   episodeObject.attributeWithValues = attributeArr;
	   episodeArray.push(episodeObject);
	    var testHArray = new Array();
	    testHArray =  episodeHArray[t].Tests;
	    for (f in testHArray){
	    	 var attributeObject = {};
		 //attributeObject.externalName = seg['OBX.3']['OBX.3.2'].toString();
		 attributeObject.externalName = testHArray[f].TestLisName;
		 if ( attributeObject.externalName.indexOf("%")==0){attributeObject.externalName=attributeObject.externalName.replace('%','\\%')}
		 attributeObject.value = testHArray[f].TestValue;
		 attributeObject.units = testHArray[f].TestUnits;
		 attributeObject.range = testHArray[f].TestNormalRange;
		 attributeObject.range = transformRange2(attributeObject.range);
		 attributeArr.push(attributeObject);
	    }
	  }
	}catch(err){
		
	}
	  
	  jsonObjFromHL7.episodes = episodeArray;
	  jsonObjFromHL7.senderReference = JSON.stringify(aux_message);
	  msg = jsonObjFromHL7;
	  var rsp = router.routeMessage('Incoming', jsonObjFromHL7.senderReference);
	  
}else{
	msg = connectorMessage.getRawData()
}

/*function transformRange2(range) {
	if (range != null){
		range = range.replace('Personas no diabéticas:','').replace('pgv','').replace('%','').replace("<0.5 - 1.0",'').replace("null",'');
		range = range.replace("Hasta",'<');
		range = range.replace("Valores de Referencia en Niños",'');
		range = range.replace("Evalúe el Riesgo Cardiovascular",'');
		range = range.replace("    ",'');
		range = range.replace("No Reactivo: Menor de ",'<');
		range = range.replace("No Reactivo Menor de ",'<');
		range = range.replace("Normal: Menor de ",'<');
		range = range.replace("No reactivo <",'<');
		range = range.replace("No reactivo: Menor de ",'<');
		range = range.replace("Femenino:",''); 
		range = range.replace("Ambos Sexos",''); 
		range = range.replace("Mujeres:",'');
		range = range.replace("-3 a +3",''); 
		range = range.replace("1 a < 10 año: 130 - 300",''); 
		if (range == "  -  "){ range=""};
		if (range == " - "){ range=""};
		if (range == "-"){ range=""};
		range = range.replace("Menor de ",'<');
		range = range.replace("Mayor de ",'>');
		range = range.replace("Vlr. Referencia para grupos Especiales: , Prematuros:",''); 
		//range = range.replace("",'');
	}
	return range;
}*/

function transformRange2(range) {
	if (range != null && range != '') {
		if (range.indexOf(",") >= 0) {
			range = range.replace(/,/g, ".");
		}
		range = range.replace('Personas no diabéticas:','').replace('pgv','').replace('%','').replace("<0.5 - 1.0",'').replace("null",'');
		range = range.replace("Hasta",'<');
		range = range.replace("Valores de Referencia en Niños",'');
		range = range.replace("Evalúe el Riesgo Cardiovascular",'');
		range = range.replace("    ",'');
		range = range.replace("No Reactivo: Menor de ",'<');
		range = range.replace("No Reactivo Menor de ",'<');
		range = range.replace("Normal: Menor de ",'<');
		range = range.replace("No reactivo <",'<');
		range = range.replace("No reactivo: Menor de ",'<');
		range = range.replace("Femenino:",''); 
		range = range.replace("Hombres:",''); 
		range = range.replace("No Reactiva",''); 
		range = range.replace("NO REACTIVO",''); 
		range = range.replace("Exudados",''); 
		range = range.replace("NEGATIVO",''); 
		range = range.replace("Claro",'');
		range = range.replace("No Detectado",'');
		range = range.replace("Negativo",'');
		range = range.replace("Ambos Sexos",''); 
		range = range.replace("Mujeres:",'');
		range = range.replace("-3 a +3",''); 
		range = range.replace("1 a < 10 año: 130 - 300",''); 
		if (range == "  -  "){ range=""};
		if (range == " - "){ range=""};
		if (range == "-"){ range=""};
		range = range.replace("Menor de ",'<');
		range = range.replace("Mayor de ",'>');
		range = range.replace("Vlr. Referencia para grupos Especiales: , Prematuros:",''); 
		if (isValidRange(range)) {
			logger.warn("Rango invalido descartado:  " + range + ".");
			range = "";
		}
	}
	return range;
}

function isValidRange(range) {
	//var regex = /([\s|-]{0,1}\d{1,2}(\.\d){0,1}\s{0,1}-\s{0,1}\d{1,2}(\.\d){0,1}\s{0,1})|(\s{0,1}[<>]={0,1}\s{0,3}-{0,1}\d{1,2}(\.\d){0,1})/;
	var regex = /[a-zA-Z]/;
	return regex.test(range);
}
