<?php
	class scAccess{
    public static $nSTATUS_RPcHECKER  = 0 ; 
    public static $nSTATUS_RPSIGNER   = 1 ; 
    public static $nSTATUS_ACC        = 2 ; 
    public static $nSTATUS_TOLAK      = 3 ; 

    public static $nSTATUS_NOTVIEW    = 0 ; 
    public static $nSTATUS_PROGRESS   = 1 ;  

    public static $vaSTATUS_COLOR     = array("#e74c3c","#d35400","#27ae60","#e74c3c","#34495e") ;  
    public static $vaSTATUS           = array("Proses Pemeriksaan","Proses Persetujuan","Disetujui","Ditolak","Dibatalkan") ; 
    public static $vaSTATUS_ONVIEW    = array("Belum Dilihat","Dikerjakan","Disetujui","Ditolak","Dibatalkan") ;

    public static function GetUserAccess($cKey,$cCabang){
      global $scDb ; 
      $vaUserSigner = array("UserName"=>"","FullName"=>"") ; 
      $cMd5Signer   = md5($cKey) ; 
      $lAda         = false ; 
      $dbDLv        = $scDb->Browse("username_level","Kode","Isi like '%$cMd5Signer%'") ;
      while($dbRLv  = $scDb->GetRow($dbDLv)){
        if(!$lAda){
          $cLvSigner    = $dbRLv['Kode'] ;
          $dbSigner     = $scDb->Browse("username","UserName,FullName,Nik NIK,Password","Cabang = '$cCabang' AND Password LIKE '%$cLvSigner'",
                                         "","","UserName asc","0,1") ; 
          if($scDb->Rows($dbSigner) > 0){
            if($dbR       = $scDb->GetRow($dbSigner)){
              $dbR['Lv']    = scCrypt::GetLevelKet($dbR['Password']) ; 
              unset($dbR['Password']) ; 
              $vaUserSigner = $dbR ; 
              $lAda         = true ; 
            }
          }
        }
      }
      
      return $vaUserSigner ; 
    } 

    public static function GetStatus_ByKode($cKode,$lColor=false){
      $cReturn  = "" ;
      if(isset(self::$vaSTATUS[$cKode])){
        $cReturn  = @self::$vaSTATUS[$cKode] ; 
        if($lColor){
          $cReturn  = '<span style="color:'.@self::$vaSTATUS_COLOR[$cKode].'">'.$cReturn.'</span>' ;
          $cReturn  = html_entity_decode($cReturn) ;  
        } 
      }
      return $cReturn ; 
    }

    public static function GetStatus_ByText($cText){
      $cReturn  = "" ; 
      $lLoop    = true ; 
      foreach (self::$vaSTATUS as $key => $value) {
        if($lLoop){
          if(strpos(strtolower($value), strtolower($cText)) > -1){
            $cReturn  = $key ; 
            $lLoop    = false ; 
          }
        }
      }
      return $cReturn ; 
    } 

		public static function GetLvAccess($cFileLoc,$lCek=true){
      $cMd5     = GetSession("cSession_SCLevelmd5") ; 
      $cLevel   = GetSession("cSession_SCLevel")  ;  
      if($lCek) $cFileLoc = str_replace("./pages/", "", GetLocationFile($cFileLoc)) ;  
      $vaReturn = array("lMaker"=>false,"lChecker"=>false,"lSigner"=>false) ; 
 
      if($cLevel == "0000"){
        $vaReturn = array("lMaker"=>false,"lChecker"=>false,"lSigner"=>true) ; 
      }else{
        if(  strpos($cMd5, md5($cFileLoc.".index.1") ) > -1) $vaReturn['lMaker']    = true ; 
        if(  strpos($cMd5, md5($cFileLoc.".index.2") ) > -1) $vaReturn['lChecker']  = true ; 
        if(  strpos($cMd5, md5($cFileLoc.".index.3") ) > -1) $vaReturn['lSigner']   = true ; 
      }
      SaveSession("lFOTO_DELETE","1") ; 
      return $vaReturn ; 
    }
 
    public static function SaveLvAccess($cFileLoc,$cTable,$cTableId,$cTableValue,$cId=""){
      global $scDb ; 
      $cUserName  = GetSession("cSession_UserName") ;
      $vaAccess   = self::GetLvAccess($cFileLoc) ; 
      $cTableValue= json_encode($cTableValue) ; 
      $cMd5Val    = md5($cTableValue) ;  
      $vaArray    = array("TableName"=>$cTable,"TableId"=>$cTableId,"TableValue"=>$cTableValue,"Md5Val"=>md5($cTableValue)) ; 
      $cReturn    = false ;  
      if($cId == ""){  
        scArray::ArrayMe($vaArray,"DateInsert",scDate::Date2String(scDate::GetTglTransaksi())) ; 
        scArray::ArrayMe($vaArray,"UserName_Maker",$cUserName) ;  
        scArray::ArrayMe($vaArray,"DatetimeInsert_Maker",date("Y-m-d h:i:s")) ; 
        
        if($vaAccess['lSigner'] || $vaAccess['lChecker']){
          //signer all  
          scArray::ArrayMe($vaArray,"Status","1") ;  
          scArray::ArrayMe($vaArray,"UserName_Checker",$cUserName) ; 
          scArray::ArrayMe($vaArray,"DatetimeInsert_Checker",date("Y-m-d h:i:s")) ;   
        }
      }else{
        $dbRowLast  = scSys::GetKeterangan("*","Id = '$cId'","sc_access_input") ; 
        $vaRowLog   = @json_decode($dbRowLast['UserName_Log'],true) ; 
        if(!is_array($vaRowLog)) $vaRowLog  = unserialize($dbRowLast['UserName_Log']) ; 
        if(!is_array($vaRowLog)) $vaRowLog  = array() ; 
        if($vaAccess['lMaker'] && !$vaAccess['lChecker'] && !$vaAccess['lSigner']){
          //edit maker
          if($dbRowLast['UserName_Maker'] !== $cUserName){
            scArray::ArrayMe($vaArray,"UserName_Maker",$cUserName) ; 
            if($dbRowLast['UserName_Maker'] !== ""){
              $vaRowLog[]['UserName_Maker@'. time()]  = $dbRowLast['UserName_Maker'] ; 
            }
          }
          scArray::ArrayMe($vaArray,"Status","0") ;
          scArray::ArrayMe($vaArray,"DatetimeUpdate_Maker",date("Y-m-d h:i:s")) ;   
        }

        if($vaAccess['lChecker'] && !$vaAccess['lSigner']){
          //edit maker
          if($dbRowLast['UserName_Checker'] !== $cUserName){
            scArray::ArrayMe($vaArray,"UserName_Checker",$cUserName) ; 
            if($dbRowLast['UserName_Checker'] !== ""){
              $vaRowLog[]['UserName_Checker@'. time()]  = $dbRowLast['UserName_Checker'] ; 
            }
          }
          scArray::ArrayMe($vaArray,"DatetimeUpdate_Checker",date("Y-m-d h:i:s")) ;   
          scArray::ArrayMe($vaArray,"Status","1") ;
        } 

        if(!empty($vaRowLog)){
          scArray::ArrayMe($vaArray,"UserName_Log", json_encode($vaRowLog) ) ;   
        } 
      }
      
      scArray::ArrayMe($vaArray,"StatusOnView","0") ;        

      if($vaAccess['lSigner']){
        //signer all  
        $cReturn  = true ; 
        scArray::ArrayMe($vaArray,"UserName_Signer",$cUserName) ; 
        scArray::ArrayMe($vaArray,"DatetimeInsert_Signer",date("Y-m-d h:i:s")) ;   
        scArray::ArrayMe($vaArray,"Status","2") ;  
        scArray::ArrayMe($vaArray,"StatusOnView","2") ;  
      } 

      $scDb->Update("sc_access_input",$vaArray,"Id = '$cId'",false,array("Cabang"=>GetSession("cSession_Cabang"))) ; 
      if($cReturn){
        $cReturn  = scSys::GetKeteranganOne("Id","TableName = '$cTable' and TableId = '$cTableId' and Md5Val = '$cMd5Val'",
                                            "sc_access_input") ; 
      }else{
        $cReturn  = "" ; 
      }
      return $cReturn ; 
    } 

    public static function CheckKode($cFileLoc,$cTable,$cTableId,$lAllow=false){
      global $scDb ; 
      $vaReturn       = array("Id"=>"","Pesan"=>"") ;  
      $cWhere         = !$lAllow ? " and (Status <> '2' and Status <> '4' and Status <> '5') " : "" ;
      $dbRow          = scSys::GetKeterangan("Id,UserName_Maker,StatusOnView",
                                                "TableName = '$cTable' and TableId = '$cTableId' " . $cWhere,
                                                "sc_access_input") ; 
      $vaReturn['Id'] = $dbRow['Id'] ; 
      $vaAccess       = self::GetLvAccess($cFileLoc) ; 
      if($vaAccess['lMaker']){
        if(GetSession("cSession_UserName") !== $dbRow['UserName_Maker']){
          $vaReturn['Pesan']  .= "Maaf Transaksi sudah dikerjakan oleh" . '\n' .
                                 scSys::GetKeteranganOne("FullName","UserName = '{$dbRow['UserName_Maker']}'","username") . '\n' .
                                 "Dan sedang menunggu persetujuan Terimakasih";   
        }
      } 

      return $vaReturn ; 
    }

    public static function SaveLogAccess($cId,$cLog){
      global $scDb ;  
      $scDb->Edit("sc_access_input",array("TableValue_Last"=>json_encode($cLog)),"Id = '$cId'",false ) ; 
    }

    public static function TolakData($cFileLoc,$cId,$cAlasan){
      global $scDb ; 
      $cUserName  = GetSession("cSession_UserName") ;
      $vaAccess   = self::GetLvAccess($cFileLoc) ; 
      $vaData   = array("Tgl"=>date("d-m-Y h:i:s"),"UserName"=>$cUserName,"Alasan"=>$cAlasan) ; 
      if($vaAccess['lChecker']){
        $vaArray  = array("Penolakan_Checker"=>json_encode($vaData),"Status"=>"3","StatusOnView"=>"0") ; 
      }else if($vaAccess['lSigner']){ 
        $vaArray  = array("Penolakan_Signer"=>json_encode($vaData),"Status"=>"3","StatusOnView"=>"0") ; 
      }
      if(!empty($vaArray)){
        $scDb->Edit("sc_access_input",$vaArray,"Id = '$cId'",false) ;
      } 
    }

    public static function BatalMutasi($cId,$cKey=4){
      global $scDb;   
      $scDb->Edit("sc_access_input",array("StatusOnView"=>$cKey,"Status"=>$cKey),"Id = '$cId'",false ) ; 
    } 

    public static function InitWrapInfo($dbRowAll,$cId,$oOSX){
      $dbRowAll['DatetimeInsert_Maker'] 
              = ($dbRowAll['DatetimeInsert_Maker'] < $dbRowAll['DatetimeUpdate_Maker']) ? 
                $dbRowAll['DatetimeUpdate_Maker'] : $dbRowAll['DatetimeInsert_Maker'] ; 
      $cAlasan1   = "" ;  
      $cAlasan2   = "" ; 
      if(GetSession("cSession_UserName") == $dbRowAll['UserName_Maker']){
        if($dbRowAll['Penolakan_Checker'] !== ""){
          $vaPenolakan  = @json_decode($dbRowAll['Penolakan_Checker'],true) ; 
          if(!is_array($vaPenolakan)) $vaPenolakan  = unserialize($dbRowAll['Penolakan_Checker']) ; 
          $cAlasan1    .= "<li>Penolakan Oleh Pemeriksa : <b>".
                    scSys::GetKeteranganOne("FullName","UserName = '{$vaPenolakan['UserName']}'","username") ."</b>" ;
          $cAlasan1    .= " Pada : <b>". $vaPenolakan['Tgl'] ."</b> , Dengan Alasan : <br />" ;
          $cAlasan1    .= "&quot;<i>" . scSys::CheckText($vaPenolakan['Alasan'],true) . "</i>&quot;</li>";
        }
        if($dbRowAll['Penolakan_Signer'] !== ""){
          $vaPenolakan  = @json_decode($dbRowAll['Penolakan_Signer'],true) ; 
          if(!is_array($vaPenolakan)) $vaPenolakan  = unserialize($dbRowAll['Penolakan_Signer']) ; 
          $cAlasan2    .= "<li>Penolakan Oleh Penyetuju : <b>".
                    scSys::GetKeteranganOne("FullName","UserName = '{$vaPenolakan['UserName']}'","username") ."</b>" ;
          $cAlasan2    .= " Pada : <b>". $vaPenolakan['Tgl'] ."</b> , Dengan Alasan : <br />" ;
          $cAlasan2    .= "&quot;<i>" .scSys::CheckText($vaPenolakan['Alasan'],true) . "</i>&quot;</li>" ;
        }  
        if($cAlasan1 !== "" || $cAlasan2 !== ""){ 
          $cAlasan2    .= "<li><a onClick=\"".$oOSX.".cmdBatal('".$cId."')\" style=\"cursor:pointer\">
                    Klik disini untuk pembatalan permintaan Mutasi</a> </li>" ; 
        }
      }
      $cHtml    = '<br />
                    <div class="alert alert-danger alert-dismissable"> 
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <b>
                        <ul style="padding-left:5px;">
                          <li>
                            Pembuat  : '. scSys::GetKeteranganOne("FullName","UserName = '{$dbRowAll['UserName_Maker']}'","username") .
                            ' ('. scDate::String2DateTime($dbRowAll['DatetimeInsert_Maker']) .')'.
                          '</li>
                          <li>
                        Pemeriksa : '. 
                        scSys::GetKeteranganOne("FullName","UserName = '{$dbRowAll['UserName_Checker']}'","username") .
                        ' ('. scDate::String2DateTime($dbRowAll['DatetimeUpdate_Checker']) .')'.
                        '</li> '.$cAlasan1.'
                        <li>
                        Penyetuju : '. 
                        scSys::GetKeteranganOne("FullName","UserName = '{$dbRowAll['UserName_Signer']}'","username") .
                        ' ('. scDate::String2DateTime($dbRowAll['DatetimeInsert_Signer']) .')'.
                        '</li> '.$cAlasan2.'
                        </ul>
                        </b>
                    </div>' ; 
      return $cHtml ; 
    }
	}
?>