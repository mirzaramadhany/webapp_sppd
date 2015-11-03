# webapp_sppd
SURAT PERINTAH PERJALANAN DINAS 

<b><i>Aplikasi dapat menangani :</i></b>
<ol>
	<li>Input SPPD </li>
	<li>Cetak SPPD </li>
	<li>Pelaporan SPPD yang dilakukan oleh karyawan </li>
	<li>Cetak Hasil Laporan SPPD </li>
	<li>Daftar semua SPPD (sedang dikerjakan, selesai , dan belum dilaporkan)</li>
</ol>

<b><i>Aplikasi dapat diinstall pada :</i></b>
<ol>
	<li>XAMPP v.1.8.3</li>
	<li>
		Ubuntu Server 12.04 
		<ol>
			<li>PHP 5.5</li>
			<li>Mysql 5</li>
			<li>Apache</li>
		</ol> 
	</li>
</ol>

<b><i>Cara Instalasi :</i></b>
<ol>
	<li>Copy pada folder /var/www (untuk ubuntu) / htdoc (untuk xampp)</li>
	<li>chmod 777 -R pada folder /uploaded , /tmp , /thumbs</li>
	<li>Pelaporan SPPD yang dilakukan oleh karyawan </li>
	<li>Import database github_sppd.sql</li>
	<li>Setting user passowrd mysql pada /system/sc.ini.php</li>
</ol>  