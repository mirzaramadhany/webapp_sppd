var cUrl  	= $("#frmSys #cPageSource").val() + '.ajax.php' ; 
var cFile 	= null ; 
var cFile2 	= null ; 

$(window).ready(function(){   
  //init 
  scForm.InitNumber(2) ; 

	$("#cmdSave").click(function(e){
		e.preventDefault() ;
		oSys.SavingFoto1() ; 
	}) ;

	$('#cFileLogo').change(function(e){
	    cFile = e.target.files ;
	    e.preventDefault() ; 
	  }) ; 

	$('#cFileHeader').change(function(e){
	    cFile2 = e.target.files ;
	    e.preventDefault() ; 
	  }) ; 
}) ; 

var oSys  = ({
  button  : $('#cmdSave') 
}) ;

oSys.SavingFoto1 = function(){
	if(cFile !== null){
    	var gFoto   = new FormData() ;
    	$.each(cFile, function(cKey,cValue){
      		gFoto.append(cKey,cValue) ;
    	}) ;      
    	scAjaxSaveFile(cUrl,'SavingFoto&cDim=1',gFoto,oSys.button) ; 
  	}else{  
    	oSys.SavingFoto2() ;
  	} 
}

oSys.SavingFoto2 = function(){
	if(cFile2 !== null){
    	var gFoto   = new FormData() ;
    	$.each(cFile2, function(cKey,cValue){
      		gFoto.append(cKey,cValue) ;
    	}) ;      
    	scAjaxSaveFile(cUrl,'SavingFoto&cDim=2',gFoto,oSys.button) ; 
  	}else{  
    	oSys.Saving() ;
  	} 
}

oSys.Saving = function(){
  var cErr  = "" ; 
  cErr      = scValidationForm(oSys.button) ;
  if(cErr !== ""){ 
    alert(cErr) ; 
  }else{
    scAjax(cUrl,'Saving', scGetDataForm(oSys.button)  , oSys.button ) ;     
  }  
}