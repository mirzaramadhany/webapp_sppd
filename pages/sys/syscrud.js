var cData = "" ; 
var cUrl  = $("#cPageSource").val() + '.ajax.php' ;
$(window).ready(function(){ 
  $('.sc_input_select').select2({
    allowClear  : true ,
      ajax:{ 
          data    : function (term, page) {
                        return {
                            cPar      : $(this).attr('data-sc-select-par'),
                            cSearch   : term, // search term
                            cFunction : $(this).attr('data-sc-select-function'),
                            cMaster   : $("#"+$(this).attr('data-master')).val() 
                          };   
                      },  
          results   : function(vadata,page){ 
            return { results: eval("(" + vadata + ")")};
          }    
        }
  }) ; 

  $('.datetimepicker').datetimepicker({
    language:'in',
    pickTime: false
  });

  
  $('#oCariCRDU').click(function(e){
    e.preventDefault() ;  
    cData    = "" ; 
    cData   += "dTglAwal=" + $("#dTglAwal").val() ;
    cData   += "&dTglAKhir=" + $("#dTglAKhir").val() ;
    cData   += "&cUser=" + $("#cUser").val() ;
    cData   += "&nLimit=" + $("#nLimit").val() ;
    cData   += "&cSearch=" + $("#cSearch").val() ;
 
    scAjax(cUrl,'GetData', cData) ;  
  }) 

});  

$(function(){
  cData    = "" ; 
  cData   += "dTglAwal=" + $("#dTglAwal").val() ;
  cData   += "&dTglAKhir=" + $("#dTglAKhir").val() ;
  cData   += "&cUser=" + $("#cUser").val() ;
  cData   += "&nLimit=" + $("#nLimit").val() ;
  cData   += "&cSearch=" + $("#cSearch").val() ; 
  scAjax(cUrl,'GetData', cData)  ;  

})  

function ViewSQL(cSQL){
  $.fancybox({ 
    'height' : 100, 
    'width' : 1000, 
    'href' : './pages/sys/syscrud.modal.php?cSql=' + cSQL  ,
    'type' : 'iframe'     
  }); 
}