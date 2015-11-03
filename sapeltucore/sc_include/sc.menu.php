<?php 
	class scMn{
		public static $cFileLoc	= "./scmenu.menu.php" ;  
		
		public static function GetData_Menu($cPath="",$cSession="",$cmenu_key_set="",$cmodul_name=""){
			$vaReturn 		= array() ; 
			$vaReturn_Menu	= array() ; 
			$lEmpty 		= true ; 
			if($cSession !== ""){
				$vaReturn	= GetSession($cSession) ; 
				if($vaReturn !== ""){ 
					$lEmpty	= false ; 
					$vaReturn	= json_decode($vaReturn,true) ; 
				}
			}
			if($lEmpty){
				if($cPath == ""){
					$cFileLoc = self::$cFileLoc ; 	
				} else{
					$cFileLoc = $cPath . "scmenu.menu.php" ; 	
				}
				if(is_file($cFileLoc)){
					$vaFile 	= file($cFileLoc) ; 
					if(is_array($vaFile)){ 
						$vaReturn_Menu	=  
						$nkey_pos 	= 0 ; 
						$ckey_pos	= 0 ; 
						$vakey_pos 	= array() ;  
						$vaSet 		= array() ; 
						foreach ($vaFile as $ckeyfile => $cvalue) {
							$cIdentifier   	= strpos($cvalue, "#") ; 
			                if($cIdentifier === false && trim($cvalue) !== "" &&   
			                strpos($cvalue, "<?php die('Sapeltu Inc.'); ?>") !== 0){
			                	$nPos           = strpos($cvalue,"[") ;     
								$vaMenu         = scArray::Menu2Array($cvalue,$cPath,$cmodul_name) ;  
								if($nPos == 0 ){
									$vakey_pos 	= array() ;   
								}

								$cmenu_key 				= $vaMenu['cMd5'] ; 
								$vakey_pos[$nPos]		= $cmenu_key ;  

								self::SetArray_Tree($vaReturn,$vakey_pos,$nPos,$cmenu_key,$vaMenu) ;
			                }
						}
					} 
					if(is_array($vaReturn)){
						SaveSession($cSession,json_encode($vaReturn)) ; 
						$vaReturn_Menu	= $vaReturn ; 
					} 
					if($cmenu_key_set !== ""){
						$vaReturn_Menu 	= self::GetData_Menu($cFileLoc,$cSession,$cmenu_key_set) ; 	
					}
				}
			}else{
				if($cmenu_key_set == "") {
					$vaReturn_Menu	= $vaReturn ; 
				}else{
					$vaReturn_Menu 	= self::GetData_Menuchildren($vaReturn,$cmenu_key_set) ; 
				} 
			}

			return $vaReturn_Menu ;  

		}

		private static function SetArray_Tree(&$vaReturn,$vakey_pos,$nPos,$key,$vaMenu){
			if($nPos > 0){	
				$lvalid 	= true ; 
				$va_var		= "" ; 
				ksort($vakey_pos) ; 
				foreach ($vakey_pos as $key_pos => $value_pos) {
					if($lvalid && $key_pos == $nPos ) $lvalid 	= false ; 
					if($lvalid){
						if(isset($vaReturn[$value_pos])){
							$va_var	.= '["'.$value_pos.'"]' ; 
						}else{
							$va_var	.= '["children"]["'.$value_pos.'"]' ;  
						}
					}
				}
				eval('
					$vaReturn'.$va_var.'["children"]["'.$key.'"] = $vaMenu ;  
				') ; 

			}else{
				$vaReturn[$key]	= $vaMenu ; 
			}
		}

		private static function GetData_Menuchildren($vaReturn,$cmenu_key){
			$lFound 		= false ;
			$vaReturn_Menu	= array() ; 
			if(isset($vaReturn[$cmenu_key]["children"])){ 
				$lFound 		= true ; 
				$vaReturn_Menu	= $vaReturn[$cmenu_key]["children"] ; 
			}else{
				foreach ($vaReturn as $key => $vavalue) {
					if(isset($vavalue["children"])){
						return self::GetData_Menuchildren($vavalue["children"],$cmenu_key) ; 
					}
				}
			}
			return $vaReturn_Menu ; 
		} 

		public static function GetChildMenu($cJs=""){
            $vaArray 		= array() ;  
            $vaFile         = file(self::$cFileLoc) ;
            $nBertingkat    = 0 ;  
            $lValid 		= false ; 
            foreach ($vaFile as $nKey => $cValue) {
                $cIdentifier   = strpos($cValue, "#") ; 
                if($cIdentifier === false && trim($cValue) !== "" &&   
                strpos($cValue, "<?php die('Sapeltu Inc.'); ?>") !== 0 ){ //jika diawal value terisi # maka tidak dieksekusi
					//ambil posisi [ karna untuk menentukan sub sub menu 
					$nPos           = strpos($cValue,"[") ;  
					$lTop           = $nPos == 0 ? true : false ;  
					$vaMenu         = scArray::Menu2Array($cValue) ;  
					if(strpos($vaMenu["cNama"], "-MOBILE-") === false){
						$lParent        = false ;
						$lParentEnd     = false ;  
						$lBertingkatEnd = false  ; 
						$nNextKey       = scSys::CekSelanjutnya($nKey) ; 
						if(isset($vaFile[$nNextKey])){ 
							$nPosNext      = strpos($vaFile[$nNextKey],"[") ; 
							$lParent       = ($nPosNext > $nPos) ? true : false ; 
							$lParentEnd    = ($nPosNext >= $nPos) ? false : true ; 
							$lBertingkatEnd= ($nPosNext == 0) ? true : false ; 
						}else{  
							$nPosNext      = -1 ; 
							$lBertingkatEnd= true ;
						} 

						//isi 
						$cNamaMenu         	= $vaMenu['cNama']  ; 
						if($lParent){   
							$lValid 		= md5($cJs) == $vaMenu['cMd5'] ? true : false ; 
							$nBertingkat++ ;   
						}else{    
							if($lValid){
								$vaArray[$vaMenu['cMd5']]	= $vaMenu ; 
							}
						}    

						if($lParentEnd)  {//ditutup parent end
							$nBertingkat-- ; 
						}   

						if($nBertingkat > 0 && $lBertingkatEnd){
							while($nBertingkat > 0){
							   $nBertingkat-- ; 
							} 
						}  
					}
                }  
            }  
            return $vaArray ; 
        }
	}
?>