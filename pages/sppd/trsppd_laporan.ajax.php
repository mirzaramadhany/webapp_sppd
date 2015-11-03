<?php 
	function Editing($va){
		$code 		= $va['code'] ; 
		$dbRow 		= scSys::GetKeterangan("*","code = '$code'","sppd") ; 
		if(!empty($dbRow)){
			echo('
					with(OBJFORM_NEW.trsppd_laporan.Obj){
						find("#purpose").html("'.$dbRow['purpose'].'") ; 
						find("#place_to").html("'.$dbRow['place_to'].'") ; 
						find("#length_journey").html("'.$dbRow['length_journey'] . ' (' . scSys::Terbilang($dbRow['length_journey']) .') hari") ; 
						find("#date_go").html("'.scDate::String2Date($dbRow['date_go']).'") ; 
						find("#result").val("'.scSys::CheckText($dbRow['result']).'") ; 
						find("#result").focus() ;  
					} 
				') ;  
			if($dbRow['result'] !== ""){//echokan
				$cButton 	= '<button type="button" class="btn btn-success" style="display:inline-block"
								 id="cmdCetak" name="cmdCetak" 
								 onclick="OBJFORM_NEW.trsppd_laporan.Print(&quot;'.$va['code'].'&quot;)">Cetak</button>' ; 
				echo('
						OBJFORM_NEW.trsppd_laporan.Obj
						.find("#wrapPrint").html("'.scSys::CheckText($cButton).'") ; 
					') ;  
			}
		} 
	}

	function Saving($va){
		global $scDb ; 
		$code 		= $va['code'] ; 
		$cResult 	= scSys::GetKeteranganOne("result","code = '$code'","sppd") ; 
		$vaArray 	= array("result"=>$va['result'],"status"=>"2") ;
		if($cResult !== ""){
			$vaArray['result_username_update']	= GetSession("cSession_UserName") ; 
		}else{
			$vaArray["result_date"]		= date("Y-m-d") ; 
			$vaArray['result_username']	= GetSession("cSession_UserName") ; 
		}
		$scDb->Update("sppd",$vaArray,"code = '{$va['code']}'") ; 
		$cButton 	= '<button type="button" class="btn btn-success" style="display:inline-block"
						id="cmdCetak" name="cmdCetak"
						onclick="OBJFORM_NEW.trsppd_laporan.Print(&quot;'.$va['code'].'&quot;)">Cetak</button>' ; 
		echo(' 
				OBJFORM_NEW.trsppd_laporan.Obj
				.find("#wrapPrint").html("'.scSys::CheckText($cButton).'") ; 
			') ; 
	}
?>