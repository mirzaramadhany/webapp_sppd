
<html lang="en">  
	<head>
		<?=scSys::SCLicence()?>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta charset="utf-8" />
		<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
		
		<meta name="description" content="login system">
		<meta name="keyword" content="">
		<meta name="author" content="sapeltu-core">
		<title>Login System</title> 
		<link rel="stylesheet" type="text/css" href="./sapeltucore/sc_credits/bootstrap/bootstrap.min.css">
		<style type="text/css">    
			*{
				box-sizing:border-box;
					-moz-box-sizing:border-box;
					-ms-box-sizing:border-box; 
					-o-box-sizing:border-box; 
					-webkit-box-sizing:border-box; 
                     
			} 
			a{
			     color:#FFFFFF ; 
			     text-decoration:none; 
			}      
			     a:hover{
			          color:#FFFFFF ;     
			     }
			body{ 
			}
			
			#login-wrap{
			     float:none ; 
			     margin:5em auto ;
			     transition:all .5s ease;
					-moz-transition:all .5s ease;
					-ms-transition:all .5s ease;
					-o-transition:all .5s ease;
					-webkit-transition:all .5s ease; 
			}
			 
			#login-wrap .footer{
			     background:rgba(41, 128, 185,0.9);  
			     padding:5px ;
			     padding-top:1em;
			     font-size:11px ; 
			     width:75% ;
			     right:0 ; 
			     position:absolute ; 
			     margin-right:1.4em;
			     margin-top:-2.5em;
			     color:#FFFFFF ; 
			     text-align:center;
			     border-radius:5px ; 
			          -moz-border-radius:5px ; 
			          -ms-border-radius:5px ; 
			          -o-border-radius:5px ; 
			          -webkit-border-radius:5px ;  
			}
			     #login-wrap .footer:hover{
			          background-color:#0199cc ; 
			          cursor:pointer ; 
			     }
			
			#login{ 
			     position:relative ;   
			     z-index:99999 ;
			}
			     #login.panel{
			          border-radius:0px ; 
			          border:0px ; 
			          box-shadow:none ; 
			     } 
			     
			     #login.panel .panel-heading{  
			          border-radius:0px ;      
			          line-height:1.5em ; 
			          background:rgba(41, 128, 185,0.9); 
			          
			     }
			     #login.panel .panel-body{
			          border:1px solid #999999 ; 
			          border-top:0px ; 
			          background-color:#ffffff ;
			          padding:1em 3em 2em 3em ; 
			     }
			     	#login.panel .panel-body .error{
			     			border-left: .5em solid red ;
			     			border-right: .5em solid red ; 	
			     			font-size:12px ;
			     			text-align: center ;    
			     			display: none ;  
			     	} 
			          #login.panel .panel-body .text-ics{
			               position:relative ; 
			          }
			          #login.panel .panel-body .text-ics:before,
			          #login.panel .panel-body .text-ics:after{
			               content:' ';
			               display:block ; 
			               position:absolute ; 
			               bottom:1px ; 
			               height:6px ; 
			               border-left:1px solid #0199cc ;      
			          }
			          #login.panel .panel-body .text-ics:before{
			               left:0 ;
			          }
			          #login.panel .panel-body .text-ics:after{
			               right:0 ;
			          }
			          
			          
			          #login.panel .panel-body .text-ics input[type=text],
			          #login.panel .panel-body .text-ics input[type=password]{
			               border:none ;
			               margin-top:.75em ;   
			               box-shadow:none ;
			               border-bottom:1.8px solid #0199cc ;  
			               border-radius:0px ;    
			          }   
                         			          
			          #login.panel button{
			               float:right ; 
			               border-radius:0px ; 
			               background-color:#0199cc ; 
			               color:#ffffff ;     
			               font-weight:bold ;
			               border:0px ;  
			               box-shadow:none ;   
			               
			          }
			               #login.panel button:hover{ 
			                    background-color:#6bb6f9 ; 
			               } 
			.logo{
				padding-top: 3em ; 
			}   
			.logo img{max-height: 100px ; margin: 0 auto ; } 

		</style>
	</head> 
	<body> 
		<div class="logo"> 
			<img src="./uploaded/logo.jpg" class="img-responsive" 
			alt="<?=scSys::GetConfig("sc_front_title")?>" title="<?=scSys::GetConfig("sc_front_title")?>"> 
		</div>

		<div class="container"> 
			<div class="row">  
				<div class="col-sm-5" id="login-wrap"> 
				     <div class="panel" id="login"> 
					     <div class="panel-heading">
						     &nbsp;
					     </div> 
					     <div class="panel-body">
				     		<blockquote class="error">
				     			Loading.....
				     		</blockquote>
						     <form role="form" method="POST">
						          <div class="text-ics" >
							          <input type="text" class="form-control sc-input-required" name="cUser" required autofocus 
					                  	     placeholder="User Name">   
				                  	</div>
				                  	<div class="text-ics">
				                       	<input type="password" class="form-control sc-input-required" name="cPassword" required 
               				             	placeholder="Password">  
          				          </div> 
          				          
					              	<div class="checkbox"> 
						              	<!--
						              	<label>Ingat Saya 
						              		<input type="checkbox" name="ckRemember">
						              	</label> 
						              	-->
						              </div>

					              	<button id="btnSubmit" class="btn btn-default btn-block">Login</button>
						     </form> 
					     </div>  
					</div> 
					<div class="footer"> 
					     <?=scSys::GetConfig("sc_front_title")?> | <a href="./pages/log.php" target="_blank">Ver : <?=GetSession("SYS.ver")?></a>
					</div> 
				</div>  
			</div>  
		</div>
 
		<script type="text/javascript" src="./sapeltucore/sc_credits/jquery/jquery.js"></script>
		<script type="text/javascript" src="./sapeltucore/sc_credits/bootstrap/bootstrap.min.js"></script>
		<script type="text/javascript" src="./sapeltucore/sc_include/sc.core.js"></script>
		<script type="text/javascript"> 
			$('document').ready(function(){
				$('#login.panel .panel-body #btnSubmit').click(function(e){	
					e.preventDefault() ; 
					cError	= "";   
					$(this).parent('form').find('input.sc-input-required')
					.each(function(index){
						if($(this).val() == ""){
							cError	+= $(this).attr('placeholder') + " Kosong !!! <br />" ;
						}
					}) ; 

					if(cError == ""){
						scAjax('./login.ajax.php','Check', scGetDataForm(this) ,this) ;	
					}else{
						$("#login.panel .panel-body .error").slideDown(800,function(){
							$(this).html(cError) ;
							$('#login.panel .panel-body').find('input').eq(0).focus() ; 
						}) ;  
					} 
					
				});
			}) ; 
			 	 
		</script>
	</body>
</html>
