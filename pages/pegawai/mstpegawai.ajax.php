<?php 
	function Grid1_Load($va){
		global $scDb ; 
		$cLimit		= $va['offset'].",".$va['limit'] ; //limit
		$vaOrder	= array() ;  
		if(isset($va['sort'])){
			foreach ($va['sort'] as $key => $vaValue) {
				$vaOrder[]	= $vaValue['field'] . " " . $vaValue['direction'] ; 
			}
		}
		$cOrder 	= implode(",",$vaOrder) ; 
		if($cOrder == "") $cOrder = "datetime_update ASC" ; 
		//init order grid

		$vaWhere 	= array() ; 
		if(isset($va['search'])){
			foreach ($va['search'] as $key => $vaValue) {
				$vaWhere[]	= $vaValue['field'] . " like '%".$vaValue['value']."%'" ; 
			} 
		}//init where grid
		$cWhere 	= implode(" OR ", $vaWhere) ; 
		$vaReturn 	= array() ;
		$dbData 	= $scDb->Browse("pegawai","*",$cWhere,"","",$cOrder,$cLimit) ; 
		$dbDataNL 	= $scDb->Browse("pegawai","*",$cWhere) ; 
		while($dbRow= $scDb->GetRow($dbData)){
			$vaGolongan 			= scSys::GetKeterangan("Title,Description","Id = '{$dbRow['golongan']}'","sc_master") ; 
			$dbRow['golongan']		= $vaGolongan['Description'] . " / " . $vaGolongan['Title'] ; 
			$dbRow['recid']			= $dbRow['nip'] ; 
			$dbRow['tanggal_lahir']	= scDate::String2Date($dbRow['tanggal_lahir']) ; 
			$dbRow['cmdEdit']		= '<button type="button" onClick="OBJFORM_NEW.mstpegawai.Edit(\''.$dbRow['nip'].'\')" 
										class="btn btn-primary btn-grid">Edit</button>' ;
			$dbRow['cmdEdit']		= html_entity_decode($dbRow['cmdEdit']) ; 
			$dbRow['cmdDelete']		= '<button type="button" onClick="OBJFORM_NEW.mstpegawai.Delete(\''.$dbRow['nip'].'\')" 
										class="btn btn-danger btn-grid">Delete</button>' ;
			$dbRow['cmdDelete']		= html_entity_decode($dbRow['cmdDelete']) ; 
			$vaReturn[]				= $dbRow ; 
		}
		$vaReturn 	= array("total"=>$scDb->Rows($dbDataNL),"records"=>$vaReturn) ;
		echo json_encode($vaReturn) ; 	
	} 

	function Saving($va){
		global $scDb ; 
		$cNip 		= $va['cNip'] ; 
		$vaArray 	= array("nip"=>$va['cNip'],"nama"=>$va['cNama'],
							"alamat"=>$va['cAlamat'],"tanggal_lahir"=>scDate::Date2String($va['dTempat_Tgl']),
							"tempat_lahir"=>$va['cTempat'],"golongan"=>$va['cGolongan'],
							"golongan_tanggal"=>scDate::Date2String($va['dGolongan_Tgl']),"jabatan"=>$va['cJabatan'],
							"jabatan_tanggal"=>scDate::Date2String($va['dJabatan_Tgl']),"kerja_tahun"=>$va['nKerjaTahun'],
							"kerja_bulan"=>$va['nKerjaBulan'],"latihan_jabatan"=>$va['cJabatan_Lat'],
							"latihan_jabatan_tanggal"=>scDate::Date2String($va['dJabatan_Lat_Tgl']),
							"latihan_jabatan_jam"=>$va['nJabatan_Lat'],"pendidikan"=>$va['cPendidikan'],
							"pendidikan_lulus"=>$va['nThLulus'],"pendidikan_ijazah"=>$va['cIjazah'],
							"catatan_mutasi"=>$va['cCatatan_Mutasi'],"keterangan"=>$va['cKeterangan'],
							"no_hp"=>$va['cno_hp']); 
		$vaInsert 	= array("username"=>GetSession("cSession_UserName")) ; 
		$vaUpdate 	= array("username_update"=>GetSession("cSession_UserName")) ; 
		$scDb->Update("pegawai",$vaArray,"nip = '$cNip'",true,$vaInsert,$vaUpdate) ; 
		echo('
				alert("Data sudah disimpan") ; 
				OBJFORM_NEW.mstpegawai.Init() ; 
			') ; 
	}

	function Deleting($va) {
		global $scDb ; 
		$cNip 		= $va['cNip'] ; 
		$scDb->Delete("pegawai","nip = '$cNip'") ; 
		echo('
				alert("Data telah dihapus") ;
				OBJFORM_NEW.mstpegawai.Grid1_ReloadData() ; 
			') ; 
	}

	function Editing($va){
		$cNip 		= $va['cNip'] ; 
		$dbRow 		= scSys::GetKeterangan("*","nip = '$cNip'","pegawai") ; 
		if(!empty($dbRow)){
			$vaNip 		= array("id"=>$dbRow['nip'],"text"=>$dbRow['nip']) ; 
			$vaGolongan	= scSys::GetKeterangan("Title,Description","Id = '{$dbRow['golongan']}'","sc_master") ;
			$vaGolongan	= array("id"=>$dbRow['golongan'],"text"=>$vaGolongan['Description'] . " / " . $vaGolongan['Title']) ; 
			echo(' 
					with(OBJFORM_NEW.mstpegawai.Obj){
						find("#cNip").select2("data",'.json_encode($vaNip).') ;
						find("#cNip").select2("readonly",true) ;
						find("#cNama").val("'.$dbRow['nama'].'") ;
						find("#cAlamat").val("'.$dbRow['alamat'].'") ;
						find("#cTempat").val("'.$dbRow['tempat_lahir'].'") ;
						find("#dTempat_Tgl").val("'.scDate::String2Date($dbRow['tanggal_lahir']).'") ;
						find("#cGolongan").val("'.$dbRow['golongan'].'") ;
						find("#dGolongan_Tgl").val("'.scDate::String2Date($dbRow['golongan_tanggal']).'") ;
						find("#cJabatan").val("'.$dbRow['jabatan'].'") ;
						find("#dJabatan_Tgl").val("'.scDate::String2Date($dbRow['jabatan_tanggal']).'") ;
						find("#nKerjaTahun").val("'.$dbRow['kerja_tahun'].'") ;
						find("#nKerjaBulan").val("'.$dbRow['kerja_bulan'].'") ;
						find("#cJabatan_Lat").val("'.$dbRow['latihan_jabatan'].'") ;
						find("#dJabatan_Lat_Tgl").val("'.scDate::String2Date($dbRow['latihan_jabatan_tanggal']).'") ;
						find("#nJabatan_Lat").val("'.$dbRow['latihan_jabatan_jam'].'") ;
						find("#cPendidikan").val("'.$dbRow['pendidikan'].'") ; 
						find("#nThLulus").val("'.$dbRow['pendidikan_lulus'].'") ;
						find("#cIjazah").val("'.$dbRow['pendidikan_ijazah'].'") ;
						find("#cCatatan_Mutasi").val("'.$dbRow['catatan_mutasi'].'") ;
						find("#cKeterangan").val("'.$dbRow['keterangan'].'") ;
						find("#cno_hp").val("'.$dbRow['no_hp'].'") ;
					} 
					$("#myTabs li:eq(1) a").tab("show") ; 
				') ; 
		}
	}
?>