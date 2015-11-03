<?php
	if(isset($_POST['cmdUpdate']) ){ 
		$cName	= $_FILES["cFile"]["name"] ; 
		move_uploaded_file($_FILES["cFile"]["tmp_name"],"./uploaded/" .$cName);

		$zip	= new ZipArchive ; 
		if($zip->open('./'. $cName) === true){
			$vaName			= explode(".", $cName) ;
			$cNamedecode	= base64_decode($vaName[0]) ; 
			//if($cNamedecode == "./") $cNamedecode = "" ;  
			$zip->extractTo($cNamedecode ) ;   
			$zip->close() ;  
			echo "ok" ;   
			unlink("./" . $cName) ;   
		}else{ 
			echo "aff" ; 
		}
	}

	
	if(isset($_GET['conversi'])){
		include_once "./sapeltucore/sc_include/sc.func.php" ;
	    include_once "./sapeltucore/func.database.php" ;    
	    include_once "./sapeltucore/func.php" ;
	    
	    /*
	    $vaKlas		= unserialize(scSys::GetConfig("sysKlasifikasiLama")) ;

	    $dbData		= $scDb->Browse("conversi_pelanggan","*") ;
	    while($dbRow= $scDb->GetRow($dbData)){   
	    	$cKode	= $dbRow['Kode'] ;  
	    	if(strlen($cKode) < 8) $cKode	= "0" . $cKode ;
	    	$cKlasLama	= (int) $dbRow['KlasLama'] ;

	    	$vaArray= array("KlasLama"=>$cKlasLama,"KlasLama_Ket"=>$vaKlas[$cKlasLama],
	    					"JmlKonsumsi"=> (int) $dbRow['JmlKonsumsi']) ;   
	    	$scDb->Edit("pelanggan",$vaArray,"Kode = '$cKode'") ;  
	    } */

	    $dbData		= $scDb->Browse("pelanggan","*","TglKlasifikasi <> '0000-00-00 00:00:00'") ;  
	    while($dbRow= $scDb->GetRow($dbData)){
	    	$cKode		= $dbRow['Kode'] ; 
	    	$nKlasNilai	= (int) $dbRow['LuasBangunan'] + (int) $dbRow['JenisPondasi'] +
	    				(int) $dbRow['JenisLantai'] + (int) $dbRow['JenisDinding'] +
	    				(int) $dbRow['LapisanDinding'] + (int) $dbRow['JenisAtap'] +
	    				(int) $dbRow['Fasilitas'] + (int) $dbRow['Listrik'] +
	    				(int) $dbRow['Pengeluaran'] ; 
	    	$vaKlasBaru 	= pdam::GetKlasifikasi($nKlasNilai) ;  
	  		$cKlasBaru 		= $vaKlasBaru['Klas'] ;  
	  		$cKlasBaru_Ket	= $vaKlasBaru['Keterangan'] ; 
	  		$vaArray		= array("KlasBaru"=>$cKlasBaru,"KlasBaru_Ket"=>$cKlasBaru_Ket,
	  								"KlasNilai"=>$nKlasNilai) ; 	
	  		$scDb->Edit("pelanggan",$vaArray,"Kode = '$cKode'") ;
	  		echo("Kode : " . $cKode . " ok <br />"); 
	    }  
	}  
	
?>

<!DOCTYPE html>
<html>
<head>
	<title>Update</title>
</head>
<body>
	<form role="form" action="" method="POST" enctype="multipart/form-data">
		Filename: <input type="file" name="cFile" id="cFile" /> 
		<input type="submit" name="cmdUpdate" id="cmdUpdate">
	</form>
</body>
</html> 
<?php
	session_start() ; 
	session_destroy(); 
?>