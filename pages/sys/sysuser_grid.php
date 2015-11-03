<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Administrator
        <small>Users</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="<?=SYS_UrlCore?>"><i class="fa fa-dashboard"></i> Administrator</a></li>
        <li class="active">Users</li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
<div class="row">
	<div class="col-sm-12">
		<div class="box box-primary">
			<div class="box-header">
				<div class="container"> 
					<div class="row">
						<h3 class="box-title">
							<button class="btn btn-primary sc-add btn-flat">Add User</button>
						</h3> 
					</div>
				</div>
				
			</div>  
			<div class="box-body pad table-responsive">
				<table class="table table-striped table-bordered table-hover sc-DataTable" id="sc-DataTable">
			    	<thead>
			    		<tr> 
			    			<td width="100" align="center">UserName</td>
			    			<td>FullName</td>
			    			<td width="100" align="center">Level</td>
			    			<td width="80" align="center">Action</td>
			    		</tr>     
			    	</thead>	 	         
			    	<tbody>
			    	<?php 
		    		$dbData			= $scDb->Browse("username","*") ; 
		    		while($dbRow	= $scDb->GetRow($dbData)){
		    			$cLevel		= scCrypt::GetLevelPass($dbRow['Password']);  
		    		?>
		    			<tr>
		    				<td width="100" align="center"><?=$dbRow['UserName']?></td> 
			    			<td ><?=$dbRow['FullName']?></td>
			    			<td width="100"> 
			    				<?=scSys::GetKeteranganOne("Keterangan","Kode = '$cLevel'","username_level")?>
			    			</td>
			    			<td width="80" align="center">
			    				<button class="btn btn-success" title="Edit"
								onClick="scEdit('<?=$dbRow['UserName']?>')">
			    					<i class="fa fa-pencil-square-o"></i>   
			    				</button>  
			    				<button class="btn btn-danger" title="Hapus"
								onClick="scDelete('<?=$dbRow['UserName']?>')"> 
			    					<i class="fa fa-power-off"></i>   
			    				</button> 
			    			</td>
		    			</tr>
		    		<?php
		    		}
			    	?>
			    	</tbody>
				</table>				
			</div>
		</div>
	</div>
</div> 
 
</section><!-- /.content -->
<script type="text/javascript">
	$(window).ready(function(){
		$('.sc-add').click(function(e){
			e.preventDefault() ; 
			scLoadPage("sc-content-load","sys/sysuser.php") ;
		}) ;   
		$('#sc-DataTable').dataTable() ; 
	}) ;

	function scEdit(cId){
		scLoadPage('sc-content-load','sys/sysuser.php','cId=' + cId) ;
	}  

	function scDelete(cId){ 
		if(confirm("Delete Data ?")){ 
	    	scAjax('./pages/sys/sysuser.ajax.php','DeleteData','cUserName=' + cId) ;  	
	    }  
	}
</script>