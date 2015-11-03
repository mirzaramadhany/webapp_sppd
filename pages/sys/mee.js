var cFile = null ; 

$(window).ready(function(){
  $('#sc_button_saving').click(function(e){
    e.preventDefault() ; 
    cError  = scValidationForm(this) ; 
    
    if(cError == ""){
      oProfile.SavingFoto() ; 
       
    }else{       
      alert(cError) ;    
    }  
     
  }) ; 

  $('#gFoto').change(function(e){
    cFile = e.target.files ;
    e.preventDefault() ; 
  }) ;
}) ;

var oProfile    = ({dev:'mirza'});
oProfile.button = $('#sc_button_saving') ; 
oProfile.Saving = function(){
  cValue      = scGetDataForm(oProfile.button) ; 
  scAjax('./pages/sys/mee.ajax.php','Saving',cValue  , oProfile.button ) ;  
} 

oProfile.SavingFoto = function(){

  if(cFile !== null){ 
    var gFoto   = new FormData() ;
    $.each(cFile, function(cKey,cValue){
      gFoto.append(cKey,cValue) ;
    }) ;     
    scAjaxSaveFile('./pages/sys/mee.ajax.php','SavingFoto',gFoto,oProfile.button) ; 
  }else{
    oProfile.Saving() ; 
  } 
} 
