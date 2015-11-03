<?php 
    $cPageSource    = GetLocationFile(__FILE__) ;   
    $dTgl           = date("d-m-Y") ;
    $dTglString     = date("Y-m-d") ;
    $vaTgl          = explode("-", $dTglString) ; 
    $vaDate         = scDate::Date2Var($dTglString) ; 
?>
<style type="text/css">
    .sc-date{text-align: center;}
    .sc-number{text-align: right;}
</style>
<section class="content-header">
    <h1>
        SPPD
    </h1>
    <ol class="breadcrumb">
        <li><a href=""><i class="fa fa-user"></i>SPPD</a></li> 
    </ol>
</section> 
<form id="trsppd">
<section class="content">
    <div class="nav-tabs-custom">
        <ul class="nav nav-tabs" id="myTabs">
            <li class="active"><a href="#tab_1" data-toggle="tab" id="trsppd_tab_1">Data SPPD</a></li> 
            <li id="wrapInput"></li>
            <li class="pull-right bg-danger no-margin" style="padding-right:10px ;padding-left:10px ">
                <h5 style="font-weight:bold;">
                    <?=$vaDate['Hari'] . " , " . $vaDate['Tgl'] . " " . $vaDate['Bulan'] . " " . $vaDate['Tahun']?>
                </h5>
            </li> 
        </ul>
        <div class="tab-content">
            <div class="tab-pane active full-height" id="tab_1">  
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-5">
                            <label>Pejabat yang memberi perintah</label>
                            <input type="text" name="nip_pejabat" id="nip_pejabat" 
                            class="form-control sc-input-required sc-select" 
                            placeholder="Pejabat yang memberi perintah" data-sf="LoadNip">
                            <input type="hidden" name="cPageSource" id="cPageSource" 
                            value="<?=$cPageSource?>">
                            <input type="hidden" name="code" id="code" >
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Maksud Perjalanan Dinas</label>
                    <input type="text" name="purpose" id="purpose"
                    class="form-control sc-input-required" placeholder="Maksud Perjalanan Dinas">
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label>Alat Angkut yang dipergunakan</label>
                            <input type="text" name="transport" id="transport" 
                            class="form-control sc-input-required" 
                            placeholder="Alat Angkut yang dipergunakan">
                        </div>
                        <div class="col-sm-3">
                            <label>Tempat Berangkat</label>
                            <input type="text" name="place_from" id="place_from" 
                            class="form-control sc-input-required" 
                            placeholder="Tempat Berangkat">
                        </div>
                        <div class="col-sm-3">
                            <label>Tempat Tujuan</label>
                            <input type="text" name="place_to" id="place_to" 
                            class="form-control sc-input-required" 
                            placeholder="Tempat Tujuan">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-2">
                            <label>Lama Perjalanan (Hari)</label>
                            <input type="text" name="length_journey" id="length_journey" 
                            class="form-control sc-input-required sc-number" value="1" 
                            placeholder="Lama Perjalanan">
                        </div>
                        <div class="col-sm-2">
                            <label>Tgl Berangkat</label>
                            <input type="text" name="date_go" id="date_go" 
                            class="form-control sc-input-required sc-date" value="<?=$dTgl?>"
                            placeholder="Tgl Berangkat" <?=scDate::SetDataDate()?>>
                        </div>
                        <div class="col-sm-2">
                            <label>Tgl Kembali</label>
                            <input type="text" name="date_back" id="date_back" 
                            class="form-control sc-input-required sc-date" value="<?=$dTgl?>" 
                            placeholder="Tgl Kembali" <?=scDate::SetDataDate()?>>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label>Pegawai yang diperintah</label>
                            <input type="text" name="nip_leader" id="nip_leader" 
                            class="form-control sc-input-required sc-select" 
                            placeholder="Pegawai yang diperintah" data-sf="LoadNip">
                        </div>
                        <div class="col-sm-2">
                            <label>Tingkat Perjalanan</label>
                            <input type="text" name="rate_travel" id="rate_travel"
                            class="form-control sc-input-required" placeholder="Tingkat Perjalanan">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Pengikut &nbsp;&nbsp;<small style="opacity:.7"><i>(optional)</i></small></label>
                    <input type="text" name="nip" id="nip" 
                    class="form-control sc-select-multi" 
                    placeholder="Pengikut" data-sf="LoadNip">
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-4">
                            <label>Instansi (Pembebanan Anggaran)</label>
                            <input type="text" name="government" id="government" 
                            class="form-control sc-input-required" 
                            placeholder="Instansi (Pembebanan Anggaran)">
                        </div>
                        <div class="col-sm-2">
                            <label>Mata Aggaran</label>
                            <input type="text" name="budget_from" id="budget_from" 
                            class="form-control sc-input-required" 
                            placeholder="Mata Aggaran">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Keterangan Lain &nbsp;&nbsp;<small style="opacity:.7"><i>(optional)</i></small></label>
                    <input type="text" name="description" id="description" 
                    class="form-control" placeholder="Keterangn Lain">
                </div>
                <hr />
                <div class="form-group">
                    <label>Dasar Surat</label>
                    <input type="text" name="letter_content" id="letter_content" 
                    class="form-control  sc-input-required" placeholder="Dasar Surat">
                </div>
                <button type="button" class="btn btn-primary" id="cmdSave" name="cmdSave">Simpan</button>
            </div>
        </div><!-- /.tab-content -->
    </div> 
</section>
</form> 
<script type="text/javascript">
OBJFORM_NEW.trsppd          = {} 
OBJFORM_NEW.trsppd.ID       = "trsppd" ; 
OBJFORM_NEW.trsppd.Obj      = $("#trsppd") ; 
OBJFORM_NEW.trsppd.Url      = OBJFORM_NEW.trsppd.Obj.find("#cPageSource").val().replace("pages/","") ; 
OBJFORM_NEW.trsppd.Url_A    = OBJFORM_NEW.trsppd.Obj.find("#cPageSource").val() + ".ajax.php"; 
OBJFORM_NEW.trsppd.tTgl     = new Date(<?=$vaTgl[0]?>,<?=$vaTgl[1]?>,<?=$vaTgl[2]?>).getTime() ; 

$(function(){
    //init
    scForm.InitSelect({
        cClass : "#" + OBJFORM_NEW.trsppd.ID + " .sc-select",
        minimumInputLength : 2
    }) ; 
    scForm.InitSelect({
        cClass : "#" + OBJFORM_NEW.trsppd.ID + " .sc-select-multi",
        lMulti : true ,
        minimumInputLength : 2
    }) ;
    scForm.InitDate({
        cClass : "#" + OBJFORM_NEW.trsppd.ID + " .sc-date"
    }) ;
    scForm.InitNumber(0,"#" + OBJFORM_NEW.trsppd.ID + " .sc-number") ; 

    //event
    OBJFORM_NEW.trsppd.Obj
    .find("#date_go").on("change",function(){
        vaSplit = $(this).val().split("-") ; 
        tAcuan  = new Date(vaSplit[2],vaSplit[1],vaSplit[0]).getTime() ; 
        if(tAcuan < OBJFORM_NEW.trsppd.tTgl){
            $(this).val("<?=$dTgl?>") ; 
        }else{
            OBJFORM_NEW.trsppd.Obj.find("#date_back").val(vaSplit[0]+"-"+vaSplit[1]+"-"+vaSplit[2]) ;
        }
        $(this).blur() ;
    }) ; 
    OBJFORM_NEW.trsppd.Obj
    .find("#date_back").on("change",function(){
        vaSplit = $(this).val().split("-") ; 
        tAcuan  = new Date(vaSplit[2],vaSplit[1],vaSplit[0]).getTime() ; 
        vaSplit = OBJFORM_NEW.trsppd.Obj.find("#date_go").val().split("-") ; 
        tBrgkt  = new Date(vaSplit[2],vaSplit[1],vaSplit[0]).getTime() ; 
        if(tAcuan < tBrgkt){
            $(this).val(vaSplit[0]+"-"+vaSplit[1]+"-"+vaSplit[2]) ;
        }
        $(this).blur() ;
    }) ; 

    OBJFORM_NEW.trsppd.Obj
    .find("#nip_leader").on("select2-selecting",function(e){ 
        scAjax(OBJFORM_NEW.trsppd.Url_A,'CheckPegawai','nip=' + e.val + '&id=nip_leader' +
            '&date_go=' + OBJFORM_NEW.trsppd.Obj.find("#date_go").val() +
            '&date_back=' + OBJFORM_NEW.trsppd.Obj.find("#date_back").val() ) ;
    }) ; 

    OBJFORM_NEW.trsppd.Obj
    .find("#nip").on("select2-selecting",function(e){ 
        scAjax(OBJFORM_NEW.trsppd.Url_A,'CheckPegawaiPendamping','nip=' + e.val + '&id=nip' +
            '&val=' + JSON.stringify(OBJFORM_NEW.trsppd.Obj.find("#nip").select2("data")) +
            '&date_go=' + OBJFORM_NEW.trsppd.Obj.find("#date_go").val() +
            '&date_back=' + OBJFORM_NEW.trsppd.Obj.find("#date_back").val() ) ; 
    }) ; 

    OBJFORM_NEW.trsppd.Obj
    .find("#cmdSave").on("click",function(e){
        e.preventDefault() ;
        if(scValidationForm(this,true)){
            scAjax(OBJFORM_NEW.trsppd.Url_A,'Saving',scGetDataForm(this),this ) ; 
        }
    }) ; 
}) ; 
</script> 
<?php 
if(isset($_GET['code'])){ 
?>
<script type="text/javascript">
    scAjax(OBJFORM_NEW.trsppd.Url_A,'Editing', 'code=<?=$_GET['code']?>') ; 
</script>
<?php 
}else{
?>
<script type="text/javascript">
    $(function(){
        OBJFORM_NEW.trsppd.Obj.find("#nip_pejabat").select2("open") ;
    }) ; 
</script>
<?php
}
?>