<?php 
	function Load($va){
		global $scDb ;  
		$dTglAwal	= scDate::Date2String($va['dTglAwal']) ; 
		$dTglAkhir	= scDate::Date2String($va['dTglAkhir']) ;  
		$nJml 		= 0 ; 
		$nJml_New 	= 0 ; 
		$dbData 	= $scDb->Browse("sppd","COUNT(code) Jml,status","date >= '$dTglAwal' AND date <= '$dTglAkhir'",
									"","status") ;  
		while($dbRow= $scDb->GetRow($dbData)){
			$nJml  			+= intval($dbRow['Jml']) ; 
			if($dbRow['status'] !== "2"){
				$nJml_New	+= intval($dbRow['Jml']) ; 
			}
		}
		echo('
				$("#nDash_sppd").html("'.number_format($nJml).'") ; 
				$("#nDash_sppd_new").html("'.number_format($nJml_New).'") ; 
			') ;  
	}

	function LoadGrid($va){
		global $scDb ; 
		$dTglAwal	= scDate::Date2String($va['dTglAwal']) ; 
		$dTglAkhir	= scDate::Date2String($va['dTglAkhir']) ;  
		$vaData		= array("data"=>array(),"key"=>array()); 
		$cWhere 	= "date >= '$dTglAwal' AND date <= '$dTglAkhir'" ;
		$dbData 	= $scDb->Browse("sppd","COUNT(code) Jml, DATE_FORMAT(date,'%M %Y') bulan_tahun",$cWhere,
									"","bulan_tahun","bulan_tahun desc") ;  
		$vaColor	= array("#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085",
							"#27ae60","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22") ; 
		$nRow 		= 0 ; 
		while($dbRow= $scDb->GetRow($dbData)){
			$vaData['key'][]	= $dbRow['bulan_tahun'] ; 
			$vaData['data'][]	= array("y"=>intval($dbRow['Jml']),"color"=>$vaColor[$nRow++],
										"bulan_tahun"=>$dbRow['bulan_tahun']) ; 
		} 

	}

	function LoadPie($va){
		global $scDb ; 
		//1. Priority
		//2. Category
		$dTglAwal	= scDate::Date2String($va['dTglAwal']) ; 
		$dTglAkhir	= scDate::Date2String($va['dTglAkhir']) ; 
		$cBulan 	= $va['bulan_tahun'] ; 
		$cGroup 	= "status" ;  
		$cWhere		= "date >= '$dTglAwal' AND date <= '$dTglAkhir' " ; 
		$dbData 	= $scDb->Browse("sppd","COUNT(code) Jml,DATE_FORMAT(date,'%M %Y') bulan_tahun," . $cGroup,
									$cWhere,"",$cGroup . " HAVING bulan_tahun = '$cBulan'",$cGroup . " DESC") ; 
		//echo $scDb->GetSQL() ;   
		$vaData 		= array() ; 
		while ($dbRow 	= $scDb->GetRow($dbData)) {
			$vaTambahan	= array("color"=>"#2ecc71") ; 
			if($dbRow[$cGroup] == "1"){
				$vaTambahan	= array("sliced"=>true,"selected"=>true,"color"=>"#e74c3c") ;
			}else if($dbRow[$cGroup] == "2"){
				$vaTambahan = array("color"=>"#3498db") ; 
			}
			$vaData[]	= array_merge(array("name"=>sppd::GetStatus($dbRow[$cGroup]),"y"=>intval($dbRow['Jml'])) , $vaTambahan ) ; 
		}

	}
?>