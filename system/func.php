<?php 
	//connect database 
	ScConnect() ;    
	SetDefine() ;

	include 'func/func.sppd.php' ; 
	
	//error handle 
	if($_SERVER['REMOTE_ADDR'] !== "::1"){
		set_error_handler("scErrorHandle");
	}

	function scErrorHandle($errno, $errstr, $errfile, $errline){
        $cError   = "Error on $errno File : $errfile($errline) -> $errstr" ;        
    }

	function SetDefine(){
		//set define harus dipanggil setiap saat karena define jika direload akan hilang
		//ex define("sapeltu","isi",true) ; 
		//location

		if(!defined("SYS_Url")){
			define("SYS_Url", scSys::GetConfig("sc_front_url")) ;	
		}
		if(!defined("SYS_UrlCore")){
			define("SYS_UrlCore", SYS_Url . "sapeltucore/") ; 	
		}
		if(!defined("SYS_UrlImages")){
			define("SYS_UrlImages", SYS_Url . "/uploaded/") ;  
		}
		if(!defined("SYS_Title")){
			define("SYS_Title", scSys::GetConfig("sc_front_title")) ;
		} 
		if(!defined("SYS_ImgHeader")){
			define("SYS_ImgHeader", scSys::GetConfig("sc_header")) ;
		} 
		if(!defined("SYSCORE_VER")){
			define("SYSCORE_VER", "0.0.1") ; 
		}
		if(!defined("SYCORE_MAIL")){
			define("SYCORE_MAIL", "SMTP") ; 	
		}


		//pdf setup
		if (!defined('PDF_MARGIN_FOOTER')) {
			define ('PDF_MARGIN_FOOTER', 10);
		} 

		if (!defined('PDF_MARGIN_TOP')) {
			define ('PDF_MARGIN_TOP', 10);
		}

		if (!defined('PDF_MARGIN_BOTTOM')) {
			define ('PDF_MARGIN_BOTTOM', 10);
		}

		if (!defined('PDF_MARGIN_LEFT')) {
			define ('PDF_MARGIN_LEFT', 13);
		}

		if (!defined('PDF_MARGIN_RIGHT')) {
			define ('PDF_MARGIN_RIGHT', 7);
		} 

		if (!defined('SYSCORE_VER')) {
			define ('SYSCORE_VER', '0.0.2');
		} 

 
 		if(GetSession("scDatabase") == ""){
 			SCDatabase() ;  
 			SaveSession("scDatabase","oke") ; 
 		}  
	}    

	//session ditaruh di settiap project agar berbeda session
	function GetSession($cKey,$cDefault=''){
		$cKey	= md5(session_id() . $_SERVER['HTTP_USER_AGENT'] . __FILE__ . $cKey) ; 
		$cReturn= "" ;
		if(isset($_SESSION[$cKey])) $cReturn	= $_SESSION[$cKey] ;
		if($cDefault !== ""){
			$_SESSION[$cKey]	= $cDefault ;	
			$cReturn 			= $cDefault ;
		}
		return $cReturn ; 
	}
	
	function SaveSession($cKey,$cValue){
		$cKey	= md5(session_id() . $_SERVER['HTTP_USER_AGENT']  . __FILE__ . $cKey) ; 
		if(!isset($_SESSION[$cKey])){
			$_SESSION[$cKey]	= "" ;	
		} 
		if($cValue == ""){
			if(isset($_SESSION[$cKey])) unset($_SESSION[$cKey]) ; 
		}else{ 
			$_SESSION[$cKey]	=  $cValue; 
		}
	}
	//end of session   

	function GetLocationFile($cFile=__FILE__){
		$cFile	= substr($cFile, strpos($cFile, "pages")) ; 
		$cFile	= str_replace(array(".ajax.php",".add.php",".modal.php",".php",".js"), "", $cFile) ; //remove extention
		$cFile	= str_replace("\\", "/", $cFile) ; //replace location \ to / {default dir server}
		return  "./" . $cFile; 
	} 

	function __parseMe($cData){
		$cParse 		= stripslashes(strip_tags(htmlspecialchars($cData ,ENT_QUOTES)));
		return $cParse;
	}  

	function __goLinkJs($cLink,$lScript=false,$lParent=false){ 
		$cReturn	= "" ; 
		if(!$lParent){
			$cReturn= "window.location = '".$cLink."'" ; 
		}else{
			$cReturn= "self.parent.window.location = '".$cLink."'" ; 
		}

		if($lScript){
			$cReturn= "<script>" . $cReturn . "</script>" ;
		}

		return $cReturn ; 
		
	} 

	function CheckAngka($dTgl){
		$cReturn	= (int) $dTgl ; 
		if($cReturn < 10 && $cReturn > 0){
			$cReturn	= "0" . $cReturn ; 
		}
		return $cReturn ; 
	}

	class scImages{
		public static function GetAvatar(){
			$cReturn	= "./images/avatar3.png" ; 
			$cFoto		= GetSession("cSession_Foto") ;
			if(is_file($cFoto)) $cReturn	= $cFoto ."?lastmod=" . time() ; 
			 
			return $cReturn ; 
		}
		
		public static function GenerateThumbnail($im_filename,$th_filename,$max_width,$max_height,$quality = 0.75){
			// The original image must exist
			if(is_file($im_filename)){  
			    // Let's create the directory if needed
			    $th_path = dirname($th_filename);
			    if(!is_dir($th_path))
			        mkdir($th_path, 0777, true);
			    // If the thumb does not aleady exists
			    if(!is_file($th_filename)){
			        // Get Image size info
			        list($width_orig, $height_orig, $image_type) = @getimagesize($im_filename);
			        if(!$width_orig)
			            return 2;
			        switch($image_type){
			            case 1: $src_im = @imagecreatefromgif($im_filename);    break;
			            case 2: $src_im = @imagecreatefromjpeg($im_filename);   break;
			            case 3: $src_im = @imagecreatefrompng($im_filename);    break;
			        }
			        if(!$src_im)
			            return 3;


			        $aspect_ratio = (float) $height_orig / $width_orig;

			        $thumb_height = $max_height;
			        $thumb_width = round($thumb_height / $aspect_ratio);
			        if($thumb_width > $max_width){
			            $thumb_width    = $max_width;
			            $thumb_height   = round($thumb_width * $aspect_ratio);
			        }

			        $width = $thumb_width;
			        $height = $thumb_height;

			        $dst_img = @imagecreatetruecolor($width, $height);
			        if(!$dst_img)
			            return 4;
			        $success = @imagecopyresampled($dst_img,$src_im,0,0,0,0,$width,$height,$width_orig,$height_orig);
			        if(!$success)
			            return 4;
			        switch ($image_type) {
			            case 1: $success = @imagegif($dst_img,$th_filename); break;
			            case 2: $success = @imagejpeg($dst_img,$th_filename,intval($quality*100));  break;
			            case 3: $success = @imagepng($dst_img,$th_filename,intval($quality*9)); break;
			        }
			        if(!$success)
			            return 4;
			    }
			    return 0;
			}
			return 1;
		}
	} 
?>  