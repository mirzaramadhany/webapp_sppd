    <?php 
        include_once "../sapeltucore/sc_include/sc.func.php" ;
        include_once "./system/func.database.php" ;     
        include_once "./system/func.php" ;


        $cLoading       = "Loading ...." ; 
        
        $nEnd           = (isset($_GET['end'])) ? (int) $_GET['end'] : "1" ; 
        if(!isset($_GET['end'])) $nEnd = 1;   
        if($nEnd == 0){
            $cLoading   = "Done ...." ; 
        }else if($nEnd == 1){
            $cLoading   = "Initialize .... " ; 
        } 
    ?>
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"> 
            <?=scSys::SCLicence()?>  
            <title><?=scSys::GetConfig("sc_front_title")?> | Grahamedia | Creative &copy;Sapeltu-core</title> 
            <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
            <!-- bootstrap 3.0.2 -->
            <link href="../sapeltucore/sc_credits/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css" />
            
            <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
            <!-- WARNING: Respond.js doesn't work if you view the page via file:// --> 
            <!--[if lt IE 9]>
              <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
              <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
            <![endif]-->
        </head>
        <body>
            <center> 
                <h1 id="progress" style="font-size:90px;"><?=isset($_GET['cText']) ? $_GET['cText'] : 0?><br /> <?=$cLoading?> </h1>    
            </center>
            
        </body> 
        <!-- jQuery 2.0.2 -->
        <script src="../sapeltucore/sc_credits/jquery/jquery.js" type="text/javascript"></script> 
        
        <!-- Bootstrap -->
        <script src="../sapeltucore/sc_credits/bootstrap/bootstrap.min.js" type="text/javascript"></script> 
        <!-- AdminLTE App -->
        <script src="../sapeltucore/sc_credits/adminlte/admin.js" type="text/javascript"></script>
        <script src="../sapeltucore/sc_include/sc.core.js"></script>

        <script type="text/javascript">
        <?php 
        if($nEnd > 0){
            $cText      = array() ; 
            if(isset($_GET)){
                foreach ($_GET as $cKey => $cValue) {
                    $cText[]    = $cKey . "=" . $cValue ; 
                }
                $cText  = implode("&", $cText) ;
            }
        ?>
        $(window).ready(function(){
            scAjax('./scconversi.ajax.php','Conversi',"<?=$cText?>")
        }) ;   
        <?php
        }else{
            echo(' alert("Finish") ') ;
        }
        ?>
        </script>
    </html>