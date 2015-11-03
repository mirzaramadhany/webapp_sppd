<?php 
	function LoadLevel($va){
		global $scDb ; 
		$cSearch	= $va['cSearch'] ; 
		$dbData		= $scDb->Browse("username_level","Kode,Keterangan","Kode like '%$cSearch%' or  Keterangan like '%$cSearch%'") ;  
		$vaArray	= array() ;   
		while($dbRow	= $scDb->GetRow($dbData)){  
			$vaArray[]	= array("id"=>$dbRow['Kode'],"text"=>$dbRow['Kode'] . " - " . $dbRow['Keterangan'] ) ;    
		}  
		$vaArray[]	= array("id"=>"0000","text"=>"0000 - Administrator") ; 
		$cArray 		= (!empty($vaArray)) ? json_encode($vaArray) : "[{id:\"scnull\",text:\"Tidak ditemukan\"}]" ;  
		echo($cArray) ; 
	} 

	function LoadUser($va){
		global $scDb ; 
		$cSearch	= $va['cSearch'] ;
		$dbData		= $scDb->Browse("username","UserName",
									"UserName = '$cSearch'",
									"","","","0,1") ;  
		$vaArray	= array() ;     
		while($dbRow	= $scDb->GetRow($dbData)){
			$vaArray[]	= array("id"=>$dbRow['UserName']) ;   
		}   
		$cArray 		= (empty($vaArray)) ? "[{id:\"".$cSearch."\",text:\"".$cSearch."\"}]" : 
												"[{id:\"scnull\",text:\"Maaf UserName Sudah digunakan\"}]" ;  
		echo($cArray) ;
	} 

	function Saving($va){
		global $scDb ;
		$cUserName		= $va['cUserName'] ; 
		$cFullName		= $va['cFullName'] ; 
		$cPassword		= $va['cPassword']; 
		$cLevel			= $va['cLevel'] ; 
 
		$vaArray		= array("UserName"=>$cUserName,"FullName"=>$cFullName,
								"UserName_Target"=>$va['UserName_Target']) ; 
		if($cPassword !== ""){    
			$cPassword	= scCrypt::CryptPass($cPassword) ;   
			$vaArray['Password']	= $cPassword . $cLevel; 
		}else{
			$cPassword 	= scSys::GetKeteranganOne("Password","UserName = '$cUserName'","username") ; 
			$vaArray['Password']	= substr($cPassword, 0, strlen($cPassword)-4) . $cLevel ; 
		} 

		$scDb->Update("username",$vaArray,"UserName = '$cUserName'") ;

		echo('
			alert("Data have been saved") ;
			scLoadPage("sc-content-load","sys/sysuser_grid.php") ;
			') ;  
	} 

	function DeleteData($va){
		global $scDb ; 
		$cUserName	= $va['cUserName']; 
		$cFoto 		= scSys::GetKeteranganOne("Foto","UserName = '$cUserName'","username") ;
		if($cFoto !== "") unlink($cFoto) ; 

		$scDb->Delete("username","UserName = '$cUserName'") ;
		
		echo(' 
			alert("Data have been deleted") ;
			scLoadPage("sc-content-load","sys/sysuser_grid.php") ;
			') ;
	}

	function GetData($va){
		global $scDb ;
		$cKode		= $va['cUserName'] ;

		$dbData		= $scDb->Browse("username","*","UserName = '$cKode'") ; 
		if($dbRow	= $scDb->GetRow($dbData)){
			$cLevel = scCrypt::GetLevelPass($dbRow['Password']) ; 
			$UserName_Target 		= "" ;	
			if($dbRow['UserName_Target'] !== ""){
				$UserName_Target	= array("id"=>$dbRow['UserName_Target'],
										"text"=>scSys::GetKeteranganOne("nama","nip = '{$dbRow['UserName_Target']}'","pegawai") ) ;
			}
			echo('
					with(document.oForm){
						cUserName.value 	= "'.$dbRow['UserName'].'" ;
						cUserName.readOnly	= 1 ; 
						cFullName.value 	= "'.$dbRow['FullName'].'" ;  
					}    
					$("#UserName_Target").select2("data",'.json_encode($UserName_Target).')
					$("#cUserName").select2("data",{id: "'.$dbRow['UserName'].'", text: "'.$dbRow['UserName'].'"}) ;  
					$("#cLevel").select2("data",{id: "'.$cLevel.'", text: "'.$cLevel.'"}) ;  
				') ;  
		}else{
			echo(' 
			alert("Data not found '.$cKode.'") ;
			scLoadPage("sc-content-load","sys/sysuser_grid.php") ;
			') ; 
		}
	}

?>	