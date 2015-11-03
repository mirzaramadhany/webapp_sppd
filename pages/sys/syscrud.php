<?php 
	$cPageSource	= GetLocationFile(__FILE__) ; 
?>
<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        System
        <small>LOG CRUD</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="<?=SYS_UrlCore?>sc_credits/#"><i class="fa fa-dashboard"></i> System</a></li>
        <li class="active">Log CRUD</li>
    </ol>
</section>

<!-- Main content -->
<section class="content">
<div class="row">
	<div class="col-sm-12">
		<div class="box box-primary">
			<div class="box-header">
				<div class="container"> 
					<h3>Log Access System</h3>
				</div> 
			</div>  
			<div class="box-body pad table-responsive">
				<div class="search">
					<div class="row">
						<div class="col-sm-2">
							
						</div>
						<div class="col-sm-10">
							<div class="form-group form-inline float-right">
								<input type="text" id="dTglAwal" name="dTglAwal"
								class="form-control datetimepicker" data-date-format="DD-MM-YYYY" value="<?=date("d-m-Y")?>"> s/d
								<input type="text" id="dTglAKhir" name="dTglAKhir" 
								class="form-control datetimepicker" data-date-format="DD-MM-YYYY" value="<?=date("d-m-Y")?>">
								
								<input type="text" placeholder="UserName" maxlength="100"
								name="cUser" id="cUser" class="form-control sc_input_select"  
								data-sc-select-par="./pages/sys/syscrud.ajax.php"  
								data-sc-select-function="LoadUser" data-sc-select-multiple="false" style="width:150px;"> 
								<input type="number" value="10" id="nLimit" name="nLimit" class="form-control" style="width:60px;"> 
								<input type="text" placeholder="Search Key" id="cSearch" name="cSearch" class="form-control" > 
								<button type="button" class="btn btn-primary" id="oCariCRDU" >Cari</button>
								<input type="hidden" value="<?=$cPageSource?>" name="cPageSource" id="cPageSource">
							</div>		 
						</div>
					</div>
				</div>
				<div style="height:500px !important;overflow-y:scroll;">
					<table class="table table-striped table-bordered table-hover sc-DataTable" >
				    	<thead> 
				    		<tr>  
				    			<td width="150" align="center">Date</td>
				    			<td width="50">Type</td>  
				    			<td width="150">Table</td> 
				    			<td width="150" >UserName</td>
				    			<td >Description</td>
				    			<td width="10" align="center">Action</td>
				    		</tr>    
				    	</thead>	 	          
				    	<tbody id="oCrudBodyTable" >
				    	</tbody>
					</table>				
				</div>
			</div>
		</div>
	</div>
</div> 
  
<script src="<?=$cPageSource?>.js"></script> 
</section><!-- /.content -->