<?php 
class scDir{
	public static function GetTMP(){
		if(!defined("__TMP__")) define("__TMP__", sys_get_temp_dir() ) ; 
		return __TMP__ ; 
	}

	public static function CreateDir($cDir){
		@mkdir($cDir,0777,true) ; 
	}	 

	public static function DeleteDir($cDir){
		$files = array_diff(scandir($cDir), array('.','..')); 
	    foreach ($files as $file) { 
	      (is_dir($cDir . "/" . $file)) ? scOdt::delDir($cDir . "/" . $file) : unlink($cDir . "/" . $file); 
	    }  
	    return rmdir($cDir); 
	}

	public static function GetTMP_File($cDir,$cFileLoc,$va){
		unset($va['file']) ; 
		$cTMP 		 = self::GetTMP() ; 
		$cFile 		 = $cTMP . $cDir . "/" . md5($cFileLoc) . "/" ;
		self::CreateDir($cFile) ; 
		$cFile 		.= md5(implode(",",$va) . date("Ym") . GetSession("cSession_UserName") . session_id() ) . ".sctmp" ;
 
		return $cFile ;  
	} 

	public static function output_file_download($file, $name, $mime_type=''){
		 /*
		 This function takes a path to a file to output ($file), 
		 the filename that the browser will see ($name) and 
		 the MIME type of the file ($mime_type, optional).
		 
		 If you want to do something on download abort/finish,
		 register_shutdown_function('function_name');
		 */
		 if(!is_readable($file)) die('File not found or inaccessible!');
		 
		 $size = filesize($file);
		 //$name = rawurldecode($name);
		 
		 /* Figure out the MIME type (if not specified) */
		 $known_mime_types=array(
		 	"pdf" => "application/pdf",
		 	"txt" => "text/plain",
		 	"html" => "text/html",
		 	"htm" => "text/html",
			"exe" => "application/octet-stream",
			"zip" => "application/zip",
			"doc" => "application/msword",
			"xls" => "application/vnd.ms-excel",
			"ppt" => "application/vnd.ms-powerpoint",
			"gif" => "image/gif",
			"png" => "image/png",
			"jpeg"=> "image/jpg",
			"jpg" =>  "image/jpg"
		 );

		 if($mime_type==''){
			 //$file_extension = strtolower(substr(strrchr($file,"."),1));
			 $vaFile 			= pathinfo($file) ;
			 $file_extension	= $vaFile['extension'] ;  
			 if(array_key_exists($file_extension, $known_mime_types)){
				$mime_type=$known_mime_types[$file_extension];
			 } else {
				$mime_type="application/force-download";
			 };

		 }; 
		 
		 @ob_end_clean(); //turn off output buffering to decrease cpu usage
		 
		 // required for IE, otherwise Content-Disposition may be ignored
		 if(ini_get('zlib.output_compression'))
		  ini_set('zlib.output_compression', 'Off');
		 
		 header('Content-Type: ' . $mime_type);
		 header('Content-Disposition: attachment; filename="'.$name.'.'.$file_extension.'"');
		 header("Content-Transfer-Encoding: binary");
		 header('Accept-Ranges: bytes');
		 
		 /* The three lines below basically make the 
		    download non-cacheable */
		 header("Cache-control: private");
		 header('Pragma: private');
		 header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		 
		 // multipart-download and download resuming support
		 if(isset($_SERVER['HTTP_RANGE'])){
			list($a, $range) = explode("=",$_SERVER['HTTP_RANGE'],2);
			list($range) = explode(",",$range,2);
			list($range, $range_end) = explode("-", $range);
			$range=intval($range);
			if(!$range_end) {
				$range_end=$size-1;
			} else {
				$range_end=intval($range_end);
			}
		 
			$new_length = $range_end-$range+1;
			header("HTTP/1.1 206 Partial Content");
			header("Content-Length:" . $new_length);
			header("Content-Range: bytes " . $range-$range_end/$size);
		 } else {
			$new_length=$size;
			header("Content-Length: ".$size);
		 }
		 
		 /* output the file itself */
		 $chunksize = 1*(1024*1024); //you may want to change this
		 $bytes_send = 0;
		 if ($file = fopen($file, 'r')){
			if(isset($_SERVER['HTTP_RANGE']))
			fseek($file, $range);
		 
			while(!feof($file) && 
				(!connection_aborted()) && 
				($bytes_send<$new_length)
			      ){
				$buffer = fread($file, $chunksize);
				print($buffer); //echo($buffer); // is also possible
				flush();
				$bytes_send += strlen($buffer);
			}
		 fclose($file);
		}else die('Error - can not open file.');
		 
		die();
	}
}
?>   	