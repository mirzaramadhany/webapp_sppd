var oTable = null ; 
$(window).ready(function(){
  oTable   = $('#sc-DataTable').dataTable({
    "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "./sc.datatables.php?1sc23=sys/userlevel",
        "aoColumns": [     
          { "sClass": "text-centered" },
          { "sClass": "text-left" },
          { "sClass": "text-centered" }
          ]
  });   
 
  //remove n add class loading
  $('#sc-DataTable_processing').html("") ; 

  $('#nLevel').blur(function(){
    scAjax('./pages/sys/userlevel.ajax.php','LoadTree','nLevel=' + $(this).val() ,this) ;    
  }) 

  $('.cmdSimpan').click(function(e){
    e.preventDefault() ; 
    var cErr  = "" ; 
    cErr    = scValidationForm($(this)) ;
    if($("#nLevel").val().length < 4){
      cErr  = "Panjang kode harus 4 " ;
    }
    if(cErr !== ""){
       alert(cErr) ;   
    }else{ 
      scAjax('./pages/sys/userlevel.ajax.php','Saving', scGetDataForm(this) ,this) ;    
    }
    
  }) ; 

}) ; 

$(function(){
  $(" #sc-sys-tree-uesrlevel").dynatree({
      checkbox: true,
      selectMode: 2, 
      onSelect: function(select, node) {
        // Get a list of all selected nodes, and convert to a key array:
        var selKeys = $.map(node.tree.getSelectedNodes(), function(node){
          return node.data.key;
        });
   
        $("#cLevel").val(selKeys.join(",")); 
        // Get a list of all selected TOP nodes
        var selRootNodes = node.tree.getSelectedNodes(true);
        // ... and convert to a key array:
        var selRootKeys = $.map(selRootNodes, function(node){
          return node.data.key;
        }); 
      },
      onKeydown: function(node, event) {
        if( event.which == 32 ) {
          node.toggleSelect();
          return false;
        }
      }, 
      cookieId: "dynatree-Cb3",
      idPrefix: "dynatree-Cb3-"
  });
}) ;

function cmdEditLevel(cKode){ 
  scAjax('./pages/sys/userlevel.ajax.php','Editing', 'cKode=' + cKode) ;    
}

function cmdDeleteLevel(cKode){
  if(confirm("Delete Data ?")){
    scAjax('./pages/sys/userlevel.ajax.php','Deleting', 'cKode=' + cKode) ;    
  }
}