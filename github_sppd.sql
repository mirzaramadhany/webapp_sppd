/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50616
Source Host           : localhost:3306
Source Database       : github_sppd

Target Server Type    : MYSQL
Target Server Version : 50616
File Encoding         : 65001

Date: 2015-11-03 19:42:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pegawai
-- ----------------------------
DROP TABLE IF EXISTS `pegawai`;
CREATE TABLE `pegawai` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nip` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `no_hp` varchar(100) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `tempat_lahir` varchar(100) NOT NULL,
  `golongan` varchar(100) NOT NULL,
  `golongan_tanggal` date NOT NULL DEFAULT '0000-00-00',
  `jabatan` varchar(100) NOT NULL,
  `jabatan_tanggal` date NOT NULL DEFAULT '0000-00-00',
  `kerja_tahun` int(4) NOT NULL,
  `kerja_bulan` int(4) NOT NULL,
  `latihan_jabatan` varchar(100) DEFAULT NULL,
  `latihan_jabatan_tanggal` date DEFAULT '0000-00-00',
  `latihan_jabatan_jam` int(4) DEFAULT '0',
  `pendidikan` varchar(100) NOT NULL,
  `pendidikan_lulus` varchar(4) NOT NULL,
  `pendidikan_ijazah` varchar(100) NOT NULL,
  `catatan_mutasi` text,
  `keterangan` text,
  `username` varchar(100) DEFAULT NULL,
  `username_update` varchar(100) DEFAULT NULL,
  `datetime_insert` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  `datetime_update` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `status_deleted` enum('0','1') DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `nip` (`nip`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pegawai
-- ----------------------------
INSERT INTO `pegawai` VALUES ('1', '195802281986012002', 'ALDIAZ NASHER ARIGHI', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '12', '2011-04-05', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:46', '2015-11-03 10:05:42', '1');
INSERT INTO `pegawai` VALUES ('2', '1958060519860811001', 'MIRZA RAMADHANY', '-', 'Singosari Malang Indonesia', '1958-06-05', 'Indonesia', '15', '2009-10-27', 'Kepala Dinas', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', '', '', null, 'admin', '2015-05-31 02:12:46', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('3', '195807171980031014', 'ADI ROZAQ AL HA YU', '-', 'Singosari Malang Indonesia', '1958-07-17', 'Indonesia', '9', '2013-11-14', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:46', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('4', '195807171980032008', 'ADIKA SETIA BRATA', '-', 'Singosari Malang Indonesia', '1958-07-17', 'Indonesia', '10', '2001-03-29', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:46', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('5', '195808281986011003', 'ALVIN CANDRA WIJAYA', '-', 'Singosari Malang Indonesia', '1958-08-05', 'Indonesia', '13', '2015-09-30', 'Kabid Konservasi dan Rehabilitasi', '2009-02-26', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:46', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('6', '195809281980032008', 'ANDIKA SETYA RISWANTO', '-', 'Singosari Malang Indonesia', '1958-09-28', 'Indonesia', '10', '2001-03-29', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:46', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('7', '195810291986081001', 'ANDRE GINO KURNIAWAN', '-', 'Singosari Malang Indonesia', '1958-10-29', 'Indonesia', '7', '0000-00-00', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:46', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('8', '195811141986031005', 'ARGA SEPTANDIKA PUTRA', '-', 'Singosari Malang Indonesia', '1988-11-23', 'Indonesia', '11', '2010-07-08', 'Penyuluh kehutanan penyelia', '2010-04-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('9', '195812241992111001', 'ok1', '-', 'Singosari Malang Indonesia', '1958-12-14', 'Indonesia', '13', '2012-09-20', 'Sekretaris', '2014-06-12', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:06:27', '1');
INSERT INTO `pegawai` VALUES ('10', '195812291982122003', 'ok2', '-', 'Singosari Malang Indonesia', '1958-12-29', 'Indonesia', '10', '2003-04-08', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('11', '195905071990031004', 'ok13', '-', 'Singosari Malang Indonesia', '1959-05-02', 'Indonesia', '8', '2010-05-01', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('12', '195909111983032008', 'ok4', '-', 'Singosari Malang Indonesia', '1959-09-11', 'Indonesia', '12', '2005-08-24', 'Kasi Monitoring dan Pelaporan', '2009-02-26', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('13', '195912251990031004', 'DANANG DAIFULLAH DINAR MAUDY', '-', 'Singosari Malang Indonesia', '1959-12-25', 'Indonesia', '8', '0000-00-00', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('14', '196001011987091001', 'DENNY\'S ALFIAN', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '11', '2013-09-17', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('15', '196003051987082001', 'DIMAS AJI PRAKOSA', '-', 'Singosari Malang Indonesia', '1960-03-05', 'Indonesia', '13', '2013-09-30', 'Kasi Him Pengamatan dan Pengendalian OPT', '2013-01-12', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('16', '196003271986032003', 'FARID NANDA LUTHFIANTO', '-', 'Singosari Malang Indonesia', '1960-03-27', 'Indonesia', '14', '2005-07-29', 'Kabid Binus dan Kelembagaan', '2009-02-26', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('17', '196004291990021002', 'FIRMAN MAULANA JA\'FAR', '-', 'Singosari Malang Indonesia', '1980-04-29', 'Indonesia', '10', '2010-05-01', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('18', '196005271987081001', 'GALIH RAMADHAN', '-', 'Singosari Malang Indonesia', '1993-01-04', 'Indonesia', '12', '2012-11-05', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('19', '196006071992031005', 'ok5', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '13', '2014-04-01', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('20', '196109201992032004', 'ok6', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '10', '2009-09-30', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('21', '196110151987081001', 'LERENOP SULAKSONO', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '9', '2005-10-13', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('22', '196110302007011001', 'ok7', '-', 'Singosari Malang Indonesia', '1981-10-30', 'Indonesia', '6', '2011-03-10', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:48', '1');
INSERT INTO `pegawai` VALUES ('23', '196201182007011002', 'MAULANA NUR HIDAYATULLAH', '-', 'Singosari Malang Indonesia', '1962-01-18', 'Indonesia', '6', '2011-03-10', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('24', '196212301980031005', 'DHANY', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '5', '1996-02-05', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('25', '196303061992031005', 'ok8', '-', 'Singosari Malang Indonesia', '1963-03-06', 'Indonesia', '11', '0000-00-00', 'Kasi Sarana dan Prasarana Perlindungan', '2013-06-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('26', '196303181988032009', 'RHESAL MAHADYANTO', '-', 'Singosari Malang Indonesia', '1989-04-24', 'Indonesia', '12', '2012-11-05', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('27', '196311101998022002', 'ok9', '-', 'Singosari Malang Indonesia', '1963-11-10', 'Indonesia', '9', '2014-04-14', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:47', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('28', '196401042007011010', 'ok10', '-', 'Singosari Malang Indonesia', '1966-01-04', 'Indonesia', '4', '2011-03-10', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('29', '196404241989032010', 'ok11', '-', 'Singosari Malang Indonesia', '1964-04-24', 'Indonesia', '10', '2009-04-01', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('30', '196408191987081002', 'ok12', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '10', '2010-05-24', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('31', '196410011994021002', 'RIZKY BA YU VERNANDO', '-', 'Singosari Malang Indonesia', '1964-10-01', 'Indonesia', '11', '2014-08-27', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('32', '196412231994031001', 'ok13', '-', 'Singosari Malang Indonesia', '2010-12-29', 'Indonesia', '10', '2010-05-24', 'Penyuluh Kehutanan Pelaksana lanjutan', '2010-04-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('33', '196701271995022001', 'ok14', '-', 'Singosari Malang Indonesia', '1967-01-27', 'Indonesia', '13', '2009-09-30', 'Kabid Produksi', '2011-06-23', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:05:49', '1');
INSERT INTO `pegawai` VALUES ('34', '196702041998031003', 'ASRORI HASAN', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '11', '2013-09-17', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:06:35', '1');
INSERT INTO `pegawai` VALUES ('35', '196703081993032008', 'ok15', '-', 'Singosari Malang Indonesia', '1967-03-08', 'Indonesia', '13', '2012-11-27', 'Kasubbag Keuangan DISHUTBUN', '2010-07-29', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:06:40', '1');
INSERT INTO `pegawai` VALUES ('36', '196809292008011004', 'KADARMAN', '-', 'Singosari Malang Indonesia', '1968-09-29', 'Indonesia', '10', '0001-12-11', 'Kasi Pembina SDM', '2013-10-05', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:06:49', '1');
INSERT INTO `pegawai` VALUES ('37', '196809292008011004', 'MUHAMMAD ALFADIN', '-', 'Singosari Malang Indonesia', '1963-02-06', 'Indonesia', '9', '2008-04-01', 'Staff Disbun', '2000-04-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:06:54', '1');
INSERT INTO `pegawai` VALUES ('38', '196810302000032004', 'MUHAMMAD ULIL ALBAB', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '', '0000-00-00', 'Penyuluh Kehutanan Muda', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:08:20', '1');
INSERT INTO `pegawai` VALUES ('39', '196901311998031007', 'MUHAMMAD APHEP ROSYADI', '-', 'Singosari Malang Indonesia', '1962-01-31', 'Indonesia', '13', '2014-10-01', 'Kabid Perlindungan', '2013-06-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:08:17', '1');
INSERT INTO `pegawai` VALUES ('40', '196902101998032004', 'VIENDY NURUL KUSUMAWAN', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '11', '0000-00-00', 'Penyuluh Kehutanan', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:07:53', '1');
INSERT INTO `pegawai` VALUES ('41', '196904261997031002', 'SUMPIL', '-', 'Singosari Malang Indonesia', '1969-04-26', 'Indonesia', '13', '2013-03-28', 'Kasi Bahan Tanaman, Pupuk, Alat dan Mesin', '2009-02-26', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:08:41', '1');
INSERT INTO `pegawai` VALUES ('42', '196906141998031010', 'MUHAMMAD NOVAL', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '11', '2014-10-01', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:08:48', '1');
INSERT INTO `pegawai` VALUES ('43', '196907191998031004', 'LAREDO', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '11', '2014-10-01', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:08:57', '1');
INSERT INTO `pegawai` VALUES ('44', '196909271998031006', 'RENDY', '-', 'Singosari Malang Indonesia', '1969-09-27', 'Indonesia', '', '0000-00-00', 'Penyuluh Kehutanan Muda', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:09:16', '1');
INSERT INTO `pegawai` VALUES ('45', '197005022000032005', 'CHOLIK', '-', 'Singosari Malang Indonesia', '1989-11-10', 'Indonesia', '10', '0000-00-00', 'Penyuluh Kehutanan pertama', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:09:18', '1');
INSERT INTO `pegawai` VALUES ('46', '197006011994031011', 'ARIF', '-', 'Singosari Malang Indonesia', '1970-06-01', 'Indonesia', '11', '2012-04-17', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:09:27', '1');
INSERT INTO `pegawai` VALUES ('47', '197006281998031005', 'ARIF TAHU', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '11', '2014-10-10', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:48', '2015-11-03 10:09:29', '1');
INSERT INTO `pegawai` VALUES ('48', '197011262006042004', 'ADITH', '-', 'Singosari Malang Indonesia', '1985-08-06', 'Indonesia', '11', '0000-00-00', 'Penyuluh Kehutanan', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:09:51', '1');
INSERT INTO `pegawai` VALUES ('49', '197022061998032007', 'FACHRUDIN', '-', 'Singosari Malang Indonesia', '1970-06-22', 'Indonesia', '', '0000-00-00', 'PENYULUH KEHUTANAN MUDA', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:09:59', '1');
INSERT INTO `pegawai` VALUES ('50', '197106091988031009', 'ENAL', '-', 'Singosari Malang Indonesia', '1985-12-05', 'Indonesia', '11', '2014-10-01', 'Penyuluh Kehutanan Muda', '2014-08-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:10:15', '1');
INSERT INTO `pegawai` VALUES ('51', '197106161998031006', 'RADITIYA', '-', 'Singosari Malang Indonesia', '1971-06-16', 'Indonesia', '', '0000-00-00', 'Penyuluh Kehutanan Muda', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:10:22', '1');
INSERT INTO `pegawai` VALUES ('52', '197209172000031005', 'PATRICK', '-', 'Singosari Malang Indonesia', '1975-09-17', 'Indonesia', '12', '2012-05-21', 'Kasi Rehabilitasi Hutan dan Lahan', '2011-09-22', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:10:25', '1');
INSERT INTO `pegawai` VALUES ('53', '197301081998031009', 'SANIY', '-', 'Singosari Malang Indonesia', '1973-01-08', 'Indonesia', '13', '2012-03-31', 'Kasi Binus dan Kelembagaan', '2011-09-22', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:10:53', '1');
INSERT INTO `pegawai` VALUES ('54', '197307052008011006', 'ROHMAN', '-', 'Singosari Malang Indonesia', '1973-07-05', 'Indonesia', '2', '2014-01-01', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:11:07', '1');
INSERT INTO `pegawai` VALUES ('55', '197410182006011005', 'AHMAD ROHMAN', '-', 'Singosari Malang Indonesia', '1971-10-18', 'Indonesia', '11', '2013-04-16', 'Kasi Perlindungan Hutan dan Mata Air', '2013-06-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:11:21', '1');
INSERT INTO `pegawai` VALUES ('56', '197501252006041006', 'REZA KURNIAWAN', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '8', '2014-04-01', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:12:23', '1');
INSERT INTO `pegawai` VALUES ('57', '197506052007011023', 'ZAINAL', '-', 'Singosari Malang Indonesia', '1975-06-05', 'Indonesia', '6', '2011-03-10', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:13:05', '1');
INSERT INTO `pegawai` VALUES ('58', '197508102006041016', 'ALIEF', '-', 'Singosari Malang Indonesia', '1975-08-10', 'Indonesia', '11', '2014-04-01', 'Kasubbag Program', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:13:02', '1');
INSERT INTO `pegawai` VALUES ('59', '19751117200312003', 'ALIFIN', '-', 'Singosari Malang Indonesia', '1975-11-17', 'Indonesia', '11', '2012-01-17', 'Kasi Pengembangan Tanaman dan Aneka Usaha', '2012-01-12', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:13:17', '1');
INSERT INTO `pegawai` VALUES ('60', '197703072003122008', 'YOGI', '-', 'Singosari Malang Indonesia', '1977-03-07', 'Indonesia', '11', '2012-04-17', 'Kasubag Umum dan Kepegawaian', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:13:19', '1');
INSERT INTO `pegawai` VALUES ('61', '197712272006041010', 'DIMAS', '-', 'Singosari Malang Indonesia', '1985-03-30', 'Indonesia', '11', '2014-10-01', 'Penyuluh Kehutanan Muda', '2014-08-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:13:28', '1');
INSERT INTO `pegawai` VALUES ('62', '197807052006041021', 'FAUDJI', '-', 'Singosari Malang Indonesia', '1978-07-05', 'Indonesia', '11', '2012-10-08', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:13:30', '1');
INSERT INTO `pegawai` VALUES ('63', '197808072011011009', 'REZA FIRMANSYAH BUDIONO', '-', 'Singosari Malang Indonesia', '1985-05-17', 'Indonesia', '9', '0000-00-00', 'Penyuluh Kehutanan', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:13:58', '1');
INSERT INTO `pegawai` VALUES ('64', '197912072000031001', 'MIFTA AGUG', '-', 'Singosari Malang Indonesia', '1979-12-07', 'Indonesia', '10', '2011-10-01', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:14:06', '1');
INSERT INTO `pegawai` VALUES ('65', '198101102005012012', 'AGUNG RAMADHAN', '-', 'Singosari Malang Indonesia', '1981-01-10', 'Indonesia', '11', '2013-04-16', 'Staf Sub Bagian Program ', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:14:13', '1');
INSERT INTO `pegawai` VALUES ('66', '198103302009031004', 'RISQI ARIS', '-', 'Singosari Malang Indonesia', '1981-03-30', 'Indonesia', '8', '2013-04-16', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:14:30', '1');
INSERT INTO `pegawai` VALUES ('67', '198104202010011015', 'PUNKY PRIYO', '-', 'Singosari Malang Indonesia', '1990-03-29', 'Indonesia', '8', '2014-03-13', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:14:50', '1');
INSERT INTO `pegawai` VALUES ('68', '198111062010011001', 'RICHARD', '-', 'Singosari Malang Indonesia', '1981-11-06', 'Indonesia', '6', '2014-03-13', 'Staff', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:49', '2015-11-03 10:15:21', '1');
INSERT INTO `pegawai` VALUES ('69', '198203202004012010', 'THOMAS', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '10', '2013-09-17', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:15:39', '1');
INSERT INTO `pegawai` VALUES ('70', '198204202009031007', 'IWAN', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '10', '2013-04-16', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:16:01', '1');
INSERT INTO `pegawai` VALUES ('71', '198207072006041010', 'PUTRI', '-', 'Singosari Malang Indonesia', '1982-07-13', 'Indonesia', '11', '2014-05-19', 'Penyuluh Kehutanan Muda', '2014-02-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:16:04', '1');
INSERT INTO `pegawai` VALUES ('72', '198401132006041006', 'SAMED', '-', 'Singosari Malang Indonesia', '1984-02-27', 'Indonesia', '9', '2013-10-01', 'Penyuluh Kehutanan Pelaksana Lanjutan', '2013-10-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:16:16', '1');
INSERT INTO `pegawai` VALUES ('73', '198405112011011007', 'FATTAH', '-', 'Singosari Malang Indonesia', '1984-05-19', 'Indonesia', '9', '2012-11-01', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:16:28', '1');
INSERT INTO `pegawai` VALUES ('74', '198406262010011028', 'ADITIYA NURYAN', '-', 'Singosari Malang Indonesia', '1999-05-29', 'Indonesia', '10', '2014-04-14', 'Penyuluh Kehutanan Pertama (III/b)', '2015-02-28', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:17:41', '1');
INSERT INTO `pegawai` VALUES ('75', '198704122011011009', 'ADITYA RAHMAN', '-', 'Singosari Malang Indonesia', '2011-05-27', 'Indonesia', '5', '2012-11-01', 'Penyuluh Kehutanan Pemula', '2012-11-01', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:17:54', '1');
INSERT INTO `pegawai` VALUES ('76', '198705222011011005', 'ok19', '-', 'Singosari Malang Indonesia', '2011-04-16', 'Indonesia', '5', '2012-10-30', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:17:56', '1');
INSERT INTO `pegawai` VALUES ('77', '199005212011011004', 'JOJO BENZOAT', '-', 'Singosari Malang Indonesia', '2010-12-31', 'Indonesia', '5', '2012-11-01', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:18:05', '1');
INSERT INTO `pegawai` VALUES ('78', '199006092011012002', 'SURYA RAMADHAN', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '5', '2012-10-30', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:18:26', '1');
INSERT INTO `pegawai` VALUES ('79', '199204082011012001', 'JORDI WISNU', '-', 'Singosari Malang Indonesia', '0000-00-00', 'Indonesia', '5', '2012-10-30', '-', '0000-00-00', '0', '0', '-', '0000-00-00', '0', 'UI', '0', 'S3', null, null, null, null, '2015-05-31 02:12:50', '2015-11-03 10:18:33', '1');

-- ----------------------------
-- Table structure for sc_config
-- ----------------------------
DROP TABLE IF EXISTS `sc_config`;
CREATE TABLE `sc_config` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Config_Key` varchar(255) NOT NULL,
  `Config_Table` varchar(50) DEFAULT NULL COMMENT 'jika join for meta value',
  `Config_Id` bigint(20) DEFAULT NULL COMMENT 'for id meta value',
  `Config_Value` longtext,
  `AutoLoad` char(1) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of sc_config
-- ----------------------------
INSERT INTO `sc_config` VALUES ('1', 'sc_front_url', '', '0', 'http://localhost/sapeltu_team/github/prg_sppd/', '0');
INSERT INTO `sc_config` VALUES ('2', 'sc_front_title', '', '0', 'SPPD', '0');
INSERT INTO `sc_config` VALUES ('3', 'sc_logo', '', '0', './uploaded/logo_header.jpg', '0');
INSERT INTO `sc_config` VALUES ('4', 'sc_header', '', '0', './uploaded/logo_header.jpg', '0');
INSERT INTO `sc_config` VALUES ('5', 'sc_admin', '', '0', '0000,0005', '0');
INSERT INTO `sc_config` VALUES ('6', 'sc_kepala_dinas', '', '0', '1958060519860811001', '0');
INSERT INTO `sc_config` VALUES ('7', 'sc_company', '', '0', 'Kantor Resmi', '0');

-- ----------------------------
-- Table structure for sc_config_log
-- ----------------------------
DROP TABLE IF EXISTS `sc_config_log`;
CREATE TABLE `sc_config_log` (
  `Id` bigint(11) NOT NULL AUTO_INCREMENT,
  `LogTable` varchar(20) NOT NULL,
  `LogWaktu` datetime DEFAULT NULL,
  `LogCrud` varchar(10) NOT NULL,
  `LogKeterangan` longtext,
  `LogIp` varchar(30) NOT NULL,
  `LogUserName` varchar(100) NOT NULL,
  `LogSQL` longtext NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_config_log
-- ----------------------------
INSERT INTO `sc_config_log` VALUES ('1', 'username', '2015-05-12 19:56:08', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-12 07:56:08\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('2', 'pegawai', '2015-05-12 20:59:26', 'insert', null, '::1', 'admin', 'INSERT INTO pegawai (nip,alamat,tanggal_lahir,tempat_lahir,golongan,golongan_tanggal,jabatan,jabatan_tanggal,kerja_tahun,kerja_bulan,latihan_jabatan,latihan_jabatan_tanggal,latihan_jabatan_jam,pendidikan,pendidikan_lulus,pendidikan_ijazah,catatan_mutasi,keterangan) VALUES (\'196012031989031005\',\'Singosari Malang\',\'1994-03-06\',\'Dili\',\'CEO\',\'2015-05-12\',\'Presiden\',\'2015-05-12\',\'2014\',\'20\',\'Rahasia\',\'2015-05-12\',\'10\',\'Jepang\',\'2015\',\'S3\',\'\',\'\')');
INSERT INTO `sc_config_log` VALUES ('3', 'pegawai', '2015-05-12 21:41:59', 'edit', null, '::1', 'admin', 'UPDATE pegawai  set nip = \'196012031989031005\' , nama = \'Mirza Ramadhany\' , alamat = \'Singosari Malang\' , tanggal_lahir = \'1994-03-06\' , tempat_lahir = \'Dili\' , golongan = \'CEO\' , golongan_tanggal = \'2015-05-12\' , jabatan = \'Presiden\' , jabatan_tanggal = \'2015-05-12\' , kerja_tahun = \'2014\' , kerja_bulan = \'20\' , latihan_jabatan = \'Rahasia\' , latihan_jabatan_tanggal = \'2015-05-12\' , latihan_jabatan_jam = \'10\' , pendidikan = \'Jepang\' , pendidikan_lulus = \'2015\' , pendidikan_ijazah = \'S3\' , catatan_mutasi = \'Muasi\' , keterangan = \'asdfasdf\' , username_update = \'admin\'  WHERE nip = \'196012031989031005\'');
INSERT INTO `sc_config_log` VALUES ('4', 'pegawai', '2015-05-12 21:42:08', 'delete', null, '::1', 'admin', 'DELETE FROM pegawai WHERE nip = \'196012031989031005\'');
INSERT INTO `sc_config_log` VALUES ('5', 'username', '2015-05-13 08:27:41', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-13 08:27:41\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('6', 'pegawai', '2015-05-13 08:30:44', 'insert', null, '::1', 'admin', 'INSERT INTO pegawai (nip,nama,alamat,tanggal_lahir,tempat_lahir,golongan,golongan_tanggal,jabatan,jabatan_tanggal,kerja_tahun,kerja_bulan,latihan_jabatan,latihan_jabatan_tanggal,latihan_jabatan_jam,pendidikan,pendidikan_lulus,pendidikan_ijazah,catatan_mutasi,keterangan,username) VALUES (\'10201010\',\'Mirza Ramadhany\',\'SIngosari Malang\',\'1994-03-06\',\'Dili\',\'Tinggi\',\'2015-05-13\',\'CEO\',\'2015-05-13\',\'100\',\'100\',\'a\',\'\',\'0\',\'UI\',\'2015\',\'S2\',\'\',\'\',\'admin\')');
INSERT INTO `sc_config_log` VALUES ('7', 'username', '2015-05-13 08:42:00', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-13 08:42:00\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('8', 'sppd', '2015-05-13 10:00:43', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_code,letter_subject,letter_about,letter_from,letter_content,letter_date,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'aa/sadfasd/asdff\',\'\',\'Undangan\',\'Kepala okokoko\',\'\',\'2015-05-13\',\'001/V/2015\',\'10201010\',\'10201010\',\'B\',\'10201010\',\'Rahasia dong\',\'Mobil Dinas\',\'Dili\',\'Maang\',\'5\',\'2015-05-13\',\'2015-05-20\',\'Rahsia ak rapaham\',\'APDB\',\'\',\'admin\',\'2015-05-13\')');
INSERT INTO `sc_config_log` VALUES ('9', 'sppd', '2015-05-13 10:03:42', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_code,letter_subject,letter_about,letter_from,letter_content,letter_date,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'asdfasdfadsf\',\'asdfadsfasdf\',\'asdfasdfas\',\'asdfasdf\',\'asdfasdf\',\'2015-05-13\',\'002/V/2015\',\'10201010\',\'10201010\',\'B\',\'10201010\',\'safasdf\',\'asdfasdf\',\'asdfasdf\',\'asdfasdf\',\'asdfasdf\',\'2015-05-13\',\'2015-05-13\',\'asdfasdf\',\'asdfadsfs\',\'asdfasdfasd\',\'admin\',\'2015-05-13\')');
INSERT INTO `sc_config_log` VALUES ('10', 'sppd', '2015-05-13 10:44:04', 'delete', null, '::1', 'admin', 'DELETE FROM sppd WHERE code = \'001/V/2015\'');
INSERT INTO `sc_config_log` VALUES ('11', 'sppd', '2015-05-13 10:54:24', 'edit', null, '::1', 'admin', 'UPDATE sppd  set letter_code = \'asdfasdfadsf\' , letter_subject = \'asdfadsfasdf\' , letter_about = \'asdfasdfas\' , letter_from = \'asdfasdf\' , letter_content = \'asdfasdf\' , letter_date = \'2015-05-13\' , code = \'002/V/2015\' , nip_pejabat = \'10201010\' , nip_leader = \'10201010\' , rate_travel = \'B\' , nip = \'10201010\' , purpose = \'safasdf\' , transport = \'asdfasdf\' , place_from = \'asdfasdf\' , place_to = \'asdfasdf\' , length_journey = \'10\' , date_go = \'2015-05-13\' , date_back = \'2015-05-13\' , government = \'asdfasdf\' , budget_from = \'asdfadsfs\' , description = \'asdfasdfasd\' , username_update = \'admin\'  WHERE code = \'002/V/2015\'');
INSERT INTO `sc_config_log` VALUES ('12', 'sppd', '2015-05-13 11:25:40', 'edit', null, '::1', 'admin', 'UPDATE sppd  set letter_code = \'asdfasdfadsf\' , letter_subject = \'asdfadsfasdf\' , letter_about = \'asdfasdfas\' , letter_from = \'asdfasdf\' , letter_content = \'asdfasdf\' , letter_date = \'2015-05-13\' , code = \'002/V/2015\' , nip_pejabat = \'10201010\' , nip_leader = \'10201010\' , rate_travel = \'B\' , nip = \'10201010\' , purpose = \'safasdf\' , transport = \'asdfasdf\' , place_from = \'asdfasdf\' , place_to = \'asdfasdf\' , length_journey = \'10\' , date_go = \'2015-05-13\' , date_back = \'2015-05-13\' , government = \'asdfasdf\' , budget_from = \'asdfadsfs\' , description = \'asdfasdfasd\' , username_update = \'admin\'  WHERE code = \'002/V/2015\'');
INSERT INTO `sc_config_log` VALUES ('13', 'username', '2015-05-13 12:16:59', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-13 12:16:59\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('14', 'username', '2015-05-13 13:16:39', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-13 01:16:39\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('15', 'username', '2015-05-13 13:18:39', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-13 01:18:39\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('16', 'username', '2015-05-13 19:13:44', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-13 07:13:44\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('17', 'username', '2015-05-13 19:25:45', 'insert', null, '::1', 'admin', 'INSERT INTO username (UserName,FullName,UserName_Target,Password) VALUES (\'rahasia\',\'Rahasia\',\'10201010\',\'a3f7403398f7176ff55b7358b4591a901a42bc040000\')');
INSERT INTO `sc_config_log` VALUES ('18', 'username', '2015-05-13 19:25:57', 'delete', null, '::1', 'admin', 'DELETE FROM username WHERE UserName = \'rahasia\'');
INSERT INTO `sc_config_log` VALUES ('19', 'username_level', '2015-05-13 19:27:49', 'insert', null, '::1', 'admin', 'INSERT INTO username_level (Kode,Keterangan,Isi) VALUES (\'0001\',\'User Entry SPPD\',\'fa32b931ace6321ce98805ecd7b60e04\')');
INSERT INTO `sc_config_log` VALUES ('20', 'username_level', '2015-05-13 19:28:02', 'insert', null, '::1', 'admin', 'INSERT INTO username_level (Kode,Keterangan,Isi) VALUES (\'0002\',\'User Entry Pegawai\',\'aa68e4bfdee71cf9beb81c54cd9f7259\')');
INSERT INTO `sc_config_log` VALUES ('21', 'username_level', '2015-05-13 19:28:25', 'insert', null, '::1', 'admin', 'INSERT INTO username_level (Kode,Keterangan,Isi) VALUES (\'0003\',\'Lihat Daftar SPPD\',\'7148512423c82bcdc7d008f56e9cf7cd\')');
INSERT INTO `sc_config_log` VALUES ('22', 'username_level', '2015-05-13 19:29:06', 'insert', null, '::1', 'admin', 'INSERT INTO username_level (Kode,Keterangan,Isi) VALUES (\'0004\',\'User Pegawai\',\'8435f2b7f35819153a8727da67b41606\')');
INSERT INTO `sc_config_log` VALUES ('23', 'username_level', '2015-05-13 19:29:30', 'insert', null, '::1', 'admin', 'INSERT INTO username_level (Kode,Keterangan,Isi) VALUES (\'0005\',\'Director\',\'2c2990da714a1c734afbaa058241daff,aa68e4bfdee71cf9beb81c54cd9f7259,fa32b931ace6321ce98805ecd7b60e04,7148512423c82bcdc7d008f56e9cf7cd\')');
INSERT INTO `sc_config_log` VALUES ('24', 'sc_config', '2015-05-13 19:29:38', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_front_url\' , Config_Value = \'http://localhost/project-premium/juni-2014/prg_procurement/\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_front_url\'');
INSERT INTO `sc_config_log` VALUES ('25', 'sc_config', '2015-05-13 19:29:38', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_front_title\' , Config_Value = \'SPPD\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_front_title\'');
INSERT INTO `sc_config_log` VALUES ('26', 'sc_config', '2015-05-13 19:29:38', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_admin\' , Config_Value = \'0000,0005\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_admin\'');
INSERT INTO `sc_config_log` VALUES ('27', 'sc_config', '2015-05-13 19:29:43', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_front_url\' , Config_Value = \'http://localhost/sapeltu_team/prg_sppd/\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_front_url\'');
INSERT INTO `sc_config_log` VALUES ('28', 'sc_config', '2015-05-13 19:29:43', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_front_title\' , Config_Value = \'SPPD\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_front_title\'');
INSERT INTO `sc_config_log` VALUES ('29', 'sc_config', '2015-05-13 19:29:43', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_admin\' , Config_Value = \'0000,0005\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_admin\'');
INSERT INTO `sc_config_log` VALUES ('30', 'username', '2015-05-13 19:30:20', 'edit', null, '::1', 'admin', 'UPDATE username  set UserName = \'admin\' , FullName = \'Administrator\' , UserName_Target = \'\' , Password = \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a0000\'  WHERE UserName = \'admin\'');
INSERT INTO `sc_config_log` VALUES ('31', 'sppd', '2015-05-13 20:04:52', 'edit', null, '::1', 'admin', 'UPDATE sppd  set result = \'okee siap\' , result_username_update = \'admin\'  WHERE code = \'002/V/2015\'');
INSERT INTO `sc_config_log` VALUES ('32', 'sppd', '2015-05-13 20:08:06', 'edit', null, '::1', 'admin', 'UPDATE sppd  set result = \'okee siap\' , result_username_update = \'admin\'  WHERE code = \'002/V/2015\'');
INSERT INTO `sc_config_log` VALUES ('33', 'sppd', '2015-05-13 20:28:08', 'edit', null, '::1', 'admin', 'UPDATE sppd  set result = \'okeee dieesadfasdfsf\' , status = \'2\' , result_date = \'2015-05-13\' , result_username = \'admin\'  WHERE code = \'002/V/2015\'');
INSERT INTO `sc_config_log` VALUES ('34', 'sppd', '2015-05-13 20:58:45', 'edit', null, '::1', 'admin', 'UPDATE sppd  set result = \'okeee dieesadfasdfsfasdfasd\' , status = \'2\' , result_username_update = \'admin\'  WHERE code = \'002/V/2015\'');
INSERT INTO `sc_config_log` VALUES ('35', 'username', '2015-05-13 22:00:49', 'edit', null, '::1', 'admin', 'UPDATE username  set FullName = \'Administrator\'  WHERE UserName = \'admin\'');
INSERT INTO `sc_config_log` VALUES ('36', 'username', '2015-05-13 22:00:54', 'edit', null, '::1', 'admin', 'UPDATE username  set FullName = \'Administratora\'  WHERE UserName = \'admin\'');
INSERT INTO `sc_config_log` VALUES ('37', 'username', '2015-05-13 22:01:02', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-13 10:01:02\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('38', 'username', '2015-05-13 22:19:07', 'insert', null, '::1', 'admin', 'INSERT INTO username (UserName,FullName,UserName_Target,Password) VALUES (\'entry-sppd\',\'entry-sppd\',\'196003271986032000\',\'92ce050ad171f6c57e383dcc0ac2b56fff99001e0001\')');
INSERT INTO `sc_config_log` VALUES ('39', 'username', '2015-05-13 22:19:29', 'insert', null, '::1', 'admin', 'INSERT INTO username (UserName,FullName,UserName_Target,Password) VALUES (\'entry-pegawai\',\'entry-pegawai\',\'196701271995022000\',\'dd7492a2e62b62449e99bb9137d5bcb2fc3fe6550002\')');
INSERT INTO `sc_config_log` VALUES ('40', 'username', '2015-05-13 22:19:49', 'insert', null, '::1', 'admin', 'INSERT INTO username (UserName,FullName,UserName_Target,Password) VALUES (\'view-sppd\',\'view-sppd\',\'\',\'0cfce60dc180df4d1709b5c34045361dc2c86a110003\')');
INSERT INTO `sc_config_log` VALUES ('41', 'username', '2015-05-13 22:20:15', 'insert', null, '::1', 'admin', 'INSERT INTO username (UserName,FullName,UserName_Target,Password) VALUES (\'sugeng\',\'sugeng\',\'197209172000031000\',\'dfc419800afed97e822056a5a70c7372efd915380004\')');
INSERT INTO `sc_config_log` VALUES ('42', 'username', '2015-05-13 22:20:32', 'insert', null, '::1', 'admin', 'INSERT INTO username (UserName,FullName,UserName_Target,Password) VALUES (\'director\',\'director\',\'196012031989031000\',\'f959c4c054adcd234433daaf5ae79b0d806028780005\')');
INSERT INTO `sc_config_log` VALUES ('43', 'username', '2015-05-21 11:10:58', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-21 11:10:58\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('44', 'sppd', '2015-05-21 11:11:47', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_code,letter_subject,letter_about,letter_from,letter_content,letter_date,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'asdf\',\'asdf\',\'asdf\',\'asdf\',\'\',\'2015-05-20\',\'003/V/2015\',\'196012031989031000\',\'196904261997031000\',\'B\',\'196012031989031000\',\'asdf\',\'asdf\',\'asdf\',\'asdf\',\'20\',\'2015-05-21\',\'2015-05-21\',\'2222\',\'a\',\'asf\',\'admin\',\'2015-05-21\')');
INSERT INTO `sc_config_log` VALUES ('45', 'username', '2015-05-25 09:23:13', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-25 09:23:13\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('46', 'username', '2015-05-30 16:17:25', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-30 04:17:25\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('47', 'sppd', '2015-05-30 16:20:29', 'edit', null, '::1', 'admin', 'UPDATE sppd  set letter_code = \'asdf\' , letter_subject = \'asdf\' , letter_about = \'asdf\' , letter_from = \'asdf\' , letter_content = \'\' , letter_date = \'2015-05-20\' , code = \'003/V/2015\' , nip_pejabat = \'196012031989031000\' , nip_leader = \'196904261997031000\' , rate_travel = \'B\' , nip = \'196012031989031000,196703081993032000\' , purpose = \'asdf\' , transport = \'asdf\' , place_from = \'asdf\' , place_to = \'asdf\' , length_journey = \'20\' , date_go = \'2015-05-21\' , date_back = \'2015-05-21\' , government = \'2222\' , budget_from = \'a\' , description = \'asf\' , username_update = \'admin\'  WHERE code = \'003/V/2015\'');
INSERT INTO `sc_config_log` VALUES ('48', 'pegawai', '2015-05-30 19:25:21', 'edit', null, '::1', 'admin', 'UPDATE pegawai  set nip = \'1958060519860811001\' , nama = \'Drh Silvinus Pello Sibabhoka MM\' , alamat = \'Ds. Muktiharjo RT 03 / RW 04 Margorejo - Pati\' , tanggal_lahir = \'1958-06-05\' , tempat_lahir = \'Detupau\' , golongan = \'IV / c\' , golongan_tanggal = \'2009-10-27\' , jabatan = \'Kepala Dinas\' , jabatan_tanggal = \'\' , kerja_tahun = \'0\' , kerja_bulan = \'0\' , latihan_jabatan = \'-\' , latihan_jabatan_tanggal = \'\' , latihan_jabatan_jam = \'0\' , pendidikan = \'-\' , pendidikan_lulus = \'0\' , pendidikan_ijazah = \'-\' , catatan_mutasi = \'\' , keterangan = \'\' , no_hp = \'081325653601\' , username_update = \'admin\'  WHERE nip = \'1958060519860811001\'');
INSERT INTO `sc_config_log` VALUES ('49', 'sppd', '2015-05-30 20:36:13', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_code,letter_subject,letter_about,letter_from,letter_content,letter_date,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'asdfsdf\',\'adsfsdf\',\'asdfsdf\',\'asdffs\',\'dsafsf\',\'2015-05-17\',\'001/V/2015\',\'1958060519860811001\',\'196412231994031001\',\'1\',\'196212301980031005,195905071990031004\',\'Rahsia\',\'Mobil DInas\',\'Malang\',\'Singosari\',\'1\',\'2015-05-30\',\'2015-05-30\',\'siaap\',\'Rupia\',\'sdfsdfsdf\',\'admin\',\'2015-05-30\')');
INSERT INTO `sc_config_log` VALUES ('50', 'username', '2015-05-31 08:55:27', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-05-31 08:55:27\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('51', 'sc_config', '2015-05-31 08:59:54', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_front_url\' , Config_Value = \'http://localhost/sapeltu_team/prg_sppd/\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_front_url\'');
INSERT INTO `sc_config_log` VALUES ('52', 'sc_config', '2015-05-31 08:59:54', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_front_title\' , Config_Value = \'SPPD\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_front_title\'');
INSERT INTO `sc_config_log` VALUES ('53', 'sc_config', '2015-05-31 08:59:55', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_admin\' , Config_Value = \'0000,0005\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_admin\'');
INSERT INTO `sc_config_log` VALUES ('54', 'sc_config', '2015-05-31 08:59:55', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_company\' , Config_Value = \'Kehutanan Dan perkebunan Kabupaten Patia\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_company\'');
INSERT INTO `sc_config_log` VALUES ('55', 'sc_config', '2015-05-31 08:59:55', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_kepala_dinas\' , Config_Value = \'1958060519860811001a\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_kepala_dinas\'');
INSERT INTO `sc_config_log` VALUES ('56', 'sc_config', '2015-05-31 09:00:02', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_front_url\' , Config_Value = \'http://localhost/sapeltu_team/prg_sppd/\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_front_url\'');
INSERT INTO `sc_config_log` VALUES ('57', 'sc_config', '2015-05-31 09:00:02', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_front_title\' , Config_Value = \'SPPD\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_front_title\'');
INSERT INTO `sc_config_log` VALUES ('58', 'sc_config', '2015-05-31 09:00:03', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_admin\' , Config_Value = \'0000,0005\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_admin\'');
INSERT INTO `sc_config_log` VALUES ('59', 'sc_config', '2015-05-31 09:00:03', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_company\' , Config_Value = \'Kehutanan Dan perkebunan Kabupaten Pati\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_company\'');
INSERT INTO `sc_config_log` VALUES ('60', 'sc_config', '2015-05-31 09:00:03', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_kepala_dinas\' , Config_Value = \'1958060519860811001\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_kepala_dinas\'');
INSERT INTO `sc_config_log` VALUES ('61', 'sppd', '2015-05-31 09:01:02', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_code,letter_subject,letter_about,letter_from,letter_content,letter_date,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'asdfadsf\',\'asdfasdf\',\'asdfsadfs\',\'asdfdsf\',\'asdfsafdsf\',\'2015-05-31\',\'002/V/2015\',\'196412231994031001\',\'197209172000031005\',\'V\',\'196003051987082001,196110302007011001\',\'okeee\',\'asdf\',\'asdf\',\'Malang\',\'1\',\'2015-05-31\',\'2015-05-31\',\'dfasf\',\'adfsf\',\'sdfasdf\',\'admin\',\'2015-05-31\')');
INSERT INTO `sc_config_log` VALUES ('62', 'sppd', '2015-05-31 09:03:34', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_code,letter_subject,letter_about,letter_from,letter_content,letter_date,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'asdf\',\'asdf\',\'asdfasdf\',\'asdfsf\',\'asdfsadf\',\'2015-05-31\',\'001/V/2015\',\'196212301980031005\',\'196212301980031005\',\'B\',\'196412231994031001\',\'asdff\',\'asdf\',\'asdf\',\'adsf\',\'1\',\'2015-05-31\',\'2015-05-31\',\'asdf\',\'asdf\',\'asdf\',\'admin\',\'2015-05-31\')');
INSERT INTO `sc_config_log` VALUES ('63', 'sppd', '2015-05-31 09:03:56', 'edit', null, '::1', 'admin', 'UPDATE sppd  set result = \'adfsdfsfsdf\' , status = \'2\' , result_date = \'2015-05-31\' , result_username = \'admin\'  WHERE code = \'001/V/2015\'');
INSERT INTO `sc_config_log` VALUES ('64', 'username', '2015-06-03 20:24:26', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-06-03 08:24:26\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('65', 'username', '2015-08-05 10:08:48', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-08-05 10:08:48\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('66', 'pegawai', '2015-08-05 11:01:20', 'edit', null, '::1', 'admin', 'UPDATE pegawai  set nip = \'195802281986012002\' , nama = \'Nur Wahyuni SP\' , alamat = \'Ds. Gembong RT 01 / RW 09 Gembong - Pati\' , tanggal_lahir = \'\' , tempat_lahir = \'Pati\' , golongan = \'1\' , golongan_tanggal = \'2011-04-05\' , jabatan = \'-\' , jabatan_tanggal = \'\' , kerja_tahun = \'0\' , kerja_bulan = \'0\' , latihan_jabatan = \'-\' , latihan_jabatan_tanggal = \'\' , latihan_jabatan_jam = \'0\' , pendidikan = \'-\' , pendidikan_lulus = \'0\' , pendidikan_ijazah = \'-\' , catatan_mutasi = \'\' , keterangan = \'\' , no_hp = \'-\' , username_update = \'admin\'  WHERE nip = \'195802281986012002\'');
INSERT INTO `sc_config_log` VALUES ('67', 'sppd', '2015-08-05 11:25:00', 'edit', null, '::1', 'admin', 'UPDATE sppd  set result = \'adfsdfsfsdf sadfasdf\r\nsadfasdf\' , status = \'2\' , result_username_update = \'admin\'  WHERE code = \'001/V/2015\'');
INSERT INTO `sc_config_log` VALUES ('68', 'username', '2015-08-20 10:07:35', 'edit', null, '36.85.69.151', 'admin', 'UPDATE username  set LastLogin = \'2015-08-20 10:07:35\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('69', 'username', '2015-08-20 10:08:30', 'edit', null, '36.85.69.151', 'admin', 'UPDATE username  set FullName = \'Administratora\' , Password = \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a0000\'  WHERE UserName = \'admin\'');
INSERT INTO `sc_config_log` VALUES ('70', 'username', '2015-08-20 10:08:40', 'edit', null, '36.85.69.151', 'admin', 'UPDATE username  set LastLogin = \'2015-08-20 10:08:40\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('71', 'username', '2015-08-20 10:12:06', 'edit', null, '114.124.32.130', 'admin', 'UPDATE username  set LastLogin = \'2015-08-20 10:12:06\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('72', 'username', '2015-08-20 12:03:37', 'edit', null, '36.80.158.108', 'admin', 'UPDATE username  set LastLogin = \'2015-08-20 12:03:37\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('73', 'sppd', '2015-08-20 12:15:38', 'insert', null, '36.80.158.108', 'admin', 'INSERT INTO sppd (letter_content,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'XXXXXX\',\'001/VIII/2015\',\'1958060519860811001\',\'197508102006041016\',\'C\',\'198405112011011007,198101102005012012\',\'Konsultasi dan koordinasi kegiatan Bidang kehutanan ke Dishutprov\',\'Kendaraan umum\',\'Pati\',\'semarang\',\'1\',\'2015-08-24\',\'2015-08-24\',\'Dishutbun\',\'Kegiatan Renja SKPD\',\'\',\'admin\',\'2015-08-20\')');
INSERT INTO `sc_config_log` VALUES ('74', 'username', '2015-08-20 12:58:18', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-08-20 12:58:18\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('75', 'username', '2015-08-20 18:40:03', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-08-20 06:40:03\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('76', 'username', '2015-09-03 10:20:39', 'edit', null, '36.82.13.100', 'admin', 'UPDATE username  set LastLogin = \'2015-09-03 10:20:39\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('77', 'username', '2015-09-03 10:21:31', 'edit', null, '36.74.143.14', 'admin', 'UPDATE username  set LastLogin = \'2015-09-03 10:21:31\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('78', 'username', '2015-09-28 11:15:01', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-09-28 11:15:01\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('79', 'username', '2015-10-28 10:19:07', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-10-28 10:19:06\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('80', 'username', '2015-10-29 11:39:14', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-10-29 11:39:14\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('81', 'sppd', '2015-10-29 12:05:06', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_content,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'asdfdsaf\',\'001-10-15/sppd/dishutbun\',\'197410182006011005\',\'196412231994031001\',\'2\',\'195905071990031004,195812291982122003\',\'sadfasdf\',\'asdfasdf\',\'asdfasdf\',\'asdfasdf\',\'1\',\'2015-10-29\',\'2015-10-29\',\'asdfsdf\',\'asdfasdf\',\'asdfasdf\',\'admin\',\'2015-10-29\')');
INSERT INTO `sc_config_log` VALUES ('82', 'sppd', '2015-10-29 12:06:27', 'edit', null, '::1', 'admin', 'UPDATE sppd  set letter_content = \'asdfdsafsdfsaff\' , code = \'001-10-15/sppd/dishutbun\' , nip_pejabat = \'197410182006011005\' , nip_leader = \'196412231994031001\' , rate_travel = \'2\' , nip = \'195905071990031004,195812291982122003\' , purpose = \'sadfasdf\' , transport = \'asdfasdf\' , place_from = \'asdfasdf\' , place_to = \'asdfasdf\' , length_journey = \'1\' , date_go = \'2015-10-29\' , date_back = \'2015-10-29\' , government = \'asdfsdf\' , budget_from = \'asdfasdf\' , description = \'asdfasdf\' , username_update = \'admin\'  WHERE code = \'001-10-15/sppd/dishutbun\'');
INSERT INTO `sc_config_log` VALUES ('83', 'sppd', '2015-10-29 12:08:50', 'edit', null, '::1', 'admin', 'UPDATE sppd  set letter_content = \'Dasar Surat\' , code = \'001-10-15/sppd/dishutbun\' , nip_pejabat = \'197410182006011005\' , nip_leader = \'196412231994031001\' , rate_travel = \'2\' , nip = \'195905071990031004,195812291982122003\' , purpose = \'Patikab\' , transport = \'Mobil\' , place_from = \'Demak\' , place_to = \'Malang\' , length_journey = \'1\' , date_go = \'2015-10-29\' , date_back = \'2015-10-29\' , government = \'Instatnsi\' , budget_from = \'Mata ANggarap\' , description = \'Keterangan Lain\' , username_update = \'admin\'  WHERE code = \'001-10-15/sppd/dishutbun\'');
INSERT INTO `sc_config_log` VALUES ('84', 'sppd', '2015-10-29 12:10:53', 'edit', null, '::1', 'admin', 'UPDATE sppd  set result = \'fsadfasdfasdfasdfasdfsadfasdfasdf\' , status = \'2\' , result_date = \'2015-10-29\' , result_username = \'admin\'  WHERE code = \'001-10-15/sppd/dishutbun\'');
INSERT INTO `sc_config_log` VALUES ('85', 'username', '2015-11-03 10:46:22', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-11-03 10:46:22\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('86', 'sc_config', '2015-11-03 10:47:33', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_front_url\' , Config_Value = \'http://localhost/sapeltu_team/github/prg_sppd/\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_front_url\'');
INSERT INTO `sc_config_log` VALUES ('87', 'sc_config', '2015-11-03 10:47:33', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_front_title\' , Config_Value = \'SPPD\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_front_title\'');
INSERT INTO `sc_config_log` VALUES ('88', 'sc_config', '2015-11-03 10:47:33', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_admin\' , Config_Value = \'0000,0005\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_admin\'');
INSERT INTO `sc_config_log` VALUES ('89', 'sc_config', '2015-11-03 10:47:33', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_company\' , Config_Value = \'Kantor Resmi\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_company\'');
INSERT INTO `sc_config_log` VALUES ('90', 'sc_config', '2015-11-03 10:47:34', 'edit', null, '::1', 'admin', 'UPDATE sc_config  set Config_Key = \'sc_kepala_dinas\' , Config_Value = \'1958060519860811001\' , Config_Table = \'\' , Config_Id = \'\'  WHERE Config_Key = \'sc_kepala_dinas\'');
INSERT INTO `sc_config_log` VALUES ('91', 'username', '2015-11-03 10:49:01', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-11-03 10:49:00\'  WHERE UserName = \'admin\' and Password like \'5ed0c2097c1351f2f7fa76574d5230c080fc1d6a%\'');
INSERT INTO `sc_config_log` VALUES ('92', 'username', '2015-11-03 10:49:59', 'edit', null, '::1', 'admin', 'UPDATE username  set FullName = \'Administratora\' , Password = \'7dfba1838d812a7f6eec71dea8763fc0099c98dc0000\' , Foto = \'./uploaded/profile/admin.jpg\'  WHERE UserName = \'admin\'');
INSERT INTO `sc_config_log` VALUES ('93', 'username', '2015-11-03 10:50:08', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-11-03 10:50:08\'  WHERE UserName = \'admin\' and Password like \'7dfba1838d812a7f6eec71dea8763fc0099c98dc%\'');
INSERT INTO `sc_config_log` VALUES ('94', 'username', '2015-11-03 10:50:26', 'edit', null, '::1', 'admin', 'UPDATE username  set FullName = \'Administratora\' , Password = \'f31d3f910287d46cda268706d774c6e8985f4e930000\'  WHERE UserName = \'admin\'');
INSERT INTO `sc_config_log` VALUES ('95', 'username', '2015-11-03 10:50:34', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-11-03 10:50:34\'  WHERE UserName = \'admin\' and Password like \'f31d3f910287d46cda268706d774c6e8985f4e93%\'');
INSERT INTO `sc_config_log` VALUES ('96', 'sppd', '2015-11-03 10:52:20', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_content,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'Berdasarkan surat\',\'001-11-15/sppd/dishutbun\',\'1958060519860811001\',\'196001011987091001\',\'S\',\'196702041998031003,195808281986011003\',\'Berkunjung ke Kantor Bupati\',\'Mobil\',\'Singosari\',\'Malang\',\'1\',\'2015-11-03\',\'2015-11-04\',\'Pemerintahan\',\'APBD\',\'Keterangan Lain\',\'admin\',\'2015-11-03\')');
INSERT INTO `sc_config_log` VALUES ('97', 'username', '2015-11-03 10:57:02', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-11-03 10:57:01\'  WHERE UserName = \'admin\' and Password like \'f31d3f910287d46cda268706d774c6e8985f4e93%\'');
INSERT INTO `sc_config_log` VALUES ('98', 'username', '2015-11-03 11:01:15', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-11-03 11:01:15\'  WHERE UserName = \'admin\' and Password like \'f31d3f910287d46cda268706d774c6e8985f4e93%\'');
INSERT INTO `sc_config_log` VALUES ('99', 'sppd', '2015-11-03 11:08:39', 'edit', null, '::1', 'admin', 'UPDATE sppd  set result = \'Pelaporan , Telah selesai .\r\nTerimakasih\' , status = \'2\' , result_date = \'2015-11-03\' , result_username = \'admin\'  WHERE code = \'001-11-15/sppd/creative\'');
INSERT INTO `sc_config_log` VALUES ('100', 'username', '2015-11-03 18:15:23', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-11-03 06:15:23\'  WHERE UserName = \'admin\' and Password like \'f31d3f910287d46cda268706d774c6e8985f4e93%\'');
INSERT INTO `sc_config_log` VALUES ('101', 'sppd', '2015-10-03 18:37:48', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_content,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'Dasar Surat\',\'001-10-15/sppd/creative\',\'195812241992111001\',\'1958060519860811001\',\'B\',\'196005271987081001,196004291990021002\',\'Bertemu dengan Presiden\',\'Pesawat\',\'Malang\',\'Jakarta\',\'10\',\'2015-10-03\',\'2015-10-13\',\'Instansi\',\'APBD\',\'Keterangan Lain\',\'admin\',\'2015-10-03\')');
INSERT INTO `sc_config_log` VALUES ('102', 'sppd', '2015-11-03 18:40:18', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_content,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'Dasar SUrat no xxx...\',\'002-11-15/sppd/creative\',\'196005271987081001\',\'196004291990021002\',\'S\',\'195807171980031014,1958060519860811001\',\'Maksud Perjalanan DInas\',\'Mobil\',\'Malang\',\'SIngosari\',\'1\',\'2015-11-03\',\'2015-11-04\',\'Tidak tahu\',\'Rupiah\',\'Keterangan\',\'admin\',\'2015-11-03\')');
INSERT INTO `sc_config_log` VALUES ('103', 'sppd', '2015-09-03 18:43:42', 'insert', null, '::1', 'admin', 'INSERT INTO sppd (letter_content,code,nip_pejabat,nip_leader,rate_travel,nip,purpose,transport,place_from,place_to,length_journey,date_go,date_back,government,budget_from,description,username,date) VALUES (\'Dasar Surat\',\'001-09-15/sppd/creative\',\'196001011987091001\',\'195811141986031005\',\'S\',\'196201182007011002\',\'Berkunjung ke Batu\',\'Sepeda Motor\',\'Singosari\',\'Batu\',\'1\',\'2015-09-03\',\'2015-09-04\',\'Pemda\',\'APBD\',\'\',\'admin\',\'2015-09-03\')');
INSERT INTO `sc_config_log` VALUES ('104', 'sppd', '2015-09-03 18:44:19', 'edit', null, '::1', 'admin', 'UPDATE sppd  set result = \'Sudah melaksanakan sambil meminum secangkir gelas kopi panas\' , status = \'2\' , result_date = \'2015-09-03\' , result_username = \'admin\'  WHERE code = \'001-09-15/sppd/creative\'');
INSERT INTO `sc_config_log` VALUES ('105', 'username', '2015-11-03 19:29:17', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-11-03 07:29:17\'  WHERE UserName = \'admin\' and Password like \'f31d3f910287d46cda268706d774c6e8985f4e93%\'');
INSERT INTO `sc_config_log` VALUES ('106', 'username', '2015-11-03 19:31:21', 'edit', null, '::1', 'admin', 'UPDATE username  set LastLogin = \'2015-11-03 07:31:21\'  WHERE UserName = \'admin\' and Password like \'f31d3f910287d46cda268706d774c6e8985f4e93%\'');

-- ----------------------------
-- Table structure for sc_kode
-- ----------------------------
DROP TABLE IF EXISTS `sc_kode`;
CREATE TABLE `sc_kode` (
  `Kode` varchar(20) NOT NULL DEFAULT '',
  `Data` bigint(11) DEFAULT NULL,
  PRIMARY KEY (`Kode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of sc_kode
-- ----------------------------
INSERT INTO `sc_kode` VALUES ('-09-15/sppd/creative', '1');
INSERT INTO `sc_kode` VALUES ('-10-15/sppd/creative', '1');
INSERT INTO `sc_kode` VALUES ('-11-15/sppd/creative', '2');

-- ----------------------------
-- Table structure for sc_master
-- ----------------------------
DROP TABLE IF EXISTS `sc_master`;
CREATE TABLE `sc_master` (
  `Id` bigint(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Stat` varchar(100) DEFAULT NULL,
  `OtherString` longtext,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of sc_master
-- ----------------------------
INSERT INTO `sc_master` VALUES ('1', 'Ia', 'Juru Muda', 'gol', null);
INSERT INTO `sc_master` VALUES ('2', 'Ib', 'Juru Muda Tk. I', 'gol', null);
INSERT INTO `sc_master` VALUES ('3', 'Ic', 'Juru', 'gol', null);
INSERT INTO `sc_master` VALUES ('4', 'Id', 'Juru Tk. I', 'gol', null);
INSERT INTO `sc_master` VALUES ('5', 'IIa', 'Pengatur Muda', 'gol', null);
INSERT INTO `sc_master` VALUES ('6', 'IIb', 'Pengatur Muda Tk. I', 'gol', null);
INSERT INTO `sc_master` VALUES ('7', 'IIc', 'Pengatur', 'gol', null);
INSERT INTO `sc_master` VALUES ('8', 'IId', 'Pengatur  Tk. I', 'gol', null);
INSERT INTO `sc_master` VALUES ('9', 'IIIa', 'Penata Muda', 'gol', null);
INSERT INTO `sc_master` VALUES ('10', 'IIIb', 'Penata Muda Tk. I', 'gol', null);
INSERT INTO `sc_master` VALUES ('11', 'IIIc', 'Penata', 'gol', null);
INSERT INTO `sc_master` VALUES ('12', 'IIId', 'Penata Tk. I', 'gol', null);
INSERT INTO `sc_master` VALUES ('13', 'IVa', 'Pembina', 'gol', null);
INSERT INTO `sc_master` VALUES ('14', 'IVb', 'Pembina Tk. I', 'gol', null);
INSERT INTO `sc_master` VALUES ('15', 'IVc', 'Pembina Utama Muda', 'gol', null);
INSERT INTO `sc_master` VALUES ('16', 'IVd', 'Pembina Utama Madya', 'gol', null);
INSERT INTO `sc_master` VALUES ('17', 'IVe', 'Pembina Utama', 'gol', null);

-- ----------------------------
-- Table structure for sppd
-- ----------------------------
DROP TABLE IF EXISTS `sppd`;
CREATE TABLE `sppd` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `letter_code` varchar(100) NOT NULL,
  `letter_subject` varchar(100) NOT NULL,
  `letter_about` varchar(100) NOT NULL,
  `letter_from` varchar(100) NOT NULL,
  `letter_content` text NOT NULL,
  `letter_date` date NOT NULL DEFAULT '0000-00-00',
  `code` varchar(30) NOT NULL,
  `date` date NOT NULL DEFAULT '0000-00-00',
  `nip_pejabat` varchar(100) NOT NULL,
  `nip_leader` varchar(100) NOT NULL,
  `rate_travel` varchar(100) NOT NULL,
  `nip` text NOT NULL,
  `purpose` text NOT NULL,
  `transport` varchar(255) NOT NULL,
  `place_from` varchar(100) NOT NULL,
  `place_to` varchar(100) NOT NULL,
  `length_journey` int(3) NOT NULL,
  `date_go` date NOT NULL DEFAULT '0000-00-00',
  `date_back` date NOT NULL DEFAULT '0000-00-00',
  `government` varchar(255) NOT NULL,
  `budget` double(16,2) NOT NULL DEFAULT '0.00',
  `budget_from` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `result_date` date NOT NULL,
  `result` text NOT NULL,
  `result_username` varchar(100) NOT NULL,
  `result_username_update` varchar(100) NOT NULL,
  `file` longtext NOT NULL,
  `file_update` longtext NOT NULL,
  `status` enum('0','1','2') NOT NULL DEFAULT '0' COMMENT '0 : diinput  1 : dicetak 2 : selesai',
  `username` varchar(100) NOT NULL,
  `username_update` varchar(100) NOT NULL,
  `datetime_insert` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `datetime_update` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `code` (`code`),
  KEY `nip_leader` (`nip_leader`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of sppd
-- ----------------------------
INSERT INTO `sppd` VALUES ('1', '', '', '', '', 'Berdasarkan surat', '0000-00-00', '001-11-15/sppd/creative', '2015-11-03', '1958060519860811001', '196001011987091001', 'S', '196702041998031003,195808281986011003', 'Berkunjung ke Kantor Bupati', 'Mobil', 'Singosari', 'Malang', '1', '2015-11-03', '2015-11-04', 'Pemerintahan', '0.00', 'APBD', 'Keterangan Lain', '2015-11-03', 'Pelaporan , Telah selesai .\r\nTerimakasih', 'admin', '', '', '', '2', 'admin', '', '2015-11-03 10:52:20', '2015-11-03 11:08:39');
INSERT INTO `sppd` VALUES ('2', '', '', '', '', 'Dasar Surat', '0000-00-00', '001-10-15/sppd/creative', '2015-10-03', '195812241992111001', '1958060519860811001', 'B', '196005271987081001,196004291990021002', 'Bertemu dengan Presiden', 'Pesawat', 'Malang', 'Jakarta', '10', '2015-10-03', '2015-10-13', 'Instansi', '0.00', 'APBD', 'Keterangan Lain', '0000-00-00', '', '', '', '', '', '1', 'admin', '', '2015-10-03 18:37:48', '2015-10-03 18:37:52');
INSERT INTO `sppd` VALUES ('3', '', '', '', '', 'Dasar SUrat no xxx...', '0000-00-00', '002-11-15/sppd/creative', '2015-11-03', '196005271987081001', '196004291990021002', 'S', '195807171980031014,1958060519860811001', 'Maksud Perjalanan DInas', 'Mobil', 'Malang', 'SIngosari', '1', '2015-11-03', '2015-11-04', 'Tidak tahu', '0.00', 'Rupiah', 'Keterangan', '0000-00-00', '', '', '', '', '', '1', 'admin', '', '2015-11-03 18:40:18', '2015-11-03 19:34:08');
INSERT INTO `sppd` VALUES ('4', '', '', '', '', 'Dasar Surat', '0000-00-00', '001-09-15/sppd/creative', '2015-09-03', '196001011987091001', '195811141986031005', 'S', '196201182007011002', 'Berkunjung ke Batu', 'Sepeda Motor', 'Singosari', 'Batu', '1', '2015-09-03', '2015-09-04', 'Pemda', '0.00', 'APBD', '', '2015-09-03', 'Sudah melaksanakan sambil meminum secangkir gelas kopi panas', 'admin', '', '', '', '2', 'admin', '', '2015-09-03 18:43:41', '2015-09-03 18:44:19');

-- ----------------------------
-- Table structure for username
-- ----------------------------
DROP TABLE IF EXISTS `username`;
CREATE TABLE `username` (
  `UserName` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `Stat` varchar(20) NOT NULL COMMENT 'editor,administrator,approval',
  `LastLogin` datetime NOT NULL,
  `UserName_Target` varchar(100) NOT NULL,
  `Foto` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  PRIMARY KEY (`UserName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of username
-- ----------------------------
INSERT INTO `username` VALUES ('admin', 'f31d3f910287d46cda268706d774c6e8985f4e930000', 'Administratora', '', '0000-00-00 00:00:00', '', './uploaded/profile/admin.jpg', '');
INSERT INTO `username` VALUES ('director', 'f959c4c054adcd234433daaf5ae79b0d806028780005', 'director', '', '0000-00-00 00:00:00', '196012031989031000', '', '');
INSERT INTO `username` VALUES ('entry-pegawai', 'dd7492a2e62b62449e99bb9137d5bcb2fc3fe6550002', 'entry-pegawai', '', '0000-00-00 00:00:00', '196701271995022000', '', '');
INSERT INTO `username` VALUES ('entry-sppd', '92ce050ad171f6c57e383dcc0ac2b56fff99001e0001', 'entry-sppd', '', '0000-00-00 00:00:00', '196003271986032000', '', '');
INSERT INTO `username` VALUES ('sugeng', 'dfc419800afed97e822056a5a70c7372efd915380004', 'sugeng', '', '0000-00-00 00:00:00', '197209172000031000', '', '');
INSERT INTO `username` VALUES ('view-sppd', '0cfce60dc180df4d1709b5c34045361dc2c86a110003', 'view-sppd', '', '0000-00-00 00:00:00', '', '', '');

-- ----------------------------
-- Table structure for username_level
-- ----------------------------
DROP TABLE IF EXISTS `username_level`;
CREATE TABLE `username_level` (
  `Kode` char(4) NOT NULL DEFAULT '',
  `Keterangan` varchar(30) DEFAULT NULL,
  `Isi` longtext,
  PRIMARY KEY (`Kode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of username_level
-- ----------------------------
INSERT INTO `username_level` VALUES ('0001', 'User Entry SPPD', 'fa32b931ace6321ce98805ecd7b60e04');
INSERT INTO `username_level` VALUES ('0002', 'User Entry Pegawai', 'aa68e4bfdee71cf9beb81c54cd9f7259');
INSERT INTO `username_level` VALUES ('0003', 'Lihat Daftar SPPD', '7148512423c82bcdc7d008f56e9cf7cd');
INSERT INTO `username_level` VALUES ('0004', 'User Pegawai', '8435f2b7f35819153a8727da67b41606');
INSERT INTO `username_level` VALUES ('0005', 'Director', '2c2990da714a1c734afbaa058241daff,aa68e4bfdee71cf9beb81c54cd9f7259,fa32b931ace6321ce98805ecd7b60e04,7148512423c82bcdc7d008f56e9cf7cd');
DROP TRIGGER IF EXISTS `oninsert_pegawai`;
DELIMITER ;;
CREATE TRIGGER `oninsert_pegawai` BEFORE INSERT ON `pegawai` FOR EACH ROW IF NEW.datetime_insert = '0000-00-00 00:00:00' THEN
 SET NEW.datetime_insert = CURRENT_TIMESTAMP() ;
END IF
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `oninsert_sppd`;
DELIMITER ;;
CREATE TRIGGER `oninsert_sppd` BEFORE INSERT ON `sppd` FOR EACH ROW IF NEW.datetime_insert = '0000-00-00 00:00:00' THEN
 SET NEW.datetime_insert = CURRENT_TIMESTAMP() ;
END IF
;;
DELIMITER ;
