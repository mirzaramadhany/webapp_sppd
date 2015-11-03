<?php 
	$vaData	= array() ; 
	$dbData	= $scDb->Browse("pegawai","*") ; 
	$nRow 	= 1 ;
	$vaData[]		= array("NO"=>1,"NAMA"=>2,"NIP"=>3,"ALAMAT"=>"","PANGKAT;GOLONGAN / RUANG"=> 4,
						"PANGKAT;TMT"=> 5,"JABATAN;NAMA"=> 6,"JABATAN;TMT"=> 7,"MASA KERJA;THN"=> 8,
						"MASA KERJA;BLN"=> 9,"LATIHAN JABATAN;NAMA"=> 10,"LATIHAN JABATAN;TGL LULUS"=> 11,
						"LATIHAN JABATAN;JML JAM"=> 12,"PENDIDIKAN;NAMA"=> 13,
						"PENDIDIKAN;TAHUN LULUS"=> 14,"PENDIDIKAN;TK IJAZAH"=> 15,"TEMPAT TANGGAL LAHIR"=> 16,
						"CATATAN MUTASI"=> 17, "KETERANGAN"=> 18) ;
	while($dbRow 	= $scDb->GetRow($dbData)){
		$vaData[]		= array("NO"=>$nRow++,"NAMA"=>$dbRow['nama'],"NIP"=>$dbRow['nip'],"ALAMAT"=>$dbRow['alamat'],
							"PANGKAT;GOLONGAN / RUANG"	=> $dbRow['golongan'],
							"PANGKAT;TMT"				=> scDate::String2Date($dbRow['golongan_tanggal']),
							"JABATAN;NAMA"				=> $dbRow['jabatan'],
							"JABATAN;TMT" 				=> scDate::String2Date($dbRow['jabatan_tanggal']),
							"MASA KERJA;THN"			=> $dbRow['kerja_tahun'],
							"MASA KERJA;BLN"			=> $dbRow['kerja_bulan'],
							"LATIHAN JABATAN;NAMA"		=> $dbRow['latihan_jabatan'],
							"LATIHAN JABATAN;TGL LULUS" => scDate::String2Date($dbRow['latihan_jabatan_tanggal']),
							"LATIHAN JABATAN;JML JAM"	=> $dbRow['latihan_jabatan_jam'],
							"PENDIDIKAN;NAMA"			=> $dbRow['pendidikan'],
							"PENDIDIKAN;TAHUN LULUS"	=> $dbRow['pendidian_lulus'],
							"PENDIDIKAN;TK IJAZAH"		=> $dbRow['pendidikan_ijazah'],
							"TEMPAT TANGGAL LAHIR"		=> $dbRow['tempat_lahir'] . " " . scDate::String2Date($dbRow['tanggal_lahir']),
							"CATATAN MUTASI"			=> $dbRow['catatan_mutasi'], 
							"KETERANGAN"				=> $dbRow['ketrangan']) ;	
	} 

	$vaDate 	= scDate::Date2Var(date("Y-m-d")) ; 
	$nFont		= 8 ; 
	$pdf 		= new Cezpdf("A3","L",$vaOpt) ; 
	$pdf->ezHeader("<b>UNIT KERJA : DINAS KEHUTANAN DAN PERKEBUNAN KAB. PATI</b>",array("fontSize"=>$nFont+2)); 
	$pdf->ezHeader("<b>KEADAAN : BULAN ".$vaDate['Bulan'] . " " . $vaDate['Tahun'] ."</b>",array("fontSize"=>$nFont+2)); 
	$pdf->ezHeader("") ; 
	$pdf->ezTable($vaData,"","",array("fontSize"=>$nFont, 
						"cols"=>array("NO"=>array("width"=>2,"justification"=>"center"), 
									"NAMA"=>array("width"=>8,"wrap"=>1),
									"NIP"=>array("width"=>8,"wrap"=>1,"justification"=>"center"),
									"ALAMAT"=>array("wrap"=>1),  
									"PANGKAT;GOLONGAN / RUANG"=>array("width"=>7,"wrap"=>1),
									"PANGKAT;TMT"=>array("width"=>4,"wrap"=>1,"justification"=>"center"),
									"JABATAN;NAMA"=>array("width"=>7,"wrap"=>1),
									"JABATAN;TMT"=>array("width"=>4,"wrap"=>1,"justification"=>"center"),
									"MASA KERJA;THN"=>array("width"=>3,"wrap"=>1,"justification"=>"center"),
									"MASA KERJA;BLN"=>array("width"=>3,"wrap"=>1,"justification"=>"center"),
									"LATIHAN JABATAN;NAMA"=>array("width"=>7,"wrap"=>1),
									"LATIHAN JABATAN;TGL LULUS"=>array("width"=>5,"wrap"=>1,"justification"=>"center"),
									"LATIHAN JABATAN;JML JAM"=>array("width"=>4,"wrap"=>1,"justification"=>"center"),
									"PENDIDIKAN;NAMA"=>array("width"=>7,"wrap"=>1),
									"PENDIDIKAN;TAHUN LULUS"=>array("width"=>4,"wrap"=>1,"justification"=>"center"),
									"PENDIDIKAN;TK IJAZAH"=>array("width"=>4,"wrap"=>1,"justification"=>"center"),
									"TEMPAT TANGGAL LAHIR"=>array("width"=>7,"wrap"=>1),
									"CATATAN MUTASI"=>array("width"=>5,"wrap"=>1),
									"KETERANGAN"=>array("width"=>5,"wrap"=>1) ))) ; 
	$pdf->ezStream() ; 

?>