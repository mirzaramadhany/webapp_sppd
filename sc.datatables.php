<?php
	include_once "./sapeltucore/sc_include/sc.func.php" ;
    include_once "./system/func.database.php" ;    
    include_once "./system/func.php" ;

    $cPage	= isset($_GET['1sc23']) ? $_GET['1sc23'] : $_GET['cPage'] ;
	$cPage	= "./pages/" . $cPage . ".data.php" ;

	include_once $cPage ;   
?>