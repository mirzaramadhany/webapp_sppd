<?php
/*
     author              : sapeltu - core [www.core.sapeltu.com]
     creator             : Mirza Ramadhany
     date                : 01 November 2013
     last modified       : 17 September 2014
     fixed by            : Mirza Ramadhany 
     version             : 2.0.0
     file                : sc.Data.php
*/
class myDb extends PDO {
	private $cError		= "" ; 
	private $cLog 		= "" ; 
	private $lShowError	= true ;
	private $cSqlMe		= "" ;  
 	
 	public function __construct(){}

	public function Connect($cHost,$cUser,$cPassword,$cDb,$cEngine="mysql",$cPort="3306"){
		try {
			$cDNS	= $cEngine . ":dbname=" . $cDb . ";host=" . $cHost . ";port=" . $cPort ; 
			parent::__construct($cDNS, $cUser , $cPassword ) ; 
			parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    		parent::setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    		
			$this->cLog  		= GetSession("SYS_Log") ;
			$this->lShowError 	= GetSession("SYS_ShowError") !== "" ? GetSession("SYS_ShowError") : true ;
		} catch (PDOException $e) {
			session_destroy() ; 
			die("Connection not estalibed " . $e->getMessage() ) ; 
		}  
	}
	
	public function Browse($cTable,$cField="*",$cWhere="",$vaJoin=array(),$cGroup="",$cOrder="",$cLimit=""){
		if(trim($cWhere) <> "") $cWhere	= "WHERE " . $cWhere ; 
		if(trim($cOrder) <> "") $cOrder	= "ORDER BY " . $cOrder ;
		if(trim($cLimit) <> "") $cLimit	= "LIMIT " . $cLimit ;   	
		if(trim($cGroup) <> "")$cGroup	= "GROUP BY " . $cGroup ;
		
		$cJoin	= "" ; 
		if(!empty($vaJoin) ){
			if(is_array($vaJoin)){
				$cJoin 		 = implode(" ", $vaJoin) ; 	
			}else{
				$cJoin 		 = $vaJoin ; 
			}
		}
		$cSql	= "SELECT $cField FROM $cTable $cJoin $cWhere $cGroup $cOrder $cLimit" ;
		
		return $this->Sql($cSql) ; 
	}
	
	public function Insert($cTable,$vaData=array(),$lUpdateLog=true){
		$cField	= "" ;   
		$cValue	= "" ; 
		if(!empty($vaData)){
			foreach($vaData as $cKey => $cValues){
				$cValues = addslashes($cValues) ; 
				$cField	.= $cKey . "," ; 		
				$cValue	.= "'$cValues'," ; 
			}
			$cField	= substr($cField,0, strlen($cField) - 1) ;
			$cField	= "($cField)" ; 
			
			$cValue	= substr($cValue,0, strlen($cValue) - 1) ; 	
			$cValue	= "(". $this->UTF8Please($cValue) .")" ; 
		} 
		
		$cSql	= "INSERT INTO $cTable $cField VALUES $cValue" ; 
		$this->Sql($cSql) ; 

		//log 
		if($lUpdateLog) $this->SaveLog($cTable,"insert",$cSql) ;
		//end log 

		return empty($this->cError) ;  
	}
	
	public function Delete($cTable,$cWhere="",$lUpdateLog=true){
		if(trim($cWhere) <> "") $cWhere	= "WHERE " . $cWhere ; 
		$cSql	= "DELETE FROM $cTable $cWhere" ;
		$this->Sql($cSql) ; 
		
		//log 
		if($lUpdateLog) $this->SaveLog($cTable,"delete",$cSql) ;
		//end log 

		return empty($this->cError) ;  
	}

	public function DeleteAll($cTable){
		$this->Sql("TRUNCATE TABLE " . $cTable) ;
	} 
	
	public function Edit($cTable,$vaData=array(),$cWhere="",$lUpdateLog=true){
		if(trim($cWhere) <> "") $cWhere	= "WHERE " . $cWhere ; 
		$cData	= " set " ;  
		if(!empty($vaData)){
			foreach($vaData as $cKey => $cValue){
				$cValue  = addslashes($cValue) ;  
				$cData	.= $cKey . " = '". $this->UTF8Please($cValue) ."' , " ; 	
			} 
			$cData		 = substr($cData,0, strlen($cData) - 2) ; 
		}
		$cSql	= "UPDATE $cTable $cData $cWhere" ;
		$this->Sql($cSql) ; 

		//log 
		if($lUpdateLog) $this->SaveLog($cTable,"edit",$cSql) ;
		//end log

		return empty($this->cError) ;
	}
	
	public function Update($cTable,$vaData=array(),$cWhere="",$lUpdateLog=true,$vaInsert=array(),$vaEdit=array() ){
		$dbData	= $this->Browse($cTable,"*",$cWhere) ; 
		if($this->Rows($dbData) > 0){
			if(!empty($vaEdit)) $vaData	= array_merge($vaData,$vaEdit) ; 
			$this->Edit($cTable,$vaData,$cWhere,$lUpdateLog) ; 	
		}else{ 
			if(!empty($vaInsert)) $vaData	= array_merge($vaData,$vaInsert) ; 
			$this->Insert($cTable,$vaData,$lUpdateLog) ; 
		}
	}
	
	 
	public function GetRow($dbData){
		if($dbData !== null){
			if($this->cError == ""){
				try { 
					$dbRow	 = $dbData->fetch(PDO::FETCH_ASSOC) ; 
 
					if(!empty($dbRow) and is_array($dbRow)){
						foreach($dbRow as $cKey => $cValue){
							$dbRow[$cKey]	= stripslashes(trim($this->UTF8Please($cValue) )) ; 	
						}  
					} 
					return $dbRow ;   
				} catch (PDOException $e) {
					$this->cError	= $e->getMessage() ;	
					if($this->lShowError) echo $this->cError . " your query : $cQuery"; 	
				}
			}else{ 
				echo($this->cError) ;	
			} 
		}
	} 

	public function InsertID(){ 
		return parent::lastInsertId() ; 
	} 

	public function Rows($dbData){
		if($dbData !== null){
			return $dbData->rowCount() ; 
		} 
	}
	 
	public function GetId($cTable){
		$dbData	= $this->Browse($cTable,"max(Kode) Kode") ;
		$nRow	= 0 ; 
		if($dbRow	= $this->GetRow($dbData)){
			$nRow	= (int) $dbRow['Kode'] ; 		
		}
		$nRow++ ; 
		return $nRow ; 
	}  
 
	public function AddTable($cTable,$cSql,$cDb=""){
		$lFound			= false ; 
		$cWhereTable	= ($cDb !== "") ? " from " . $cDb : ""  ; 
		$dbData	= $this->Sql("show tables " . $cWhereTable) ; 
		while($dbRow = $dbData->fetch(PDO::FETCH_BOTH)){
			if(strtolower($dbRow[0]) == strtolower($cTable)){
				$lFound	= true ; 		
			}
		}
 
		if(!$lFound){
			$this->Sql($cSql) ; 
		}
	}

	public function AddField($cTable,$cField,$cTipe,$cDefault='',$cAfter=''){
		$lAda	= false ; 
		$dbData	= $this->Sql("show fields from $cTable where Field = '$cField'") ;
		if($this->Rows($dbData) > 0){
			$lAda	= true ; 	
		}

		if($cDefault !== '') $cDefault	= "DEFAULT " . $cDefault ; 
		 
		if(!$lAda){
			$cOAfter	= "" ; 
			if(trim($cAfter) <> ''){
				$cOAfter= " AFTER $cAfter" ; 
			} 
			 
			$this->Sql("ALTER TABLE $cTable ADD $cField $cTipe NOT NULL $cDefault $cOAfter") ; 
		} 
	} 
	
	public function Sql($cQuery){ 
		if($cQuery !== ""){
			$this->cSqlMe 	= $cQuery ; 

			try {
				$dbData			= parent::prepare($cQuery) ; 
				$dbData->execute() ;   
				return $dbData ; 
			} catch (PDOException $e) {
				$this->cError	= $e->getMessage() ;	
				if($this->lShowError) print_r($this->cError)  . print_r("your query : $cQuery") ;
			} catch (Exception $e ){
				$this->cError	= $e->getMessage() ;	
				if($this->lShowError) print_r($this->cError)  . print_r("your query : $cQuery") ;
			}
		}
		
	}

	public function Sql2($cQuery){
		if($cQuery !== ""){
			$this->cSqlMe 	= $cQuery ; 

			try {
				$dbData			= parent::exec($cQuery) ; 
				return $dbData ;  
			} catch (PDOException $e) {
				$this->cError	= $e->getMessage() ;	
				if($this->lShowError) print_r($this->cError)  . print_r("your query : $cQuery") ;
			} catch (Exception $e ){
				$this->cError	= $e->getMessage() ;	
				if($this->lShowError) print_r($this->cError)  . print_r("your query : $cQuery") ;
			}
		}
	}

	public function GetSQL(){
		return $this->cSqlMe ;  
	} 
 
	private function SaveLog($cTable,$cTipe,$cSql){ 
		if($this->cLog == "db_log"){
			$cSqla 	= htmlspecialchars($cSql) ;//str_replace("'"," ",$cSql) ; //agar dapat disave
			$vaData	= array("tbl"=>$cTable,"thistime"=>date("Y-m-d H:i:s"),  
							"crud"=>$cTipe,"thisip"=>@$_SERVER['REMOTE_ADDR'],
							"username"=>GetSession('cSession_UserName'),"thissql"=>$cSqla) ;  
			$this->Insert(GetSession("SC_Database")."_logs.log_sql_".date("Ym"),$vaData,false) ;    
		}else if($this->cLog == "db"){  
			$cSqla 	= htmlspecialchars($cSql) ;//str_replace("'"," ",$cSql) ; //agar dapat disave
			$vaData	= array("LogTable"=>$cTable,"LogWaktu"=>date("Y-m-d H:i:s"),  
							"LogCrud"=>$cTipe,"LogIp"=>@$_SERVER['REMOTE_ADDR'],"LogUserName"=>GetSession('cSession_UserName'),
							"LogSQL"=>$cSqla) ;  
			$this->Insert("sc_config_log",$vaData,false) ;    
		} 
	} 

	private function RemoveSpecialChar($cValue){
		$cData = array ('\\','\'','"');
		return str_replace($cData, " ", $cValue) ; 
	}

	public function UTF8Please($text,$lEncode=false){
		if($lEncode) $text 	= utf8_encode($text) ; 
		return iconv(mb_detect_encoding($text, mb_detect_order(), true), "UTF-8", $text);
		//return $text ; 
	}  
}  

$scDb	= new myDb() ;  	

//decprecated
if(!function_exists('mysql_real_escape_string')){
	function mysql_real_escape_string($cString){
		return addslashes($cString) ; 
	}
}
?>
