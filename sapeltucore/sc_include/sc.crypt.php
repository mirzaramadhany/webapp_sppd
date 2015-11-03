<?php
	/* 
	     author              : sapeltu - core [www.core.sapeltu.com]
	     creator             : Mirza Ramadhany
	     date                : 01 November 2013
	     last modified       : 
	     fixed by            : Mirza Ramadhany 
	     version             : 1.0.0
     	 file                : sc.crypt.php

	*/ 
	class scCrypt{
        public static function CryptPass($cPass){   
            return sha1((md5($cPass.md5("sapeltucrypt".$cPass)) . ord('s') . ord('c') . "sc") ) ;
        }   
 
        public static function GetLevelPass($cPass){  
        	return substr($cPass, strlen($cPass) - 4, 4) ; 
        } 

        public static function GetLevelKet($cPass){
        	$cLv 	= self::GetLevelPass($cPass) ; 
        	return scSys::GetKeteranganOne("Keterangan","Kode = '$cLv'","username_level") ; 
        }
    }
?> 