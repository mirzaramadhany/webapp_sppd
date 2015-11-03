var cRPT_Data       = "" ; 
var cRPT_Loc        = "" ; 
var cRPT_LocAjax    = "" ;  
var vaSYS_Loc_Pages = [] ; 
var nSYS_Loc_Pages  = 2 ; 
var nSYS_Loc_Pages_L= 0 ; 

$(window).ready(function(e){
    $("#oWrapModal_Report").find(".cmdViewReport").click(function(e){
        e.preventDefault() ; 
        cRPT_Data   = scGetDataForm(this) ; 
        cRPT_Loc    = $('#oWrapModal_Report').find('#cLoc').val() ; 
        var lAjax   = $("#oWrapModal_Report").find("#lAjax").val() ;   
        if(lAjax !== undefined || lAjax){
            cRPT_LocAjax    = "./pages/"+cRPT_Loc+".ajax.php" ;
            scAjax(cRPT_LocAjax,"StartReport", cRPT_Data , this) ; 
        }else{ 
            __RPTOPEN(cRPT_Loc ,cRPT_Data) ; 
        } 
    }) ; 

    $("#oWrapModal_Report").on("hidden.bs.modal",function(e){
        scAjax("./pages/ajaxload/proload.ajax.php","RemoveSessionCabang") ; 
        $("#oWrapModal_Report").find(".cmdViewReport").button('reset') ; 
    }) ; 

    $("#oWrapModal_ReportView").on("hidden.bs.modal",function(e){
        $(this).find(".modal-body").html('<iframe src="" id="modal-content" frameborder="0" width="100%" height="100%"></iframe>') ; 
        $(this).find(".modal-title-me").html("Laporan") ; 
    }) ; 

	//new form mirza
    $(".box-header, .nav-tabs").css("cursor","move");
    $(".connectedSortable").sortable({
        placeholder: "sort-highlight",
        connectWith: ".connectedSortable",
        handle: ".box-header, .nav-tabs",
        forcePlaceholderSize: true,
        zIndex: 999999
    }).disableSelection(); 

    //fixed menu
    //change_layout() ;  
     
    $('.scmenu').find('a')
    .click(function(e){
        e.preventDefault() ; 
        cPage   = $(this).attr("href") ; 
        ChangePage(cPage) ;  
    }) ;  
}) ;


function scLoadPage_Callback(cID,cPage){
    //push page
    if(cID == "sc-content-load"){
        vaSYS_Loc_Pages.push(cPage) ;       
    }
}

function ChagePage(cPage){
    ChangePage(cPage) ; 
}

function ChangePage(cPage){
    if(cPage.length > 1){
        cPage   = cPage.substr(1) ; 
        if(objDashboard !== null && objDashboard !== undefined){
            clearTimeout(objDashboard) ;     
        }
        
        RemoveObjectNew() ; 

        scLoadPage('sc-content-load',cPage) ;   
    } 
}

function __FRAMEBACK() {
    if(vaSYS_Loc_Pages.length == nSYS_Loc_Pages_L){
        nSYS_Loc_Pages++ ; 
    }else{
        nSYS_Loc_Pages          = 2 ; 
        nSYS_Loc_Pages_L        = vaSYS_Loc_Pages.length ; 
    }

    scLoadPage('sc-content-load',vaSYS_Loc_Pages[Math.max( vaSYS_Loc_Pages.length-nSYS_Loc_Pages ,0)],"",false,false) ;   
} 

function __FRAMEHOME() {
    ChangePage("#"+vaSYS_Loc_Pages[0]) ; 
} 

function RemoveObjectNew(){ 
    $.each(OBJDASH_NEW,function(i){
        clearTimeout(OBJDASH_NEW[i]) ;
    }) ;

    OBJFORM_NEW = {} ;
    //remove w2ui
    if(w2ui !== undefined){
        w2ui        = {} ; 
    }
}

function __RPTOPEN(cLoc,cData){
    scLoadPage("oWrapModal_ReportView #modal-content",cLoc ,cData,true,false) ;     
    $("#oWrapModal_ReportView").modal("show") ;
}

function __RPTPROGRESS(nStart,nEnd){
    var nEt   = parseFloat(100 / parseInt(nEnd)) ; 
    var nPro  = parseFloat(nEt*10*nStart) ;  
    nPro      = Math.min(nPro,100) ; 

    $("#wrapLoading .progress-bar").attr("aria-valuenow",nPro) ; 
    $("#wrapLoading .progress-bar").css("width",nPro + "%") ;  
    $("#wrapLoading .progress-bar").html( parseInt(nPro) + "% Proses") ; 
}