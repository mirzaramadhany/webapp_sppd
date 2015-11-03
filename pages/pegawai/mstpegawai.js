OBJFORM_NEW.mstpegawai			= {} 
OBJFORM_NEW.mstpegawai.ID 		= "mstpegawai" ; 
OBJFORM_NEW.mstpegawai.Obj 		= $("#mstpegawai") ; 
OBJFORM_NEW.mstpegawai.Url 	 	= OBJFORM_NEW.mstpegawai.Obj.find("#cPageSource").val().replace("./pages/","") ; 
OBJFORM_NEW.mstpegawai.Url_A 	= OBJFORM_NEW.mstpegawai.Obj.find("#cPageSource").val() + ".ajax.php"; 

OBJFORM_NEW.mstpegawai.Grid1_Data 	 = null ; 
OBJFORM_NEW.mstpegawai.Grid1_LoadData= function(){
	OBJFORM_NEW.mstpegawai.Grid1_Data 				= {} ; 
	OBJFORM_NEW.mstpegawai.Grid1_Data["cPar"]		= OBJFORM_NEW.mstpegawai.Url_A ;
	OBJFORM_NEW.mstpegawai.Grid1_Data["cFunction"]	= "Grid1_Load" ; 
}

OBJFORM_NEW.mstpegawai.Grid1_Load	= function(){
	$("#gr_mstpegawai").w2grid({ 
        name	: OBJFORM_NEW.mstpegawai.ID + '_grid1',  
        limit 	: 100 ,
        url 	: "./sc.core.php", 
        postData: OBJFORM_NEW.mstpegawai.Grid1_Data ,
        show: {   
            toolbar 		: true,
            toolbarReload   : false,
    		toolbarColumns  : false
        },
        multiSearch: false, 
        searches: [
        	{ field: 'nip', caption: 'NIP',type:'text'}, 
            { field: 'nama', caption: 'Nama',type:'text'},
            { field: 'alamat', caption: 'Alamat',type:'text'}, 
            { field: 'golongan', caption: 'Pangkat / Golongan',type:'text'}, 
            { field: 'jabatan', caption: 'Jabatan',type:'text'}
        ],
        columns: [   
            { field: 'nip', caption: 'Nip', size: '150px', sortable: true },  
            { field: 'nama', caption: 'Nama', size: '250px', sortable: true},
            { field: 'tempat_lahir', caption: 'Tempat', size: '100px', sortable: true},
            { field: 'tanggal_lahir', caption: 'Tanggal', size: '80px', sortable: true},
            { field: 'alamat', caption: 'Alamat', size: '200px', sortable: true },	
            { field: 'golongan', caption: 'Golongan', size: '150px', sortable: true },
            { field: 'jabatan', caption: 'Jabatan', size: '150px', sortable: true },
            { field: 'cmdEdit', caption: '', size: '80px', sortable: false,attr:'align=center' },
            { field: 'cmdDelete', caption: '', size: '80px', sortable: false,attr:'align=center' }
        ]
    });   
} 
OBJFORM_NEW.mstpegawai.Grid1_SetData	= function(){
	w2ui[OBJFORM_NEW.mstpegawai.ID + '_grid1'].postData 	= OBJFORM_NEW.mstpegawai.Grid1_Data ; 
}
OBJFORM_NEW.mstpegawai.Grid1_Reload		= function(){
	w2ui[OBJFORM_NEW.mstpegawai.ID + '_grid1'].reload() ;
}	 
OBJFORM_NEW.mstpegawai.Grid1_Destroy 	= function(){
	w2ui[OBJFORM_NEW.mstpegawai.ID + '_grid1'].destroy() ; //hancurkan grid biar bisa dilihat lagi
}
OBJFORM_NEW.mstpegawai.Grid1_Render 	= function(){ 
	$("#gr_mstpegawai").w2render(OBJFORM_NEW.mstpegawai.ID + '_grid1') ; 
}

OBJFORM_NEW.mstpegawai.Grid1_ReloadData	= function(){
	OBJFORM_NEW.mstpegawai.Grid1_LoadData() ; 
	OBJFORM_NEW.mstpegawai.Grid1_SetData() ; 
	OBJFORM_NEW.mstpegawai.Grid1_Reload() ;   
} 

OBJFORM_NEW.mstpegawai.Init 	= function(){
	with(OBJFORM_NEW.mstpegawai.Obj){
		find("#cNip").select2("data","") ;
		find("#cNip").select2("readonly",false) ;
		find("#cNama").val("") ;
		find("#cAlamat").val("") ;
		find("#cTempat").val("") ;
		find("#dTempat_Tgl").val("") ;
		find("#cGolongan").val("") ;
		find("#dGolongan_Tgl").val("") ;
		find("#cJabatan").val("") ;
		find("#dJabatan_Tgl").val("") ;
		find("#nKerjaTahun").val("") ;
		find("#nKerjaBulan").val("") ;
		find("#cJabatan_Lat").val("") ;
		find("#dJabatan_Lat_Tgl").val("") ;
		find("#nJabatan_Lat").val("") ;
		find("#cPendidikan").val("") ;
		find("#nThLulus").val("") ;
		find("#cIjazah").val("") ;
		find("#cCatatan_Mutasi").val("") ;
		find("#cKeterangan").val("") ;
	}
}

OBJFORM_NEW.mstpegawai.Edit 	= function(cNip){
	scAjax(OBJFORM_NEW.mstpegawai.Url_A,'Editing','cNip=' + cNip) ; 
}

OBJFORM_NEW.mstpegawai.Delete 	= function(cNip){
	if(confirm("Hapus Data ? ")){
		scAjax(OBJFORM_NEW.mstpegawai.Url_A,'Deleting','cNip=' + cNip) ; 
	}
}

$(function(){
	//init 
	OBJFORM_NEW.mstpegawai.Grid1_LoadData() ; 
	OBJFORM_NEW.mstpegawai.Grid1_Load() ; 

	scForm.SetEnter2Tab(OBJFORM_NEW.mstpegawai.Obj) ; 
	scForm.InitSelect({
		cClass : "#" + OBJFORM_NEW.mstpegawai.ID + " .sc-select"
	}) ;
	scForm.InitDate({
		cClass : "#" + OBJFORM_NEW.mstpegawai.ID + " .sc-date"
	}) ;
	scForm.InitNumber(0,"#" + OBJFORM_NEW.mstpegawai.ID + " .sc-number") ;

	//event
	OBJFORM_NEW.mstpegawai.Obj
	.on("remove",function(){
		OBJFORM_NEW.mstpegawai.Grid1_Destroy() ; 
	}) ; 

	OBJFORM_NEW.mstpegawai.Obj
	.find("#cNip").on("select2-selecting",function(e){
		OBJFORM_NEW.mstpegawai.Obj.find("#cNama").focus() ;
	}) ; 
	OBJFORM_NEW.mstpegawai.Obj
	.find("#cmdSave").on("click",function(){
		if(scValidationForm(this,true)){
			scAjax(OBJFORM_NEW.mstpegawai.Url_A,'Saving',scGetDataForm(this),this) ; 
		}
	}) ; 
	$("#mstpegawai_tab_1").on("click",function(){
		OBJFORM_NEW.mstpegawai.Init() ; 
		OBJFORM_NEW.mstpegawai.Grid1_ReloadData() ; 
	}) ;
	$("#mstpegawai_tab_2").on("click",function(){
		setTimeout(function(){
			OBJFORM_NEW.mstpegawai.Init() ; 
			OBJFORM_NEW.mstpegawai.Obj.find("#cNip").select2("open") ; 
		},1) ; 
	}) ;

	$("#cmdPrint").on("click",function(e){
		e.preventDefault() ; 
		FRAME_PDF(true,"sc.reportme.php?scRpt="+OBJFORM_NEW.mstpegawai.Url) ; 
	}) ; 

	$("#cmdPrint_CSV").on("click",function(e){ 
		e.preventDefault() ; 
		FRAME_PDF(true,"sc.reportme.php?scRpt="+OBJFORM_NEW.mstpegawai.Url+"&nOpt_CSV=1") ; 
	}) ; 
}) ;  