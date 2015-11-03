
<?php 
	$code 	= $_GET['code']; 
	$dbRow 	= scSys::GetKeterangan("*","code = '$code'","sppd") ; 
	if(!empty($dbRow)){
		$vaPejabat 		= scSys::GetKeterangan("nama,golongan,jabatan,nip","nip = '{$dbRow['nip_pejabat']}'","pegawai") ; 
		$vaPejabat_Gol	= scSys::GetKeterangan("Title,Description","Id = '{$vaPejabat['golongan']}'","sc_master") ; 
		$vaLeader 		= scSys::GetKeterangan("nama,golongan,jabatan,nip","nip = '{$dbRow['nip_leader']}'","pegawai") ; 
		$vaLeader_Gol	= scSys::GetKeterangan("Title,Description","Id = '{$vaLeader['golongan']}'","sc_master") ; 
		$vaPengikut 	= array() ; 
		foreach (explode(",", $dbRow['nip']) as $key => $value) {
			if($value !== ""){
				$vaPengikut[]	= scSys::GetKeterangan("nama,golongan,jabatan,nip","nip = '$value'","pegawai") ; 	
			}
		}

		$vaTable1		= array() ; 
		$vaTable1[]		= array("1"=>"Kepada","2"=>":","3"=>$vaPejabat['nama']) ; 
		$vaTable1[]		= array("1"=>"Tanggal","2"=>":","3"=>scDate::String2Date($dbRow['result_date'])) ; 
		$vaTable1[]		= array("1"=>"Perihal","2"=>":","3"=>"Laporan Hasil perjalanan Dinas ke " . $dbRow['place_to']) ; 

		$vaTable2 		= array() ; 
		$vaTable2[]		= array("1"=>"Nama / NIP","2"=>":","3"=>$vaLeader['nama']) ; 
		$vaTable2[]		= array("1"=>"Pangkat / Gol","2"=>":","3"=>$vaLeader_Gol['Description'] . " / " . $vaLeader_Gol['Title']) ; 
		$vaTable2[]		= array("1"=>"Jabatan","2"=>":","3"=>$vaLeader['jabatan']) ; 

		$vaDate 		= scDate::Date2Var($dbRow['date_go']) ;  
		$vaTable3		= array() ; 
		$vaTable3[]		= array("1"=>"1.","2"=>"Maksud dan Tujuan","3"=>":","4"=>$dbRow['purpose']) ; 
		$vaTable3[]		= array("1"=>"2.","2"=>"Tempat yang dituju","3"=>":","4"=>$dbRow['place_to']) ; 
		$vaTable3[]		= array("1"=>"3.","2"=>"Untuk Selama","3"=>":",
								"4"=>$dbRow['length_journey'] . " (" . scSys::Terbilang($dbRow['length_journey']) .") hari" ) ; 
		$vaTable3[]		= array("1"=>"4.","2"=>"Berangkat Tanggal","3"=>":",
								"4"=>$vaDate["Tgl"] . " " . $vaDate['Bulan'] . " " . $vaDate['Tahun']) ; 

		$vaDate			= scDate::Date2Var($dbRow['result_date']) ;
		$vaTtd 			= array() ; 
		$vaTtd[]		= array("x"=>"","1"=>"Singosari, " . $vaDate["Tgl"] . " " . $vaDate['Bulan'] . " " . $vaDate['Tahun'] ) ; 
		$vaTtd[]		= array("x"=>"","1"=>"PETUGAS") ; 
		$vaTtd[]		= array("x"=>"","1"=>"") ; 
		$vaTtd[]		= array("x"=>"","1"=>"") ; 
		$vaTtd[]		= array("x"=>"","1"=>"") ; 
		$vaTtd[]		= array("x"=>"","1"=>"") ; 
		$vaTtd[]		= array("x"=>"","1"=>"<u>".$vaLeader["nama"]."</u>") ; 
		$vaTtd[]		= array("x"=>"","1"=>$vaLeader_Gol['Description']) ; 
		$vaTtd[]		= array(""=>"","1"=>"NIP : " . $vaLeader["nip"]) ; 

		$nFont		= 10 ; 
		$pdf 		= new Cezpdf("A4","P",$vaOpt,"0") ;  

		$pdf->ezImage( scSys::GetConfig("sc_header") ,false , 100 , 600) ; 
		$pdf->ezTable($vaTable1,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("1"	=>array("width"=>20,"wrap"=>1),
												  "2"	=>array("width"=>2),
												  "3"	=>array("wrap"=>1) ) )) ;
		$pdf->ezText("") ; 
		$pdf->ezText("Dengan ini melaporkan pelaksanaan Perjalanan Dinas dengan Nomor SPPD " . $code . " :",$nFont) ;
		$pdf->ezText("") ; 
		$pdf->ezTable($vaTable2,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("1"	=>array("width"=>20,"wrap"=>1),
												  "2"	=>array("width"=>2),
												  "3"	=>array("wrap"=>1) ) )) ;
		$pdf->ezText("") ; 
		$pdf->ezTable($vaTable3,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("1"	=>array("width"=>4,"wrap"=>1),
												  "2"	=>array("width"=>20,"wrap"=>1),
												  "3"	=>array("width"=>2,"wrap"=>1),
												  "4"	=>array("wrap"=>1) ) )) ;
		$pdf->ezText("") ;
		$pdf->ezText("<u>Dengan hasi sebagai berikut : </u>",$nFont) ;
		$pdf->ezText("") ;
		$pdf->ezText($dbRow['result'],$nFont) ;
		$pdf->ezText("") ; 
		$pdf->ezTable($vaTtd,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("x"	=>array("width"=>50,"wrap"=>1,"justification"=>"center"),
												  "1"	=>array("width"=>40,"wrap"=>1,"justification"=>"center")) )) ;
		$pdf->ezStream() ; 
	}
?>