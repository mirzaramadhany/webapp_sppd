<?php 
    $cId    = (isset($_GET['cId'])) ? $_GET['cId'] : "" ; 
?>
<section class="content-header">
    <h1>
        Admistrator
        <small>Users</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="<?=SYS_UrlCore?>#"><i class="fa fa-dashboard"></i> Administrator</a></li>
        <li class="active">Users</li> 
    </ol> 
</section>

<section class="content">
<div class="row">
	<div class="col-sm-12">
		<div class="box box-primary">
			<div class="box-header">
				<h3 class="box-title">Add User</h3>
			</div>   
            <form role="form" id="oForm" name="oForm">
            <div class="box-body"> 
            
                <div class="form-group">  
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="cUserName" >User</label>
                            <input type="text" name="cUserName" id="cUserName" placeholder="User Name"
                            class="form-control sc_input_select sc-input-required" 
                            data-sc-select-par="./pages/sys/sysuser.ajax.php"  
                            data-sc-select-function="LoadUser" data-sc-select-multiple="false" autofocus> 
                        </div>
                        <div class="col-sm-6">
                            <label for="cPegawai">Nip Pegawai</label>
                            <input type="text" name="UserName_Target" id="UserName_Target" placeholder="User Pegawai"
                            class="form-control sc_input_select" 
                            data-sc-select-par="./pages/ajaxload/proload.ajax.php"  
                            data-sc-select-function="LoadNip" data-sc-select-multiple="false"> 
                        </div>
                    </div>
                </div> 
                <div class="form-group">  
                    <label for="cFullName" >Fullname</label>
                    <input class="form-control sc-input-required" type="text" 
                    name="cFullName" id="cFullName" placeholder="FullName" > 
                </div>             
                <div class="form-group">  
                    <label for="cPassword" >Password</label>
                    <input class="form-control" type="password" 
                    name="cPassword" id="cPassword" >  
                    <small>*contents if you want to change the password </small>
                </div>               
                <div class="form-group">  
                    <label for="cLevel" >Level</label>
                    <input type="text" placeholder="Level 0001-9999" maxlength="100"
                        name="cLevel" id="cLevel" class="form-control sc_input_select sc-input-required"
                        data-sc-select-par="./pages/sys/sysuser.ajax.php"  
                        data-sc-select-function="LoadLevel">
                </div>                    
            </div>
            <div class="box-footer">
                <button class="btn btn-primary" id="sc_button_saving">Save</button>
            </div>
            </form>
        </div>
    </div>
</div>
</section>

<script type="text/javascript" src="./pages/sys/sysuser.js"></script>

<?php
if($cId !== ""){
    echo('<script>
        $(function(){ 
            scAjax("./pages/sys/sysuser.ajax.php","GetData","cUserName='.$cId.'" ) ;  
        }) ;  
    </script>') ;  
}
?> 