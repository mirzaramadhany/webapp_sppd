<?php 
    //initialize for locaiton file
    $cPageSource    = GetLocationFile(__FILE__) ; 
?>
<section class="content-header">
    <h1>
        System
        <small>Database</small>
    </h1>
    <ol class="breadcrumb">
        <li><a ><i class="fa fa-dashboard"></i> System</a></li>
        <li class="active">Database</li>
    </ol> 
</section>
<br />
<section class="content">
    <form role="form" name="frmDb" id="frmDb">
        <input type="hidden" name="cPageSource" id="cPageSource" value="<?=$cPageSource?>" />
    </form>
    <div class="nav-tabs-custom">
        <ul class="nav nav-tabs pull-right">
            <li><a href="#tab_3" data-toggle="tab">Repair Database</a></li>
            <li><a href="#tab_2" data-toggle="tab">Restore Database</a></li>
            <li class="active"><a href="#tab_1" data-toggle="tab">Backup Database</a></li>
            <li class="pull-left header"><i class="fa fa-th"></i> Database Maintance</li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="tab_1">
                <label>Process</label>
                <div class="row">
                    <div class="col-sm-10">
                        <div class="progress progress-striped active">
                            <div class="progress-bar progress-bar-red" role="progressbar" 
                                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                                <span class="sr-only">0% Complete</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2 cText">
                        0 / 0
                    </div>
                    <div class="col-sm-12">&nbsp;</div>
                    <div class="col-sm-2">
                        <button class="btn btn-danger cmdBackup" data-loading-text="Loading...">Backup Database</button>        
                    </div>
                    <div class="col-sm-10">
                        <label id="cReturn"></label>     
                    </div>
                </div>
            </div><!-- /.tab-pane --> 
            <div class="tab-pane" id="tab_2">
                <label>File Backup</label>
                <div class="row">
                    <div class="col-sm-10">
                        <input type="file" name="cFileRestore" id="cFileRestore" placeholder="File Backup" class="form-control">
                    </div>
                </div>
                <label>Process Restore</label>
                <div class="row">
                    <div class="col-sm-10">
                        <div class="progress progress-striped active">
                            <div class="progress-bar progress-bar-red" role="progressbar" 
                                aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                                <span class="sr-only">0% Complete</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2 cText">
                        0 / 0
                    </div>
                    <div class="col-sm-12">&nbsp;</div>
                    <div class="col-sm-2"> 
                        <button class="btn btn-danger cmdRestore" data-loading-text="Loading...">Restore Database</button>        
                    </div> 
                </div> 
            </div><!-- /.tab-pane -->
            <div class="tab-pane" id="tab_3">
            </div><!-- /.tab-pane --> 
        </div><!-- /.tab-content -->
    </div><!-- nav-tabs-custom -->
</section>
 
<script type="text/javascript" src="<?=$cPageSource?>.js"></script> 