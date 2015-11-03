//new osx window 
var scOSX 		= {} ; 
var scGrid 		= {} ; 
var scOSX_Var	= {} ;
var OSX 		= {} ;
scOSX.nForm 	= 0 ; 
scOSX.vaColor 			= ["#1abc9c","#2ecc71","#3498db","#9b59b6","#1BA39C",
							"#f1c40f","#e67e22","#e74c3c","#D2527F","#19B5FE"] ;
scOSX.cAnimation		= "flipInX" ;  
scOSX.cAnimation_Close	= "zoomOut" ; 
scOSX.cAnimation_Max 	= "zoomIn_osx" ; 
scOSX.cAnimation_Max2Df	= "zoomIn_osx_def" ; 
scOSX.cAnimation_Min 	= "zoomOutDown_def minimize" ; 
scOSX.cAnimation_All 	= scOSX.cAnimation + " " + scOSX.cAnimation_Max2Df + " " + scOSX.cAnimation_Max + 
							" " + scOSX.cAnimation_Min ; 
scOSX.Form 		= function(Form_Var){  
	if(scOSX.vaPosWin == null) scOSX.vaPosWin	= scOSX.GetPositionWin() ; 
	/* variable oOSX iniliasisasi form control extend */
	scOSX.Form_Var	= {
		cNama 		: "oWeb" , 
		cJs 		: "sys/about" ,
		cData 		: "" ,
		cFormName	: "mirzaramadhany" ,
		nWidth 		: scOSX.vaPosWin.nLeft-30, 
		nHeight 	: scOSX.vaPosWin.nTop-60,  
		lModal 		: false , 	
		lFrame 		: false ,
		lTitleBar	: true , 
		lResize 	: true , 
		lDock 		: true , 
		nTop 		: 0 , 
		nLeft		: 0 , 
		cIcon 		: 'fa fa-cloud' ,
		cBodyClass	: '' ,
		cHeaderClass: '' ,
		lHelp	 	: true 
	}
	$.extend(true,scOSX.Form_Var,Form_Var) ;
	
	scOSX.Form_Var.nHeight	= scOSX.Form_Var.nHeight == "max" ? scOSX.vaPosWin.nTop-60 : scOSX.Form_Var.nHeight ; 
	scOSX.Form_Var.nWidth	= scOSX.Form_Var.nWidth == "max" ? scOSX.vaPosWin.nLeft-30 : scOSX.Form_Var.nWidth ; 

	/*set postion form*/
	if(scOSX.Form_Var.nWidth <= 300) scOSX.Form_Var.nWidth	= 350 ; 
	scOSX.Form_Var.nTop		= Math.max(0,(scOSX.vaPosWin.nTop - scOSX.Form_Var.nHeight) / 2 ) ;
	scOSX.Form_Var.nLeft	= Math.max(0,(scOSX.vaPosWin.nLeft - scOSX.Form_Var.nWidth) / 2 ) ; 
	if( scOSX.Form_Var.nTop > scOSX.vaPosWin.nTop) scOSX.Form_Var.nTop = scOSX.vaPosWin.nTop ; 
	if( scOSX.Form_Var.nLeft > scOSX.vaPosWin.nLeft) scOSX.Form_Var.nLeft = scOSX.vaPosWin.nLeft ; 

	/*style position*/ 
	scOSX.nForm++ ; 
	scOSX.cStyleWrap 		= 'height:' + scOSX.Form_Var.nHeight + 'px;display:block;'  ;
	scOSX.cStyleWrap	   += 'width:' + scOSX.Form_Var.nWidth + 'px;'  ;
	scOSX.cStyleWrap	   += 'top:' + scOSX.Form_Var.nTop + 'px;'  ;
	scOSX.cStyleWrap	   += 'left:' + scOSX.Form_Var.nLeft + 'px;'  ;
	scOSX.cStyleWrap	   += 'z-index:' + scOSX.nForm  ; 

	/*Form Control*/
	scOSX.Form_Var.cFormName= scOSX.Form_Var.cFormName.replace(" ","") ;
	scOSX.ObjForm 			= "OSX." + scOSX.Form_Var.cFormName ;
	scOSX.cID 				= "osx_form_" + scOSX.Form_Var.cFormName ;  
	scOSX.cID2Load 			= scOSX.cID + "_wrap" ; 
	if(scOSX.Form_Var.cIcon.indexOf("/") == -1){
		scOSX.Form_Var.cIcon= '<i class="'+ scOSX.Form_Var.cIcon +'"></i>' ; 
	}else{
		scOSX.Form_Var.cIcon= '<img src="'+scOSX.Form_Var.cIcon+'" class="img-icon" />' ; 
	} 

	/*animated jika iframe tidak boleh memakai animated*/
	scOSX.cAnimated 	= '' ;
	if(scOSX.Form_Var.lFrame){
		scOSX.cAnimated	= '' ; 
	}

	/*Form HTML*/ 
	scOSX.cHtml			= '<div class="os-form '+scOSX.cAnimation+' '+scOSX.cAnimated+'" style="'+ scOSX.cStyleWrap +'" ';
	scOSX.cHtml 	   += 'id="'+ scOSX.cID +'" data-style="'+ scOSX.cStyleWrap +'" data-width="'+scOSX.Form_Var.nWidth+'px"' ;  
	scOSX.cHtml 	   += 'data-height="'+scOSX.Form_Var.nHeight+'px">' ;  
	scOSX.cHtml		   += 	'<div class="os-form-wrap" id="'+ scOSX.cID +'_wrap">' ;
	if(scOSX.Form_Var.lTitleBar){
		scOSX.cID2Load 	= scOSX.cID + "_body" ; 		
		scOSX.cHtml	   +=		'<div class="header active '+ scOSX.Form_Var.cHeaderClassae +'" id="'+ scOSX.cID +'_title">';
		scOSX.cHtml	   +=			'<table class="header-table">';
		scOSX.cHtml	   +=	        	'<tr>';
		scOSX.cHtml	   +=	             	'<td class="icon" >'+ scOSX.Form_Var.cIcon +'</td>';
		scOSX.cHtml	   +=	                '<td class="title" >'+ scOSX.Form_Var.cNama +'</td> ';
		scOSX.cHtml	   +=	                '<td class="button" > ';
		scOSX.cHtml	   +=	                	'<table class="header-button" align="right">';
		scOSX.cHtml	   +=	                     	'<tr>';
		if(scOSX.Form_Var.lHelp){
			scOSX.cHtml	   +=	                       	'<td>';
			scOSX.cHtml	   +=	                        	'<div class="btn-help" title="Bantuan"';
			scOSX.cHtml    += 								 'onclick="'+scOSX.ObjForm+'.OnHelp(event)">';
			scOSX.cHtml	   +=	                            	'<i class="fa fa-question-circle"></i>';
			scOSX.cHtml	   +=	                            '</div>'; 
			scOSX.cHtml	   +=	                        '</td>';
		} 
		if(!scOSX.Form_Var.lModal){
			scOSX.cHtml	   +=	                       	'<td>';
			scOSX.cHtml	   +=	                        	'<div class="btn-circle btn-minimize transition"';
			scOSX.cHtml    += 								 'onclick="'+scOSX.ObjForm+'.OnMinimize()">';
			scOSX.cHtml	   +=	                            	'<img src="./images/title/minimize-8.png">';
			scOSX.cHtml	   +=	                            '</div>'; 
			scOSX.cHtml	   +=	                        '</td>';
			scOSX.cHtml	   +=	                        '<td>';
			scOSX.cHtml	   +=	                           	 '<div class="btn-circle btn-maximize transition"' ;
			scOSX.cHtml    += 								 'onclick="'+scOSX.ObjForm+'.OnMaximize()">';
			scOSX.cHtml	   +=	                             	'<img src="./images/title/maximize-8.png">';
			scOSX.cHtml	   +=	                             '</div>';
			scOSX.cHtml	   +=	                        '</td>';
		}
		scOSX.cHtml	   +=	                            '<td>';
		scOSX.cHtml	   +=	                             	'<div class="btn-circle btn-close transition" onclick="'+scOSX.ObjForm+'.OnClose()">';
		scOSX.cHtml	   +=	                                 	'<img src="./images/title/close-8.png">';  
		scOSX.cHtml	   +=	                                '</div>';
		scOSX.cHtml	   +=	                            '</td>';
		scOSX.cHtml	   +=	                        '</tr>';
		scOSX.cHtml	   +=	                    '</table>';
		scOSX.cHtml	   +=	                '</td>';
		scOSX.cHtml	   +=	            '</tr>';
		scOSX.cHtml	   +=	        '</table>';
		scOSX.cHtml	   +=	    '</div>' ; 
	} 
	scOSX.cHtml    += 			'<div class="'+ scOSX.Form_Var.cBodyClass +' body" id="'+ scOSX.cID +'_body">' ; 
	if(scOSX.Form_Var.lFrame){
		scOSX.cHtml+=				'<iframe src="'+scOSX.Form_Var.cJs+'" frameborder="0" width="100%" height="100%" style="padding-top:30px;"></iframe>'; 	
	} 
	scOSX.cHtml    += 			'</div><!-- end body -->' ;    
	scOSX.cHtml	   += '	 </div><!-- end os-form-wrap -->' ; 
		/*script*/
		scOSX.cHtml	   += '<script type="text/javascript">' ;  
		scOSX.cHtml	   += 	' ' + scOSX.ObjForm +' = ({ '; 
		scOSX.cHtml	   +=		'ID 	: "'+ scOSX.cID +'" , ';
		scOSX.cHtml	   +=		'ID_Load: "'+ scOSX.cID2Load +'" , ';
		scOSX.cHtml	   +=		'Obj 	: $("#'+ scOSX.cID +'") , ';
		scOSX.cHtml	   +=		'Url_F 	: "./pages/'+ scOSX.Form_Var.cJs +'" , ';
		scOSX.cHtml	   +=		'Url_A 	: "./pages/'+ scOSX.Form_Var.cJs.split(".")[0] +'.ajax.php" , ';
		scOSX.cHtml	   +=		'Url 	: "'+ scOSX.Form_Var.cJs +'" , '; 
		scOSX.cHtml	   +=		'OnMinimize	: function(){ scOSX.OnMinimize("'+ scOSX.cID +'") } , ';
		scOSX.cHtml	   +=		'OnMaximize	: function(){ scOSX.OnMaximize("'+ scOSX.cID +'") } , ';
		scOSX.cHtml	   +=		'OnClose	: function(){ scOSX.OnClose("'+ scOSX.cID +'","'+ scOSX.ObjForm +'") } , ';
		scOSX.cHtml	   +=		'OnHeader	: scOSX.OnHeader("'+ scOSX.cID +'"), ';
		scOSX.cHtml	   +=		'OnHelp		: function(e){ scOSX.OnHelp(e,"'+ scOSX.Form_Var.cJs +'","'+ scOSX.Form_Var.cFormName +'") } , ';
		scOSX.cHtml	   +=		'PageReload	: function(){ scOSX.LoadPage("'+scOSX.cID2Load+'","'+scOSX.Form_Var.cJs+'") }';
		scOSX.cHtml	   +=	'}) ;  ' ;  
		scOSX.cHtml	   +=	'scOSX.SetOpen("'+scOSX.cID+'") ;' ; 
		if(!scOSX.Form_Var.lFrame){ 
			scOSX.cHtml+= 	'scLoadPage("'+scOSX.cID2Load+'","'+scOSX.Form_Var.cJs+'","'+scOSX.Form_Var.cData+'") ; ' ; 
		} 
		if(scOSX.Form_Var.lResize){
			scOSX.cHtml+= 	'$("#'+scOSX.cID+'").resizable({'; 
			scOSX.cHtml+=		'minHeight : ' + scOSX.Form_Var.nHeight + ',' ;
			scOSX.cHtml+=		'minWidth : ' + scOSX.Form_Var.nWidth + ',' ;
			scOSX.cHtml+=		'maxHeight : ' + (scOSX.vaPosWin.nTop - 40) + ',' ;
			scOSX.cHtml+=		'maxWidth : ' + (scOSX.vaPosWin.nLeft - 30) + ',' ;
			scOSX.cHtml+=		'handles: "all"' ; 
			scOSX.cHtml+= 	'}) ; ' ;
		}
		scOSX.cHtml	   += 	'$("#'+scOSX.cID+'").click(function(){'; 
		scOSX.cHtml	   += 		' scOSX.SetZIndex(this,false) ;' ;		
		scOSX.cHtml	   += 	'}) ; ' ;	 
		scOSX.cHtml	   += 	' scOSX.HiddenSidebar() ;' ;   
		scOSX.cHtml	   += '</script>' ;
	scOSX.cHtml	   += '</div><!-- end os-form -->'
	/*end of form*/
	
	if($("body").find("#"+scOSX.cID).length > 0 ){
		$("body").find("#"+scOSX.cID).remove() ; 
	}else{
		if(scOSX.Form_Var.lDock){
			scOSX.AddDock(scOSX.cID,scOSX.Form_Var.cIcon,scOSX.Form_Var.cNama) ; 
		}
	}
	$("body").prepend(scOSX.cHtml) ; 
	console.log("Name OBJECT FORM -> " + scOSX.ObjForm) ;
	console.log( eval(scOSX.ObjForm) ) ;  
} 

scOSX.OnHelp			= function(e,cUrl,cFormName){
	e.stopPropagation() ; 
	e.preventDefault() ; 
	scOSX.Form({ 
		cNama 		: "Bantuan" ,
		cJs 		: "help/" + cUrl ,
		cFormName	: cFormName + '_helpme',
		nWidth 		: 500 ,   
		nHeight 	: 500 ,  
		cIcon 		: 'fa fa-question-circle' ,
		lDock 		: false,
		lHelp 		: false 
	}) ;
	return false ;
}

scOSX.OnMinimize		= function(cID){
	scOSX.Obj 			= $("body #" + cID) ;  
	scOSX.CEvent 		= $.Event("OnMinimize") ; 
	scOSX.Obj.removeClass(scOSX.cAnimation_All).delay(100)
	.queue(function(){
		$(this)
		.addClass(scOSX.cAnimation_Min)
		.dequeue() 
		.trigger(scOSX.CEvent).delay(500).queue(function(){
			$(this).css({
				"display":"none",
				"z-index":"-999"
			}).
			dequeue() ; 
		})
		scOSX.Obj2 		= scOSX.GetMaxIndex() ; 
		if(scOSX.Obj2 !== null){
			$(scOSX.Obj2).find(".header").addClass("active") ; 
		}
	}) ;  
}

scOSX.OpenMinimize		= function(cID){
	scOSX.Obj 			= $("body #" + cID) ; 
	scOSX.CEvent 		= $.Event("OpenMinimize") ; 
	if( scOSX.Obj.hasClass("minimize") ){
		scOSX.Obj.css({"opacity":0,"display":"block"})
		.removeClass(scOSX.cAnimation_All).delay(100)
		.queue(function(){ 
			$(this)
			.addClass(scOSX.cAnimation)
			.css("opacity","100")
			.dequeue()
			.trigger(scOSX.CEvent) ;
		}) ;  
	} 
	scOSX.SetZIndex(scOSX.Obj,true) ;  
}

scOSX.OnMaximize		= function(cID){
	scOSX.lactive 		= true ; 
	scOSX.Obj 			= $("body #" + cID) ;  
	scOSX.CEvent 		= $.Event("OnMaximize") ; 
	if(scOSX.Obj.css("width") == (scOSX.vaPosWin.nLeft - 30) + "px" ){
		scOSX.lactive	= false ; 	
	} 

	if(scOSX.lactive){//max
		scOSX.Obj.removeClass(scOSX.cAnimation_All).delay(100)
		.queue(function(){
			$(this).addClass(scOSX.cAnimation_Max) 
			.css({
				width 	: scOSX.vaPosWin.nLeft - 30 + "px",
				height 	: scOSX.vaPosWin.nTop - 40 + "px",
				left 	: "10px" ,
				top 	: "30px"
			}).dequeue()
			.trigger(scOSX.CEvent) ; 
			$(this).find(".bodyfix").addClass("max") ;
			$(this).find(".footer").addClass("max") ;
		}) ;
	}else{//mini
		scOSX.Obj.removeClass(scOSX.cAnimation_All).delay(100)
		.queue(function(){
			$(this)
			.addClass(scOSX.cAnimation_Max2Df)
			.attr("style" , scOSX.Obj.attr("data-style") ).dequeue()
			.trigger(scOSX.CEvent) ; 
			$(this).find(".bodyfix").removeClass("max") ;
			$(this).find(".footer").removeClass("max") ;
			scOSX.nForm++ ;
			$(this).css("z-index",scOSX.nForm) ;
		}) ;
	} 
}

scOSX.OnClose			= function(cID,cObjForm){  
	$("body #" + cID).removeClass(scOSX.cAnimation_All)
	.addClass(scOSX.cAnimation_Close).delay(500).queue(function(){
		$(this).remove().dequeue() ; 
		eval(" " + cObjForm + " = null ; ") ;  
		scOSX.RemoveDock(cID) ; 
		scOSX.Obj2 		= scOSX.GetMaxIndex() ; 
		if(scOSX.Obj2 !== null){
			$(scOSX.Obj2).find(".header").addClass("active") ; 
		}
	}) ; 
}

scOSX.OnHeader 			= function(cID){ 
	$("#" + cID).draggable({
		handle	: "#" + cID + "_title",
		cursor	: "move" 
	}) ;
}

scOSX.SetZIndex 		= function(obj,lFromMinimize){ 
	if(parseInt(scOSX.nForm) > parseInt($(obj).css("z-index")) || lFromMinimize){
		scOSX.nForm++ ; 
		$("body").find(".os-form").each(function(){ 
			$(this).find(".header").removeClass("active") ; 	
		}) ;
		$(obj).css("z-index",scOSX.nForm) ;
		$(obj).find(".header").addClass("active") ;  
	} 
	scOSX.HiddenSidebar() ;
} 

scOSX.SetOpen 			= function(cID){
	$("body").find(".os-form").each(function(){ 
		$(this).find(".header").removeClass("active") ; 	
	}) ;
	$("#" + cID).find(".header").addClass("active") ; 
}

scOSX.GetMaxIndex		= function(){
	scOSX.Obj = null ; 
	scOSX.nZ  = -1  ;
	$("body").find(".os-form").each(function(){ 
		if(!$(this).hasClass("minimize")){ 
			if( scOSX.nZ < parseInt($(this).css("z-index")) ){
				scOSX.nZ	= parseInt($(this).css("z-index")) ; 
				scOSX.Obj 	= this ;  
			} 
		}
	}) ; 
	return scOSX.Obj ; 
}

scOSX.GetPositionWin 	= function(){
	scOSX.vaPosWin 		= ({nTop:0,nLeft:0}) ; 
	scOSX.vaPosWin.nTop	= $(document).innerHeight() ; 
	scOSX.vaPosWin.nLeft= $(document).innerWidth() ; 

	return scOSX.vaPosWin ; 
}

scOSX.HiddenSidebar		= function(){
	$(".sidebar").each(function(){
		$(this).css("z-Index","99990")
		.removeClass("active") ;
	}) ;
}

scOSX.OpenReport 		= function(oObj,lConfig,cData,cEncrypt){
	if(!cData) cData 		= "" ;  
	if(!cEncrypt) cEncrypt	= "" ; 
	if(lConfig == undefined) lConfig = true ;
	if(lConfig){
		scOSX.Form({ 
			cNama 		: "Report Setting" ,
			cJs 		: "laporan/rptset&scRpt="+ oObj +"&" + cData ,
			cFormName	: "sc_report",   
			nWidth 		: 550 ,   
			nHeight 	: 300 , 
			cIcon 		: 'fa fa-file' ,
			lDock 		: false, 
			lModal		: true,
			lHelp		: false
		}) ; 
	}else{
		scOSX.Form({
			cNama 		: "Report" ,
			cJs 		: "./sc.reportme.php?scRpt=" + oObj + "&" + cData ,
			cFormName	: "scopen_report" + cEncrypt,  
			cIcon 		: 'fa fa-file' ,
			lDock 		: false, 
			lModal		: true ,
			lFrame		: true ,
			lHelp		: false
		}) ; 
	}
}
 
scOSX.ProgressReport	= function(oObj,nLimit,nStart,nEnd){
    var nEt   = parseFloat(100 / parseInt(nEnd)) ; 
    var nPro  = parseFloat(nEt*nLimit*nStart) ;  
    nPro      = Math.min(nPro,100) ; 

    oObj.find(".progress-bar").attr("aria-valuenow",nPro) ; 
    oObj.find(".progress-bar").css("width",nPro + "%") ;   
    oObj.find(".progress-bar").html( parseInt(nPro) + "%") ; 
}   

/*<div class="icon-circle" style="background-color:#34495e">
        <i class="fa fa-cloud transition"></i>
    </div>*/
scOSX.nDock 			= 0 ; 
scOSX.AddDock			= function(cID,cIcon,cTitle){
	if(scOSX.nDock < 10){
		scOSX.Obj 		= $("#footerbar .dock") ;
		scOSX.Obj.find("#" + cID + "_dock").remove() ; 
		scOSX.cStyleWrap = 'style="background-color:'+scOSX.vaColor[scOSX.nDock]+';" id="'+cID+'_dock"' ;
		scOSX.cStyleWrap+= ' onclick="scOSX.OpenMinimize(&quot;'+cID+'&quot;)"' ; 
		scOSX.cDock		 = '<div class="icon-circle '+scOSX.cAnimation+' animated" '+scOSX.cStyleWrap+' title="'+cTitle+'">'; 
		scOSX.cDock		+= 	cIcon ;
		scOSX.cDock		+= '</div>' ; 
 
		scOSX.Obj.append(scOSX.cDock) ; 	
		scOSX.Obj.find("#" + cID + "_dock").tooltip({"container":"body"}) ;
		scOSX.nDock++ ;  
	}
}

scOSX.RemoveDock		= function(cID){
	$("#footerbar .dock").find("#" + cID + "_dock").remove() ; 
	scOSX.nDock-- ;
	scOSX.nDock			= Math.max(0,scOSX.nDock) ;  
}
//end new osx window
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
 
scOSX.InitTab		= function(oObj){
	oObj.find('button[data-toggle="tab"]').on('shown.bs.tab', function(){
		oObj.find('button[data-toggle="tab"]').each(function(){
			$(this).removeClass("active") ;
		}) ; 
		$(this).addClass("active") ;
	}) ;  
}

scOSX.OpenMaps	 	= function(cKoordinat){
	scOSX.Form({
		cNama 		: "Lihat Peta" ,
		cJs 		: "laporan/all/rptmaps&cKoordinat=" + cKoordinat,
		cFormName	: "scopen_maps",  
		cIcon 		: 'fa fa-file' ,
		lDock 		: false, 
		lModal		: true ,
		lHelp		: false
	}) ; 
	setTimeout(function(){
		scOSX.SetZIndex(OSX.scopen_maps.Obj,false) ;
	},1) ; 
}

/*Grid function Please*/
scGrid.GetHeader	= function(oObj,oObj_Header){
	$.each(oObj_Header, function(i,oObjMy){
		
	}) ; 
}

/*lpt print*/
var osxlpt		= {} ; 
scOSX.OpenPrint_Lpt	= function(cSessionPrinting,callback){
	//hanya berlaku satu proses
	//1. Tambahkan modal area 
	//2. Modal form	
	if(cSessionPrinting == undefined) cSessionPrinting 	= "" ;

	$("body#osx").prepend('<div id="bgModal"></div>') ; 
	scOSX.Form({
		cNama 		: "CETAK DOT MATRIX" ,
		cJs 		: "sys/print_lpt/print_lpt",
		cData 		: "cSessionPrinting=" + cSessionPrinting  , 
		cFormName	: "scprint_lpt",  
		cIcon 		: 'fa fa-print',
		lDock 		: false, 
		lModal		: true ,
		lHelp		: false,
		nWidth		: 550,
		nHeight		: 400
	}) ;  
	OSX.scprint_lpt.Obj.css("z-index","999999999") ; 
	if(callback !== undefined){
		OSX.scprint_lpt.Obj.on("remove",callback) ; 
	}
}

scOSX.LoadPage 	= function(cID,cPage,cParam,lReport){
	if(cParam == undefined) cParam 			= '' ; 
	if(lReport == undefined) lReport 		= false ;  
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
	
	//versi trigger
	//$("#"+cID).trigger("onLoad") ; 
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
scOSX.console	+= "\nossssssssssso  \t   occccccccccccccc screativ.com th .2015 by amir.ramadhany@gmail.com and team" ; 
console.log(scOSX.console) ; 