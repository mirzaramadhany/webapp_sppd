<?php 
	function Saving($va){
		global $scDb ;
		$cUserName		= GetSession("cSession_UserName") ; 
		$cFullName		= $va['cFullName'] ; 
		$cPassword		= $va['cPassword'];

		$cImages		= GetSession("g" . GetSession("cSession_UserName") ) ;
 
		$vaArray		= array("FullName"=>$cFullName) ; 
		if($cPassword !== ""){  
			$cPassword	= scCrypt::CryptPass($cPassword) ;   
			$vaArray['Password']	= $cPassword  . GetSession("cSession_SCLevel") ; 
		} 
		if($cImages !== ""){
			$vaArray['Foto']	= $cImages ;  
		}

		$scDb->Update("username",$vaArray,"UserName = '$cUserName'") ;
		echo('
			alert("Data have been saved") ;
			scLoadPage("sc-content-load","sys/mee.php") ;
			') ;   
	}
 
	function SavingFoto($va){
		$cDim				= GetSession("cSession_UserName") ; 
		$cReturn    		= null ;  
  		$cDir       		= "./uploaded/profile/" ;
		foreach($va['file'] as $vaFile){ 
			$vaInfo			= pathinfo($vaFile['name']) ;   
			$cDir			= $cDir . $cDim . "." .  $vaInfo['extension'] ; 

			if(is_file($cDir)){
				unlink($cDir. ".tmp" ) ; 
				unlink($cDir) ; 	
			} 
			if(move_uploaded_file($vaFile['tmp_name'], $cDir. ".tmp" )){  
				scImages::GenerateThumbnail($cDir. ".tmp",$cDir,599,399) ; 

				unlink($cDir. ".tmp" ) ;   
				$cReturn 	= $cDir ;      
			}else{    
			    $cReturn 	= "" ;
			}  
		} 	
 
		SaveSession("g" . $cDim, $cReturn) ; 

		echo('oProfile.Saving() ; ') ;
	} 
?> 