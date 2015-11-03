# webapp_sppd
SURAT PERINTAH PERJALANAN DINAS 

Aplikasi dapat menangani :
1. Input SPPD 
2. Cetak SPPD
3. Pelaporan SPPD yang dilakukan oleh karyawan
4. Cetak Hasil Laporan SPPD
5. Daftar semua SPPD (sedang dikerjakan, selesai , dan belum dilaporkan)

Aplikasi dapat diinstall pada :
1. XAMPP v.1.8.3 / lebih
2. Ubuntu Server 12.04 
	2.1 PHP 5.5
	2.2 Mysql 5
	2.3 Apache

Cara Instalasi :
1. Copy pada folder /var/www (untuk ubuntu) / htdoc (untuk xampp)
2. chmod 777 -R pada folder /uploaded , /tmp , /thumbs
3. Import database github_sppd.sql
4. Setting user passowrd mysql pada /system/sc.ini.php