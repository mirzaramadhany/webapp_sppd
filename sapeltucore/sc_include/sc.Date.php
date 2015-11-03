<?php
/*
     author              : sapeltu - core [www.core.sapeltu.com]
     creator             : Mirza Ramadhany
     date                : 06 Juni 2014
     last modified       : -
     fixed by            : -
     version             : 1.10.1
     file                : sc.Date.php

*/ 
	class scDate{

		public static function GetTglTransaksi($lString=false){
			//return self::String2Date(scSys::GetConfig("sc_tgltransaksi",date("Y-m-d"))) ; 
			global $scDb ; 
			$dTgl 		= date("Y-m-d") ;  
			$dbData 	= $scDb->Browse("master_adendumbulan","TglAwal","TglAwal <= '$dTgl' and TglAkhir >= '$dTgl'",
							"","TglAwal","Id desc","0,1") ;
			if($dbRow 	= $scDb->GetRow($dbData) ){
				if($dbRow['TglAwal'] !== "") $dTgl 	= $dbRow['TglAwal'] ; 	
			}
			if(!$lString) $dTgl 	= self::String2Date($dTgl) ;

			return $dTgl ; 
		}   

		public static function SetDataDate($lTime=false){
			$cFormat	= 'DD-MM-YYYY' ; 
			if($lTime) $cFormat .= ' HH:mm:ss' ;
			echo 'data-date-format="'.$cFormat.'"' ;
		}

		public static function GetSelectTahun($cTahun){
			$cTahun		= (int) $cTahun ; 
			$cReturn	= "" ; 
			for($o = $cTahun - 2 ; $o <= $cTahun ;$o++ ){
				$cSelected	 = $o == $cTahun ? 'selected="selected"' : '' ; 
				$cReturn	.= "<option value='".$o."' ".$cSelected.">".$o."</option>" ; 
			}
			return $cReturn ; 
		}

		public static function DateTime2String($dTgl){
			list($vaDate,$vaTime)	= explode(" ", $dTgl) ; 
			return self::Date2String($vaDate) . " " . $vaTime ; 
		}

		public static function String2DateTime($dTgl){
			$cReturn 		= "-" ; 
			if($dTgl !== "" && $dTgl !== "0000-00-00 00:00:00"){
				$cReturn	= date("d-m-Y H:i:s", strtotime($dTgl)) ; 
			}
			return $cReturn ;
		}  
		
		public static function Date2String($dTgl){
			//return 2012-11-22
			if($dTgl == "" || $dTgl == "00-00-0000") return "" ; 
			list($cDate,$cMount,$cYear)	= explode("-",$dTgl) ;
			if(strlen($cDate) == 2){
				$dTgl	= $cYear . "-" . $cMount . "-" . $cDate ;
			}
			return $dTgl ; 
		}
		
		public static function String2Date($dTgl,$cNewSpa="-"){
			//return 22-11-2012  
			if($dTgl == "" || $dTgl == "0000-00-00") return "" ; 
			list($cYear,$cMount,$cDate)	= explode("-",$dTgl) ;
			if(strlen($cYear) == 4){ 
				$dTgl	= $cDate . $cNewSpa . $cMount . $cNewSpa . $cYear ;
			} 
			return $dTgl ; 	
		}
		
		public static function Tgl2Time($dTgl){
			$dTgl		= self::Date2String($dTgl) ; 
			return strtotime($dTgl) ; 	
		} 

		public static function Date2Var($dTgl){
			$vaDate		= getdate(self::Tgl2Time($dTgl)) ;
			$vaArray	= array("Tgl"=>$vaDate['mday'],"Hari"=> self::GetDay($vaDate['wday']),
								"Bulan"=> self::GetMount($dTgl),"Tahun"=>$vaDate['year']) ;
			return $vaArray ;  
		} 

		public static function GetDay($nKey){
			$vaDay		= array("Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu") ; 
			return $vaDay[$nKey] ; 
		}

		public static function GetBulan($nKey){
			$vaBulan	= self::SetBulan() ;  
			return $vaBulan[$nKey] ;  
		}

		public static function SetBulan(){
			$vaBulan	= array("Januari","Februari","Maret","April","Mei","Juni","Juli",
								"Agustus","September","Oktober","November","Desember") ;
			return $vaBulan ;
		}
		
		public static function GetMount($dTgl,$lIndonesia=true){
			$vaMount	= array("Januari","Februari","Maret","April","Mei","Juni","Juli",
								"Agustus","September","Oktober","November","Desember") ; 
			$cMount		= date("m", self::Tgl2Time($dTgl)) ; 
			if($lIndonesia){ 
				$cMount	= $vaMount[(int) $cMount - 1] ; 		
			}
			return $cMount ; 
		}

		public static function GetNamaBulan($nKey,$cType="default"){
			if($cType == "default"){
				$vaMount	= array("Januari","Februari","Maret","April","Mei","Juni","Juli",
								"Agustus","September","Oktober","November","Desember") ; 	
			}else if($cType == "singkat"){ 
				$vaMount	= array("Jan","Feb","Mar","Apr","Mei","Jun","Jul",
									"Agst","Sept","Okt","Nov","Des") ; 	
			}
			
			$cMount	= $vaMount[(int) $nKey - 1] ; 		

			return $cMount ;  
		}

		public static function EOM($dTgl){
			if(strpos($dTgl, " ") > -1){
				$dTgl = self::DateTime2String($dTgl) ; 
			}else{
				$dTgl = self::Date2String($dTgl) ; 
			}

			$vaDate	  = explode(" ", $dTgl) ; 
			$vaMyDate = explode("-", $vaDate[0]) ; 
			return date("Y-m-t" , mktime(0,0,0,$vaMyDate[1],1,$vaMyDate[0])) ;
		} 

		public static function BOM($dTgl){
			if(strpos($dTgl, " ") > -1){
				$dTgl = self::DateTime2String($dTgl) ; 
			}else{
				$dTgl = self::Date2String($dTgl) ; 
			}

			$vaDate	  = explode(" ", $dTgl) ; 
			$vaMyDate = explode("-", $vaDate[0]) ; 
			return $vaMyDate[0] . "-" . $vaMyDate[1] . "-01" ; 
		} 

		public static function isHoliday($dTgl,$dTahun){
			$cLibur		= scSys::GetConfig("sc_harilibur_" . $dTahun)  ; 
			$vaGetDate	= getdate(strtotime($dTgl)) ;  
			$lValid		= strpos($cLibur, $dTgl) > -1 ? true : false ; 
			$lValid		= $vaGetDate['wday'] == 0 ? true : $lValid ; 
			return $lValid;  
		}

		public static function NomHoliday($dTglAwal,$dTglAkhir){
			$vaStart= explode("-", $dTglAwal) ; 
			$vaEnd 	= explode("-", $dTglAkhir) ; 
			$cLibur	= scSys::GetConfig("sc_harilibur_" . $vaStart[0]) ; 
			if($vaEnd[0] <> $vaStart[0]){
				$cLibur .= scSys::GetConfig("sc_harilibur_" . $vaEnd[0])  ;
			}
			$nLiburan	 = 0 ; 
			for ($i=strtotime($dTglAwal); $i <= strtotime($dTglAkhir) ; $i += 86400) { 
				$dDate		= date("Y-m-d",$i) ; 
				$vaGetDate	= getdate($i) ; 
				$lValid		= strpos($cLibur, $dDate) > -1 ? true : false ; 
				$lValid		= $vaGetDate['wday'] == 0 ? true : $lValid ; 
				if($lValid){
					$nLiburan++ ; 
				} 
			}

			return $nLiburan ; 
		}

		public static function GetCalVar_English($lMonth=true){
			if($lMonth){
				$vaArray 	= array("January","February","March","April","May",
									"June","July","August","September","October",
									"November","December") ; 	
			}else{
				$vaArray 	= array("Monday","Tuesday","Wednesday","Thursday","Friday",
									"Saturday","Sunday") ; 	
			} 
			
			return $vaArray ; 
		}
	} 
?>
