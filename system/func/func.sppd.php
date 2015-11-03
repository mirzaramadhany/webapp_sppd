<?php 
class sppd{
	
	public static function GetStatus($cStatus=0,$lHtml=false){
		$vaStatus 	= array("Diinput","Dikerjakan","Selesai") ; 
		$vaColor	= array("text-danger","text-primary","text-success") ; 
		$cReturn	= $vaStatus[intval($cStatus)]  ; 
		if($lHtml){
			$cReturn	= '<span class="'.$vaColor[intval($cStatus)].'" style="font-weight:bold;">'.$cReturn.'</span>' ; 
		}  
		return $cReturn ; 
	}

	public static function SetRomawi($nAngka){
		$cReturn 	= "XII" ; 
		switch (intval($nAngka)) {
			case 1:
				$cReturn	= "I" ; 
			break;
			case 2:
				$cReturn	= "II" ; 
			break;
			case 3:
				$cReturn	= "III" ; 
			break;
			case 4:
				$cReturn	= "IV" ; 
			break;
			case 5:
				$cReturn	= "V" ; 
			break;
			case 6:
				$cReturn	= "VI" ; 
			break;
			case 7:
				$cReturn	= "VII" ; 
			break;
			case 8:
				$cReturn	= "VIII" ; 
			break;
			case 9:
				$cReturn	= "IX" ; 
			break;
			case 10:
				$cReturn	= "X" ; 
			break;
			case 11:
				$cReturn	= "II" ; 
			break;
		}
		return $cReturn ; 
	}

	public static function SendMail($cMailTo,$cSubject,$vaData){
		//set table
		$cBodyTable 	 = "" ; 
		foreach ($vaData as $key => $value) {
			$cBodyTable	.= '  <tr>
			                    <td class="head" style="border-bottom: 1px solid #eaeaea;font-size: 16px ; font-weight: 600; padding: 10px 5px 5px 5px;">'.$key.'</td>
			                  </tr>
			                  <tr>
			                    <td class="child" style="padding: 5px 10px ;">'.$value.'</td>
			                  </tr>' ; 
		}

		$cUrl 			 = scSys::GetConfig("sc_front_url") ; 
		$cImage 		 = $cUrl . str_replace("./", "", scSys::GetConfig("sc_logo_mail"))  ; 
		$vaReplace 		 = array("cTitle_Prg"=> scSys::GetConfig("sc_front_title"),
								 "cImage"	 => $cImage,
								 "cUrl"  	 => $cUrl,
								 "cTitle"	 => $cSubject,
								 "vaData"	 => $cBodyTable,
								 "nYear"	 => date("Y")) ; 
		$cData 			 = @file_get_contents("./pages/ajaxload/theme_mail.php") ; 
		$cData 			 = scSys::ReplaceString($vaReplace,$cData) ; 
		$cData 			 = trim(str_replace(array('\r','\n'),'', $cData)) ; 
		scSys::SendMail($cMailTo,$cSubject,$cData) ; 
	}
}
?>