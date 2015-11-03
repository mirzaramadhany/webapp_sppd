<?php
	function Check($va){
		global $scDb ; 
		$cUserName	= strtolower($va['cUser']) ;
		$cPassword	= $va['cPassword'] ;  
		$cPassword	= scCrypt::CryptPass($cPassword) ;   
		
		$dbData		= $scDb->Browse("username","*",
										"UserName = '$cUserName' and Password like '$cPassword%'") ;
		if($dbRow	= $scDb->GetRow($dbData)){
			$cNama 	= "Administrator" ;   
			SaveSession("cSession_UserName",$cUserName) ;
			SaveSession("cSession_FullName",$dbRow['FullName']) ; 
			SaveSession("cSession_Foto",$dbRow['Foto'])  ;
			SaveSession("cSession_UserName_Target",$dbRow['UserName_Target'])  ;

			//new sc levelup
			$cLevel 	=  scCrypt::GetLevelPass($dbRow['Password']) ; 
			SaveSession("cSession_SCLevel",$cLevel) ; 
			SaveSession("cSession_SCLevelmd5", scSys::GetKeteranganOne("Isi","Kode = '$cLevel'","username_level") ) ; 
 
			//update login and last login 
			$vaArray	= array("LastLogin"=> date("Y-m-d h:i:s")) ; 
			$scDb->Edit("username",$vaArray,"UserName = '$cUserName' and Password like '$cPassword%'") ; 
			 
			SaveSession("bismillahauth", md5( time() . $cUserName ) ) ; 

			//reload me 
			echo('  
				window.location = "./" ;
				') ;   
		}else{
			echo('
					$("#login.panel .panel-body .error").slideDown(800,function(){
						$(this).html("User or Password not found") ; 
					}) ;  
				') ;  
		}
	}

	function Ping($va){
		global $scDb ; 
		//check username
		$cUserName 		= GetSession("cSession_UserName") ; 
		if($cUserName == "" || $cUserName == null){
			echo("	window.location 	= './logout.php' ; 
				") ;   
		} 

		if(isset($va['bismillahauth'])){
			if($va['bismillahauth'] !== ""){
				if( GetSession("bismillahauth") !== $va['bismillahauth'] ){
					echo(' window.location 	= "./" ; ') ; 
				}
			}
		} 
	} 

	function CheckNotification($va){
	}


	function Logout($va){
		global $scDb ; 
		$cUserName 	 = GetSession("cSession_UserName") ; 
		$vaArray	= array("LastLogin"=> "0000-00-00 00:00:00") ;   
		$scDb->Edit("username",$vaArray,"UserName = '$cUserName'",false) ; 

		echo('
				window.location = "./logout.php" ; 
			') ;
	} 
?>  