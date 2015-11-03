<?php 
	class scOdt{

		var $cLocFile		= "" ;
		var $lValid			= false ;
		var $cErr			= "" ;
		var $objFileReplace	= "" ; 
		var $objFolderImage	= "" ; 
		var $cDirTmp		= "" ;
		var $cJudul			= "" ; 
		var $cLocTmp		= "" ; 
		var $cJeru			= "" ; 

		function __construct($cLocFile,$cJudul="",$cLocTmp="../tmp/",$cJeru=""){
			$this->cLocFile	= $cLocFile ; 
			$this->cJudul	= $cJudul ; 
			$this->cLocTmp	= $cLocTmp ; 
			$this->cJeru	= $cJeru ; 

			$vaFile			= pathinfo($this->cLocFile) ; 
			switch ($vaFile['extension']) {
				case "docx" :
					$this->objFileReplace	= "word/document.xml" ; 
					$this->objFolderImage	= "word/media/" ; 
					break;  
				default: 
					$this->objFileReplace	= "content.xml" ; 
					break;
			}
		}

		private function OpenFile(){
			//open file merupakan unzip file ke tmp  
			$this->cDirTmp	= $this->cLocTmp . md5(time() . "_" . session_id())  . "/";
			if(!is_dir($this->cDirTmp)) mkdir($this->cDirTmp,0777) ;  

			//open file 
			$objZip		= new ZipArchive ; 
			if($objZip->open($this->cLocFile) === true){	
				if(is_dir($this->cDirTmp)){
					$objZip->extractTo($this->cDirTmp) ; 	
				}  
				$objZip->close() ;
				$this->lValid	= true ; 
			}else{
				$this->cErr	.= "Error unzip file" ;
			} 
		}

		public function ReplaceData($vaArray=array(),$vaImages=array()){
			$this->OpenFile() ;  
			//replace data 
			//key => adalah key dengan tambahan {}
			//value => isi yang akan direplace
			if($this->lValid){
				//get file content
				$cFile 		= $this->cDirTmp . $this->objFileReplace ; 
				if(is_file($cFile)){
					$cContent	= file_get_contents($cFile,FILE_USE_INCLUDE_PATH) ; 
					foreach ($vaArray as $key => $value) {
						$cContent	= str_replace("{" . $key . "}", $value, $cContent) ; 
					}
				}
				//open file and rewrite
				file_put_contents($cFile,$cContent) ; 
				//packetkan lada
				//get ekstension
				$vaFile		= pathinfo($this->cLocFile) ; 
				$cNameOutput= $this->cDirTmp . $this->cJudul . time() . "." . $vaFile['extension'] ; 

				if(!empty($vaImages)){
					//va imgages key
					//loc images server
					//name file

					if($this->objFolderImage !== ""){
						$cDirImages	= $this->cDirTmp . $this->objFolderImage ; 	
						foreach ($vaImages as $cKey => $vaValue) {
							if($vaFile['extension'] == "docx"){
								//remove dlu imagesnya
								unlink($cDirImages . $vaValue['name']) ; 
								if(!copy($vaValue['loc'], $cDirImages . $vaValue['name'])){ 
									echo $vaValue['loc'] . " " . $cDirImages . $vaValue['name'] ; 
								} 
							} 
						}
					}
				}

				scOdt::scZipFile($this->cDirTmp,$cNameOutput) ;  
				$cFile 		= "./scdownload.odt.php" ; 
				if(!is_file($cFile)) $cFile = "../scdownload.odt.php" ; 
				if($this->cJeru !== ""){
					$cNameOutput	= str_replace($this->cLocTmp, $this->cJeru, $cNameOutput ) ; 
					$this->cDirTmp	= str_replace($this->cLocTmp, $this->cJeru, $this->cDirTmp ) ;  
				} 
				$cReturn	= $cFile . "?file=" . rawurlencode( $cNameOutput) . "&cDir=" . rawurlencode( $this->cDirTmp ) ; 
				echo('  //alert("'.$this->cDirTmp.'") ;
						window.location.href = "'.$cReturn.'" ; 
						//window.open("'.$cReturn.'","_blank") ; 
					') ; 
			}else{   
				print($this->cErr) ;
			}
		}


		// statuc zip 
		public static function delDir($dir) { 
			$files = array_diff(scandir($dir), array('.','..')); 
		    foreach ($files as $file) { 
		      (is_dir($dir . "/" . $file)) ? scOdt::delDir($dir . "/" . $file) : unlink($dir . "/" . $file); 
		    }  
		    return rmdir($dir); 
		} 

		public static function scAddDir(&$zip,$cDir){
			if($zip->addEmptyDir($cDir)){

			}else{
				//echo('error on create dir -> '. $cDir) ;
			} 
		}

		public static  function scAddFiles(&$zip,$cFileName,$cLocation){ 
			$cDirSave = str_replace($cLocation, "",$cFileName) ; 
			if($zip->addFile($cFileName,$cDirSave)){
	 
			} else{
				//echo('error on create files -> '. $cDirSave) ;
			}
		}   

		public static function scZipFile($cDirLoc,$cFileName){ 
			if(is_dir($cDirLoc)){
				$cLocDefault	= $cDirLoc ; 
				if( file_exists($cFileName)) unlink($cFileName) ; 
				$zip 	= new ZipArchive ; 
				if($zip->open($cFileName,ZipArchive::CREATE) === true){
					scOdt::scScanDir($cDirLoc,$zip,$cLocDefault) ;	 
					$zip->close() ;  
				}else{
					//echo "eroror" ;
				}  
			}
		}

		public static  function scScanDir($cLocation,&$zip,$cLocDefault){
	          $objDir   = opendir($cLocation) ; 
	          while(false !== ($cFileName = readdir($objDir))){
	               $lValid   = true ; 
	               if($cFileName == ".." || $cFileName == "."){
	                    $lValid   = false ;      
	               }else if(strpos($cFileName,"~") > -1){
	                    $lValid   = false ; 
	               }  
	               
	               if($lValid){  
	                    $cDir     = $cLocation . $cFileName ;  
	                    $cDirSave = str_replace($cLocDefault, "",$cDir) ; 
	                    if(is_file($cDir)){ 
                    		scOdt::scAddFiles($zip, $cDir,$cLocDefault) ;   
                        	//echo "Create file {$cDirSave} <br >" ; 		                    	
	                    }else if(is_dir($cDir)){ 
                    		$cDir          .= "/" ;     
	                    	scOdt::scAddDir($zip, $cDirSave) ;  
	                    	//echo "Create Folder {$cDirSave} <br >" ;  
	                        //masuk ke dir  
	                        scOdt::scScanDir($cDir,$zip,$cLocDefault) ;       
	                    } 
	               }         
	          }  
	     } 
	}
?>