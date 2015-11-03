<?php
  /*
    author              : sapeltu - core [www.core.sapeltu.com]
    creator             : Mirza Ramadhany
    date                : 01 November 2013
    last modified       : 
    fixed by            : Mirza Ramadhany 
    version             : 1.0.0
    file                : sc.Sys.php
  */ 
  class scSys{
        public static function SCLicence($cPerusahaan="SCreativ"){
          echo(' 
            <!-- 
              #Program by SCreativ Team
              #Customer '.GetSession("SYS_Customer").'
              #Copyright '.$cPerusahaan.'.
            -->
            ') ; 
          
        }

        public static function IsJson($string){
          json_decode($string) ; 
          return (json_last_error() == JSON_ERROR_NONE);
        }

        public static function GetCapcha(){
          header("Content-Type: image/png");
           
          // start image canvas
          $image = @imagecreate(80, 25) or die("Could not create image!");
           
          // allocate colors
          imagecolorallocate($image,200,200,200);
          $color_black = imagecolorallocate($image,0,0,0);
           
          // generate random string and add it to the image
          $random_string = rand() . time() ;
          $random_string = sha1($random_string);
          $random_string = substr($random_string, 0, 7);

          //imagestring($image, $font_size, $x_pos, $y_pos, $random_string, $color_black);
          imagestring($image, 6, 10, 5,  $random_string, $color_black);
 
          // output image and free up memory
          imagepng($image); 
          SaveSession("sapeltu_captcha", $random_string) ;   
          imagedestroy($image);
        }
 
        public static function SendMail($cMailTo,$cSubject,$cMessage){
          $cMailUd   = "" ; 
          $cTitle    = self::GetConfig("sc_front_title") ; 
          $cMailRep  = self::GetConfig("sc_mail_reply") ;
          $cMailRep  = $cMailRep == "" ? "noreply@noreply.noreply" : $cMailRep;
          $cHeader   = 'MIME-Version: 1.0' . "\r\n";
          $cHeader  .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
          $cHeader  .= 'From:'. $cTitle  . "<".$cMailRep.">" . "\r\n"; 
          $cSubject  = $cSubject ;   
          foreach (explode(",", $cMailTo) as $cKey => $cValue) {
            $cValue      = trim($cValue) ; 
            if($cValue !== "" && strpos($cMailUd, $cValue) === false){
              $cMailUd  .= $cValue ; 
              if(SYCORE_MAIL == "SMTP"){
                $objMail = new PHPMailer() ; 
                $objMail->IsSMTP() ; 
                $objMail->SMTPAuth  = true;
                $objMail->IsHTML(true);
                $objMail->Host      = "mail.cna.gov.tl";
                $objMail->Port      = 25 ;
                $objMail->Username  = "pas@cna.gov.tl";
                $objMail->Password  = "P@ssw0rd";
                $objMail->SetFrom(' pas@cna.gov.tl', $cTitle);
                $objMail->Subject   = $cSubject ; 
                $objMail->MsgHTML($cMessage);
                $objMail->AddAddress($cValue);
                //if(!$objMail->send()){
                //  echo('console.log("Message Not Send '.scSys::CheckText($objMail->ErrorInfo).'") ;') ; 
                //} 
              }else{
                mail( $cValue, $cSubject, $cMessage, $cHeader) ; 
              }
            }
          }
        }

        public static function Devision($n1,$n2){
          $n1   = floatval($n1) ; 
          $n2   = floatval($n2) ; 

          if($n2 === 0 || $n2 == null)
            return 0 ; 

          return $n1 / $n2 ; 
        }

        public static function GetConfig($cKey,$cDefault=''){
            global $scDb ;   
            $dbData         = $scDb->Browse(GetSession("SYS_DB") . 'sc_config','Config_Value Keterangan',"Config_Key = '$cKey'") ;
            if($dbRow       = $scDb->GetRow($dbData)){
                if($dbRow['Keterangan'] !== ""){
                  $cDefault   = $dbRow['Keterangan'] ;   
                }
                
            }
            return $cDefault ;  
        }

        public static function GetConfigMeta($cKey,$cTable,$cMeta=''){
          global $scDb ;  
          $vaArray    = array() ;
          $dbData     = $scDb->Browse( GetSession("SYS_DB") .  'sc_config','Id',"Config_Key = '$cKey'") ;
          if($dbRow   = $scDb->GetRow($dbData)){
              $cId    = $dbRow['Id'] ;
              $dbData = $scDb->Browse( GetSession("SYS_DB") .  'sc_config','Config_Key,Config_Value Keterangan',
                                      "Config_Id = '$cId' and Config_Table = '$cTable' ") ;
              while ($dbRow = $scDb->GetRow($dbData)) { 
                $vaArray[$dbRow['Config_Key']]  = $dbRow['Keterangan'] ;    
              }  
          } 
          return $vaArray ; 
        }

        public static function GetConfigArray($cKey,$cKode=""){
          $vaReturn = array() ; 
          $vaReturn = unserialize(self::GetConfig($cKey)) ; 
          if($cKode !== ""){
            $vaReturn = $vaReturn[$cKode] ; 
          } 
          
          return $vaReturn ; 
        }

        public static function SaveConfig($cKey,$cDefault='',$cConfigTable='',$cConfigKey=''){
            global $scDb ; 
            if($cConfigKey !== "" && $cKey !== $cConfigKey){
              //get key  
              $vaKey      = self::GetKeterangan("Id","Config_Key = '$cConfigKey'", GetSession("SYS_DB") . "sc_config") ;
              $cConfigKey = $vaKey['Id'] ;   
            }else{
              $cConfigKey   = '' ; 
              $cConfigTable = '' ;  
            }
            $vaArray    = array("Config_Key"=>$cKey,"Config_Value"=>$cDefault,
                                "Config_Table"=>$cConfigTable,"Config_Id"=>$cConfigKey) ;    
            $scDb->Update( GetSession("SYS_DB") .  "sc_config",$vaArray,"Config_Key = '$cKey'") ;   
        }   

        public static function GetLastKode($cKey,$lUpdate=true,$dTgl='',$nLen=18){
            global $scDb ; 
            if($dTgl == ''){
              $dTglTransaksi  = scDate::GetTglTransaksi() ; 
              $dTgl           = $dTglTransaksi ; 
            }
            $dTgl           = date("dmy", strtotime(scDate::Date2String($dTgl))) ;    
            $dTgl           = str_replace("-", "", $dTgl) ; 
            
            $cCabang     = scSys::GetCabangUser() ; 
            $cKey       .= $cCabang . $dTgl ; //TBcabang2013100100001
            $nKey        = strlen($cKey) ; 
            $nRow        = self::GetLastInt($cKey,$lUpdate) ; 
            $cLastKode   = $cKey . str_repeat("0", $nLen - $nKey - strlen($nRow)) . $nRow ;
            return $cLastKode ; 
        }

        public static function GetLastInt($cKey,$lUpdate=true,$nLen=0){
          global $scDb ;
          $nRow        = 0 ; 
          $dbData      = $scDb->Browse( GetSession("SYS_DB") .  'sc_kode','Data',"Kode = '$cKey'") ;
          if($dbRow    = $scDb->GetRow($dbData)){
              $nRow    = (int) $dbRow['Data'] ; 
          }
          $nRow++ ;
          if($lUpdate){
              $vaArray     = array("Kode"=>$cKey,"Data"=>$nRow) ; 
              $scDb->Update( GetSession("SYS_DB") . "sc_kode",$vaArray,"Kode = '$cKey'",false) ;       
          }
          return self::Padl(trim(strval($nRow)),$nLen,"0") ; 
        }

        public static function GetKode($cKey,$lUpdate=true,$lFormatDate=false,$nLen=10,$lWithKey=true){
          global $scDb ;  
          if($lFormatDate){
            $cKey      = $cKey . date("ymd") ;  
          }
          $nRow         = self::GetLastInt($cKey,$lUpdate) ; 

          $cKey         = ($lFormatDate) ? date("ymd") : $cKey ; 
          if(!$lWithKey) $cKey  = "" ; 
          $cReturn      = "" ;  
          if($nLen > 0){
            $cReturn    = $cKey . str_repeat("0", $nLen - strlen($cKey) - strlen($nRow)) . $nRow ;
          }else{
            $cReturn    = $cKey . $nRow ; 
          } 
          return $cReturn ; 
        }  

        public static function GetKodeFix($cKey,$lUpdate=true,$nLen=0){
          return self::GetKode($cKey,$lUpdate,false,$nLen,false) ; 
        }  
         
         
        public static function GetKeterangan($cKet,$cWhere,$cTable){
            global $scDb ;   
            $dbData      = $scDb->Browse($cTable,$cKet,$cWhere,"","","","0,1") ; 
            $dbRow       = $scDb->GetRow($dbData) ;  
            return $dbRow ; 
        }

        public static function GetKeteranganOne($cField,$cWhere,$cTable,$cDefault=''){
            global $scDb ;   
            $dbRow       = self::GetKeterangan($cField,$cWhere,$cTable) ;  
            $cReturn     = $dbRow[$cField] !== "" && $dbRow[$cField] !== null ? $dbRow[$cField] : $cDefault ;
            return $cReturn ;  
        } 

        public static function CheckText($cText,$l2Br=false,$lWithN=true){   
            //ganti special char javascript 

            if($l2Br) $cText      = nl2br($cText) ; 
            $vaSpecial    = array(" \r\n\t\b\f\v\e\\\$\â€™\'\â€ ","\r","\t","\b","\f","â€™","\'","â€",
                                 "\v","\e","\$") ;     
            if($lWithN){
              $vaSpecial[]  = "\n" ;   
            }
            $cText      = str_replace($vaSpecial, " ",$cText) ;  
            if(!$lWithN) $cText      = str_replace("\n", '\n' ,$cText) ;    
            $cText      = str_replace('"','\"',$cText) ; 
             
            return $cText ; 
        }

        public static function CheckTextRemove($cText){
          $vaSpecial    = array(" \r\n\t\b\f\v\e\\\$\â€™\'\â€ ","\r","\t","\b","\f","â€™","\'","â€",
                                 "\v","\e","\\","\$","\n",'"',"'") ;     
          $cText      = str_replace($vaSpecial, " ",$cText) ;  
          return $cText ; 
        }

        public static function Padl($cText,$nLength,$cChar=""){
          $cPad     = "" ; 
          if(strlen($cText) < $nLength){
            $cPad     = str_repeat($cChar, $nLength - strlen($cText));  
          }
          return $cPad  . $cText ; 
        }

        public static function Array2CSV($cLoc="/tmp/",$vaArray,$cName="",$lShowHeader=true){
          scDir::CreateDir($cLoc) ; 
          $vaNot     = array('<b>','</b>','<u>','</u>','"',',') ;
          if($cName == ""){ 
            $cLoc   .= substr(md5(session_id()),26) . date("ymd") . ".csv" ;
          } else{
            $cLoc   .= $cName . ".csv" ; 
          }
          if(is_file($cLoc)) unlink($cLoc) ;  
          
          $nhd = fopen($cLoc,"a") ;
          $lFirst = true ;
          foreach($vaArray as $key=>$value){
            if($lFirst && $lShowHeader){
              $c = '"' ;
              foreach($value as $key1=>$value1){
                $c .= str_replace($vaNot, '', $key1) . '","' ;
              }
              $c = substr($c,0, strlen($c)-2) . chr(13) . chr(10) ;
              fwrite($nhd,$c) ;
              $lFirst = false ;
            }
            $c = '"' . implode('","', str_replace($vaNot, "", $value) ). '"' . chr(13) . chr(10) ;
            fwrite($nhd,$c) ; 
          }
          fclose($nhd) ;
          return $cLoc ; 
        } 

        public static function CekSelanjutnya($nKey,$lIndex=false,$cFile="./scmenu.menu.php"){
          $vaFile        = file($cFile) ;
          $nFile         = count($vaFile) ; 
          $lKey          = false ;  
          $nLoop         = 0  ;
          while (!$lKey && $nLoop < ($nFile) ) {
               $nLoop++ ; 
               $nKey++ ;
               
               if(isset($vaFile[$nKey])){
                    if( strpos($vaFile[$nKey], "#") === false ){
                      if(!$lIndex || ( strpos($vaFile[$nKey], "index.") === false )){
                        $lKey     = true ; 
                        $nLoop    = $nFile ;
                      }
                          
                    } 
               }else if(!isset($vaFile[$nKey])){
                    $lKey = true ; 
                    $nLoop= $nFile ; 
               } 
          }

          return $nKey ; 
        }

        public static function GetTreeMenu($cLevel="",$lCheckBox=true){
            $cReturn        = "" ; 
            $vaFile         = file("./scmenu.menu.php") ;
            $nBertingkat    = 0 ; 
            foreach ($vaFile as $nKey => $cValue) {
                $cIdentifier   = strpos($cValue, "#") ; 
                    if($cIdentifier === false && trim($cValue) !== "" &&   
                    strpos($cValue, "<?php die('Sapeltu Inc.'); ?>") !== 0){ //jika diawal value terisi # maka tidak dieksekusi
                     //ambil posisi [ karna untuk menentukan sub sub menu
                     $nPos           = strpos($cValue,"[") ;  
                     $lTop           = $nPos == 0 ? true : false ;  
                     $vaMenu         = scArray::Menu2Array($cValue) ; 
                     
                     $cReturn       .= '{' ;  
                     
                     //untuk menentukan sub menu / menutup sub menu maka harus dicek menu setelah menu ini
                     $lParent        = false ;
                     $lParentEnd     = false ;  
                     $lBertingkatEnd = false ; 
                     $nNextKey       = self::CekSelanjutnya($nKey) ; 
                     if(isset($vaFile[$nNextKey])){ 
                          $nPosNext      = strpos($vaFile[$nNextKey],"[") ; 
                          $lParent       = ($nPosNext > $nPos) ? true : false ; 
                          $lParentEnd    = ($nPosNext >= $nPos) ? false : true ; 
                          $lBertingkatEnd= ($nPosNext == 0) ? true : false ; 
                     }else{ 
                          //$lParentEnd    = true ; 
                          $nPosNext      = -1 ; 
                          $lBertingkatEnd= true ;
                     } 
                     
                     //isi 
                     $cNamaMenu         = $vaMenu['cNama']  ;
                     $cSelected         = (strpos($cLevel, $vaMenu['cMd5']) > -1 ) ? "select: true," : "" ; 
                     if($lParent){  
                          //jika jadi parent maka  
                          $cReturn .= 'title: "'.$vaMenu['cNama'].'", '.$cSelected.' expand: true, isFolder: true, key: "'. $vaMenu['cMd5'].'",' . 
                                        "children:[" ; 
                          $nBertingkat++ ; 
                     }else{    
                          $cReturn .= 'title: "'.$vaMenu['cNama'].'" , '.$cSelected.' key: "'.$vaMenu['cMd5'].'"}' ;
                          if($nPos == $nPosNext){ 
                            $cReturn    .= "," ;
                          } 
                     }   
                      
                     if($lParentEnd)  {//ditutup parent end
                          $nBertingkat-- ; 
                          $cReturn .= "]}," ; 
                     }   
                     
                     if($nBertingkat > 0 && $lBertingkatEnd){
                          while($nBertingkat > 0){
                               $nBertingkat-- ; 
                               $cReturn .= "]}," ;      
                          } 
                     }  
                } 
            } 
            return "[" . $cReturn . "]" ;
        }     


        public static function Terbilang($x){
          $abil = array("", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas");
            if ($x < 12) 
              return " " . $abil[$x] ; 
            elseif ($x < 20)
              return self::Terbilang($x - 10) . "belas";
            elseif ($x < 100) 
              return self::Terbilang($x / 10) . " Puluh" . self::Terbilang($x % 10) ;
            elseif ($x < 200)
              return " Seratus" . self::Terbilang($x - 100) ; 
            elseif ($x < 1000)
              return self::Terbilang($x / 100) . " Ratus" . self::Terbilang($x % 100) ;
            elseif ($x < 2000)
              return " Seribu" . self::Terbilang($x - 1000) ;
            elseif ($x < 1000000)
              return self::Terbilang($x / 1000) . " Ribu" . self::Terbilang($x % 1000) ;
            elseif ($x < 1000000000)
              return self::Terbilang($x / 1000000) . " Juta" . self::Terbilang($x % 1000000) ; 
        }  

        public static function GetAvatar(){
          $cReturn  = "./images/avatar5.png" ; 
          $cFoto    = GetSession("cSession_Foto") ;
          if(is_file($cFoto)) $cReturn  = $cFoto ."?lastmod=" . time() ; 
           
          return $cReturn ; 
        }

        public static function GetCabangUser($cUserName=''){
          $cCabang      = GetSession("cSession_Cabang") ; 
          if($cCabang   == ""){
            if($cUserName == "") $cUserName = GetSession("cSession_UserName") ;
            $cCabang    = scSys::GetKeteranganOne("Cabang","UserName = '$cUserName'","username") ;
            if($cCabang == "") $cCabang     = scSys::GetCabangInduk() ; 
            SaveSession("cSession_Cabang",$cCabang) ; 
          }  

          return $cCabang ; 
        }

        public static function GetCabang($cUserName){
          $cCabang    = scSys::GetKeteranganOne("Cabang","UserName = '$cUserName'","username") ;
          if($cCabang == "") $cCabang     = scSys::GetCabangInduk() ; 
          return $cCabang ; 
        }

        public static function GetCabangInduk(){
          $cCabang      = GetSession("cSession_CabangInduk") ; 
          if($cCabang   == ""){
            $cCabang    = scSys::GetConfig("Sys_CabangInduk") ; 
            SaveSession("cSession_CabangInduk",$cCabang) ; 
          }    
          return $cCabang ; 
        }
 
        public static function DefaultSys(){$vaArray=array();$vaArray['author']="amir.ramadhany@gmail.com";$vaArray['auth']="Sap2134";return $vaArray;}     

        public static function SaveLog($cLoc,$cFileName,$cString,$cType=0){
          if(!is_dir($cLoc)) mkdir($cLoc,0777) ;  

          if($cType== "1"){ 
            if(is_file($cLoc.$cFileName)){
              @unlink($cLoc.$cFileName) ; 
            }
          } 
          $cLastString   = "" ; 
          if(is_file($cLoc.$cFileName)){
            $cLastString = @file_get_contents($cLoc . $cFileName) ;   
          }
          $cLastString  .= $cString . chr(13) ; 
          @file_put_contents($cLoc . $cFileName, $cLastString) ; 
        }

        public static function SaveFoto($vaFoto,$cDestinationLast="../tmp/foto/",$cDestination="../tmp/pelanggan_data/",$cKode="",$lDeleteLast=true){
          scDir::CreateDir($cDestination) ; 
          $vaFotoSave       = array() ;  
          $nRow             = 0 ; 
          foreach ($vaFoto as $cKey => $cFoto) {
            if(is_file($cFoto)){
              $cFoto_Desti  = str_replace($cDestinationLast,$cDestination, $cFoto) ; 
              if($cKode !== ""){
                $vaFile     = pathinfo($cFoto) ;
                $cFileName  = $vaFile['filename'] ; 
                $cFoto_Desti= str_replace($cFileName, $cKode."@".(time() + $nRow) , $cFoto_Desti) ;
              } 
              if($cFoto_Desti !== $cFoto){ 
                copy($cFoto, $cFoto_Desti) ; 
                if($lDeleteLast) @unlink($cFoto) ; 
              }  
              $vaFotoSave[] = $cFoto_Desti ; 
            } 
            $nRow++ ; 
          }
          return $vaFotoSave ; 
        }

        public static function SetKey($s,$lSpace=true){
          $s = trim($s) ; 
          $d = array ('-','/','\\',',','.','#',':',';','\'','"','[',']','â€',
                '{','}',')','(','|','`','~','!','@','%','$','^','&',
                '*','=','?','+',"'");
          $s = str_replace($d, '', $s); // Hilangkan karakter yang telah disebutkan di array $d
          if($lSpace){
            $c = array (' ');
            $s = str_replace($c, '_', $s); // Ganti spasi dengan tanda _ 
          } 
          return $s; 
        }

        public static function ReplaceString($vaReplace,$cText){
          foreach ($vaReplace as $cKey => $cValue) {
            $cText  = str_replace("{{". $cKey ."}}", $cValue, $cText) ; 
          }
          return $cText ; 
        }

        public static function RemoveSpecialChar($cText){
          $vaArray  = array("'",'"',"#","$",";","{","}","\\","/",".") ;
          return str_replace($vaArray, "", $cText) ; 
        }


        public static function InitNotification($cType,$nRow,$cTitle,$cPage,$cId,$nKe,$cIconIo,$cIcon=""){//pdam
          if($nRow > 0){
            $cTypeClass   = "info" ; 
            $cTitleClass  = "" ;
            $cIcon        = "fa fa-info" ;
            switch ($cType) {
              case 0:
                $cHtml   = '<strong>Permintaan Pemeriksaan</strong><br/>' ;
                $cHtml  .= 'Jumlah : ' . $nRow ; 
                $cHtml  .= '<br />Mohon segera dikonfirmasi, terimakasih' ;  
                $cTitleClass  = "Permintaan Permeriksaan" ;
                break;
              case 1:
                $cHtml   = '<strong>Permintaan Persetujuan</strong><br/>' ;
                $cHtml  .= 'Jumlah : ' . $nRow ; 
                $cHtml  .= '<br />Mohon segera dikonfirmasi, terimakasih' ;  
                $cTitleClass  = "Permintaan Persetujuan" ;
                break;
              case 3:
                $cHtml   = '<strong>Penolakan</strong><br/>' ;
                $cHtml  .= 'Jumlah : ' . $nRow ; 
                $cHtml  .= '<br />Mohon diteliti kembali , terimakasih' ;  
                $cTypeClass = "error" ;
                $cTitleClass  = "Penolakan" ; 
                $cIcon        = "fa fa-ban" ; 
                break; 
              default: 
                $cHtml   = '<strong>Please Review and Execute</strong><br/>' ;
                $cHtml  .= 'Count : ' . $nRow ;  
                $cTitleClass  = $cTitleClass ;
                break;
            }
            
            echo('  
                new PNotify({
                            title: "'.$cTitle.'", 
                            text: "'.$cHtml.'", 
                            type: "'.$cTypeClass.'",
                            icon: "'.$cIcon.'", animation : "slide" ,
                            before_open: function(PNotify){
                                $("#wrapAudioNotif")[0].play();
                            },buttons: {
                        closer: false
                      }
                        })
                .get().click(function(){ 
                            ChangePage("#'.$cPage.'") ;
                        }) ; 
              ') ; 
            //add to notif top
            $cHtml      = '<li id="notifTop-'.$cId.$nKe.'">  
                      <a href="#" onClick="ChagePage(&quot;#'.$cPage.'&quot;)">
                      <i class="ion '.$cIconIo.'"></i>'.$nRow.' '.$cTitleClass.' '.$cTitle.'</a></li>' ; 
               
            echo(' 
                $("#oNotif_Body").find("#notifTop-'.$cId.$nKe.'").remove() ; 
                $("#oNotif_Body").prepend("'. scSys::CheckText($cHtml) .'") ; 
              ') ;   
          }else{
            echo('$("#oNotif_Body").find("#notifTop-'.$cId.$nKe.'").remove() ; ') ;
          }
        } 

        public static function Pdam_SingKlas($cKlas,$lLama=false){
          return pdam::Pdam_SingKlas($cKlas,$lLama) ; 
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