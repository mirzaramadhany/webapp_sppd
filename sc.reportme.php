<?php
	error_reporting(E_ALL ^ E_NOTICE);
	ini_set("memory_limit",-1); 
	ob_start() ; 
	include_once "./sapeltucore/sc_include/sc.func.php" ;
    include_once "./system/func.database.php" ;    
    include_once "./system/func.php" ;
    
    $vaArray	= array($_POST,$_GET) ; 
    $vaOpt 		= array() ; 
	foreach ($vaArray as $key => $_ME) {
		foreach ($_ME as $cKey => $cValue) {
			if(strpos($cKey, "Opt_") > -1){
				$vaOpt[$cKey]	= $cValue ; 
			}else{
				eval("$" . $cKey . "= '" . trim($cValue) . "' ;") ; 
			}
			
		}  
	}
	

	if(isset($_GET['123er'])){
		$cPage	= "./pages/" . $_GET['123er'] . ".report.php" ;	
	}else{
		$cPage	= "./pages/" . $scRpt . ".rpt.php" ; 
	}
	
	$cKey	= isset($_GET['sys']) ? $_GET['sys'] : "" ;

	if(is_file($cPage)){
		if($cKey == ""){ 
			include './sapeltucore/sc_pdf/class.ezpdf.php' ; 	 
			include $cPage ;  
		}
	}else{
		echo "Underconstruction" ; 
	} 
?>