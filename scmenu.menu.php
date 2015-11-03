<?php die('Sapeltu Inc.'); ?>
#############################################################################################
#scmenu.menu
#author        : sapeltu-core
#creator       : Mirza Ramadhany
#date          : 22 Desember 2013
#last modified : 22 Juni 2013
#fixed by      : Mirza Ramadhany
#version       : 1.5.0
#Format
#[Menu Name,Menu Location,Menu Icon,oMenuId
#    Menu Name     : Name for menu , if a name is - then is this a sparator
#    Menu Function : function on javascript , if not a function then is this a open form
#    Menu Icon     : font-awesome version 4.1 http://fontawesome.io/icons/
#    
#["Before Distribution","transaksi_all/trworkflow&cDataValue=1","fa fa-exchange","objPro_Procurement_BeforeDistribution"]
#["Procurement Execution","","fa fa-exchange","objT_Evaluation"]	
#["Initial Process","transaksi_all/trworkflow&cDataValue=2","","objT_Evaluation_Initial"]
#["Evaluation","transaksi_all/trworkflow&cDataValue=3","","objT_Evaluation_Evaluation"]
#["Contract","transaksi_all/trworkflow&cDataValue=4","","objT_Evaluation_Contract"]
#["After Contract","transaksi_all/trworkflow&cDataValue=5","","objT_Evaluation_AfterContract"]
#["Update Date Actual","transaksi_all/new/trupdactual","fa fa-exchange"]
#############################################################################################
["Dashboard","dash/dashboard","fa fa-suitcase"]
["Pegawai","pegawai/mstpegawai","fa fa-users"]
["SPPD","sppd/trsppd","fa fa-envelope"]
["Pelaporan SPPD","sppd/trsppd_laporan","fa fa-send"]
["Lihat SPPD","report/rptsppd","fa fa-file"]
["Administrator","","fa fa-gears","objA"]
	["User","","fa fa-user","objA_User"] 
		["User Level","sys/userlevel",""]
		["Username","sys/sysuser_grid",""] 
	["Backup & Restore","sys/sysdb",""] 
	["Log CRUD","sys/syscrud",""] 
	["System","sys/sys",""]