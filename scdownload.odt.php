<?php 
$cNameOutput	= rawurldecode($_GET['file']) ; 
$cDirTmp		= rawurldecode($_GET['cDir']) ; 

if (file_exists($cNameOutput)) {
    //ob_start() ; 
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename($cNameOutput));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($cNameOutput));
    ob_clean(); 
    flush();
    readfile($cNameOutput);
    
    //removedir
    delDir($cDirTmp) ;     

    exit;   
}else{
    //echo $cNameOutput . "<br />" . $cDirTmp ; 
} 

function delDir($dir) { 
	$files = array_diff(scandir($dir), array('.','..')); 
    foreach ($files as $file) { 
      (is_dir($dir . "/" . $file)) ? delDir($dir . "/" . $file) : unlink($dir . "/" . $file); 
    }   
    return rmdir($dir); 
}   
?>