/*
     author              : sapeltu - core [www.screativ.com]
     creator             : Mirza Ramadhany
     date                : 01 November 2013
     last modified       : 10 April 2014
     fixed by            : Mirza Ramadhany 
     version             : 1.0.4 
     file                : sc.core.js
*/ 

var $html_loading	= '<div class="sc-loading-form"></div>' ; 
var $component_page	= 'sc.core.php' ;      
var vaPos			= null ; 
var nPositionForm	= 0 ; 
var nMinimize 		= 0 ; 
var lClearLog		= false ; 

history.pushState(null, null, '');
window.addEventListener('popstate', function(event) {
	history.pushState(null, null, '');
}); 
 

function scLoadPage(cID,cPage,cParam,lReport,lCallBack){
	if(cParam == undefined) cParam 			= '' ; 
	if(lReport == undefined) lReport 		= false ; 
	if(lCallBack == undefined) lCallBack 	= true ; 
	var $component_page	 = 'sc.core.php?_cPage=' + cPage ; 
	if(lReport) $component_page	= 'sc.reportme.php?scRpt=' + cPage ; 

	if(cParam.trim() !== ""){  
		$component_page	+= '&' + cParam ; 		
	}  
	if(!lReport){
		$("#"+cID).parent('div').prepend($html_loading) ; 
		$("#"+ cID).load($component_page,function(){
			$(".sc-loading-form").fadeOut(1000,function(){
				$(this).remove() ; 	   
			}) ;      
		}) ;      	
	}else{
		$("#"+cID).attr("src",$component_page) ;
	}  
	
	//versi callback
	if(typeof scLoadPage_Callback === "function"){
		if(lCallBack) scLoadPage_Callback(cID,cPage + '&' + cParam) ;  
	}
}   

function scValidationForm(oButton,lAlert){ 
	var objSC_VALIDATION_Error	= "" ; 
	var objSC_VALIDATION		= null  ; 
	var objSC_VALIDATION_OBJ	= null  ;
	
	objSC_VALIDATION		= $(oButton).parents('form') ; 
	objSC_VALIDATION.find('.sc-input-required')
	.each(function(index){    
		if($(this).val() == "" || $(this).val() == "scnull" || $(this).val().indexOf("00-00-0000") > -1 ){ 
			if($(this).attr('placeholder') !== undefined){
				objSC_VALIDATION_Error	+= $(this).attr('placeholder')  + " Kosong !\n" ;	//ganti dengan bahasa yang dipake
				if(objSC_VALIDATION_OBJ == null) objSC_VALIDATION_OBJ	= $(this) ; 
			}  
		}  
	}) ;   

	if(!lAlert){
		return objSC_VALIDATION_Error ; 	
	} else{
		if(objSC_VALIDATION_Error !== ""){
			alert(objSC_VALIDATION_Error) ;
			if(objSC_VALIDATION_OBJ !== null) objSC_VALIDATION_OBJ.focus() ; 
			return false ; 
		}else{
			return true ; 
		}
	}
}

function scAjax(cPar,cFunction,cData,oButtonId,cDataType,cUrl){
	if(cData == undefined) cData 			= '' ; 
	if(oButtonId == undefined) oButtonId 	= '' ; 
	if(cDataType == undefined) cDataType	= 'text' ;  
	if(cUrl == undefined) cUrl 				= $component_page ;
	$.ajax({
		type	    : "POST" ,
		headers		: { "__SISTEM_BY":"SAPELTUCREATIVEID"},
		url			: cUrl ,   
 		data	    : "cPar=" + cPar + "&cFunction=" + cFunction + '&' + cData,
		dataType 	: cDataType , 
		beforeSend	: function(){
			if(oButtonId !== ""){ 
				$(oButtonId).button('loading') ; 
			}
		} , 
		error		: function(request, status, error){ 
			scAjax_Error(request,status,error) ; 
			$(oButtonId).button('reset') ; 
		} ,
		success		: function(cRetval){ 
			eval(cRetval) ; 	//digunakan untuk mengaktifkan javascript yg dihasilkan dari echo php	   
			scClearConsole() ; 	//digunakan untuk menclear console firebug / sejenisnya tapi masi muncul di .net\

			if(oButtonId !== ""){ 
				$(oButtonId).button('reset') ; 
			}  
		}  
	}) ; 
}

function scAjax_Error(cReq,cStatus,cError){
	if(cStatus == "error") alert("Server Not Found") ;
	console.log(cReq + " , " + cStatus + " , " + cError) ; 
}
 
function scAjaxNg($http,cPar,cFunction,cData,cMethod){
	if(!cData) cData = "" ; 
	if(cMethod == undefined) cMethod	= "POST" ; 

	return $http({
            	method 	:cMethod, 
            	url  	: './sc.core.php',
            	headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            	data 	: 'cPar='+ cPar + '&cFunction=' + cFunction + '&' + cData 
            }) ;  
} 

function scAjaxSaveFile(cPar,cFunction,cData,oButtonId,oCOREId,cUrl){
	if(oButtonId == undefined) oButtonId 	= '' ; 
	if(oCOREId == undefined) oCOREId = '' ; 
	if(cUrl == undefined) cUrl = $component_page ; 
	$.ajax({
		type	    : "POST" ,
		url			: cUrl + "?cPar=" + cPar + "&cFunction=" + cFunction ,   
		data	    : cData,
		cache		: false,
		processData	: false, // Don't process the files
        contentType	: false, // Set content type to false as jQuery will tell the server its a query string request
		beforeSend	: function(){
			if(oButtonId !== ""){
				$(oButtonId).parents('form').prepend($html_loading) ; 
			} 
			if(oCOREId !== ""){
				$(oCOREId).prepend($html_loading) ; 
			}
		} , 
		error		: function(err){
			alert(err) ; 
		} ,
		success		: function(cRetval){ 
			eval(cRetval) ; 	//digunakan untuk mengaktifkan javascript yg dihasilkan dari echo php	   
			scClearConsole() ; 	//digunakan untuk menclear console firebug / sejenisnya tapi masi muncul di .net\
			$(".sc-loading-form").fadeOut(1000,function(){ 
				$(this).remove() ; 	   
			}) ; 
		}  
	}) ; 
}   
 
function scGetDataForm(oButton){  
	objSC_DATA	= $(oButton).parents('form') ; 
    return objSC_DATA.serialize() ; //ambil data dari parent form
}  
//to json
$.fn.serializeObject = function(){
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

function scGetDataJSON(oButton){
	objSC_DATA	= $(oButton).parents('form') ; 
    return objSC_DATA.serializeObject() ; 
}
 
function scClearConsole(){
	console.log(window.console) ;
	if(window.console || window.console.firebug){
		if(lClearLog){
			console.clear() ; 
		} 
	}  
}

function CheckedMe(oCheckedMe){
	var $cClass 	= $(oCheckedMe).attr('class') ;  
	$("input." + $cClass).each(function(){
		this.checked = oCheckedMe.checked ; 
	}) ;
}    

function InitInputArea(oObj,lPar,nPar){
	lPar	= !lPar ; 
	oObj.Obj.find('input').each(function(index){
		$(this).attr('readOnly',lPar) ; 
		if($(this).attr("data-sf") !== undefined) $(this).select2('readonly',lPar) ; 
	})  ;
	oObj.Obj.find('textarea').each(function(index){
		$(this).attr('readOnly',lPar) ; 
	})  ;

	oObj.Obj.find('#cmdAdd').attr("disabled",!lPar) ; 	
	oObj.Obj.find('#cmdEdit').attr("disabled",!lPar) ; 	
	oObj.Obj.find('#cmdDelete').attr("disabled",!lPar) ; 

	oObj.Obj.find("#cmdSave").attr('disabled',lPar) ; 
	
	$closetxt 	= (lPar) ? "Tutup" : "Batal" ;
	//close
	oObj.Obj.find("#cmdClose").html($closetxt) ;

	oObj.nPar	= nPar ; 
	if(nPar == 3) oObj.Obj.find("#cmdSave").attr('disabled',true) ; 
}

function InitForm(oObjForm){
	oObjForm.find("input").each(function(i){
		if($(this).attr("type") !== "radio") $(this).val("") ;
		if($(this).attr("data-sf") !== undefined) $(this).select2('val',"") ; 
	}) ;  
}

function SetOpt(cName,cVal,OBJID){  
	if(OBJID !== undefined){
		OBJID.find("input[name='"+ cName +"'][value='" + cVal + "']").prop('checked', true);
	}else{
		$("input[name="+ cName +"][value=" + cVal + "]").prop('checked', true);
	}
} 

function ConvertDate(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
}

function String2Number(nVal,lNew){
	if(lNew == undefined) lNew	= false ;
	nVal		= parseFloat(nVal) ; 
	if(typeof(nVal) == "string"){
		nVal	= 0 ; 
	}
	if( isNaN(parseFloat(nVal)) ){
		nVal	= 0 ; 
	}

	if(lNew){
		var i;
		var cRetval = "";
		var ValidChars = "0123456789." ;
		var cChar = "" ;
		nVal = nVal.toString() ;
		for(i=0;i<nVal.length;i++){
			cChar = nVal.charAt(i) ;    
		    if (ValidChars.indexOf(cChar) >= 0){
		      cRetval = cRetval + cChar ;
		    }
		}
		nVal	= parseFloat(cRetval);
	}

	return nVal ; 
} 

function Number2String(nNumber,nDecimals){  
  var n = 0 ;
  var cNumber = "" ;
  var cDigit = "" ;
  var nDigit = 0 ;
  var cRetval = "" ;
  var nLen = 0 ;
  var i = 0 ;
  var cSplit = "" ;
  var nCount = 0 ;

  if (Number2String.arguments.length == 1){
    nDecimals = 2 ;
  }  

  nCount = "00000000000000000000000000000" ;
  if (nNumber == ""){
    cRetval = "0" ;
    if(nDecimals > 0) cRetval = cRetval + "." + nCount.substring(0,nDecimals) ;
    return cRetval ;
  }
  nCount = "1" + nCount.substr(0,nDecimals) ;
  nCount = parseFloat(nCount) ;  
  n = Math.round(nNumber * nCount) ;
  n = n / nCount ;  
  cNumber = n.toString() ;  
  nDigit = cNumber.indexOf(".",1) ;
  // Periksa apakah ada Koma Untuk Bilangan tersebut
  if (nDigit < 0){
    if (nDecimals !== 0){
      cDigit = ".00" ;
    }else{
      cDigit = "" ;
    }
  }else{
    cDigit = cNumber.substring(nDigit) ;
    cNumber = cNumber.substring(0,nDigit) ;    
    if (cDigit.length < 3){
      cDigit = cDigit + "0" ;
    }
  }
  cRetval = "" ;
  nLen = cNumber.length ;
  for(i=nLen - 3;i > -3;i -= 3){
    cSplit = cNumber.substring(i,i+3) ;    
    if (cSplit !== ""){
      cRetval =  cSplit + "," + cRetval ;
    }
  }
  cRetval = cRetval.substring(0,cRetval.length -1) ;
  return cRetval + cDigit ;
}


function SetCookie(cName, cValue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires;
}

function GetCookie(cName) {
    var name = cName + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
}

function PingJs(ip,cHttp ,callback) {
	if(cHttp == undefined || cHttp == "") cHttp = "http" ; 
    if (!this.inUse) {
        this.status = 'unchecked';
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback('responded');

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('responded', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = cHttp + "://" + ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('timeout');
            }
        }, 1500);
    }
}