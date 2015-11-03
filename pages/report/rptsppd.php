<?php 
    $cPageSource   = GetLocationFile(__FILE__) ; 
    $vaDate         = scDate::Date2Var(date("Y-m-d")) ; 
?>
<section class="content-header">
    <h1>
        Lihat SPPD
    </h1> 
    <ol class="breadcrumb">
        <li><a href=""><i class="fa fa-envelope"></i>Lihat SPPD</a></li> 
    </ol>
</section> 
<section class="content">
    <div class="nav-tabs-custom">
        <ul class="nav nav-tabs" id="myTabs">
            <li class="active"><a href="#tab_1" data-toggle="tab" id="trsppd_tab_1">Daftar SPPD</a></li> 
            <li class="pull-right bg-danger no-margin" style="padding-right:10px ;padding-left:10px ">
                <h5 style="font-weight:bold;">
                    <?=$vaDate['Hari'] . " , " . $vaDate['Tgl'] . " " . $vaDate['Bulan'] . " " . $vaDate['Tahun']?>
                </h5>
            </li> 
        </ul>
        <div class="tab-content">
            <div class="tab-pane active full-height" id="tab_1"> 
                <form id="trsppd_filter">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="row">
                                <div class="col-sm-5">
                                    <label>Start Date</label>
                                    <input type="text" name="dTglAwal" id="dTglAwal" class="form-control sc-date text-center"
                                    <?=scDate::SetDataDate()?> value="<?=date("01-01-Y")?>">
                                    <Input type="hidden" name="cPageSource" id="cPageSource" value="<?=$cPageSource?>"/>
                                </div>
                                <div class="col-sm-2" style="margin-top:30px">s/d</div>
                                <div class="col-sm-5">
                                    <label>End Date</label>
                                    <input type="text" name="dTglAkhir" id="dTglAkhir" class="form-control sc-date text-center"
                                    <?=scDate::SetDataDate()?> value="<?=date("d-m-Y")?>" >
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <label>Status</label>
                            <br />
                            <div class="radio-inline">
                                <label>
                                    <input type="radio" name="optStatusF" value="-" checked="true">
                                    Semua
                                </label>
                            </div>
                            <div class="radio-inline">
                                <label>
                                    <input type="radio" name="optStatusF" value="0">
                                    Diinput
                                </label>
                            </div>
                            <div class="radio-inline">
                                <label>
                                    <input type="radio" name="optStatusF" value="1">
                                    Dikerjakan
                                </label>
                            </div>
                            <div class="radio-inline">
                                <label>
                                    <input type="radio" name="optStatusF" value="2">
                                    Selesai
                                </label> 
                            </div>
                        </div>
                        <div class="col-sm-1"  style="margin-top:20px">
                            <button type="button" name="cmdFilter" id="cmdFilter" class="btn btn-primary">Filter</button>
                        </div>
                    </div>
                </form>
                <hr />
                <div id="gr_trsppd" style="width:100%;height:500px"></div>
            </div>
        </div><!-- /.tab-content -->
    </div> 
</section>  
<script type="text/javascript">
OBJFORM_NEW.trsppd                  = {} ;
OBJFORM_NEW.trsppd.ID               = "trsppd_filter" ; 
OBJFORM_NEW.trsppd.Obj              = $("#trsppd_filter") ; 
OBJFORM_NEW.trsppd.ObjFilter        = $("#trsppd_filter") ; 
OBJFORM_NEW.trsppd.Url              = OBJFORM_NEW.trsppd.Obj.find("#cPageSource").val().replace("./pages/","") ; 
OBJFORM_NEW.trsppd.Url_A            = OBJFORM_NEW.trsppd.Obj.find("#cPageSource").val() + ".ajax.php"; 
OBJFORM_NEW.trsppd.Grid1_Data       = null ; 
OBJFORM_NEW.trsppd.Grid1_LoadData= function(){
    OBJFORM_NEW.trsppd.Grid1_Data               = scGetDataJSON(OBJFORM_NEW.trsppd.ObjFilter.find("#cmdFilter")) ;  ; 
    OBJFORM_NEW.trsppd.Grid1_Data["cPar"]       = OBJFORM_NEW.trsppd.Url_A ;
    OBJFORM_NEW.trsppd.Grid1_Data["cFunction"]  = "Grid1_Load" ; 
}

OBJFORM_NEW.trsppd.Grid1_Load   = function(){
    $("#gr_trsppd").w2grid({ 
        name    : OBJFORM_NEW.trsppd.ID + '_grid1',  
        limit   : 100 ,
        url     : "./sc.core.php", 
        postData: OBJFORM_NEW.trsppd.Grid1_Data ,
        show: {   
            toolbar         : true,
            toolbarReload   : false, 
            toolbarColumns  : false
        },
        multiSearch: true,
        columns: [   
            { field: 'code', caption: 'No SPPD', size: '150px', sortable: true,attr:'align=center' },  
            { field: 'date', caption: 'Tanggal', size: '80px', sortable: true,attr:'align=center'},
            { field: 'status', caption: 'Status', size: '100px', sortable: true,attr:'align=center'},
            { field: 'purpose', caption: 'Maksud', size: '250px', sortable: true},
            { field: 'nip_pejabat', caption: 'Pemberi Perintah', size: '200px', sortable: true},
            { field: 'nip_leader', caption: 'yang diperintah', size: '200px', sortable: true},
            { field: 'place_to', caption: 'Tujuan', size: '150px', sortable: true },
            { field: 'date_go', caption: 'Berangkat', size: '80px', sortable: true,attr:'align=center'},
            { field: 'date_back', caption: 'Kembali', size: '80px', sortable: true,attr:'align=center'}, 
            { field: 'username', caption: 'User Input', size: '100px', sortable: true,attr:'align=center'}
        ]
    });   
} 
OBJFORM_NEW.trsppd.Grid1_SetData    = function(){
    w2ui[OBJFORM_NEW.trsppd.ID + '_grid1'].postData     = OBJFORM_NEW.trsppd.Grid1_Data ; 
}
OBJFORM_NEW.trsppd.Grid1_Reload     = function(){
    w2ui[OBJFORM_NEW.trsppd.ID + '_grid1'].reload() ;
}    
OBJFORM_NEW.trsppd.Grid1_Destroy    = function(){
    w2ui[OBJFORM_NEW.trsppd.ID + '_grid1'].destroy() ; //hancurkan grid biar bisa dilihat lagi
}
OBJFORM_NEW.trsppd.Grid1_Render     = function(){ 
    $("#gr_trsppd").w2render(OBJFORM_NEW.trsppd.ID + '_grid1') ; 
}

OBJFORM_NEW.trsppd.Grid1_ReloadData = function(){
    OBJFORM_NEW.trsppd.Grid1_LoadData() ; 
    OBJFORM_NEW.trsppd.Grid1_SetData() ; 
    OBJFORM_NEW.trsppd.Grid1_Reload() ;   
} 

OBJFORM_NEW.trsppd.Edit             = function(code){
    ChangePage("#"+OBJFORM_NEW.trsppd.Url+".add&code=" + code) ; 
}

OBJFORM_NEW.trsppd.Delete           = function(code){
    if(confirm("Data dihapus ? ")){
        scAjax(OBJFORM_NEW.trsppd.Url_A,'Deleting','code=' + code) ; 
    }
}

OBJFORM_NEW.trsppd.Print            = function(code){
    //if(confirm("Akan mencetak SPPD ?\nJika SPPD dicetak data tidak bisa dihapus")){
        FRAME_PDF(true,"sc.reportme.php?scRpt="+OBJFORM_NEW.trsppd.Url+"&code=" + code) ; 
    //}   
}

$(function(){
    //init 
    OBJFORM_NEW.trsppd.Grid1_LoadData() ; 
    OBJFORM_NEW.trsppd.Grid1_Load() ; 
    scForm.InitDate({
        cClass : "#" + OBJFORM_NEW.trsppd.ID + " .sc-date"
    }) ;

    //event
    $("#cmdFilter").on("click",function(e){
        e.preventDefault() ; 
        OBJFORM_NEW.trsppd.Grid1_ReloadData() ; 
    }) ; 
}) ; 
</script>