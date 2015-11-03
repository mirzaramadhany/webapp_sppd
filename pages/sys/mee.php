<?php 
    $cId    = GetSession("cSession_UserName") ;
    $dbRow = $scDb->GetRow($scDb->Browse("username","*","UserName = '$cId'")) ; 
?> 
<style type="text/css">
    canvas {
        position: relative;
        margin: 1px;
        margin-left: 0px;
        border: 1px solid #3a87ad;
    }
</style> 
<section class="content-header">
    <h1>
        System
        <small>User</small>
    </h1>
    <ol class="breadcrumb">
        <li class="active">User</li> 
    </ol> 
</section>

<section class="content">
<div class="row">
    <div class="col-sm-12">
        <div class="box box-primary">
            <div class="box-header"> 
                <h3 class="box-title">My Profile</h3>
            </div>   
            <form role="form" id="oForm" name="oForm">
            <div class="box-body"> 
                  
                <div class="form-group">  
                    <label for="cFullName" >Fullname</label>
                    <input class="form-control sc-input-required" type="text" 
                    name="cFullName" id="cFullName" placeholder="FullName" value="<?=$dbRow['FullName']?>" > 
                </div>             
                <div class="form-group">  
                    <label for="cPassword" >Password</label>
                    <input class="form-control" type="password" 
                    name="cPassword" id="cPassword" >  
                </div> 
                <div class="form-group">  
                    <label for="gFoto" >Picture</label>
                    <input type="file" 
                    name="gFoto" id="gFoto" accept="image/*" >  
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

<script type="text/javascript" src="./pages/sys/mee.js"></script> 