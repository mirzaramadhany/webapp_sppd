/*
     author              : sapeltu - core [www.screativ.com]
     creator             : Mirza Ramadhany
     date                : 12 Juli 2014
     last modified       : 
     fixed by            : Mirza Ramadhany 
     version             : 1.0.0 
     file                : sc.func.js
     call function to define form
*/ 

var scForm	= {} ; 
var scForm	= {} ;  

scForm.CheckPhone		= function(vaNumber){ 
	scForm.lValidNumber 		= false ; 
	scForm.lValidNumber1 		= false ; 
	$.each(vaNumber,function(i,val){ 
		val  					= val.replace(/\D/g, ''); 
		if(i == 0){
			if( (val.indexOf("08") == 0 || val.indexOf("628") == 0 || val.indexOf("628") == 1) && val.length > 8 ){
				scForm.lValidNumber	= true ; 
			}else{
				scForm.lValidNumber	= false ; 
			}
			scForm.lValidNumber1	= scForm.lValidNumber ; 
		}
		if(i > 0 && scForm.lValidNumber1 && val !== ""){
			if( (val.indexOf("08") == 0 || val.indexOf("628") == 0 || val.indexOf("628") == 1) && val.length > 8  ){
				scForm.lValidNumber	= true ; 
			}else{
				scForm.lValidNumber	= false ; 
			}	
		}
	}) ; 
	return scForm.lValidNumber ; 
}

scForm.SetEnter2TabO	= function(){//function for change chr tab to enter
	$('input').on("keypress", function(e) {
      	/* ENTER PRESSED*/ 
      	if (e.keyCode == 13) {
	      	/* FOCUS ELEMENT */
	      	var objInputs  = $(this).parents("form").eq(0).find(":input:visible:enabled:not([readonly])"); 
	      	var nId   = objInputs.index(this); 
	      	if (nId == objInputs.length - 1) {
	          objInputs[0].select()
	      	} else {
	          objInputs[nId + 1].focus(); //  handles submit buttons 
	      	}
	      	return false;
      	}
	}); 
}

scForm.SetEnter2Tab	= function(oObj){//function for change chr tab to enter
	if(oObj !== undefined){
		oObj.find('input').on("keypress", function(e) {
	      	/* ENTER PRESSED*/ 
	      	if (e.keyCode == 13) {
		      	/* FOCUS ELEMENT */
		      	var objInputs  = $(this).parents("form").eq(0).find(":input:visible:enabled:not([readonly])"); 
		      	var nId   = objInputs.index(this); 
		      	if (nId == objInputs.length - 1) {
		          objInputs[0].select()
		      	} else {
		          objInputs[nId + 1].focus(); //  handles submit buttons 
		      	} 
		      	return false;
	      	}
		}); 
	}else{
		scForm.SetEnter2TabO() ; 
	}
}

scForm.SetValidatonSC	= function(){
	$(".inputno-special").keyup(function(e){
		$(this).val( ($(this).val()).replace(/[^a-z0-9@.,+-=*\s]/gi, '').replace(",",".") ) ;
	}) ; 
}

scForm.HideMenu	= function(){
    if ($(window).width() <= 992) {
    } else {
        //Else, enable content streching
        $('.left-side').addClass("collapse-left");
        $(".right-side").addClass("strech");
    }
}
 
 
if(typeof vdatetime == 'undefined'){
	scForm.InitDate		= function(objParams){ 
		scForm.SetDate(objParams) ; 
	}	

	scForm.SetDate		= function(objParams){ 
		var cParams		= {
			cClass		: ".sc-date" ,
			lTime		: false 
		}
		$.extend(true,cParams,objParams) ; 
		$(cParams.cClass).datetimepicker({
		    language:'en' , 
		    pickTime: cParams.lTime
		}) ; 
	} 
}
 
scForm.InitSelect	= function(objParams){
	var cParams		= {
		cClass		: ".sc-input-select" ,
		cUrl 		: "./pages/ajaxload/proload.ajax.php" ,
		lMulti		: false  ,
		allowClear	: false ,
		minimumInputLength	: 0 ,
		cMaster 	: null
	}
	$.extend(true,cParams,objParams) ; 

	$(cParams.cClass).select2({
		multiple  	: cParams.lMulti , 
		allowClear	: cParams.allowClear,
	    ajax:{ 
	        data    : function (term, page) {
	                      return {  
	                          cPar      : cParams.cUrl ,
	                          cSearch   : term, // search term
	                          cFunction : ($(this).attr('data-sc-select-function') == undefined || $(this).attr('data-sc-select-function') == "") ? $(this).attr("data-sf") : $(this).attr('data-sc-select-function'),
	                          cMaster 	: (cParams.cMaster !== null && $(this).attr('data-sc-master') !== undefined) ? cParams.cMaster.find("#" + $(this).attr('data-sc-master') ).val()  : "",
	                          cId 		: $(this).attr('id') 
	                        };    
	                    },  
	        results   : function(vadata,page){ 
	          return { results: eval("(" + vadata + ")")};
	        }    
	    } ,
	    minimumInputLength : cParams.minimumInputLength
	}) ;
}
 
scForm.InitNumber	= function(nDecimal,cClass){
	if(cClass == undefined || cClass == '') cClass = ".sc-number" ; 
	if(nDecimal == undefined || nDecimal == '') nDecimal = 0 ;
	$(cClass).number( true,nDecimal );  
} 

scForm.InitTooltip	= function(opt,cClass){
	if(cClass == undefined) cClass	= ".sc-tooltip" ;
	if(opt == undefined) opt = {} ; 
	$(cClass).tooltip(opt) ;
} 

scForm.InitPopover	= function(opt,cClass){
	if(cClass == undefined) cClass	= ".sc-tooltip" ;
	if(opt == undefined) opt = {} ; 
	$(cClass).popover(opt) ; 
}
