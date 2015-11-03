OBJFORM_NEW.frmdash			= {} ; 
OBJFORM_NEW.frmdash.Obj 	= $("#frmdah") ; 
OBJFORM_NEW.frmdash.Url_A	= OBJFORM_NEW.frmdash.Obj.find("#cPageSource").val() + ".ajax.php" ; 
OBJFORM_NEW.frmdash.Load	= function(){
	scAjax(OBJFORM_NEW.frmdash.Url_A,'Load', scGetDataForm($("#cmdView")) , $("#cmdView") ) ; 
	OBJFORM_NEW.frmdash.LoadGrid() ; 
}

OBJFORM_NEW.frmdash.LoadGrid= function(){
	$("#wrapdash_chart").remove() ; 
	$("#tab_1").append('<div class="me-loading"></div>') ; 
	scAjax(OBJFORM_NEW.frmdash.Url_A,'LoadGrid', scGetDataForm($("#cmdView")) ) ; 
}

OBJFORM_NEW.frmdash.LoadPie = function(bulan_tahun){
	scAjax(OBJFORM_NEW.frmdash.Url_A,'LoadPie',  
		scGetDataForm($("#cmdView")) + "&bulan_tahun=" + bulan_tahun  ) ; 	
	$("#wrap_myTabs2").html("") ;   
	$("#wrap_myTabs2").append('<div class="me-loading"></div>') ; 
} 

$(function(){ 
	scForm.InitDate() ; 
	OBJFORM_NEW.frmdash.Load() ; 

	//event
	$("#cmdView").on("click",function(e){
		e.preventDefault() ; 
		OBJFORM_NEW.frmdash.Load() ; 
	}) ; 
}) ; 