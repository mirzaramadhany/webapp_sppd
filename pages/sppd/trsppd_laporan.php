<?php 
    $cPageSource    = GetLocationFile(__FILE__) ;  
    $vaDate         = scDate::Date2Var(date("Y-m-d")) ; 
?>     

<section class="content-header">
    <h1>
        Pelaporan SPPD
    </h1>
</section>

<section class="content">
    <form name="trsppd_laporan" id="trsppd_laporan">
        <section class="content">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs" id="myTabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab" id="trsppd_laporan_tab_1">Pelaporan SPPD</a></li> 
                    <li class="pull-right bg-danger no-margin" style="padding-right:10px ;padding-left:10px ">
                        <h5 style="font-weight:bold;">
                            <?=$vaDate['Hari'] . " , " . $vaDate['Tgl'] . " " . $vaDate['Bulan'] . " " . $vaDate['Tahun']?>
                        </h5>
                    </li> 
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active full-height" id="tab_1"> 
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Nomor SPPD</label>
                                    <input type="text" name="code" id="code" 
                                    class="form-control sc-input-required sc-select "
                                    placeholder="Nomor SPPD" data-sf="LoadSPPD_Pelaporan"> 
                                    <input type="hidden" name="cPageSource" id="cPageSource" value="<?=$cPageSource?>">
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="from-group">
                            <label>Maksud dan Tujuan SPPD</label>
                            <div id="purpose"></div>
                        </div>
                        <div class="from-group">
                            <div class="row">
                                <div class="col-sm-6">
                                    <label>Tempat yang dituju</label>
                                    <div id="place_to"></div>
                                </div>
                                <div class="col-sm-2">
                                    <label>Untuk Selama</label>
                                    <div id="length_journey"></div>
                                </div>
                                <div class="col-sm-2"> 
                                    <label>Berangkat Tanggal</label>
                                    <div id="date_go"></div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="from-group">
                            <label>Laporan</label>
                            <textarea id="result" name="result" class="form-control sc-input-required" 
                            placeholder="Laporan"></textarea>
                        </div>
                        <hr />
                        <button type="button" class="btn btn-primary" style="display:inline-block" 
                        id="cmdSave" name="cmdSave">Save</button>
                        <div id="wrapPrint" style="display:inline-block"></div>
                    </div>
                </div>
            </div>
        </section>
    </form>
</section>  

<script type="text/javascript"> 
OBJFORM_NEW.trsppd_laporan           = {}  
OBJFORM_NEW.trsppd_laporan.ID        = "trsppd_laporan" ; 
OBJFORM_NEW.trsppd_laporan.Obj       = $("#trsppd_laporan") ;  
OBJFORM_NEW.trsppd_laporan.Url       = OBJFORM_NEW.trsppd_laporan.Obj.find("#cPageSource").val().replace("pages/","") ; 
OBJFORM_NEW.trsppd_laporan.Url_A     = OBJFORM_NEW.trsppd_laporan.Obj.find("#cPageSource").val() + ".ajax.php"; 

OBJFORM_NEW.trsppd_laporan.Init      = function(){
    OBJFORM_NEW.trsppd_laporan.Obj.find("#cmdPrint").remove() ; 
}
OBJFORM_NEW.trsppd_laporan.Print            = function(code){
    FRAME_PDF(true,"sc.reportme.php?scRpt="+OBJFORM_NEW.trsppd_laporan.Url+"&code=" + code) ; 
} 

$(function(){
    //init
    scForm.InitSelect({
        cClass              : "#" + OBJFORM_NEW.trsppd_laporan.ID + " .sc-select" ,
        minimumInputLength  : 2
    }) ;
    OBJFORM_NEW.trsppd_laporan.Obj
    .find("#code").select2("open") ;

    OBJFORM_NEW.trsppd_laporan.Obj
    .find("#cmdSave").on("click",function(e){
        e.preventDefault() ; 
        if(scValidationForm(this,true)){ 
            scAjax(OBJFORM_NEW.trsppd_laporan.Url_A,'Saving',scGetDataForm(this),this) ; 
        }
    }) ;
    OBJFORM_NEW.trsppd_laporan.Obj
    .find("#code").on("select2-selecting",function(e){
        OBJFORM_NEW.trsppd_laporan.Init() ; 
        scAjax(OBJFORM_NEW.trsppd_laporan.Url_A,'Editing','code=' + e.val) ; 
    }) ;
}) ; 
</script> 
 