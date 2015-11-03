<?php
	ini_set("memory_limit",-1);   
/*
     author              : sapeltu - core [www.core.sapeltu.com]
     creator             : Mirza Ramadhany
     date                : 01 November 2013
     last modified       : 05 Mei 2014
     fixed by            : Mirza Ramadhany 
     version             : 1.1.3
*/   
    include_once "./sapeltucore/sc_include/sc.func.php" ;
    include_once "./system/func.database.php" ;    
    include_once "./system/func.php" ; 

     $lParPages	= isset($_GET['_cPage']) ?  true : false ;  
     if($lParPages && GetSession("sc_main") !== ""){
     	if(GetSession("cSession_UserName") !== ""){
     		$cPages	= $_GET['_cPage'] . ".php" ;  	
	     	 $lReport 	= isset($_GET['lReport']) ? true : false ;  
	     	 if( strpos($_GET['_cPage'], ".php") > -1 || 
	     	 	strpos($_GET['_cPage'], ".html") > -1){
	     	 	$cPages	= $_GET['_cPage'] ; 
	     	 } 
	     	 $cPages	= "./pages/" . $cPages ; 
		     if(is_file($cPages)){ 
			    include_once $cPages ; 	 
		     }else{
			    echo "<center><h4>Under Construction .... </h4></center>" ; 	
		     } 	
     	}else{
     		echo('
     				<script>
     					window.location 	= "./logout.php" ; 
     				</script> 
     			') ; 
     	}
     }else{       
	     /* 
		     cPar Files 
		     cFunction 
		     cData
	     */	 
		
	     $va			= array() ; 
	     $cPage			= "" ; 
	     $objFunction	= "" ; 
	     $vaPost		= array($_GET,$_POST);
	     foreach ($vaPost as $_key => $_ME) { 
	     	foreach($_ME as $cKey => $cValue){	
			    if(strtolower($cKey) == "cpar"){
				     $cPage			= $cValue ;
			     }else if(strtolower($cKey) == "cfunction" ){
				     $objFunction	= $cValue ; 
			     }else{
			     	if(!is_array($cValue)){
			     		$cValue 	= trim($cValue) ; 
			     		if( !scSys::IsJson($cValue) ) $cValue 	= addslashes($cValue) ;  
			     		if(strpos($cValue, "base64") === false){
			     			$cValue = urldecode($cValue) ;
			     		}
			     	} 
				    $va[trim($cKey)]		= $cValue ; 	 
			     } 
	     	}
	     } 	  
 		 
 		 if(isset($_FILES)){
 		 	$va['file']	= $_FILES ; 
 		 }
 		 
 		 if(GetSession("cSession_UserName") !== "" || $cPage == './login.ajax.php'){    
		    if(is_file($cPage)){
			    include_once $cPage ;     
			    //agar bisa menerima req class  
			    eval('return ' . $objFunction . '($va) ;') ;  
		    } 
		 }else{ 
		 	echo('window.location 	= "./logout.php" ; 	') ;  
		 } 
     }      
?> 
  