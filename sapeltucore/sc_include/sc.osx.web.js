//new osx window 
var scOSX 		= {} ; 
var scGrid 		= {} ; 
var scOSX_Var	= {} ;
var OSX 		= {} ;

scOSX.Form 		= function(Form_Var){   
	/* variable oOSX iniliasisasi form control extend */
	scOSX.Form_Var	= {
		cModul 		: "Utama" ,
		cNama 		: "oWeb" , 
		cJs 		: "sys/about" ,
		cData 		: "" ,
		cFormName	: "mirzaramadhany" ,
		lNoContent	: false ,
		cidcontent	: ".sccontent" ,
		attr_sccontent	: ""
	} 
	if(scOSX.Form_Var.attr_sccontent !== "") scOSX.Form_Var.attr_sccontent.replace("'",'"') ; 
	$.extend(true,scOSX.Form_Var,Form_Var) ;
	
	if( $(scOSX.Form_Var.cidcontent).find(".sccontent-content").length > 0 ){
		scOSX.Last_Id 	= $(scOSX.Form_Var.cidcontent).find(".sccontent-content").attr("id") ; 
		scOSX.Last_DObj	= $(scOSX.Form_Var.cidcontent).find(".sccontent-content").attr("data-scobj") ; 
		$("#"+scOSX.Last_Id).trigger("remove").remove() ;   
		eval(" " + scOSX.Last_DObj+ " = null ; ") ;  
	}
	$(scOSX.Form_Var.cidcontent).html("") ;  

	/*Initialize*/
	scOSX.Form_Var.cFormName= scOSX.Form_Var.cFormName.replace(" ","") ;
	scOSX.ObjForm 			= "OSX." + scOSX.Form_Var.cFormName ;
	scOSX.cID 				= "osx_form_" + scOSX.Form_Var.cFormName ;  
	scOSX.cID2Load 			= scOSX.cID + "_wrap" ;   
	scOSX.cIDPageReload		= scOSX.cID + "_wrap" ;   
	if(scOSX.Form_Var.lNoContent){
		scOSX.cIDPageReload	= scOSX.cID ; 
	}

	scOSX.cHtml		 		= '' ; 
	if(!scOSX.Form_Var.lNoContent){
		scOSX.cHtml		+= '<div id="'+ scOSX.cID +'" class="sccontent-content" data-scobj="'+ scOSX.ObjForm +'" '+scOSX.Form_Var.attr_sccontent+'>' ;
		scOSX.cHtml		+= '<nav class="navbar jumbotron navbar-default">' ; 
		scOSX.cHtml		+= '	<div class="container-fluid">' ; 
		scOSX.cHtml		+= '		<div class="navbar-header">' ; 
		scOSX.cHtml		+= '			<button type="button" class="navbar-toggle collapsed" ' ; 
		scOSX.cHtml		+= '			data-toggle="collapse" data-target="#sctheme-option"> ' ; 
		scOSX.cHtml		+= '				<span class="sr-only">Toggle navigation</span> ' ; 
		scOSX.cHtml		+= '				<i class="fa fa-th-large"></i> ' ; 
		scOSX.cHtml		+= '			</button>' ; 
		scOSX.cHtml		+= '			<ul class="breadcrumb">' ;  
		scOSX.cHtml		+= '				<li class="active">'+scOSX.Form_Var.cNama+'</li>' ; 
		scOSX.cHtml		+= '			</ul>' ; 
		scOSX.cHtml		+= '		</div>' ; 
		scOSX.cHtml		+= '		<div class="collapse navbar-collapse" id="sctheme-option" >' ; 
		scOSX.cHtml		+= '			<ul class="nav navbar-nav navbar-right">' ; 
		scOSX.cHtml		+= '				<li title="Panduan" class="sccmdbantuan">' ; 
		scOSX.cHtml		+= '					<i class="fa fa-question-circle"></i>&nbsp;&nbsp;Panduan' ; 
		scOSX.cHtml		+= '				</li>' ; 
		scOSX.cHtml		+= '			</ul>' ; 
		scOSX.cHtml		+= '		</div>' ; 
		scOSX.cHtml		+= '	</div>' ; 
		scOSX.cHtml		+= '</nav>' ; 
		scOSX.cHtml		+= '<div class="container-fluid container-form" id="'+scOSX.cID2Load+'"></div>' ;
		scOSX.cHtml		+= '</div>' ; 
	}

	scOSX.cHtml	   		+= '<script type="text/javascript">' ;   
	scOSX.cHtml	   		+= 	' ' + scOSX.ObjForm +' = ({ '; 
	scOSX.cHtml	   		+=		'ID 		: "'+ scOSX.cID +'" , '; 
	scOSX.cHtml	   		+=		'Obj 		: $("#'+ scOSX.cID +'") , ';
	scOSX.cHtml	   		+=		'Url_F 		: "'+ scOSX.Form_Var.cJs +'" , ';
	scOSX.cHtml	   		+=		'Url_A 		: "'+ scOSX.Form_Var.cJs.replace(".add","") +'.ajax.php" , ';
	scOSX.cHtml	  		+=		'PageReload	: function(){ scOSX.LoadPage("'+scOSX.cIDPageReload+'","'+scOSX.Form_Var.cJs+'") } ';
	scOSX.cHtml	   		+=	'}) ;  ' ;
	
	if(!scOSX.Form_Var.lNoContent){
		scOSX.cHtml	   	+=	' scOSX.LoadPage("'+scOSX.cID2Load+'","'+scOSX.Form_Var.cJs+'","'+scOSX.Form_Var.cData+'") ; ' ; 
		scOSX.cHtml	    += '</script>' ;
		$(scOSX.Form_Var.cidcontent).append(scOSX.cHtml) ;
	}else{
		scOSX.cHtml	   	+=	' scOSX.LoadPage("'+scOSX.cID+'","'+scOSX.Form_Var.cJs+'","'+scOSX.Form_Var.cData+'") ; ' ; 
		scOSX.cHtml	    += '</script>' ;
		$(scOSX.Form_Var.cidcontent).append('<div id="'+scOSX.cID+'" class="sccontent-content" data-scobj="'+ scOSX.ObjForm +'" '+scOSX.Form_Var.attr_sccontent+'></div>'+scOSX.cHtml) ; 	
	}

	console.log("Name OBJECT FORM -> " + scOSX.ObjForm) ;
	console.log( eval(scOSX.ObjForm) ) ;  
}

scOSX.LoadPage 			= function(cID,cPage,cParam){
	if(cParam == undefined) cParam 			= '' ;  
	scOSX.LoadPage_cPage		 = 'sc.core.php?_cPage=' + cPage ;  

	if(cParam.trim() !== ""){  
		scOSX.LoadPage_cPage	+= '&' + cParam ; 		
	}   
	$("#"+ cID).prepend('<div class="view-loading"></div>') ;
	$("#"+ cID).load(scOSX.LoadPage_cPage,function(){ 
		$("#scmenu").removeClass("active") ; //menu
		$(".view-loading").remove() ; 
	}) ; 
}

scOSX.SetEnter2Tab	= function(oObj){//function for change chr tab to enter
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
}

scOSX.SetRightbar		= function(bool,cid,loverlay){
	scOSX.nright 		= 0 ; 
	if(loverlay == undefined) loverlay = true ; 
	if(cid == undefined) cid = "#sc-content-right" ; 
	if(!bool) scOSX.nright 	 = "-" + $(cid).css("width") ; 	
	if(loverlay){ 
		if(bool){
			$(".sc-content-right-overlay").css("display","block") ;
			$(".sc-content-right-overlay").animate({opacity:1},600) ; 
		}else{
			$(".sc-content-right-overlay").animate({opacity:0},400,function(){$(this).css("display","none")}) ; 
			$(cid).html("") ; 
		}
	}

	$(cid).stop().animate({right:scOSX.nright},400,function(){$(this).addClass("open") ;}) ; 
} 

scOSX.SetProgressBar	= function(obj,nstart,nend){
	scOSX.nEt   = parseFloat(100 / parseInt(nend)) ; 
    scOSX.nPro  = parseFloat(scOSX.nEt*nstart) ;  
    scOSX.nPro  = Math.min(scOSX.nPro,100) ; 

    obj.attr("aria-valuenow",scOSX.nPro) ; 
    obj.css("width",scOSX.nPro + "%") ;  
    obj.html('<span class="sr-only">'+parseInt(scOSX.nPro) +'%</span>') ;
}

scOSX.OpenReport		= function(clocrpt,lconfig,cdata){
	if(lconfig == undefined) lconfig 	= true ;
	if(!cdata) cdata 		= "" ;  
	if(lconfig){//open modal
		$("#modalrpt").find("#scRpt").val(clocrpt) ; 
		$("#modalrpt").find("#cdata").val( decodeURIComponent(cdata) ) ;
		$("#modalrpt").modal("show") ;  
		setTimeout(function(){
			$("#modalrpt").find("#cmdlihat").focus() ; 
		},300) ;
	}else{ 
		$("#modalrpt_show").find("iframe").attr("src", "" ) ; 
		clocrpt	= "./sc.reportme.php?scRpt=" + clocrpt + "&" + cdata ; 
		$("#modalrpt_show").find("iframe").attr("src", clocrpt ) ;  
		$("#modalrpt_show").modal("show","block") ; 
		$("#modalrpt_show").removeClass("in") ;  
	}
} 

/*costanta*/
var constant	= {} ; 
constant.Save 	= "Simpan Data ? " ; 
constant.Delete	= "Hapus Data ?" ;

//console log
scOSX.console 	 =   " ossssssssso   \t   occccccccccccccc" ;
scOSX.console	+= "\nosssss         \t  occcccccccccccc" ;
scOSX.console	+= "\nosssss         \t occco" ;
scOSX.console	+= "\n osssssssssso  \toccco" ; 
scOSX.console	+= "\n        ssssso \t occco" ; 
scOSX.console	+= "\n        ssssso \t  occcccccccccccc" ; 
scOSX.console	+= "\nossssssssssso  \t   occccccccccccccc .2015 " ; 
console.log(scOSX.console) ; 

/*function */

(function($) {
    "use strict";

    $.fn.tree = function() {

        return this.each(function() {
            var btn = $(this).children("a").first();
            var menu = $(this).children(".treeview-menu").first();
            var isActive = $(this).hasClass('active');

            //initialize already active menus
            if (isActive) {
                menu.show();
                btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
            }
            //Slide open or close the menu on link click
            btn.click(function(e) {
                e.preventDefault();
                if (isActive) {
                    //Slide up to close menu
                    menu.slideUp();
                    isActive = false;
                    btn.children(".fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
                    btn.parent("li").removeClass("active");
                } else {
                    //Slide down to open menu
                    menu.slideDown();
                    isActive = true;
                    btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
                    btn.parent("li").addClass("active");
                }
            });

            /* Add margins to submenu elements to give it a tree look */
            menu.find("li > a").each(function() {
                var pad = parseInt($(this).css("margin-left")) + 10;

                $(this).css({"margin-left": pad + "px"});
            });

        });

    };


}(jQuery));
/*end function*/