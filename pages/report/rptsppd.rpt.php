<?php 
	$code 	= $_GET['code']	 ;
	$dbRow 	= scSys::GetKeterangan("*","code = '$code'","sppd") ; 
	if(!empty($dbRow)){
		$scDb->Edit("sppd",array("status"=>"1"),"code = '$code'",false) ;

		$vaTable1		= array() ; 
		$vaTable1[] 	= array("x"=>"","1"=>"Lembar Ke","2"=>":","3"=>"") ;
		$vaTable1[] 	= array("x"=>"","1"=>"Kode No","2"=>":","3"=>$code) ;
		$vaTable1[] 	= array("x"=>"","1"=>"Nomor","2"=>":","3"=>"") ;
 
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

		$vaTable2	 	= array() ;  
		$vaTable2[] 	= array("1"=>"1.","2"=>"Pejabat yang memberi perintah",
								"3"=>": ".$vaPejabat['jabatan']) ;
		$vaTable2[] 	= array("1"=>"2.","2"=>"Nama Pegawai yang diperintah",
								"3"=>": ".$vaLeader['nama']) ;
		$vaTable2[] 	= array("1"=>"3.","2"=>"a. Pangkat dan Golongan",
								"3"=>": ".$vaLeader_Gol['Description'] . " / " . $vaLeader_Gol['Title']) ;
		$vaTable2[] 	= array("1"=>"","2"=>"b. Jabatan","3"=>": ".$vaLeader['jabatan']) ;
		$vaTable2[] 	= array("1"=>"","2"=>"c. Tingkat menurut peraturan perjalanan","3"=>": ".$dbRow['rate_travel']) ;
		$vaTable2[] 	= array("1"=>"4.","2"=>"Maksud Perjalanan Dinas","3"=>": ".$dbRow['purpose']) ;
		$vaTable2[] 	= array("1"=>"5.","2"=>"Alat yang dipergunakan","3"=>": ".$dbRow['transport']) ;
		$vaTable2[] 	= array("1"=>"6.","2"=>"a. Tempat Berangkat","3"=>": ".$dbRow['place_from']) ;
		$vaTable2[] 	= array("1"=>"","2"=>"b. Tempat Tujuan","3"=>": ".$dbRow['place_to']) ;
		$vaTable2[] 	= array("1"=>"7.","2"=>"a. Lamanya Perjalanan Dinas","3"=>": ".$dbRow['length_journey'] . 
								" (" . scSys::Terbilang($dbRow['length_journey']) .") hari") ;
		$vaTable2[] 	= array("1"=>"","2"=>"b. Tanggal Berangkat","3"=>": ".scDate::String2Date($dbRow['date_go']) ) ;
		$vaTable2[] 	= array("1"=>"","2"=>"b. Tanggal Harus Kembali","3"=>": ".scDate::String2Date($dbRow['date_back']) ) ;
		$nRow 			= 1 ; 
		foreach ($vaPengikut as $key => $vaData) {
			$vaKu 		= array("1"=>"","2"=>"","3"=>"") ;
			if($key == 0){
				$vaKu["1"] = "8." ;  
				$vaKu["2"]	= "Pengikut" ; 
			}
			$vaKu["3"]	= ": ".$nRow++ . ". " . $vaData['nama'] . "\n      Nip." . $vaData['nip'] ; 
			$vaTable2[]	= $vaKu ; 
		}
		$vaTable2[] 	= array("1"=>"9.","2"=>"Pembebanan Anggaran","3"=>"" ) ;
		$vaTable2[] 	= array("1"=>"","2"=>"a. Instansi","3"=>": ".$dbRow['government'] ) ;
		$vaTable2[] 	= array("1"=>"","2"=>"a. Mata Anggaran","3"=>": ".$dbRow['budget_from'] ) ;
		$vaTable2[] 	= array("1"=>"10.","2"=>"Keterangan Lain-Lain","3"=>": ".$dbRow['description'] ) ;

		$vaDate 		= scDate::Date2Var($dbRow['date']) ;  
		$vaTanggal		= array() ; 
		$vaTanggal[]	= array("x"=>"","1"=>"Dikeluarkan di","2"=>":","3"=>"Pati") ; 
		$vaTanggal[]	= array("x"=>"","1"=>"Pada Tanggal","2"=>":","3"=>$vaDate["Tgl"] . " " . $vaDate['Bulan'] . " " . $vaDate['Tahun']) ; 

		$vaTtd 			= array() ; 
		$vaTtd[]		= array("x"=>"","1"=>$vaPejabat["jabatan"]) ; 
		if($vaPejabat['nip'] !== scSys::GetConfig("sc_kepala_dinas")){
			$vaTtd[]	= array("x"=>"","1"=>"An. Kepala Dinas " . scSys::GetConfig("sc_company") ) ; 
		}
		$vaTtd[]		= array("x"=>"","1"=>"") ; 
		$vaTtd[]		= array("x"=>"","1"=>"") ; 
		$vaTtd[]		= array("x"=>"","1"=>"") ; 
		$vaTtd[]		= array("x"=>"","1"=>"") ; 
		$vaTtd[]		= array("x"=>"","1"=>"<u>".$vaPejabat["nama"]."</u>") ; 
		$vaTtd[]		= array("x"=>"","1"=>$vaPejabat_Gol['Description']) ; 
		$vaTtd[]		= array(""=>"","1"=>"NIP : " . $vaPejabat["nip"]) ; 


		$vaDasar 		= array() ; 
		$vaDate 		= scDate::Date2Var($dbRow['letter_date']) ;  
		$vaDasar[]		= array("1"=>"Dasar","2"=>":","3"=> $dbRow['letter_content'] ) ; 

		$vaKepada 		= array() ; 
		$nRow 			= 1 ; 
		$vaKepada[]		= array("1"=>"Kepada","2"=>":","3"=>$nRow++ .".","4"=>"Nama","5"=>":","6"=>$vaLeader['nama']) ;
		$vaKepada[]		= array("1"=>"","2"=>"","3"=>"","4"=>"Pangkat / gol","5"=>":","6"=>$vaLeader_Gol['Description'] . " / " . $vaLeader_Gol['Title']) ;
		$vaKepada[]		= array("1"=>"","2"=>"","3"=>"","4"=>"NIP","5"=>":","6"=>$vaLeader['nip']) ;
		$vaKepada[]		= array("1"=>"","2"=>"","3"=>"","4"=>"Jabatan","5"=>":","6"=>$vaLeader['jabatan']) ;
		foreach ($vaPengikut as $key => $vaData) {
			$vaPengikut_Gol	= scSys::GetKeterangan("Title,Description","Id = '{$vaData['golongan']}'","sc_master") ;  ; 
			$vaKepada[]		= array("1"=>"","2"=>"","3"=>$nRow++ .".","4"=>"Nama","5"=>":","6"=>$vaData['nama']) ;
			$vaKepada[]		= array("1"=>"","2"=>"","3"=>"","4"=>"Pangkat / gol","5"=>":",
				"6"=>$vaPengikut_Gol['Description'] . " / " . $vaPengikut_Gol['Title']) ;
			$vaKepada[]		= array("1"=>"","2"=>"","3"=>"","4"=>"NIP","5"=>":","6"=>$vaData['nip']) ;
			$vaKepada[]		= array("1"=>"","2"=>"","3"=>"","4"=>"Jabatan","5"=>":","6"=>$vaData['jabatan']) ;
		}

		$vaUntuk 		= array() ; 
		$vaUntuk[]		= array("1"=>"Untuk","2"=>":","3"=>$dbRow['purpose']) ; 

		$nFont		= 11 ; 
		$pdf 		= new Cezpdf("A4","P",$vaOpt,'0') ;  

		$pdf->ezImage( scSys::GetConfig("sc_header") ,false , 100 , 600) ; 
		$pdf->ezTable($vaTable1,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("x"	=>array("width"=>60,"wrap"=>1),
												  "1"	=>array("width"=>20,"wrap"=>1),
												  "2"	=>array("width"=>2),
												  "3"	=>array("width"=>18,"wrap"=>1) ) )) ;
		$pdf->ezText("") ; 
		$pdf->ezText("<u><b>PERINTAH PERJALANAN DINAS</b></u>",$nFont+2,array("justification"=>"center")) ;
		$pdf->ezText("(SPPD)",$nFont+2,array("justification"=>"center")) ;
		$pdf->ezText("") ; 
		$pdf->ezTable($vaTable2,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("1"	=>array("width"=>4,"wrap"=>1),
												  "2"	=>array("width"=>40,"wrap"=>1),
												  "3"	=>array("width"=>56,"wrap"=>1) ) )) ;
		$pdf->ezText("") ; 
		$pdf->ezText("") ; 
		$pdf->ezTable($vaTanggal,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("x"	=>array("width"=>50,"wrap"=>1),
												  "1"	=>array("width"=>25,"wrap"=>1),
												  "2"	=>array("width"=>2),
												  "3"	=>array("width"=>23,"wrap"=>1) ) )) ;
		$pdf->ezText("") ; 
		$pdf->ezTable($vaTtd,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("x"	=>array("width"=>50,"wrap"=>1,"justification"=>"center"),
												  "1"	=>array("width"=>40,"wrap"=>1,"justification"=>"center")) )) ;

		
		$pdf->ezNewPage() ;
		$pdf->ezImage( scSys::GetConfig("sc_header") ,false , 100 , 600) ;  
		$pdf->ezText("<u><b>SURAT PERINTAH TUGAS</b></u>",$nFont+2,array("justification"=>"center")) ;
		$pdf->ezText("NOMOR : ",$nFont+2,array("justification"=>"center")) ; 
		$pdf->ezText("") ; 
		$pdf->ezTable($vaDasar,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("1"	=>array("width"=>20,"wrap"=>1),
												  "2"	=>array("width"=>2),
												  "3"	=>array("wrap"=>1) ) )) ;
		$pdf->ezText("") ; 
		$pdf->ezText("MEMERINTAHKAN :",$nFont+2,array("justification"=>"center")) ;
		$pdf->ezText("") ; 
		$pdf->ezTable($vaKepada,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("1"	=>array("width"=>20,"wrap"=>1),
												  "2"	=>array("width"=>2),
												  "3"	=>array("width"=>4),
												  "4"	=>array("width"=>20,"wrap"=>1),
												  "5"	=>array("width"=>2),
												  "6"	=>array("wrap"=>1) ) )) ;
		$pdf->ezText("") ; 
		$pdf->ezTable($vaUntuk,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("1"	=>array("width"=>20,"wrap"=>1),
												  "2"	=>array("width"=>2),
												  "3"	=>array("wrap"=>1) ) )) ;
		$pdf->ezText("") ; 
		$pdf->ezText("") ; 
		$pdf->ezTable($vaTanggal,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("x"	=>array("width"=>50,"wrap"=>1),
												  "1"	=>array("width"=>25,"wrap"=>1),
												  "2"	=>array("width"=>2),
												  "3"	=>array("width"=>23,"wrap"=>1) ) )) ;
		$pdf->ezText("") ; 
		$pdf->ezTable($vaTtd,"","",array("showLines"=>0,"showHeadings"=>0,"fontSize"=>$nFont, "cols"=> 
											array("x"	=>array("width"=>50,"wrap"=>1,"justification"=>"center"),
												  "1"	=>array("width"=>40,"wrap"=>1,"justification"=>"center")) )) ;

		$pdf->ezStream() ; 

	}  
?>  