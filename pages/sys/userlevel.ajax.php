<?php
	function LoadTree($va){
		Load($va['nLevel']) ; 
	}

	function Saving($va){
		global $scDb ; 
		$nLevel		= $va['nLevel'] ; 
		$cLevel		= $va['cLevel'] ;  
		$cKeterangan= $va['cKeterangan'] ; 
		$vaArray	= array("Kode"=>$nLevel,"Keterangan"=>$cKeterangan,"Isi"=>$cLevel) ;
		$scDb->Update("username_level",$vaArray,"Kode = '$nLevel'") ; 
		echo('
				alert("Data have been Saved") ; 
				scLoadPage("sc-content-load","/sys/userlevel") ;
			') ; 
	}

	function Editing($va){
		$vaLevel	= scSys::GetKeterangan("Kode,Keterangan,Isi","Kode = '{$va['cKode']}'","username_level") ; 
		Load($va['cKode']) ;  
		echo('
				$("#cKeterangan").val("'.$vaLevel['Keterangan'].'") ; 
				$("#nLevel").val("'.$vaLevel['Kode'].'") ; 
			') ;
	}

	function Deleting($va){
		global $scDb ;
		$scDb->Delete("username_level","Kode = '{$va['cKode']}'") ; 
		echo(' 
				alert("Data have been deleted") ; 
				scLoadPage("sc-content-load","/sys/userlevel") ;
			') ;  
	}

	function Load($nLevel){
		$cIsi 		= scSys::GetKeteranganOne("Isi","Kode = '$nLevel'","username_level");  
		$cTreeMenu	= scSys::GetTreeMenu($cIsi) ;   
 
		echo('	var oTree 	= '.$cTreeMenu.' ; 
				$("#sc-sys-tree-uesrlevel").dynatree("getRoot").removeChildren() ; 
				$("#sc-sys-tree-uesrlevel").dynatree("getRoot").addChild(oTree) ;   

				var selKeys = $("#sc-sys-tree-uesrlevel").dynatree("getSelectedNodes") ;
				selKeys	 	= $.map(selKeys,function(node){
					return 	node.data.key ;
				}) ;
		  
		        $("#cLevel").val(selKeys.join(", "));
			') ;   
	}
?>