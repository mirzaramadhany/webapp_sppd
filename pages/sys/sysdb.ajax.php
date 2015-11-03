<?php
	function Backup($va){
		global $scDb ; 
		$cFolder	= "./tmp/db_backup/" . GetSession("SC_Database") . "/" ; 
		if(is_dir($cFolder)){
			delDir($cFolder) ; 
		}  

		@mkdir($cFolder,0777) ; 	
 
		SaveSession("cDB_Folder",$cFolder) ;  

		$vaTable 	= array() ; 
		$nTable 	= 1 ; 
		$cNotDb		= "sc_config_log,penduduk" ; 
		$dbData		= $scDb->Sql("SHOW tables") ;  
		while($dbRow= $dbData->fetch(PDO::FETCH_BOTH)){ 
			if(strpos($cNotDb, $dbRow[0]) === false){
				$vaTable[]	= $dbRow[0] ; 
				$nTable++ ; 
			}
		}
		SaveSession("cDB_Table", serialize($vaTable)) ; 
		echo('onProgress_Backup(0,'.$nTable.') ') ; 
	} 

	function StartBackup($va){
		global $scDb ;
		ini_set("memory_limit",-1);  
		$nKey	= (int) $va['nKey'] ; 
		$nEnd	= (int) $va['nEnd'] ;  
		$vaTable= unserialize(GetSession("cDB_Table")) ;  
		$cFolder= GetSession("cDB_Folder") ; 
		$cText 	= "<?php" . chr(13) ; 	
		if($nKey == "0"){ 
			//struktur
			foreach ($vaTable as $nRa => $cValue) {
				$cText		.= "\$scDb->Sql(\"DROP TABLE IF EXISTS `".$cValue."`\") ;" . chr(13) ;  
				$dbData		 = $scDb->Sql("SHOW CREATE TABLE " . $cValue) ; 
				if($dbRow	 = $dbData->fetch(PDO::FETCH_BOTH)){
					$cText	.= "\$scDb->Sql(\"" . $dbRow[1] . "\") ; " . chr(13) ;  
				} 
			}
			$cText			.= "?>" ; 
			$objFile		 = fopen($cFolder . "ddl.scdb", "w") or die('Cannot open file') ; 
			fwrite($objFile, $cText) ;  
			fclose($objFile) ; 
		}else{
			//table
			$cTable 		 = $vaTable[($nKey-1)]  ; 
			//show coloumn
			$vaCol 			 = array() ; 
			$dbData			 = $scDb->Sql("SHOW COLUMNS FROM " . $cTable) ;
			while($dbRow	 = $dbData->fetch(PDO::FETCH_BOTH)){
				$vaCol[]	 = $dbRow[0] ;
			}
			$dbData			 = $scDb->Browse($cTable,"*") ; 
			$nRow 			 = $scDb->Rows($dbData) ; 
			$nLimit 		 = 1000 ; 
			$nLoop 			 = ($nRow > $nLimit) ? ceil($nRow / $nLimit) : 1 ; 
			for ($nL=0 ; $nL < $nLoop; $nL++) { 
				$cText 		 = "<?php" . chr(13) ; 
				$cLimit 	 = ($nL*$nLimit) . "," . $nLimit ; 
				$dbData		 = $scDb->Browse($cTable,"*","","","","",$cLimit) ;
				while ($dbRow= $dbData->fetch(PDO::FETCH_BOTH)) {
					$vaField 	 = array() ; 
					$cText	 .= "\$scDb->Sql(\" INSERT INTO `".$cTable."` VALUES(" ;
					foreach($vaCol as $cKey => $cField){
						$vaField[] 	= "'".addslashes($dbRow[$cField])."'" ; 
					}  
					$cText	 .= implode(",", $vaField) ; 
					$cText 	 .= ")\" ) ; " . chr(13) ; 
				} 
				$cText 		.= "?>" ;  
				$objFile		 = fopen($cFolder .$cTable."-".($nL+1).".scdb", "w") or die('Cannot open file') ; 
				fwrite($objFile, $cText) ;   
				fclose($objFile) ; 
			} 
		}  
		$nKey++ ;  
		if($nKey < $nEnd){
			echo(' onProgress_Backup('.$nKey.','.$nEnd.') ') ; 	
		}else{
			echo(' $("#tab_1").find(".cText").html("Compressing") ;') ;
			$cFileName 	= $cFolder . "scDB_" . GetSession("SC_Database") . "_" . date("dmY_his") . ".zip" ; 
			scOdt::scZipFile($cFolder, $cFileName) ;  
			$cHtml 	= '<a href=\"'.$cFileName.'\">Donwload File</a>' ;    
			echo ('	 
					$("#tab_1").find(".cText").html("Finish") ;  
					$("#tab_1").find("#cReturn").html("'.$cHtml.'") ; 
					$("#tab_1").find(".progress-bar").attr("aria-valuenow","100") ; 
  					$("#tab_1").find(".progress-bar").css("width","100%") ; 
					$(".cmdBackup").button("reset") ; 
				') ; 
		}
		
	}

	function delDir($cDir){
		$files = array_diff(scandir($cDir), array('.','..')); 
	    foreach ($files as $file) {  
	      (is_dir($cDir . "/" . $file)) ? delDir($cDir . "/" . $file) : unlink($cDir . "/" . $file); 
	    }  	 
	}

	function SavingRestore($va){ 
		$cReturn    		= null ;   
  		$cDir       		= "./tmp/db_restore/" ;
  		if(is_dir($cDir)){
  			delDir($cDir) ; 
  		}

		foreach($va['file'] as $vaFile){  
			$vaInfo			= pathinfo($vaFile['name']) ;   

			$cDir			= $cDir .  $vaInfo['filename'] . "." . $vaInfo['extension'] ; 
    		
			if(is_file($cDir)){
				unlink($cDir) ; 
			} 
			if(move_uploaded_file($vaFile['tmp_name'], $cDir)){  
				$cReturn 	= $cDir ;      
			}else{      
			    $cReturn 	= "" ; 
			}  
		} 	
  
		SaveSession("cRestore_DB", $cReturn) ;   
		echo('
				scAjax(cUrl,"InitRestore");
				$("#tab_2").find(".cText").html("Init Tables") ; 
		 	') ;  
	}

	function InitRestore($va){
		global $scDb ; 
		$cFile 		= GetSession("cRestore_DB") ; 
		$cDirTmp	= "./tmp/db_restore/folder/" ; 
		if(!is_dir($cDirTmp)){
			mkdir($cDirTmp,0777) ; 
		}else{
			delDir($cDirTmp) ;
			mkdir($cDirTmp,0777) ; 
		}
		//open file 
		$objZip		= new ZipArchive ; 
		if($objZip->open($cFile) === true){	
			if(is_dir($cDirTmp)){
				$objZip->extractTo($cDirTmp) ; 	 
			}   
			$objZip->close() ;
			$lValid	= true ; 
		}else{ 
			echo "$('#cmdRestore').button('reset') ; alert('Error') ; " ;
		}  

		if($lValid){
			//scan file 
			$files 	= array_diff(scandir($cDirTmp), array('.','..')); 
			$vaFile = array() ; 	
			$vaFileN= array() ; 
		    foreach ($files as $file) { 
		    	$cLoopDir 	= $cDirTmp  . $file ; 
		    	if(!is_dir($cLoopDir)){
		    		$vaInfo		= pathinfo($cLoopDir) ;
		    		$vaNameFile	= explode("-", $vaInfo['filename']) ;
		    		if(!isset($vaFileN[$vaNameFile[0]])){
		    			$vaFileN[$vaNameFile[0]]	= "1" ; 
		    		}
		    		if($vaNameFile[0] !== "ddl"){
		    			$vaFile[]	= $cLoopDir ; 	
		    		} 
		    	}  
		    } 

		    SaveSession("cRestore_File", serialize($vaFile)) ; 
		    $nFile 	= count($vaFile) + 1 ; 
		    echo('onProgress_Restore(0,'.$nFile.') ;') ;
		}
	}	 

	function StartRestore($va){
		global $scDb ; 
		$nKey	= (int) $va['nKey'] ; 
		$nEnd	= (int) $va['nEnd'] ;  
		$vaTable	= unserialize(GetSession("cRestore_File")) ; 	
		$cDir 		= "./tmp/db_restore/folder/" ; 
		if($nKey == 0){
			//ddl
			if(is_file($cDir."ddl.scdb")){
				include_once $cDir."ddl.scdb" ; 
			} 
		}else{
			//table
			$cFile 	= $vaTable[($nKey-1)] ;
			if(is_file($cFile)){
				include_once $cFile ; 
			}
		}

		$nKey++ ;  
		if($nKey < $nEnd){ 
			echo(' console.log("'.$cFile.'") ;onProgress_Restore('.$nKey.','.$nEnd.') ') ; 	
		}else{  
			echo(' $("#tab_1").find(".cText").html("Compressing") ;') ;
			$cFileName 	= $cFolder . "scDB_" . date("dmY_his") . ".backup" ; 
			scOdt::scZipFile($cFolder, $cFileName) ;  
			echo ('	 
					$("#tab_2").find(".cText").html("Finish") ;   
					$("#tab_2").find(".progress-bar").attr("aria-valuenow","100") ; 
  					$("#tab_2").find(".progress-bar").css("width","100%") ; 
					$(".cmdRestore").button("reset") ; 
				') ; 
		} 
	}
?> 