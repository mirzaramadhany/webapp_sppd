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
									"","bulan_tahun","bulan_tahun desc","0,12") ;  
		$vaColor	= array("#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085",
							"#27ae60","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22") ; 
		$nRow 		= 0 ; 
		while($dbRow= $scDb->GetRow($dbData)){
			$vaData['key'][]	= $dbRow['bulan_tahun'] ; 
			$vaData['data'][]	= intval($dbRow['Jml']) ; 
		} 

		//load chart
		$vachart 	= array("labels"=>$vaData['key'],
							"datasets"=> array(array("fillColor"=>"rgba(151,187,205,0.2)",
												"strokeColor"=>"rgba(151,187,205,1)",
												"pointColor"=>"rgba(151,187,205,1)",
												"pointStrokeColor"=>"#fff",
												"pointHighlightFill"=>"#fff",
												"pointHighlightStroke"=>"rgba(151,187,205,1)",
												"data"=>$vaData['data']) ) ) ; 
		$chtml 		= '<canvas id="wrapdash_chart" height="300"></canvas>' ; 
		echo('
			$("#tab_1").find(".me-loading").remove() ; 
			$("#tab_1").append("'.scSys::CheckText($chtml).'") ; 
			setTimeout(function(){
				OBJFORM_NEW.frmdash.grid1 	= 
					new Chart($("#wrapdash_chart")[0].getContext("2d")).Line('.json_encode($vachart).')  ; 
				$("#wrapdash_chart").on("click",function(ev){
					var activePoints = OBJFORM_NEW.frmdash.grid1.getPointsAtEvent(ev);
					OBJFORM_NEW.frmdash.LoadPie(activePoints[0]["label"]) ; 
				}) ; 

			},50) ; 
		') ; 
	}

	function LoadPie($va){
		global $scDb ; 
		//1. Priority
		//2. Category
		$dTglAwal	= date("Y-m-d", strtotime($va['bulan_tahun'])) ;  
		$dTglAkhir	= scDate::EOM($dTglAwal) ;  
		$cGroup 	= "status" ;  
		$cWhere		= "date >= '$dTglAwal' AND date <= '$dTglAkhir' " ; 
		$dbData 	= $scDb->Browse("sppd","COUNT(code) Jml,DATE_FORMAT(date,'%M %Y') bulan_tahun," . $cGroup,
									$cWhere,"",$cGroup,$cGroup . " DESC") ; 
		$vaData 		= array() ; 
		while ($dbRow 	= $scDb->GetRow($dbData)) {
			$color 		= $dbRow[$cGroup] == "1" ? "#2ecc71" : ($dbRow[$cGroup] == "2" ? "#3498db" : "#e74c3c") ; 
			$vaData[]	= array("value"=>$dbRow['Jml'],
								"color"=>$color,
								"highlight"=>$color,
								"label"=>sppd::GetStatus($dbRow[$cGroup])) ; 
		} 

		$chtml 		= ' <ul class="nav nav-tabs" id="myTabs2">
		                    <li class="active"><a href="#otab_1" data-toggle="tab" id="otab__1">Status</a></li>
		                </ul>
		                <div class="tab-content">
		                    <div class="tab-pane active" id="otab_1"> 
		                    	<canvas id="wrapdash_pie" height="300"></canvas> 
		                    </div> 
		                </div>' ;

		echo('
			$("#wrap_myTabs2").find(".me-loading").remove() ;  
		') ;  

		$vachart 	= array() ; 
		if(!empty($vaData)){
			echo('
				$("#wrap_myTabs2").html("'.scSys::CheckText($chtml).'") ; 
				setTimeout(function(){
					OBJFORM_NEW.frmdash.grid2 	= 
						new Chart($("#wrapdash_pie")[0].getContext("2d")).Pie('.json_encode($vaData).')  ;  
				},50) ;  
			') ; 
		}
	}
?>