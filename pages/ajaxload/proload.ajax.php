<?php 
	function LoadPangkat($va){
		global $scDb ; 
		$cSearch 		= $va['cSearch'] ; 
		$vaArray		= array() ;
		$cWhere 		= "Stat = 'gol' AND (Title LIKE '%$cSearch%' OR Description LIKE '%$cSearch%')" ; 
		$dbData 		= $scDb->Browse("sc_master","*",$cWhere) ; 
		while($dbRow 	= $scDb->GetRow($dbData)){
			$vaArray[]	= array("id"=>$dbRow['Id'],"text"=>$dbRow['Description'] . " / " . $dbRow['Title'] ) ; 
		} 
		if(empty($vaArray)) $vaArray[]	= array("id"=>"scnull","text"=>"Tidak ditemukan") ;
		echo(json_encode($vaArray)) ; 
	}

	function LoadNip_Not($va){
		global $scDb ;  
		$cSearch		= $va['cSearch'] ;
		$vaArray		= array() ;   
		$cWhere 		= "Nip = '%$cSearch%'" ; 
		$dbData			= $scDb->Browse("pegawai","Nip",$cWhere);   
		if($dbRow	= $scDb->GetRow($dbData)){
			$vaArray[]	= array("id"=>"scnull","text"=>"Data sudah ada") ;   
		}     
		if(empty($vaArray)) $vaArray[]	= array("id"=>$cSearch,"text"=>$cSearch) ;  
		echo(json_encode($vaArray)) ; 	
	} 

	function LoadNip($va){
		global $scDb ; 
		$cSearch 		= $va['cSearch'] ; 
		$vaArray		= array() ;
		$cWhere 		= "Nip LIKE '%$cSearch%' OR Nama LIKE '%$cSearch%'" ; 
		$dbData 		= $scDb->Browse("pegawai","nip,nama",$cWhere) ; 
		while($dbRow 	= $scDb->GetRow($dbData)){
			$vaArray[]	= array("id"=>$dbRow['nip'],"text"=>$dbRow['nip']."-".$dbRow['nama']) ; 
		}
		if(empty($vaArray)) $vaArray[]	= array("id"=>"scnull","text"=>"Tidak ditemukan") ;
		echo(json_encode($vaArray)) ; 
	} 

	function LoadSPPD_Pelaporan($va){
		global $scDb ; 
		$cUserName 		= GetSession("cSession_UserName") ; 
		$cLv_Admin		= scSys::GetConfig("sc_admin") ; 
		$cLv 			= GetSession("cSession_SCLevel") ;

		$cNip 			= GetSession("cSession_UserName_Target") ; 
		$cSearch 		= $va['cSearch'] ; 
		$vaArray		= array() ; 
		$cWhere 		= strpos($cLv_Admin, $cLv) === false ? "code LIKE '%$cSearch%' AND (nip_leader = '$cNip')" : "code LIKE '%$cSearch%'" ; 
		$dbData 		= $scDb->Browse("sppd","code,date",$cWhere) ;  
		while($dbRow 	= $scDb->GetRow($dbData)){
			$vaArray[]	= array("id"=>$dbRow['code'],"text"=>$dbRow['code']." pada tanggal ".scDate::String2Date($dbRow['date'])) ; 
		}
		if(empty($vaArray)) $vaArray[]	= array("id"=>"scnull","text"=>"Tidak ditemukan") ;
		echo(json_encode($vaArray)) ; 	
	}


	
?>