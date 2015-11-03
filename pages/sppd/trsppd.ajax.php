<?php 
	function CheckPegawai($va){
		global $scDb ; 
		$nip 			= $va['nip'] ; 
		$id 			= $va['id'] ; 
		$date_go 		= scDate::Date2String($va['date_go']) ;  
		$cWhere 		= "(nip_leader = '$nip' OR nip LIKE '%$nip%') AND (date_go >= '$date_go' AND date_back <= '$date_go')" ; 
		$dbData 		= $scDb->Browse("sppd","code",$cWhere) ; 
		if($dbRow 		= $scDb->GetRow($dbData)){
			echo('
					alert("Maaf Petugas dengan melakukan Perjalanan Dinas") ;
					OBJFORM_NEW.trsppd.Obj.find("#'.$id.'").select2("data","") ; 
					OBJFORM_NEW.trsppd.Obj.find("#'.$id.'").select2("open") ; 
				') ; 
		}
	}

	function CheckPegawaiPendamping($va){
		global $scDb ; 
		$nip 			= $va['nip'] ; 
		$id 			= $va['id'] ; 
		$date_go 		= scDate::Date2String($va['date_go']) ;  
		$cWhere 		= "(nip_leader = '$nip' OR nip LIKE '%$nip%') AND (date_go >= '$date_go' AND date_back <= '$date_go')" ; 
		$dbData 		= $scDb->Browse("sppd","code",$cWhere) ; 
		if($dbRow 		= $scDb->GetRow($dbData)){
			echo('
					alert("Maaf Petugas dengan melakukan Perjalanan Dinas") ;
					OBJFORM_NEW.trsppd.Obj.find("#'.$id.'").select2("data",'.stripslashes($va['val']).') ; 
					OBJFORM_NEW.trsppd.Obj.find("#'.$id.'").select2("open") ; 
				') ; 
		}	
	}

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
		if(strpos($cLv_Admin, $cLv) === false) $vaWhere[]	= "username = '$cUserName'" ; 
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
			$dbRow['nip_pejabat']	= scSys::GetKeteranganOne("nama","nip = '{$dbRow['nip_pejabat']}'","pegawai") ; 
			$dbRow['nip_leader']	= scSys::GetKeteranganOne("nama","nip = '{$dbRow['nip_leader']}'","pegawai") ; 
			$dbRow['username']		= scSys::GetKeteranganOne("FullName","UserName = '{$dbRow['username']}'","username") ; 
			if($cStatus <> "2"){			
				$dbRow['cmdEdit']		= '<button type="button" onClick="OBJFORM_NEW.trsppd.Edit(\''.$dbRow['recid'].'\')" 
											class="btn btn-primary btn-grid">Edit</button>' ;
				$dbRow['cmdEdit']		= html_entity_decode($dbRow['cmdEdit']) ; 
			}
			if($cStatus == "0"){
				$dbRow['cmdDelete']		= '<button type="button" onClick="OBJFORM_NEW.trsppd.Delete(\''.$dbRow['recid'].'\')" 
										class="btn btn-danger btn-grid">Delete</button>' ;
				$dbRow['cmdDelete']		= html_entity_decode($dbRow['cmdDelete']) ; 
			}
			$vaReturn[]				= $dbRow ; 
		}
		$vaReturn 	= array("total"=>$scDb->Rows($dbDataNL),"records"=>$vaReturn) ;
		echo json_encode($vaReturn) ; 	
	} 

	function Saving($va){
		global $scDb ; 
		$cUserName	= GetSession("cSession_UserName") ; 
		$cKode 		= $va['code'] ; 
		if($cKode 	== ""){
			$cKey	= "-" . date("m") . "-" . date("y") . "/sppd/creative"; 
			$cKode  = scSys::GetLastInt($cKey,true,3) . $cKey ;  
		}
		$vaArray	= array("letter_content"=>$va['letter_content'],
							"code"=>$cKode,"nip_pejabat"=>$va['nip_pejabat'],
							"nip_leader"=>$va['nip_leader'],"rate_travel"=>$va['rate_travel'],"nip"=>$va['nip'],
							"purpose"=>$va['purpose'],"transport"=>$va['transport'],"place_from"=>$va['place_from'],
							"place_to"=>$va['place_to'],"length_journey"=>$va['length_journey'],"date_go"=>scDate::Date2String($va['date_go']),
							"date_back"=>scDate::Date2String($va['date_back']),"government"=>$va['government'],
							"budget_from"=>$va['budget_from'],"description"=>$va['description']) ; 
		$vaInsert 	= array("username"=>$cUserName,"date"=>date("Y-m-d")) ;  
		$vaUpdate 	= array("username_update"=>$cUserName) ; 
		$scDb->Update("sppd",$vaArray,"code = '$cKode'",true,$vaInsert,$vaUpdate) ; 
		echo(' 
				alert("Data sudah disimpan\nNomor SPPD : '.$cKode.'\nCetak Surat Perintah dan Surat Perintah Perjalanan Dinas di daftar SPPD") ; 
				ChangePage("#'.str_replace("./pages/", "", $va['cPageSource']).'") ; 
			') ; 
	}

	function Editing($va){
		$cKode 		= $va['code'] ; 
		$dbRow  	= scSys::GetKeterangan("*","code = '$cKode'","sppd") ; 
		if(!empty($dbRow)){
			$vaNip_Pejabat 	= array("id"=>$dbRow['nip_pejabat'],
									"text"=>scSys::GetKeteranganOne("nama","nip = '{$dbRow['nip_pejabat']}'","pegawai") ) ; 
			$vaNip_Leader 	= array("id"=>$dbRow['nip_leader'],
									"text"=>scSys::GetKeteranganOne("nama","nip = '{$dbRow['nip_leader']}'","pegawai") ) ; 
			$vaNip 			= array() ; 
			foreach (explode(",", $dbRow['nip']) as $key => $value) {
				$vaNip[]	= array("id"=>$value,
									"text"=>scSys::GetKeteranganOne("nama","nip = '$value'","pegawai") ) ; 
			}
			$dbRow['date_go']		= scDate::String2Date($dbRow['date_go']) ; 
			$dbRow['date_back']		= scDate::String2Date($dbRow['date_back']) ; 
			echo('
					with(OBJFORM_NEW.trsppd.Obj){
						find("#code").val("'.$cKode.'") ;
						find("#letter_content").val("'.$dbRow['letter_content'].'") ;
						find("#nip_pejabat").select2("data",'.json_encode($vaNip_Pejabat).') ;
						find("#nip_leader").select2("data",'.json_encode($vaNip_Leader).') ;
						find("#rate_travel").val("'.$dbRow['rate_travel'].'") ;
						find("#nip").select2("data",'.json_encode($vaNip).') ;
						find("#purpose").val("'.$dbRow['purpose'].'") ;
						find("#transport").val("'.$dbRow['transport'].'") ;
						find("#place_from").val("'.$dbRow['place_from'].'") ;
						find("#place_to").val("'.$dbRow['place_to'].'") ;
						find("#length_journey").val("'.$dbRow['length_journey'].'") ;
						find("#date_go").val("'.$dbRow['date_go'].'") ;
						find("#date_back").val("'.$dbRow['date_back'].'") ;
						find("#government").val("'.$dbRow['government'].'") ; 
						find("#budget_from").val("'.$dbRow['budget_from'].'") ;
						find("#description").val("'.$dbRow['description'].'") ;
					}
				') ; 
		}
	}

	function Deleting($va){
		global $scDb ; 
		$scDb->Delete("sppd","code = '{$va['code']}' AND status = '0'") ; 
		echo('
				alert("Data sudah dihapus") ; 
				OBJFORM_NEW.trsppd.Grid1_ReloadData() ; 
			') ; 
	}
?>