<?php 
	function LoadUser($va){
		global $scDb ; 
		$cSearch	= $va['cSearch'] ;
		$dbData		= $scDb->Browse("username","UserName,FullName",
									"(UserName like '%$cSearch%' or FullName like '%$cSearch%') ",
									"","","","0,5") ;    
		$vaArray	= array() ; 
		if(GetSession("cSession_Level") !== "9"){
			while($dbRow	= $scDb->GetRow($dbData)){   
				$vaArray[]	= array("id"=>$dbRow['UserName'],"text"=>$dbRow['FullName'] ) ;   
			} 	
		}
		$cArray 		= (!empty($vaArray)) ? json_encode($vaArray) : "[{id:0,text:\"Tidak ditemukan\"}]" ;  
		echo($cArray) ;   
	}	

	function GetData($va){
		global $scDb ; 
		$dTglAwal		= $va['dTglAwal'] !== "" ? $va['dTglAwal'] : date("Y-m-d") ;
		$dTglAKhir		= $va['dTglAKhir'] !== "" ? $va['dTglAKhir'] : date("Y-m-d") ;
		$dTglAwal		= scDate::Date2String($dTglAwal) ;
		$dTglAKhir		= scDate::Date2String($dTglAKhir) ;
		$cUser			= $va['cUser'] ; 
		$nLimit			= (int) $va['nLimit'] ; 
		$cSearch		= $va['cSearch'] ;

		$cWhere			= "DATE_FORMAT(LogWaktu,'%Y-%m-%d') >= '$dTglAwal' and DATE_FORMAT(LogWaktu,'%Y-%m-%d') <= '$dTglAKhir'" ; 
		if($cUser !== ""){ 
			$cWhere		.= " and LogKeterangan like '%$cUser%'" ; 
		}
		if($cSearch !== ""){
			$cWhere		.= " and (LogKeterangan like '%$cSearch%' or LogTable like '%$cSearch%' or LogCrud like '%$cSearch%')" ; 
		}

		//oCrudBodyTable
		$dbData			= $scDb->Browse("sc_config_log","*",$cWhere,"","","Id desc","0," . $nLimit) ;
		$cTable 		= "" ;
		while($dbRow 	 = $scDb->GetRow($dbData)){
			$vaContent	 = unserialize($dbRow['LogKeterangan']) ; 
			if(!isset($vaContent['Sql'])) $vaContent['Sql']	= $dbRow['LogSQL'] ; 
			if(!isset($vaContent['Username'])) $vaContent['Username']	= $dbRow['LogUserName'] ; 
			$cRawSQL	 = rawurlencode($vaContent['Sql']) ;
			$cUserName	 = scSys::GetKeteranganOne("FullName","UserName = '{$vaContent['Username']}'","username") ;
			$cUserName 	 = $cUserName == "" ? "System page Login" : $cUserName ;   
  
			$cTable 	.= '<tr>' ;
			$cTable 	.= '	<td>'. date("d-m-Y h:i:s",strtotime($dbRow['LogWaktu'])) .'</td>' ;	
			$cTable 	.= '	<td>'.$dbRow['LogCrud'].'</td>' ;	
			$cTable 	.= '	<td>'.$dbRow['LogTable'].'</td>' ;	
			$cTable 	.= '	<td>'. $cUserName .'</td>' ;	 
			$cTable 	.= '	<td>'.DetectKeterangan($vaContent['Sql']).' ['.$dbRow['LogIp'].']</td>' ;	 
			$cTable 	.= '	<td align=\"center\"><button onClick=\"ViewSQL(&quot;'.$cRawSQL.'&quot;)\" class=\"btn btn-primary\"><i class=\"fa fa-stack-exchange\"></i></button></td>' ;	
			$cTable 	.= '</tr>' ;   
		}

		echo('
				$("#oCrudBodyTable").html("'.$cTable.'") ;
			') ;  
	}

	function DetectKeterangan($cSql){
		$cKeterangan	= "CRUD" ;
		if( strpos($cSql, "set LastLogin") !== false){
			$cKeterangan	= "User Login System" ; 
		}
		return $cKeterangan ; 
	}
?>