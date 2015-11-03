<?php
	function SavingFoto($va){
		$cDim				= $va['cDim'] ; 
		$cReturn    		= null ;   
  		$cDir       		= "./uploaded/" ;
		foreach($va['file'] as $vaFile){  
			$vaInfo			= pathinfo($vaFile['name']) ;  
			$nRand 			= rand(0,time()) ;
			$nRand 			= substr($nRand, 0,4) ; 

			$cDir			= $cDir .  $vaInfo['filename'] . "_" . $nRand . "." . $vaInfo['extension'] ; 
   
			if(is_file($cDir)){
				unlink($cDir) ; 
			} 
			if(move_uploaded_file($vaFile['tmp_name'], $cDir)){  
				$cReturn 	= $cDir ;      
			}else{     
			    $cReturn 	= "" ; 
			}  
		} 	
  
		SaveSession("fileFoto" . $cDim, $cReturn) ; 
		if($cDim == "1"){
			echo('oSys.SavingFoto2() ; ') ;	
		}else{
			echo('oSys.Saving() ; ') ;
		}
		
	}

	function Saving($va){
		scSys::SaveConfig("sc_front_url",$va['cUrl']) ;
		scSys::SaveConfig("sc_front_title",$va['cTitle']) ; 
		scSys::SaveConfig("sc_admin",$va['sc_admin']) ;
 
		scSys::SaveConfig("sc_company",$va['sc_company']) ;
		scSys::SaveConfig("sc_kepala_dinas",$va['sc_kepala_dinas']) ;

		//foto
		$cFoto 	= GetSession("fileFoto1") ;
		if(trim($cFoto) !== "" ){ 
			unlink($cFoto) ; 
			scSys::SaveConfig("sc_logo", GetSession("fileFoto1") ) ;		
		}

		$cFoto 	= GetSession("fileFoto2") ;
		if(trim($cFoto) !== "" ){
			unlink($cFoto) ; 
			scSys::SaveConfig("sc_header", GetSession("fileFoto2") ) ;		
		} 

		echo("alert('Data have been saved');") ;
	}
?>	