<?php
    include_once "./sapeltucore/sc_include/sc.func.php" ;
    include_once "./system/func.database.php" ;    
    include_once "./system/func.php" ;
 
    if(GetSession("cSession_UserName") == ""){
        include_once "./login.php" ; 
    } else{  
        include_once "./frame.php" ;
    } 
?> 
