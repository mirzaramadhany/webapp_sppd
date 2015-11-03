$(window).ready(function(){
  $('#sc_button_saving').click(function(e){
    e.preventDefault() ; 
    cError  = scValidationForm(this) ; 
    
    if(cError == ""){
      cValue      = scGetDataForm(this) ; 
      scAjax('./pages/sys/sysuser.ajax.php','Saving',cValue , this ) ;  
    }else{  
      alert(cError) ;   
    }  
     
  }) ; 

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
}) ;