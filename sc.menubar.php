<?php
/*
     author              : sapeltu - core [www.core.sapeltu.com]
     name                : menu 
     creator             : Mirza Ramadhany
     date                : 22 Desember 2013
     last modified       : -
     fixed by            : -
     version             : 1.0.0
     Format              : [Menu Name,Menu Function,Menu Icon,Judul Form,Width,Height] 
     Customr			 : PDAM (Khusus)
*/ 

class scMenu{
     //inilisiasi
     var $cIconBlank     = '&nbsp;&nbsp;&nbsp;&nbsp;' ; //4 blank space agar sama dengan icon lebarnya
     var $cIconFolder    = '<i class="fa fa-folder-open"></i>' ; 
     var $cHr            = '<hr/>' ;
     var $cNamaFile      = "./scmenu.menu" ;
     var $cNamaFile2     = "./scmenu.menu.php" ; 
     var $cNamaFileDef   = "" ;
     var $cSCMenu        = "" ;   
     var $lWithCase		 = true ;
     var $cLevel		 = "" ;
     var $cLevel_md5	 = "" ;  
     
     public function __construct($lWithCase=true){
     	$this->lWithCase = $lWithCase ; 
     	$this->cLevel 	 = GetSession("cSession_SCLevel") ; 
     	$this->cLevel_md5= GetSession("cSession_SCLevelmd5") ; 

     } 

     private function GetFileMenu(){
          if(is_file($this->cNamaFile)){
               $this->cNamaFileDef  = $this->cNamaFile ;           
          }else{
               $this->cNamaFileDef  = $this->cNamaFile2 ; 
          }  
     }    
     private function SetDetailMenu($va,$lTop=false,$lParent=false){
          if($va['cNama'] !== "-"){
               $va['cJs']	 = htmlspecialchars($va['cJs']) ;     
               $cLink    	 = '<a href="#'.$va['cJs'].'">' ; 
               $cIcon 		 = $va['cIcon'] !== "" ? $va['cIcon'] : 'fa fa-angle-double-right' ;
               $cLink 		.= '<i class="'.$cIcon.'"></i>' ; 
               $cLink 		.= '<span>'.$va['cNama'].'</span>' ;
               $cRight		 = ($lParent) ? '<i class="fa fa-angle-left pull-right"></i>' : '' ; 
               $cLink 		.= $cRight ; 
               $cLink 		.= '</a>' ; 
          }else{
               $cLink    	 = $this->cHr ; 
          }  
          
          return $cLink ;   
     }  
     private function Menu2Array($cMenu){
          $va       = array() ; 
          $vaArray  = array("cNama"=>"","cJs"=>"","cIcon"=>"","cID"=>"","cMd5"=>0) ; 
          eval('$va = array' . str_replace("[","(", str_replace("]",")",$cMenu)) . ';' ) ; //eval to array            
          //set to Array
          $vaArray['cNama']   	= isset($va[0]) ? $va[0] : "" ; 
          $vaArray['cJs']     	= isset($va[1]) ? $va[1] : "" ;
          $vaArray['cIcon']   	= isset($va[2]) ? $va[2] : "" ;
          $vaArray['cMd5']  	     = isset($va[3]) ? md5($va[3]) : md5($va[1]) ; 
           
          return $vaArray ; 
     }

     public function CekSelanjutnya($nKey){
          $vaFile        = file($this->cNamaFileDef) ;   //load file menu menjadikan array 
          $nFile         = count($vaFile) ; 
          $lKey          = false ;  
          $nLoop         = 0  ;
          while (!$lKey && $nLoop < ($nFile) ) {
               $nLoop++ ; 
               $nKey++ ;
               
               if(isset($vaFile[$nKey])){
                    if( strpos($vaFile[$nKey], "#") === false && 
                         ( strpos($vaFile[$nKey], "index.") === false ) ){
                         $lKey     = true ;  
                         $nLoop    = $nFile ;      
                    } 
               }else if(!isset($vaFile[$nKey])){
                    $lKey = true ; 
                    $nLoop= $nFile ; 
               } 
          }

          return $nKey ; 
     }

     public function SetMenu(){ 
          //ambil dahulu nama file menunya
          $this->GetFileMenu() ; 
          //get session dahulu
          //$this->cSCMenu 	 = unserialize(GetSession("cSession_SCMenu")) ;  
          if(is_file($this->cNamaFileDef) && $this->cSCMenu == "") { 
               $vaFile        = file($this->cNamaFileDef) ;   //load file menu menjadikan array 
               if($this->lWithCase) $this->cSCMenu = '<ul class="sidebar-menu">' ; //awal dari navigation menu
               $nBertingkat   = 0 ;                
               
               foreach($vaFile as $nKey => $cValue){
                    $cIdentifier   = strpos($cValue, "#") ; 
                    if($cIdentifier === false && trim($cValue) !== "" &&   
					strpos($cValue, "<?php die('Sapeltu Inc.'); ?>") !== 0 &&
                         ( strpos($vaFile[$nKey], "Dashboard") === false || strpos($vaFile[$nKey], "index.") === false ) &&
                         ( strpos($vaFile[$nKey], "Lv") === false || strpos($vaFile[$nKey], "index.") === false )
                         ){ //jika diawal value terisi # maka tidak dieksekusi
                         //ambil posisi [ karna untuk menentukan sub sub menu
                         $vaMenu         = scArray::Menu2Array($cValue) ; 

                         $lValid 		= (strpos($this->cLevel_md5, $vaMenu['cMd5']) > -1) ? true : 
                    					(($this->cLevel == "0000") ? true : false) ;  
                         $nPos           = strpos($cValue,"[") ;  
                         $lTop           = $nPos == 0 ? true : false ;  
                         //userlevel access  
                         //untuk menentukan sub menu / menutup sub menu maka harus dicek menu setelah menu ini
                         $lParent        = false ;
                         $lParentEnd     = false ;  
                         $lBertingkatEnd = false ; 
                         $nNextKey       = $this->CekSelanjutnya($nKey) ; 
                         if(isset($vaFile[$nNextKey])){ 
                              $nPosNext      = strpos($vaFile[$nNextKey],"[") ; 
                              $lParent       = ($nPosNext > $nPos) ? true : false ; 
                              $lParentEnd    = ($nPosNext >= $nPos) ? false : true ; 
                              $lBertingkatEnd= ($nPosNext == 0) ? true : false ; 
                         }else{
                              //$lParentEnd    = true ; 
                              $lBertingkatEnd= true ;
                         } 
                         if($lValid){    
                             $cDash          = GetSession("cSession_Dashboard") ;
                             if(trim($cDash) == ""){
                                   SaveSession("cSession_Dashboard",$vaMenu['cJs']) ; 
                             }   
                               
	                        $liClass		= $lParent ? "class='treeview'" : "" ;
	                        $this->cSCMenu .= '<li '.$liClass.'>' ; 

	                         if($lParent){
	                              //jika jadi parent maka 
	                              $this->cSCMenu .= $this->SetDetailMenu($vaMenu,$lTop,$lParent) . '<ul class="treeview-menu">' ; 
	                              $nBertingkat++ ; 
	                         }else{ 
	                              $this->cSCMenu .= $this->SetDetailMenu($vaMenu) . "</li>" ; 
	                         } 
	                         
	                         if($lParentEnd){//ditutup parent end
	                              //$nBertingkat-- ; 
	                              //$this->cSCMenu .= "</ul></li>" ; 
                                   while($nBertingkat > $nPosNext ){
                                        $nBertingkat-- ;  
                                        $this->cSCMenu .= "</ul></li>" ;      
                                   }
	                         }     
	                    }

                         if($nBertingkat > 0 && $lBertingkatEnd){
                              while($nBertingkat > 0){
                                   $nBertingkat-- ; 
                                   $this->cSCMenu .= "</ul></li>" ;      
                              }
                         } 
                    }    
               }
               
               if($this->lWithCase) $this->cSCMenu .= '</ul>' ; //penutup dari navigation menu    
               SaveSession("cSession_SCMenu", serialize($this->cSCMenu)) ;  
          } 

          echo ($this->cSCMenu) ;  
     }     
} 