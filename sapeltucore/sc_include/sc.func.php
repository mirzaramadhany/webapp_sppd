<?php
/*
	session from .ini 
	SC_ 
	session from table config
	ME.
	session for config.ini
	SYS.

     author              : sapeltu - core [www.core.sapeltu.com]
     creator             : Mirza Ramadhany
     date                : 01 November 2013
     last modified       : 
     fixed by            : Mirza Ramadhany 
     version             : 1.0.0
     file                : sc.func.php
*/
    session_name("SAPELTUCREATIVEID") ;
    session_start() ;
    date_default_timezone_set("Asia/Jakarta") ;  
     
    //include system 
    include_once 'sc.Date.php' ;
    include_once 'sc.Data.php' ;  
    include_once 'sc.ArraySer.php' ;
    include_once 'sc.crypt.php' ;
    include_once 'sc.Sys.php' ;
    include_once 'sc.odt.php' ;
    include_once 'sc.Access.php' ;
    include_once 'sc.dir.php' ;
    include_once 'sc.menu.php' ;
    
    //connect
    function ScConnect($cLocDev=''){
    	global $scDb ; 
    	$lFirst			     = false ;  
        if(defined("SYSCORE_LOC")){
            $cLocDev         = SYSCORE_LOC ; 
        }

        $cFileConnect        = "./sapeltucore/sc.ini.php" ;  
        if($cLocDev == ""){  
            if(!is_file($cFileConnect)) $cFileConnect = "./system/sc.ini.php" ;  
        }else{
            $cFileConnect   = $cLocDev . "system/sc.ini.php" ; 
        }

      if(!is_file($cFileConnect)) $cFileConnect = $cLocDev . "sc.ini.php" ; 
      if(!is_file($cFileConnect)) die("File system not found") ; 
        
 
    	if(is_file($cFileConnect) && GetSession("SC_IP") == ""){ 
        SaveSession("SC_Port","3306") ;  
        SaveSession("SC_Driver","mysql") ;  
    		$lFirst		= true ;
    		$vaFile		= file($cFileConnect) ;
    		foreach ($vaFile as $cKey => $cValue) {
    		 	if(strpos($cValue, "#") <> 0 ||
                    strpos($cValue, "#") == false){ 
    		 		$vaValue	= explode("=", trim($cValue)) ;
    		 		$cVal 		= (isset($vaValue[1])) ? trim($vaValue[1]) : "" ; 
     		 		switch (trim($vaValue[0])) {
     		 			case 'ip':
     		 				SaveSession("SC_IP",$cVal) ; 
     		 				break;
     		 			case 'user':
     		 				SaveSession("SC_User",$cVal) ; 
     		 				break;
 		 				  case 'password':
     		 				SaveSession("SC_Password",$cVal) ; 	
     		 				break;
     		 			case 'database':
     		 				SaveSession("SC_Database",$cVal) ; 	
     		 				break;
              case 'port':
                SaveSession("SC_Port",$cVal) ;  
                break;
              case 'driver':
                SaveSession("SC_Driver",$cVal) ;  
                break;
     		 			default: 
 		 					  SaveSession(trim($vaValue[0]) , $cVal) ;
     		 				break;
     		 		} 
    		 	}
    		 }    
    	}  

    	$cIP 			    = GetSession("SC_IP") ;
    	$cRoot			  = GetSession("SC_User") ;		
    	$cDatabase 		= GetSession("SC_Database") ;
    	$cPassword		= GetSession("SC_Password") ;  
    	$scDb->Connect($cIP,$cRoot,$cPassword,$cDatabase, GetSession("SC_Driver"), GetSession("SC_Port") ) ; 
    	if($lFirst ){       
          SaveSession("sc_main","sapeltu") ; //agar load page dapat digunakan  
          SCDefine($cLocDev) ; 
        }    

    }

    //define to sessiion
    function SCDefine($cLocDev=''){
        $cFileConnect        = "./sapeltucore/sc.config.ini" ;  
        if($cLocDev == ""){  
          if(!is_file($cFileConnect)) $cFileConnect = "./system/sc.config.ini" ;  
        }else{
          $cFileConnect   = $cLocDev . "system/sc.config.ini" ; 
        } 
        if(is_file($cFileConnect)){
          $vaFile     = file($cFileConnect) ; 
          foreach ($vaFile as $cKey => $cValue) { 
              if(strpos($cValue, "#") <> 0 ||
                        strpos($cValue, "#") == false){
                  $vaValue    = explode("=", trim($cValue)) ;
                  $cKeyye     = trim($vaValue[0]) ;
                  $cVal       = trim($vaValue[1]) ;
                  SaveSession("SYS." . $cKeyye,$cVal) ;       
              }  
           } 
        }
    } 
    
    class signature{//fak kudu diilangi
        //images
        public static function base64_to_jpeg($base64_string, $output_file) {
            $data = explode(',', $base64_string);
            $ifp = @fopen($output_file, "wb");

            $data = explode(',', $base64_string);

            @fwrite($ifp, base64_decode( $data[1] ));
            @fclose($ifp); 
            return $output_file; 
        } 

        public static function PNG2JPEG($inputfile,$outputfile){
            $im     = imagecreatefrompng($inputfile) ; 
            imagecolorallocate($im, 255, 255, 255); 
            imagejpeg($im,$outputfile,0) ; 
            imagedestroy($im) ; 
        }
 
        public static function add_mark($inputfile, $outputfile) {
            $im = @imagecreatefrompng($inputfile);

            $bg = @imagecolorallocate($im, 255, 255, 255);
            $textcolor = @imagecolorallocate($im, 235, 235, 235);

            $txtpos_x = imagesx($im) - 145;
            $txtpos_y = 20;

            @imagestring($im, 1, $txtpos_x, $txtpos_y, date("d-m-Y H:i:s"), $textcolor);

            @imagepng($im, $outputfile);

            // Output the image
            //imagejpeg($im);

            @imagedestroy($im);

        }
    }

    //function eksis
    if( !function_exists("mysql_real_escape_string")){
        function mysql_real_escape_string($cString){
            return $cString ; 
        }
    }
?>
