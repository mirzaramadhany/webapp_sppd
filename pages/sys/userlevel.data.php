<?php
	$dbColumns = array('Kode','Keterangan');
	$vaColumns= array('Kode','Keterangan','Act') ; 
	   
	/* Indexed column (used for fast and accurate table cardinality) */
	$cIndexColumn 	= "Kode"; 
	$cTable 		= "username_level" ;  
	 
	function fatal_error ( $sErrorMessage = '' ){
		header( $_SERVER['SERVER_PROTOCOL'] .' 500 Internal Server Error' );
		die( $sErrorMessage );
	}
	
	/*    
	 * Paging
	 */ 
	$cLimit = "";
	if ( isset( $_GET['iDisplayStart'] ) && $_GET['iDisplayLength'] != '-1' ){
		$cLimit = "  ".intval( $_GET['iDisplayStart'] ).", ".
		intval( $_GET['iDisplayLength'] ); 
	}
	
	 
	/* 
	 * Ordering
	 */ 
	if ( isset( $_GET['iSortCol_0'] ) ){
		$cOrder 	= ""; 
		for ( $i=0 ; $i<intval( $_GET['iSortingCols'] ) ; $i++ ){
			if ( $_GET[ 'bSortable_'.intval($_GET['iSortCol_'.$i]) ] == "true" ){
				if(strpos($dbColumns[ intval( $_GET['iSortCol_'.$i] ) ], "AS") === false){
					$cOrder .= "".$dbColumns[ intval( $_GET['iSortCol_'.$i] ) ]." ".
								($_GET['sSortDir_'.$i]==='asc' ? 'desc' : 'asc') .", ";
				} 
			} 
		}
		
		$cOrder = substr_replace( $cOrder, "", -2 );
		
	}
	$cOrder = " Kode ASC ";
	
	/*  
	 * Filtering
	 * NOTE this does not match the built-in DataTables filtering which does it
	 * word by word on any field. It's possible to do here, but concerned about efficiency
	 * on very large tables, and MySQL's regex functionality is very limited
	 */
 	
 	$cWhere		= "" ;  
	if ( isset($_GET['sSearch']) && $_GET['sSearch'] != "" ){
		
		$cWhere 	.= " ("; 
		for ( $i=0 ; $i<count($dbColumns) ; $i++ ){
			if(strpos($dbColumns[$i], "AS") === false){
				$cWhere .= "".$dbColumns[$i]." LIKE '%".( $_GET['sSearch'] )."%' OR ";	
			}
		}
		$cWhere = substr_replace( $cWhere, "", -3 );
		$cWhere .= ')';
	}
	
	/* Individual column filtering */
	for ( $i=0 ; $i<count($dbColumns) ; $i++ ){
		if ( isset($_GET['bSearchable_'.$i]) && $_GET['bSearchable_'.$i] == "true" && $_GET['sSearch_'.$i] != '' ){
			if ( $cWhere == "" ){
				$cWhere = "  ";
			}else{
				$cWhere .= " AND ";
			}
			if(strpos($dbColumns[$i], "AS") === false){
				$cWhere .= "".$dbColumns[$i]." LIKE '%".($_GET['sSearch_'.$i])."%' ";
			} 
		}
	}
	
	
	/*
	 * SQL queries
	 * Get data to display
	 */
	$cField	= str_replace(" , ", " ", implode(",", $dbColumns)) ;  
	$vaJoin	= array("") ; 
	$cGroup = "" ; 
	$dbData = $scDb->Browse($cTable,$cField,$cWhere,$vaJoin,$cGroup,$cOrder,$cLimit) ; 
	$cSql 	= $scDb->GetSQL() ;  
	
	/* Total data set length */ 
	$dbDataCount  = $scDb->Browse($cTable,"COUNT(".$cIndexColumn.") Jml",$cWhere,$vaJoin) ; 
	$aResultTotal = $scDb->GetRow($dbDataCount) ;
	$iTotal 	  = $aResultTotal['Jml'] ; 
	 
	
	/*
	 * Output
	 */
	$output = array(
		"sEcho" => intval($_GET['sEcho']),
		"iTotalRecords" => $iTotal,
		"iTotalDisplayRecords" => $iTotal,
		"aaData" => array(),
		"SQL"		=> $cSql 
	); 
	
	while ( $dbRow = $scDb->GetRow( $dbData ) ){
		$row = array();
		for ( $i=0 ; $i<count($vaColumns) ; $i++ ){
			switch ($vaColumns[$i]) {
				case 'Act': 
					$cButton	= '<button class="btn btn-success" title="Edit Data"
										onClick="cmdEditLevel(&quot;'.$dbRow['Kode'].'&quot;)">
					    					<i class="fa fa-edit"></i>  
					    			</button>
					    			<button class="btn btn-danger" title="Delete Data"
										onClick="cmdDeleteLevel(&quot;'.$dbRow['Kode'].'&quot;)">
					    					<i class="fa fa-minus-circle"></i>  
					    			</button>' ;    
					
					$row[]		= $cButton ;  

				break;  	  
				default:
					$row[]	= htmlspecialchars(scSys::CheckText($dbRow[ $vaColumns[$i] ])) ; 
				break;
			}
		} 
		$output['aaData'][] = $row;
	}
	
	echo json_encode( $output );
?> 