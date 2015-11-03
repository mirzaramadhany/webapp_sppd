<script type="text/javascript" src="./sapeltucore/sc_credits/jquery/jquery.cookie.js" ></script> 
<link rel="stylesheet" type="text/css" href="./sapeltucore/sc_credits/dynatree/ui.dynatree.css">
<script type="text/javascript" src="./sapeltucore/sc_credits/dynatree/jquery.dynatree.min.js"></script>
 
<section class="content-header">
    <h1>
        Administrator
        <small>User Level</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>Adminstrator</a></li>
        <li class="active">User Level</li> 
    </ol>  
</section>

<section class="content">
<div class="row">
    <div class="col-sm-6">
        <div class="box box-primary">
            <div class="box-header"> 
                <h3 class="box-title">List User Level</h3>
            </div>    
            <div class="box-body table-responsive">
                <table class="table table-striped table-bordered table-hover sc-DataTable" id="sc-DataTable">
                    <thead>
                        <tr> 
                            <td width="100" align="center">Code</td>
                            <td >Description</td>
                            <td width="80" align="center">Action</td>
                        </tr>    
                    </thead>                
                    <tbody>

                    </tbody>
                </table>                
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="box box-primary">
            <div class="box-header"> 
                <h3 class="box-title">User Level</h3>
            </div>    
            <form role="form" name="frmUserLevel" id="frmUserLevel">
            <div class="box-body">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-1">
                            <label>Code</label>
                        </div>
                        <div class="col-sm-2"> 
                            <input type="text" class="form-control sc-input-required" name="nLevel" id="nLevel" maxlength="4"
                            placeholder="Code">
                            <input type="hidden" id="cLevel" name="cLevel">
                            <div class="text-center">0001-9999</div>
                        </div>
                        <div class="col-sm-2">
                            <button class="btn btn-primary btn-flat cmdSimpan">Save</button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <input type="text" maxlength="100" name="cKeterangan" id="cKeterangan" 
                    class="form-control sc-input-required" placeholder="Description">
                </div>  
                <div class="form-group"> 
                    <div id="sc-sys-tree-uesrlevel" style="min-height:350px;max-height:350px;overflow:auto"></div>
                </div>
            </div> 
            </form>
        </div>
    </div>
</div>
</section>

<script type="text/javascript" src="./pages/sys/userlevel.js"></script>  