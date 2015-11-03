<?php 
	//initialize for locaiton file
	$cPageSource	= GetLocationFile(__FILE__) ; 
?>
<section class="content-header">
    <h1>
        System
        <small>Setting System</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="<?=SYS_UrlCore?>"><i class="fa fa-dashboard"></i>System</a></li>
        <li class="active">Setting System</li> 
    </ol>
</section>     
<br />
<section class="content">
<div class="row">
<div class="col-sm-12">
	<form role="form" name="frmSys" id="frmSys">
    <div class="nav-tabs-custom"> 
    	<ul class="nav nav-tabs" id="myTabs">
            <li class="active"><a href="#tab_1" data-toggle="tab">Add</a></li>
            <li ><a href="#tab_2" data-toggle="tab">Image</a></li>
            <li class="pull-right"><button class="btn btn-primary" id="cmdSave" >Save</button></li>  
        </ul>   
        <div class="tab-content">
            <div class="tab-pane active" id="tab_1"> 
            	<div class="form-group">
					<label for="cUrl">Url</label>  
					<input type="text" placeholder="Url" value="<?=scSys::GetConfig("sc_front_url")?>" 
					name="cUrl" id="cUrl" class="form-control sc-input-required" > 
					<input type="hidden" name="cPageSource" id="cPageSource" value="<?=$cPageSource?>" />
				</div> 	    
				<div class="form-group">  
					<label for="cTitle">Title</label>   
					<input type="text" placeholder="Title" value="<?=scSys::GetConfig("sc_front_title")?>" 
					name="cTitle" id="cTitle" class="form-control sc-input-required" > 
				</div>    
				<div class="form-group">  
					<div class="row">
						<div class="col-sm-2">
							<label for="cUserEntry">Lv Administrator</label>   
							<input type="text" placeholder="Lv User Data Entry" value="<?=scSys::GetConfig("sc_admin")?>" 
							name="sc_admin" id="sc_admin" class="form-control sc-input-required" > 	 
						</div>
					</div>
				</div> 
				<div class="form-group">
					<div class="row">
						<div class="col-sm-6">
							<label>Kantor</label>
							<input type="text" placeholder="Kantor" value="<?=scSys::GetConfig("sc_company")?>"
							name="sc_company" id="sc_company" class="form-control sc-input-required">
						</div> 
						<div class="col-sm-3">
							<label>Nip Kepala Kantor</label>
							<input type="text" placeholder="Kantor" value="<?=scSys::GetConfig("sc_kepala_dinas")?>"
							name="sc_kepala_dinas" id="sc_kepala_dinas" class="form-control sc-input-required">
						</div>
					</div>
				</div>  
            </div><!-- /.tab-pane --> 
            <div class="tab-pane" id="tab_2"> 
            	<div class="form-group">  
            		<div class="row">
						<div class="col-sm-6">
							<input type="file" placeholder="Logo" name="cFileLogo" id="cFileLogo" 
							class="form-control" accept="image/*"> 		
							<div class="text-center">Logo</div>
						</div>
						<div class="col-sm-6">
							<input type="file" placeholder="Header Report" name="cFileHeader" id="cFileHeader" 
							class="form-control" accept="image/*"> 		
							<div class="text-center">Header Report</div>
						</div>
					</div>
				</div>  
            </div>
        </div><!-- /.tab-content -->
    </div> 
    </form>
</div>
</div>
</section>

<script type="text/javascript" src="<?=$cPageSource?>.js"></script>
<script type="text/javascript"> 
	<?php 
	if(isset($_GET['tab'])){  
		echo "$('#myTabs li:eq(".intval($_GET['tab']).") a').tab('show') ; " ;
	}
	?>
</script>