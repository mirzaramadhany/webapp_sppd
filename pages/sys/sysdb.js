
var cUrl    = $("#frmDb #cPageSource").val() + '.ajax.php' ; 
var cFile   = null ; 
 
$(window).ready(function(){   
  $('.cmdBackup').click(function(e){
    e.preventDefault() ; 
    $(this).button('loading') ;
    $("#tab_1").find(".progress-bar").attr("aria-valuenow","0") ; 
    $("#tab_1").find(".progress-bar").css("width","0%") ; 
    $("#tab_1").find("#cReturn").html("") ; 
    scAjax(cUrl,'Backup') ;  
  }) ;

  $('.cmdRestore').click(function(e){
    e.preventDefault() ; 
    $(this).button('loading') ;
    $("#tab_2").find(".progress-bar").attr("aria-valuenow","0") ; 
    $("#tab_2").find(".progress-bar").css("width","0%") ;  
    $("#tab_2").find(".cText").html("Uploading .... ") ; 
    oSysdb_Restore.SaveFile() ; 
  }) ; 

  $('#cFileRestore').change(function(e){
    cFile = e.target.files ;
    e.preventDefault() ; 
  }) ;  

}) ;

var oSysdb_Restore  = ({
  button : $('.cmdRestore') 
}) ; 

oSysdb_Restore.SaveFile = function(){
  if(cFile !== null){
    var gFoto   = new FormData() ;
    $.each(cFile, function(cKey,cValue){
        gFoto.append(cKey,cValue) ;
    }) ;      
    scAjaxSaveFile(cUrl,'SavingRestore',gFoto) ; 
  }else{
    alert("File Not Found") ;  
    $(this).button('reset') ;
  }
}

function onProgress_Backup(nStart,nEnd){
  var nEt   = parseFloat(100 / parseInt(nEnd)) ; 
  var nPro  = parseFloat(nEt*nStart) ; 
  $("#tab_1").find(".progress-bar").attr("aria-valuenow",nPro) ; 
  $("#tab_1").find(".progress-bar").css("width",nPro + "%") ; 
  
  $("#tab_1").find(".cText").html(nStart + " / " + nEnd + " of Tables") ; 
  scAjax(cUrl,'StartBackup','nKey=' + nStart+ "&nEnd=" + nEnd) ;
} 

function onProgress_Restore(nStart,nEnd){
  var nEt   = parseFloat(100 / parseInt(nEnd)) ; 
  var nPro  = parseFloat(nEt*nStart) ; 
  $("#tab_2").find(".progress-bar").attr("aria-valuenow",nPro) ; 
  $("#tab_2").find(".progress-bar").css("width",nPro + "%") ; 
  
  $("#tab_2").find(".cText").html(nStart + " / " + nEnd + " of File") ; 
  scAjax(cUrl,'StartRestore','nKey=' + nStart+ "&nEnd=" + nEnd) ;
} 