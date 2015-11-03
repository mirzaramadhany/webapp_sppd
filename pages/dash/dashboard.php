<?php
    $cLocFile   = GetLocationFile(__FILE__) ; 
?>
<section class="content-header">
    <h1 style="display:inline-block">
        Dashboard 
    </h1>
    <form id="frmdah" class="form-inline pull-right" style="display:inline-block;margin-top:-5px;">
        <div class="form-group">
            <label>Start Date</label>
            <input type="text" name="dTglAwal" id="dTglAwal" class="form-control sc-date text-center"
            <?=scDate::SetDataDate()?> value="<?=date("d-01-Y")?>">
            <input type="hidden" name="cPageSource" id="cPageSource" value="<?=$cLocFile?>">
        </div>
        <div class="form-group">
            <label>End Date</label> 
            <input type="text" name="dTglAkhir" id="dTglAkhir" class="form-control sc-date text-center"
            <?=scDate::SetDataDate()?> value="<?=date("d-m-Y")?>">
            <input type="hidden" name="code_type" id="code_type" value="1">
        </div>
        <button type="button" class="btn btn-primary" id="cmdView" name="cmdView">View Data</button>
    </form>
</section> 

<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-sm-3 col-sm-offset-3">
            <div class="small-box bg-aqua">
                <div class="inner">
                  <h3 id="nDash_sppd">0</h3>
                  <p>Total SPPD</p>
                </div>
                <div class="icon">
                  <i class="ion ion-ios-cloud-download-outline"></i>
                </div>
                <a href="#" class="small-box-footer" onclick="ChangePage('#report/rptsppd')">
                    More info <i class="fa fa-arrow-circle-right"></i>
                </a>
            </div>
        </div>
        <div class="col-sm-3">  
            <div class="small-box bg-red">
                <div class="inner">
                  <h3 id="nDash_sppd_new">0</h3>
                  <p>Total SPPD belum selsai</p>
                </div>
                <div class="icon">
                  <i class="ion ion-ios-email-outline"></i>
                </div>
                <a href="#" class="small-box-footer" onclick="ChangePage('#report/rptsppd')">
                    More info <i class="fa fa-arrow-circle-right"></i>
                </a>
            </div>
        </div>
        <div class="col-sm-12"><hr style="border-color:rgba(0, 0, 0, 0.1);" /></div>
        <div class="col-sm-8">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs" id="myTabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab" id="inmsg_tab">Chart SPPD Perbulan</a></li> 
                    <li class="pull-right"><h4>Klik Untuk Detail</h4></li>
                </ul> 
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_1" style="height:300px">  
                    </div>  
                </div>
            </div>
        </div> 
        <div class="col-sm-4">
            <div class="nav-tabs-custom" id="wrap_myTabs2">
            </div>
        </div>
    </div>
</section><!-- /.content -->

<script type="text/javascript" src="./sapeltucore/sc_credits/chart/chart/Chart.min.js"></script> 
<script type="text/javascript" src="<?=$cLocFile?>.js"></script>