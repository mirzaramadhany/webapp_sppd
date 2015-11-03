    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"> 
            <?=scSys::SCLicence()?>  
            <title><?=scSys::GetConfig("sc_front_title")?></title> 
            <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
            <!-- bootstrap 3.0.2 -->
            <link href="./sapeltucore/sc_credits/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css" />
            <!-- font Awesome -->
            <link href="./sapeltucore/sc_credits/icon/font-awesome.min.css" rel="stylesheet" type="text/css" />
            <!-- Ionicons -->
            <link href="./sapeltucore/sc_credits/icon/ionicons.min.css" rel="stylesheet" type="text/css" />
            
            <!-- Theme style -->
            <link href="./sapeltucore/sc_credits/adminlte/adminv2.css" rel="stylesheet" type="text/css" />

            <!-- DatePicker -->  
            <link href="./sapeltucore/sc_credits/datepicker/bootstrap-datetimepicker.css" rel="stylesheet"> 

            <!-- Notifi -->
            <link href="./sapeltucore/sc_credits/pnotify/pnotify.custom.min.css" rel="stylesheet">             

            <!-- Sapeltu --> 
            <!-- DataTable --> 
            <link href="./sapeltucore/sc_credits/select2/select2.css" rel="stylesheet"> 
            <link href="./sapeltucore/sc_credits/fancy/jquery.fancybox.css" rel="stylesheet"> 
            <link href="./sapeltucore/sc_credits/datatables/dataTables.bootstrap.css" rel="stylesheet">  
            
            <!-- w2ui -->
            <link href="./sapeltucore/sc_credits/w2/w2ui.min.css" rel="stylesheet"> 

            <link href="./default.css" rel="stylesheet">
        </head>    
        <body class="skin-blue" data-bismillahauth="<?=GetSession("bismillahauth")?>">
            <!-- header logo: style can be found in header.less -->
            <audio id="wrapAudioNotif">
                <source type="audio/mpeg" src="./uploaded/tone/notif.mp3"></source>
            </audio>
            <header class="header">
                <a href="./" class="logo">
                    <!-- Add the class icon to your logo image or logo icon to add the margining -->
                    SPPD
                </a>
                <!-- Header Navbar: style can be found in header.less -->
                <nav class="navbar navbar-static-top" role="navigation" style="text-align:center"> 
                    <!-- Sidebar toggle button-->

                    <a href="./" class="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    
                    <div class="btn-group" role="group" aria-label="Navigation Button">
                        <button type="button" class="btn btn-primary navbar-btn" title="Back Menu" 
                            onClick="__FRAMEBACK()" style="font-size:16px;">
                            <i class="fa fa-chevron-circle-left"></i>
                        </button>
                        <button type="button" class="btn btn-primary navbar-btn" title="Home Menu"  
                            onClick="__FRAMEHOME()" style="font-size:16px;">
                            <i class="fa fa-home"></i>
                        </button>
                    </div>

                    <div class="navbar-right">
                        <ul class="nav navbar-nav">
                            <li class="dropdown notifications-menu">
                                <a href="" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-warning"></i>
                                    <span class="label label-danger" id="oNotif_Count"></span>
                                </a>  
                                <ul class="dropdown-menu">
                                    <li class="header" id="oNotif_Header">Notification</li>
                                    <li> 
                                        <!-- inner menu: contains the actual data -->
                                        <ul class="menu scmenu" id="oNotif_Body">
                                        </ul>
                                    </li> 
                                </ul>
                            </li> 
                            <!-- User Account: style can be found in dropdown.less -->
                            <li class="dropdown user user-menu">
                                <a href="" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="glyphicon glyphicon-user"></i>
                                    <span><?=GetSession("cSession_FullName")?> <i class="caret"></i></span>
                                </a>  
                                <ul class="dropdown-menu">
                                    <!-- User image -->
                                    <li class="user-header bg-light-blue">
                                        <img src="<?=scSys::GetAvatar()?>" class="img-thumbails" alt="User Image" />
                                        <p>
                                            <?=GetSession("cSession_FullName")?>
                                            <small>Welcome <?=GetSession("cSession_FullName")?></small>
                                        </p> 
                                    </li> 
                                    <!-- Menu Footer-->
                                    <li class="user-footer">
                                        <div class="pull-left">
                                            <a href="" 
                                            class="btn btn-default btn-flat" id="mee">Profile</a>
                                        </div> 
                                        <div class="pull-right">  
                                            <a href="./logout.php" class="btn btn-default btn-flat cmdExit">Logout</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <div class="wrapper row-offcanvas row-offcanvas-left">
                <!-- Left side column. contains the logo and sidebar -->
                <aside class="left-side sidebar-offcanvas">
                    <!-- sidebar: style can be found in sidebar.less -->
                    <section class="sidebar">
                        <!-- Sidebar user panel -->
                        <div class="user-panel">
                            <div class="pull-left image">
                                <img src="<?=scSys::GetAvatar()?>" class="img-thumbails" alt="User Image" />
                            </div> 
                            <div class="pull-left info">
                                <?php
                                    $cFullName  = substr(GetSession("cSession_FullName"), 0, strpos(GetSession("cSession_FullName"), " ")) ;
                                    if($cFullName == ""){
                                        $cFullName = GetSession("cSession_FullName") ; 
                                    } 
                                ?>
                                <p>Hello, <?=$cFullName?></p> 
       
                                <a href="./#"><i class="fa fa-circle text-success"></i>
                                 <span id="oStatusOnline">Online</span></a>
                            </div>
                        </div> 

                        <!-- sidebar menu: : style can be found in sidebar.less -->
                        <ul class="sidebar-menu scmenu"> 
                            <?php
                                include_once "./sc.menubar.php" ; 
                                $objMenu = new scMenu(false) ;
                                $objMenu->SetMenu() ; 
                            ?>
                        </ul> 
                    </section>   
                    <!-- /.sidebar -->
                </aside>

                <!-- Right side column. Contains the navbar and content of the page -->
                <aside class="right-side" id="sc-content-load">
                    <!-- Content Header (Page header) -->
                    <section class="content-header">
                        <h1>
                            Dashboard
                            <small>Control panel</small>
                        </h1>
                        <ol class="breadcrumb">
                            <li><a href="./#"><i class="fa fa-dashboard"></i> Home</a></li>
                            <li class="active">Dashboard</li>
                        </ol>
                    </section>
 
                    <!-- Main content -->
                    <section class="content">
                        
                    </section><!-- /.content -->
                </aside><!-- /.right-side -->
            </div><!-- ./wrapper -->

            <!-- add Modal For Laporan -->
            <div class="modal fade" id="oWrapModal_Report" tabindex="-1" role="dialog" aria-hidden="true" >
                <div class="modal-dialog" style="border-radius:0px;width:60%;">
                    <div class="modal-content">
                        <div class="modal-header bg-red">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title"><i class="fa fa-file-o"></i>&nbsp;&nbsp; Buka Laporan</h4>
                        </div> 
                        <form role="form" name="frmModal_Report" id="frmModal_Report"> 
                        <div class="modal-body"> 
                            <div class="nav-tabs-custom">
                                <ul class="nav nav-tabs" id="myTabs"> 
                                    <li class="active"><a href="#oWrapModal_ReportData" data-toggle="tab">Data</a></li>  
                                    <li ><a href="#tab_2" data-toggle="tab">Report Setting</a></li>  
                                </ul> 
                                <div class="tab-content"> 
                                    <div class="tab-pane active" id="oWrapModal_ReportData" 
                                    style="overflow-y:scroll;overflow-x:hidden;height:350px;"> 
                                        
                                    </div> 
                                    <div class="tab-pane" id="tab_2"> 
                                        <div class="row">
                                            <div class="col-sm-12"><b>Margin Setting</b></div>
                                            <div class="col-sm-2">
                                                <input type="number" name="nOpt_MTop" id="nOpt_MTop" value="<?=PDF_MARGIN_TOP?>" 
                                                class="form-control">
                                                <div class="text-center">Atas</div>
                                            </div> 
                                            <div class="col-sm-2">  
                                                <input type="number" name="nOpt_MLeft" id="nOpt_MLeft" value="<?=PDF_MARGIN_LEFT?>"
                                                class="form-control">
                                                <div class="text-center">Kiri</div>
                                            </div> 
                                            <div class="col-sm-2">
                                                <input type="number" name="nOpt_MRight" id="nOpt_MRight" value="<?=PDF_MARGIN_RIGHT?>"
                                                class="form-control">
                                                <div class="text-center">Kanan</div>
                                            </div> 
                                            <div class="col-sm-2">
                                                <input type="number" name="nOpt_MBottom" id="nOpt_MBottom" value="<?=PDF_MARGIN_BOTTOM?>"
                                                class="form-control">
                                                <div class="text-center">Bawah</div>
                                            </div> 
                                            <div class="col-sm-2">
                                                <input type="number" name="nOpt_MFooter" id="nOpt_MFooter" value="<?=PDF_MARGIN_FOOTER?>"
                                                class="form-control">
                                                <div class="text-center">Bag.Bawah</div> 
                                            </div> 
                                            <div class="col-sm-12"><hr /></div>
                                            <div class="col-sm-2">
                                                <input type="number" name="nFont" id="nFont" value="10"
                                                class="form-control">  
                                                <div class="text-center">
                                                    Ukuran Huruf
                                                </div>
                                            </div> 
                                            <div class="col-sm-2">
                                                <select name="cFormat" id="cFormat" class="form-control">
                                                    <option value="A3">A3</option>
                                                    <option value="A4" selected="selected">A4</option>
                                                    <option value="LETTER">LETTER</option>
                                                    <option value="LEGAL">LEGAL</option>
                                                    <option value="FOLIO">FOLIO</option>
                                                </select>
                                                <div class="text-center">
                                                    Ukuran Kertas
                                                </div>
                                            </div> 
                                            <div class="col-sm-2">
                                                <input type="text" name="cOri" id="cOri" value="P"
                                                class="form-control">  
                                                <div class="text-center">
                                                    Orientasi
                                                </div>
                                            </div>
                                            <div class="col-sm-12"><hr /></div>
                                            <div class="col-sm-12">
                                                <div class="checkbox-inline">
                                                    <label>
                                                        <input type="checkbox" name="nOpt_CSV" id="nOpt_CSV" value="1">
                                                        Simpan ke csv
                                                    </label> 
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div><!-- /.tab-content -->
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="row">
                                <div class="col-sm-10" style="margin-top:5px"> 
                                    <div class="progress progress-striped active" id="wrapLoading">
                                      <div class="progress-bar progress-bar-danger"  role="progressbar"
                                       aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                                        0% Proses
                                      </div>
                                    </div> 
                                </div>
                                <div class="col-sm-2">
                                    <input type="hidden" id="cLoc" name="cLoc" value=""> 
                                    <input type="hidden" id="cPdfType" name="cPdfType" value="normal">  
                                    <button class="btn btn-flat bg-red cmdViewReport" id="cmdVIEWRPT">
                                        Lihat Laporan
                                    </button>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal --> 

            <div class="modal fade" id="oWrapModal_ReportView" tabindex="-1" role="dialog" aria-hidden="true" >
                <div class="modal-dialog" style="border-radius:0px;width:90%;">
                    <div class="modal-content"> 
                        <div class="modal-header bg-primary">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title"><i class="fa fa-file-o"></i>&nbsp;&nbsp; <span class="modal-title-me">Laporan</span></h4>
                        </div>  
                        <div class="modal-body" style="height:500px;overflow-y:auto;">
                            <iframe src="" id="modal-content" frameborder="0" width="100%" height="100%"></iframe>
                        </div> 
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->  

            <div id="wrap_printing" style="display:none;position:fixed;width:calc(100% - 40px);height:calc(100% - 40px);top:20px;left:20px;z-index:99999;background-color:#FFF">
                <div id="wrap_printing_header" style="background-color:#3498db;padding:10px;color:#FFF;position:relative;">
                    <div id="wrap_printing_header_title" style="font-weight:bold;font-size:16px;display:inline-block">Report</div>
                    <div class="close" id="wrap_printing_header_close">x</div>
                </div>
                <div id="wrap_printing_body" style="height:calc(100% - 40px);padding:10px;">
                    <iframe src="" frameborder="0" width="100%" height="100%"></iframe>
                </div>
            </div>


            <!-- jQuery 2.0.2 -->
            <script src="./sapeltucore/sc_credits/jquery/jquery.js" type="text/javascript"></script> 
            <!-- jQuery UI 1.10.3 -->
            <script src="./sapeltucore/sc_credits/jquery_ui/jquery-ui-1.10.3.min.js" type="text/javascript"></script>
            <!-- Bootstrap -->
            <script src="./sapeltucore/sc_credits/bootstrap/bootstrap.min.js" type="text/javascript"></script>
            

            <!-- Select2 -->
            <script src="./sapeltucore/sc_credits/select2/select2.js"></script>
     
            <!-- Page-Level Plugin Scripts - Tables -->
            <script src="./sapeltucore/sc_credits/datatables/jquery.dataTables.js"></script>
            <script src="./sapeltucore/sc_credits/datatables/dataTables.fixedColumns.js"></script>
            <script src="./sapeltucore/sc_credits/datatables/dataTables.tabletools.js"></script>
            <script src="./sapeltucore/sc_credits/datatables/dataTables.bootstrap.js"></script>
            <script src="./sapeltucore/sc_credits/datatables/dataTables.fnReloadAjax.js"></script>
 
     
            <!-- AdminLTE App -->
            <script src="./sapeltucore/sc_credits/adminlte/admin.js" type="text/javascript"></script>

            <!-- Datepickter -->
            <script type="text/javascript" src="./sapeltucore/sc_credits/datepicker/moment.js"></script>
            <script type="text/javascript" 
            src="./sapeltucore/sc_credits/datepicker/bootstrap-datetimepicker.min.js"></script>
            <script type="text/javascript"  
            src="./sapeltucore/sc_credits/datepicker/bootstrap-datetimepicker.id.js"></script>

            <!-- website -->
            <script src="./sapeltucore/sc_credits/fancy/jquery.fancybox.js"></script>
            <script src="./sapeltucore/sc_credits/jquery/jquery.number.js"></script>
 
            <!-- pnotify -->
            <script type="text/javascript" src="./sapeltucore/sc_credits/pnotify/pnotify.custom.min.js"></script>
   
            <script src="./sapeltucore/sc_include/sc.core.js"></script>
            <script src="./sapeltucore/sc_include/sc.func.js"></script>

            <!-- w2ui --> 
            <script src="./sapeltucore/sc_credits/w2/w2ui.min.js" type="text/javascript"></script> 
             
            <script src="./default.js" rel="stylesheet"> </script>
            <?php 
            $cDash          = GetSession("cSession_Dashboard") ; 
            if($cDash !== ""){
            ?>  
            <script type="text/javascript"> 
                $(window).ready(function(e){ 
                    ChangePage('#<?=$cDash?>') ;      
                })  ;
            </script>  
            <?php
            }   
            ?>
            <script type="text/javascript">
                $(window).on("blur focus", function(e) {
                    var prevType = $(this).data("prevType");
                    if (prevType != e.type) {
                        switch (e.type) {
                            case "focus":
                                scAjax("./login.ajax.php","Ping","bismillahauth=" + $("body").data("bismillahauth") ) ;  
                            break; 
                        }
                    }
                    $(this).data("prevType", e.type);
                }) ;
                 
                $(window).ready(function(e){
                    $('#mee').click(function(e){
                        e.preventDefault() ; 
                        if(objDashboard !== null){
                            clearTimeout(objDashboard) ;     
                        }
                        ChangePage("#sys/mee.php") ;
                    }); 
 
                    $('.cmdExit').click(function(e){
                        e.preventDefault() ; 
                        scAjax('./login.ajax.php','Logout') ;     
                    });

                    $("#wrap_printing_header_close").on("click",function(e){
                        e.preventDefault() ; 
                        FRAME_PDF(false) ;                         
                    }) ;

                    CheckFrame();
                    //CheckNotification() ; 
                }) ;

                var nReload         = 55  ;  
                var objFrame        = null ;
                var objDashboard    = null ;  
                var OBJDASH_NEW     = {} ; 
                var OBJFORM_NEW     = {} ; 
                function CheckFrame(){ 
                    scAjax('./login.ajax.php','Ping') ; 
 
                    objFrame    = setTimeout(function(){ 
                        CheckFrame() ;  
                    },300000) ;    
                } 

                function CheckNotification(){
                    scAjax('./login.ajax.php','CheckNotification') ; 
 
                    setTimeout(function(){ 
                        CheckNotification() ; 
                    },300000) ;      
                } 

                function FRAME_PDF(lShow,cUrl){
                    if(cUrl == undefined) cUrl  = "" ; 
                    $("#wrap_printing").find("#wrap_printing_body").find("iframe").attr("src",cUrl) ; 
                    lShow       = lShow ? "block" : "none" ; 
                    $("#wrap_printing").css("display",lShow) ; 
                } 

            </script>
        </body>
    </html>  