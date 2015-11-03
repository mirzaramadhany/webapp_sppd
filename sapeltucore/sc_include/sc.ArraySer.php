<?php
	/* 
	     author              : sapeltu - core [www.core.sapeltu.com]
	     creator             : Mirza Ramadhany
	     date                : 01 November 2013
	     last modified       : 
	     fixed by            : Mirza Ramadhany 
	     version             : 1.0.0
	     file                : sc.ArraySer.php
	*/ 
	class scArray{ 
		public static function Array2Ser($vaArray){
			return serialize($vaArray) ; 
		}

		public static function Ser2Array($cLong,$vaDefault=array()){
			$vaArray	= $vaDefault ;  
			if(trim($cLong) !== ""){
				$vaArray= unserialize($cLong) ; 
			}
			return $vaArray ; 
		}  

		public static function Array2ObjArray($va){
			$cString  = "[" ;
			self::Array2Obj($va,$cString) ; 
			$cString .= "]" ;   
			$vaString  = explode("}",$cString) ; 
			if(count($vaString) > 1){
				$cString  = implode("},", $vaString) ; 	
			}
			
			return $cString ;    
		} 

		public static function Array2Obj($va,&$cText){
			$lArray 	= false ; 
			$nLength	= count($va) - 1 ; 
			$cHtml 	   	= "" ; 
			foreach ($va as $cKey => $cValue) {
				if(is_array($cValue)){
					self::Array2Obj($cValue,$cText) ; 
				}else{
					$lArray	 = true ; 
					$cValue	 = is_string($cValue) ? "\"". $cValue ."\"" : $cValue ; 
					$cHtml	.= $cKey . ":" . $cValue ;  
					if($nRow < $nLength){
						$cHtml.= "," ;  
					}  
					$nRow++ ; 
				}
			}
			if($lArray){ 
				$cText	.= "{" . $cHtml . "}" ;		
			} 
		} 

		public static function Array2Var($va){
			foreach ($va as $cKey => $cValue) {  
				eval(" \${$cKey} = '{$cValue}';") ;   
			}           
		}

		public static function Menu2Array($cMenu,$cPath="",$cmodul_name=""){ 
			$vaArray  = array("cNama"=>"","cJs"=>"","cIcon"=>"","cMd5"=>0,"cFormName"=>"") ; 
			eval('$va = array' . str_replace("[","(", str_replace("]",")",$cMenu)) . ';' ) ; //eval to array            
			//set to Array 
          	if(SYSCORE_VER == "0.0.1"){//versi lawas
				$vaArray['cNama'] = isset($va[0]) ? $va[0] : "" ; 
				$vaArray['cJs']   = isset($va[1]) ? $va[1] : "" ;
				$vaArray['cIcon'] = isset($va[2]) ? $va[2] : "" ; 
				$vaArray['cMd5']  = isset($va[3]) ? md5($va[3]) : md5($va[1]) ; 
          	}else if(SYSCORE_VER == "0.0.2"){//versi lawas
				$vaArray['cNama'] = isset($va[0]) ? $va[0] : "" ; 
				$vaArray['cJs']   = isset($va[1]) ? $va[1] : "" ;
				$vaArray['cIcon'] = isset($va[2]) ? $va[2] : "" ;
				$vaArray['cID']   = isset($va[3]) ? $va[3] : "" ;
				$vaArray['cMd5']  = isset($va[4]) ? md5($va[4]) : md5($va[1]) ;  
          	}else if(SYSCORE_VER == "0.0.3"){//versi pdam gila
          		$vaArray['cNama']   	= isset($va[0]) ? $va[0] : "" ; 
				$vaArray['cJs']     	= isset($va[1]) ? $va[1] : "" ;
				$vaArray['cIcon']   	= isset($va[2]) ? ($va[2] !== "" ? $va[2] : "fa fa-folder-open-o") : "fa fa-folder-open-o" ;
				$vaArray['cMd5']  		= isset($va[3]) ? ($va[3] !== "" ? md5($va[3]) : md5($va[1])) : md5($va[1]) ; 
				$vaArray['cFormName']	= isset($va[4]) ? $va[4] : "" ; 
				$vaArray['nWidth']		= isset($va[5]) ? $va[5] : "" ;
				$vaArray['nHeight']		= isset($va[6]) ? $va[6] : "" ; 
				$vaArray['lTitleBar']	= isset($va[7]) ? $va[7] : true ;
				$vaArray['lResize']		= isset($va[8]) ? $va[8] : true ;
				$vaArray['lModal']		= isset($va[9]) ? $va[9] : false ;
				$vaArray['lFrame']		= isset($va[10]) ? $va[10] : false ;
          	}else if(SYSCORE_VER == "1.0.0"){  //versi desktop new
	          	$vaArray['cNama']   	= isset($va[0]) ? $va[0] : "" ; 
				$vaArray['cJs']     	= isset($va[1]) ? $va[1] : "" ;
				$vaArray['cIcon']   	= isset($va[2]) ? ($va[2] !== "" ? $va[2] : "fa fa-folder-open-o") : "fa fa-folder-open-o" ;
				$vaArray['cMd5']  		= $va[1] !== "" ? md5($va[1]) : md5($va[3]) ; 
				$vaArray['cFormName']	= isset($va[3]) ? $va[3] : "" ;
				$vaArray['nWidth']		= isset($va[4]) ? $va[4] : "" ;
				$vaArray['nHeight']		= isset($va[5]) ? $va[5] : "" ; 
				$vaArray['lTitleBar']	= isset($va[6]) ? $va[6] : true ;
				$vaArray['lResize']		= isset($va[7]) ? $va[7] : true ;
				$vaArray['lModal']		= isset($va[8]) ? $va[8] : false ;
				$vaArray['lFrame']		= isset($va[9]) ? $va[9] : false ;
			}else if(SYSCORE_VER == "2.0.0"){ //versi mobile new
          		$vaArray['cNama']   	= isset($va[0]) ? $va[0] : "" ; 
				$vaArray['cJs']     	= isset($va[1]) ? $va[1] : "" ;
				if($cPath !== "" && $vaArray['cJs'] !== ""){//module
					$vaArray['cJs']		= $cPath . "pages/" . $vaArray['cJs'] ; 
					$va[1]				= $vaArray['cJs'] ; 
				}
				
				$vaArray['cIcon']   	= isset($va[2]) ? ($va[2] !== "" ? $va[2] : "fa fa-folder-open-o") : "fa fa-folder-open-o" ;
				$vaArray['cMd5']  		= $va[1] !== "" ? md5($va[1]) : md5($va[3]) ; 
				$vaArray['cFormName']	= isset($va[3]) ? $va[3] : "" ;
				$vaArray['lNoContent']	= isset($va[4]) ? $va[4] : false ;
				$vaArray['attr_sccontent']	= isset($va[5]) ? str_replace("&quot;", '"', $va[5]) : "" ;
				$vaArray['cModul_Name'] = "" ;  
				if($cmodul_name !== "") $vaArray['cModul_Name']	= ucfirst($cmodul_name) ; 
          	} 
           
        	return $vaArray ;   
	    }

	    public static function ArrayMe(&$vaArray,$cKey,$cValue="",$lIsi=true){ 
            if(!isset($vaArray[$cKey])){
                $vaArray[$cKey] = "" ;  
            }
            if($lIsi) $vaArray[$cKey] = $cValue ;  
        } 

        public static function XML2Array($cXML){
        	$vaArray	= json_decode(json_encode(simplexml_load_string($cXML)),true)  ; 
        	return $vaArray ;
        }

        public static function Array2XML($vaArray){
			ob_clean() ; 
			header("Content-type: text/xml"); 	
			$cText		= "" ;  
			//print_r($vaArray) ; die() ; 
			self::LoopArray2XML($vaArray,$cText) ;
			echo '<xml>' . $cText . '</xml>'; 
		} 

		private static function LoopArray2XML($vaArray,&$cText){
			foreach ($vaArray as $cKey => $vaValue) {
				if(is_array($vaValue)){
					$cText	.= (!is_int($cKey)) ? "<" . $cKey . ">" : "" ;  
					self::LoopArray2XML($vaValue,$cText) ; 
					$cText	.= (!is_int($cKey)) ? "</" . $cKey . ">" : "" ; 
				}else{
					$cText	.= "<" . $cKey . ">" ; 
					$cText	.= 		$vaValue ; 
					$cText	.= "</" . $cKey . ">" ; 
				}
			}
		}
	}
?>