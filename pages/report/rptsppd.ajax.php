<?php 
	function Grid1_Load($va){
		global $scDb ; 
		$cUserName 		= GetSession("cSession_UserName") ; 
		$cLv_Admin		= scSys::GetConfig("sc_admin") ; 
		$cLv 			= GetSession("cSession_SCLevel") ;  

		$cLimit		= $va['offset'].",".$va['limit'] ; //limit
		$vaOrder	= array() ;  
		if(isset($va['sort'])){
			unset($va['sort'][13]) ; unset($va['sort'][14]) ; 
			foreach ($va['sort'] as $key => $vaValue) {
				$vaOrder[]	= $vaValue['field'] . " " . $vaValue['direction'] ; 
			}
		}
		$cOrder 	= implode(",",$vaOrder) ; 
		if($cOrder == "") $cOrder = "status ASC" ; 
		//init order grid
		$dTglAwal	= scDate::Date2String($va['dTglAwal']) ;   
		$dTglAkhir	= scDate::Date2String($va['dTglAkhir']) ; 
		$cWhere_opt	= "" ;  
		if($va['optStatusF'] !== "-") $cWhere_opt	= " AND status = '{$va['optStatusF']}' " ; 

		$vaWhere 	= array() ; 
		if(isset($va['search'])){
			unset($va['search'][13]) ; unset($va['search'][14]) ; 
			foreach ($va['search'] as $key => $vaValue) {
				$vaWhere[]	= $vaValue['field'] . " like '%".$vaValue['value']."%'" ; 
			} 
		}//init where grid 
		$cWhere 	= "date >= '$dTglAwal' AND date <= '$dTglAkhir' " . $cWhere_opt .
						( !empty($vaWhere) ? " AND (" . implode(" OR ", $vaWhere) . ")" : "" );  

		$vaReturn 	= array() ;
		$dbData 	= $scDb->Browse("sppd","*",$cWhere,"","",$cOrder,$cLimit) ; 
		$dbDataNL 	= $scDb->Browse("sppd","*",$cWhere) ; 
		while($dbRow= $scDb->GetRow($dbData)){
			$dbRow['recid']			= $dbRow['code'] ; 
			$cStatus 				= $dbRow['status'] ; 
			$dbRow['code']			= '<a class="a-click" onClick="OBJFORM_NEW.trsppd.Print(\''.$dbRow['recid'].'\')">'.$dbRow['recid'].'</a>' ; 
			$dbRow['code']			= html_entity_decode($dbRow['code']) ; 
			$dbRow['status']		= html_entity_decode(sppd::GetStatus($dbRow['status'],true)) ;
			$dbRow['date']			= scDate::String2Date($dbRow['date']) ;
			$dbRow['date_go']		= scDate::String2Date($dbRow['date_go']) ;
			$dbRow['date_back']		= scDate::String2Date($dbRow['date_back']) ;
			$dbRow['letter_date']	= scDate::String2Date($dbRow['letter_date']) ;
			$dbRow['nip_pejabat']	= scSys::GetKeteranganOne("nama","nip = '{$dbRow['nip_pejabat']}'","pegawai") ; 
			$dbRow['nip_leader']	= scSys::GetKeteranganOne("nama","nip = '{$dbRow['nip_leader']}'","pegawai") ; 
			$dbRow['username']		= scSys::GetKeteranganOne("FullName","UserName = '{$dbRow['username']}'","username") ; 
						
			$vaReturn[]				= $dbRow ; 
		}
		$vaReturn 	= array("total"=>$scDb->Rows($dbDataNL),"records"=>$vaReturn) ;
		echo json_encode($vaReturn) ; 	
	} 	
?>