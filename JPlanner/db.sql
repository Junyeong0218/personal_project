-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.6.5-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- personal_project 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `personal_project` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `personal_project`;

-- 테이블 personal_project.daily_tour_detail 구조 내보내기
CREATE TABLE IF NOT EXISTS `daily_tour_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `daily_tour_id` int(11) NOT NULL,
  `place_id` varchar(30) NOT NULL,
  `place_name` varchar(30) NOT NULL DEFAULT '',
  `place_address` varchar(100) NOT NULL,
  `coord_x` varchar(30) NOT NULL,
  `coord_y` varchar(30) NOT NULL,
  `index` int(11) NOT NULL,
  `start_datetime` datetime NOT NULL,
  `stay_time` varchar(9) NOT NULL DEFAULT '00:00:00',
  `reg_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_daily_tour_detail_daily_tour_mst` (`daily_tour_id`),
  CONSTRAINT `FK_daily_tour_detail_daily_tour_mst` FOREIGN KEY (`daily_tour_id`) REFERENCES `daily_tour_mst` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 personal_project.daily_tour_detail:~15 rows (대략적) 내보내기
DELETE FROM `daily_tour_detail`;
/*!40000 ALTER TABLE `daily_tour_detail` DISABLE KEYS */;
INSERT INTO `daily_tour_detail` (`id`, `daily_tour_id`, `place_id`, `place_name`, `place_address`, `coord_x`, `coord_y`, `index`, `start_datetime`, `stay_time`, `reg_date`, `update_date`, `deleted`, `deleted_datetime`) VALUES
	(1, 1, '21161069', '서면역 부산2호선', '부산광역시 부산진구 중앙대로 지하 730', '129.058305923709', '35.157645977096', 0, '2022-03-17 20:00:00', '01:00:00', '2022-03-18 17:00:01', '2022-03-21 10:23:05', 0, NULL),
	(2, 1, '21160893', '전포역 부산2호선', '부산광역시 부산진구 전포대로 지하 181', '129.06538457863', '35.1530881426641', 1, '2022-03-17 21:07:00', '02:00:00', '2022-03-18 17:02:22', '2022-03-21 10:23:05', 0, NULL),
	(3, 1, '21160475', '국제금융센터.부산은행역 부산2호선', '부산광역시 남구 전포대로 지하 97', '129.066743786541', '35.1459205441501', 2, '2022-03-17 23:12:00', '00:00:00', '2022-03-18 17:05:45', '2022-03-21 10:23:05', 0, NULL),
	(4, 2, '21160475', '국제금융센터.부산은행역 부산2호선', '부산광역시 남구 전포대로 지하 97', '129.066743786541', '35.1459205441501', 0, '2022-03-18 09:00:00', '01:00:00', '2022-03-18 17:06:29', '2022-03-21 10:23:05', 0, NULL),
	(5, 2, '21161075', '해운대역 부산2호선', '부산광역시 해운대구 해운대로 지하 626', '129.158897240251', '35.1636479638612', 1, '2022-03-18 10:58:00', '00:00:00', '2022-03-18 17:07:54', '2022-03-21 10:23:05', 0, NULL),
	(6, 3, '21161069', '서면역 부산2호선', '부산광역시 부산진구 중앙대로 지하 730', '129.058305923709', '35.157645977096', 0, '2022-03-17 18:00:00', '00:15:00', '2022-03-21 16:00:15', '2022-03-21 17:02:15', 0, NULL),
	(7, 3, '8444560', '연지동주민센터', '부산광역시 부산진구 국악로 30', '129.052840043383', '35.1727845612719', 3, '2022-03-17 19:39:00', '00:00:00', '2022-03-21 16:00:15', '2022-03-21 17:02:15', 0, NULL),
	(8, 4, '8444560', '연지동주민센터', '부산광역시 부산진구 국악로 30', '129.052840043383', '35.1727845612719', 0, '2022-03-18 11:00:00', '00:20:00', '2022-03-21 16:00:15', '2022-03-21 17:02:15', 0, NULL),
	(14, 4, '17111177', '가야벽산아파트', '부산광역시 부산진구 엄광로 68', '129.02536368821023', '35.14662315553775', 2, '2022-03-18 12:31:00', '00:00:00', '2022-03-21 16:06:17', '2022-03-21 17:02:15', 0, NULL),
	(20, 3, '21160475', '국제금융센터.부산은행역 부산2호선', '부산광역시 남구 전포대로 지하 97', '129.066743786541', '35.1459205441501', 1, '2022-03-17 18:45:00', '00:10:00', '2022-03-21 17:02:15', '2022-03-21 17:02:15', 0, NULL),
	(21, 3, '21160893', '전포역 부산2호선', '부산광역시 부산진구 전포대로 지하 181', '129.06538457863', '35.1530881426641', 2, '2022-03-17 19:10:00', '00:15:00', '2022-03-21 17:02:15', '2022-03-21 17:02:15', 0, NULL),
	(22, 4, '21160880', '사상역 부산2호선', '부산광역시 사상구 사상로 지하 203', '128.984408359544', '35.1626895550862', 1, '2022-03-18 11:59:00', '00:10:00', '2022-03-21 17:02:15', '2022-03-21 17:02:15', 0, NULL),
	(23, 8, '21161069', '서면역 부산2호선', '부산광역시 부산진구 중앙대로 지하 730', '129.058305923709', '35.157645977096', 0, '2022-03-25 13:00:00', '00:10:00', '2022-03-25 12:55:28', '2022-03-25 13:10:20', 0, NULL),
	(24, 8, '21160893', '전포역 부산2호선', '부산광역시 부산진구 전포대로 지하 181', '129.06538457863', '35.1530881426641', 1, '2022-03-25 13:21:00', '00:15:00', '2022-03-25 12:55:28', '2022-03-25 13:10:20', 0, NULL),
	(25, 8, '8444560', '연지동주민센터', '부산광역시 부산진구 국악로 30', '129.052840043383', '35.1727845612719', 2, '2022-03-25 13:49:00', '00:00:00', '2022-03-25 13:10:20', '2022-03-25 13:10:20', 0, NULL);
/*!40000 ALTER TABLE `daily_tour_detail` ENABLE KEYS */;

-- 테이블 personal_project.daily_tour_mst 구조 내보내기
CREATE TABLE IF NOT EXISTS `daily_tour_mst` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(30) NOT NULL,
  `description` varchar(60) DEFAULT NULL,
  `search_priority` varchar(9) NOT NULL DEFAULT 'RECOMMEND',
  `start_datetime` datetime NOT NULL,
  `arrive_datetime` datetime NOT NULL,
  `reg_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_daily_tour_mst_schedule` (`schedule_id`),
  CONSTRAINT `FK_daily_tour_mst_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 personal_project.daily_tour_mst:~5 rows (대략적) 내보내기
DELETE FROM `daily_tour_mst`;
/*!40000 ALTER TABLE `daily_tour_mst` DISABLE KEYS */;
INSERT INTO `daily_tour_mst` (`id`, `schedule_id`, `title`, `description`, `search_priority`, `start_datetime`, `arrive_datetime`, `reg_date`, `update_date`, `deleted`, `deleted_date`) VALUES
	(1, 67, '1일차', '1일차', 'RECOMMEND', '2022-03-17 20:00:00', '2022-03-17 23:12:00', '2022-03-17 21:07:20', '2022-03-21 10:22:38', 0, NULL),
	(2, 67, '2일차', '2일차', 'DISTANCE', '2022-03-18 09:00:00', '2022-03-18 10:58:00', '2022-03-17 21:08:31', '2022-03-21 10:18:12', 0, NULL),
	(3, 63, '1일차', '1일차', 'RECOMMEND', '2022-03-17 18:00:00', '2022-03-17 19:39:00', '2022-03-21 16:00:15', '2022-03-21 17:02:15', 0, NULL),
	(4, 63, '2일차', '2일차', 'RECOMMEND', '2022-03-18 11:00:00', '2022-03-18 12:31:00', '2022-03-21 16:00:15', '2022-03-21 17:02:15', 0, NULL),
	(8, 70, '1일차', '1일차', 'RECOMMEND', '2022-03-25 13:00:00', '2022-03-25 13:49:00', '2022-03-25 12:55:28', '2022-03-25 13:05:40', 0, NULL);
/*!40000 ALTER TABLE `daily_tour_mst` ENABLE KEYS */;

-- 테이블 personal_project.db_log 구조 내보내기
CREATE TABLE IF NOT EXISTS `db_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `log_datetime` datetime NOT NULL,
  `log_text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=368 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 personal_project.db_log:~295 rows (대략적) 내보내기
DELETE FROM `db_log`;
/*!40000 ALTER TABLE `db_log` DISABLE KEYS */;
INSERT INTO `db_log` (`id`, `username`, `log_datetime`, `log_text`) VALUES
	(42, 'hippo2003', '2022-02-02 00:05:51', 'Update UserInfo Attempt'),
	(43, 'hippo2003', '2022-02-02 00:05:51', 'Updated UserInfo user_id = 7'),
	(44, 'hippo2003', '2022-02-02 20:57:09', 'Insert Schedule Attempt'),
	(45, 'hippo2003', '2022-02-02 20:57:09', 'Inserted Schedule Id = 35'),
	(46, 'hippo2003', '2022-02-03 14:55:58', 'Insert Schedule Attempt'),
	(47, 'hippo2003', '2022-02-03 14:55:58', 'Inserted Schedule Id = 36'),
	(48, 'hippo2003', '2022-02-03 14:59:55', 'Update Schedule Attempt'),
	(49, 'hippo2003', '2022-02-03 14:59:55', 'Deleted Schedule schedule_id = 28'),
	(50, 'hippo2003', '2022-02-09 14:08:23', 'Update UserInfo Attempt'),
	(51, 'hippo2003', '2022-02-09 14:08:23', 'Updated UserInfo user_id = 7'),
	(52, 'hippo2003', '2022-03-12 12:10:32', 'Insert Schedule Attempt'),
	(53, 'hippo2003', '2022-03-12 12:10:32', 'Inserted Schedule Id = 37'),
	(54, 'hippo2003', '2022-03-12 12:10:42', 'Update Schedule Attempt'),
	(55, 'hippo2003', '2022-03-12 12:10:42', 'Updated Schedule schedule_id = 37'),
	(56, 'hippo2003', '2022-03-13 10:13:25', 'Insert Schedule Attempt'),
	(57, 'hippo2003', '2022-03-13 10:13:25', 'Inserted Schedule Id = 38'),
	(58, 'hippo2003', '2022-03-13 10:13:43', 'Insert Schedule Attempt'),
	(59, 'hippo2003', '2022-03-13 10:13:43', 'Inserted Schedule Id = 39'),
	(60, 'hippo2003', '2022-03-15 09:13:14', 'Insert Schedule Attempt'),
	(61, 'hippo2003', '2022-03-15 09:13:14', 'Inserted Schedule Id = 40'),
	(62, 'hippo2003', '2022-03-16 12:38:15', 'Insert Schedule Attempt'),
	(63, 'hippo2003', '2022-03-16 12:38:15', 'Inserted Schedule Id = 41'),
	(64, 'hippo2003', '2022-03-17 09:44:30', 'Insert Schedule Attempt'),
	(65, 'hippo2003', '2022-03-17 09:44:30', 'Inserted Schedule Id = 42'),
	(66, 'hippo2003', '2022-03-17 09:45:57', 'Insert Schedule Attempt'),
	(67, 'hippo2003', '2022-03-17 09:45:57', 'Inserted Schedule Id = 43'),
	(68, 'hippo2003', '2022-03-17 09:46:25', 'Insert Schedule Attempt'),
	(69, 'hippo2003', '2022-03-17 09:46:25', 'Inserted Schedule Id = 44'),
	(70, 'hippo2003', '2022-03-17 09:47:55', 'Insert Schedule Attempt'),
	(71, 'hippo2003', '2022-03-17 09:47:55', 'Inserted Schedule Id = 45'),
	(72, 'hippo2003', '2022-03-17 09:48:03', 'Insert Schedule Attempt'),
	(73, 'hippo2003', '2022-03-17 09:48:03', 'Inserted Schedule Id = 46'),
	(74, 'hippo2003', '2022-03-17 09:51:25', 'Update Schedule Attempt'),
	(75, 'hippo2003', '2022-03-17 09:51:25', 'Deleted Schedule schedule_id = 46'),
	(76, 'hippo2003', '2022-03-17 09:51:27', 'Update Schedule Attempt'),
	(77, 'hippo2003', '2022-03-17 09:51:27', 'Deleted Schedule schedule_id = 45'),
	(78, 'hippo2003', '2022-03-17 09:51:37', 'Insert Schedule Attempt'),
	(79, 'hippo2003', '2022-03-17 09:51:37', 'Inserted Schedule Id = 47'),
	(80, 'hippo2003', '2022-03-17 10:00:08', 'Insert Schedule Attempt'),
	(81, 'hippo2003', '2022-03-17 10:00:08', 'Inserted Schedule Id = 48'),
	(82, 'hippo2003', '2022-03-17 10:00:42', 'Update Schedule Attempt'),
	(83, 'hippo2003', '2022-03-17 10:00:42', 'Deleted Schedule schedule_id = 48'),
	(84, 'hippo2003', '2022-03-17 10:00:43', 'Update Schedule Attempt'),
	(85, 'hippo2003', '2022-03-17 10:00:43', 'Deleted Schedule schedule_id = 47'),
	(86, 'hippo2003', '2022-03-17 10:00:56', 'Insert Schedule Attempt'),
	(87, 'hippo2003', '2022-03-17 10:00:56', 'Inserted Schedule Id = 49'),
	(88, 'hippo2003', '2022-03-17 10:01:49', 'Insert Schedule Attempt'),
	(89, 'hippo2003', '2022-03-17 10:01:49', 'Inserted Schedule Id = 50'),
	(90, 'hippo2003', '2022-03-17 10:04:40', 'Update Schedule Attempt'),
	(91, 'hippo2003', '2022-03-17 10:04:40', 'Deleted Schedule schedule_id = 50'),
	(92, 'hippo2003', '2022-03-17 10:04:42', 'Update Schedule Attempt'),
	(93, 'hippo2003', '2022-03-17 10:04:42', 'Deleted Schedule schedule_id = 49'),
	(94, 'hippo2003', '2022-03-17 10:04:48', 'Insert Schedule Attempt'),
	(95, 'hippo2003', '2022-03-17 10:04:48', 'Inserted Schedule Id = 51'),
	(96, 'hippo2003', '2022-03-17 10:05:00', 'Insert Schedule Attempt'),
	(97, 'hippo2003', '2022-03-17 10:05:00', 'Inserted Schedule Id = 52'),
	(98, 'hippo2003', '2022-03-17 10:09:20', 'Update Schedule Attempt'),
	(99, 'hippo2003', '2022-03-17 10:09:20', 'Deleted Schedule schedule_id = 52'),
	(100, 'hippo2003', '2022-03-17 10:09:22', 'Update Schedule Attempt'),
	(101, 'hippo2003', '2022-03-17 10:09:22', 'Deleted Schedule schedule_id = 51'),
	(102, 'hippo2003', '2022-03-17 10:09:31', 'Insert Schedule Attempt'),
	(103, 'hippo2003', '2022-03-17 10:09:31', 'Inserted Schedule Id = 53'),
	(104, 'hippo2003', '2022-03-17 10:10:14', 'Insert Schedule Attempt'),
	(105, 'hippo2003', '2022-03-17 10:10:14', 'Inserted Schedule Id = 54'),
	(106, 'hippo2003', '2022-03-17 10:11:12', 'Update Schedule Attempt'),
	(107, 'hippo2003', '2022-03-17 10:11:12', 'Deleted Schedule schedule_id = 54'),
	(108, 'hippo2003', '2022-03-17 10:11:13', 'Update Schedule Attempt'),
	(109, 'hippo2003', '2022-03-17 10:11:13', 'Deleted Schedule schedule_id = 53'),
	(110, 'hippo2003', '2022-03-17 10:11:14', 'Update Schedule Attempt'),
	(111, 'hippo2003', '2022-03-17 10:11:14', 'Deleted Schedule schedule_id = 44'),
	(112, 'hippo2003', '2022-03-17 10:11:16', 'Update Schedule Attempt'),
	(113, 'hippo2003', '2022-03-17 10:11:16', 'Deleted Schedule schedule_id = 43'),
	(114, 'hippo2003', '2022-03-17 10:11:22', 'Insert Schedule Attempt'),
	(115, 'hippo2003', '2022-03-17 10:11:22', 'Inserted Schedule Id = 55'),
	(116, 'hippo2003', '2022-03-17 10:12:04', 'Insert Schedule Attempt'),
	(117, 'hippo2003', '2022-03-17 10:12:04', 'Inserted Schedule Id = 56'),
	(118, 'hippo2003', '2022-03-17 10:13:54', 'Insert Schedule Attempt'),
	(119, 'hippo2003', '2022-03-17 10:13:54', 'Inserted Schedule Id = 57'),
	(120, 'hippo2003', '2022-03-17 10:15:44', 'Insert Schedule Attempt'),
	(121, 'hippo2003', '2022-03-17 10:15:44', 'Inserted Schedule Id = 58'),
	(122, 'hippo2003', '2022-03-17 10:16:00', 'Update Schedule Attempt'),
	(123, 'hippo2003', '2022-03-17 10:16:00', 'Deleted Schedule schedule_id = 58'),
	(124, 'hippo2003', '2022-03-17 10:16:02', 'Update Schedule Attempt'),
	(125, 'hippo2003', '2022-03-17 10:16:02', 'Deleted Schedule schedule_id = 57'),
	(126, 'hippo2003', '2022-03-17 10:16:04', 'Update Schedule Attempt'),
	(127, 'hippo2003', '2022-03-17 10:16:04', 'Deleted Schedule schedule_id = 56'),
	(128, 'hippo2003', '2022-03-17 10:16:05', 'Update Schedule Attempt'),
	(129, 'hippo2003', '2022-03-17 10:16:05', 'Deleted Schedule schedule_id = 55'),
	(130, 'hippo2003', '2022-03-17 10:16:11', 'Insert Schedule Attempt'),
	(131, 'hippo2003', '2022-03-17 10:16:11', 'Inserted Schedule Id = 59'),
	(132, 'hippo2003', '2022-03-17 10:20:53', 'Insert Schedule Attempt'),
	(133, 'hippo2003', '2022-03-17 10:20:53', 'Inserted Schedule Id = 60'),
	(134, 'hippo2003', '2022-03-17 10:24:00', 'Insert Schedule Attempt'),
	(135, 'hippo2003', '2022-03-17 10:24:00', 'Inserted Schedule Id = 61'),
	(136, 'hippo2003', '2022-03-17 13:00:04', 'Insert Schedule Attempt'),
	(137, 'hippo2003', '2022-03-17 13:00:04', 'Inserted Schedule Id = 62'),
	(138, 'hippo2003', '2022-03-17 17:54:18', 'Update Schedule Attempt'),
	(139, 'hippo2003', '2022-03-17 17:54:18', 'Deleted Schedule schedule_id = 62'),
	(140, 'hippo2003', '2022-03-17 17:54:19', 'Update Schedule Attempt'),
	(141, 'hippo2003', '2022-03-17 17:54:19', 'Deleted Schedule schedule_id = 59'),
	(142, 'hippo2003', '2022-03-17 17:54:21', 'Update Schedule Attempt'),
	(143, 'hippo2003', '2022-03-17 17:54:21', 'Deleted Schedule schedule_id = 61'),
	(144, 'hippo2003', '2022-03-17 17:54:23', 'Update Schedule Attempt'),
	(145, 'hippo2003', '2022-03-17 17:54:23', 'Deleted Schedule schedule_id = 60'),
	(146, 'hippo2003', '2022-03-17 17:54:40', 'Insert Schedule Attempt'),
	(147, 'hippo2003', '2022-03-17 17:54:40', 'Inserted Schedule Id = 63'),
	(148, 'hippo2003', '2022-03-17 18:47:11', 'Insert Schedule Attempt'),
	(149, 'hippo2003', '2022-03-17 18:47:11', 'Inserted Schedule Id = 64'),
	(150, 'hippo2003', '2022-03-17 18:51:13', 'Insert Schedule Attempt'),
	(151, 'hippo2003', '2022-03-17 18:51:13', 'Inserted Schedule Id = 65'),
	(152, 'hippo2003', '2022-03-17 18:51:26', 'Update Schedule Attempt'),
	(153, 'hippo2003', '2022-03-17 18:51:26', 'Updated Schedule schedule_id = 65'),
	(154, 'hippo2003', '2022-03-17 18:51:40', 'Update Schedule Attempt'),
	(155, 'hippo2003', '2022-03-17 18:51:40', 'Updated Schedule schedule_id = 64'),
	(156, 'hippo2003', '2022-03-17 18:58:10', 'Update Schedule Attempt'),
	(157, 'hippo2003', '2022-03-17 18:58:10', 'Updated Schedule schedule_id = 64'),
	(158, 'hippo2003', '2022-03-17 18:58:17', 'Update Schedule Attempt'),
	(159, 'hippo2003', '2022-03-17 18:58:17', 'Updated Schedule schedule_id = 65'),
	(160, 'hippo2003', '2022-03-17 19:46:53', 'Insert Schedule Attempt'),
	(161, 'hippo2003', '2022-03-17 19:46:53', 'Inserted Schedule Id = 66'),
	(162, 'hippo2003', '2022-03-17 19:48:20', 'Insert Schedule Attempt'),
	(163, 'hippo2003', '2022-03-17 19:48:20', 'Inserted Schedule Id = 67'),
	(164, 'hippo2003', '2022-03-17 19:51:06', 'Update Schedule Attempt'),
	(165, 'hippo2003', '2022-03-17 19:51:06', 'Updated Schedule schedule_id = 67'),
	(166, 'hippo2003', '2022-03-17 19:51:54', 'Update Schedule Attempt'),
	(167, 'hippo2003', '2022-03-17 19:51:54', 'Updated Schedule schedule_id = 67'),
	(168, 'hippo2003', '2022-03-17 19:54:03', 'Update Schedule Attempt'),
	(169, 'hippo2003', '2022-03-17 19:54:03', 'Updated Schedule schedule_id = 67'),
	(170, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(171, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 1'),
	(172, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(173, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 2'),
	(174, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(175, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 3'),
	(176, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(177, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 4'),
	(178, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(179, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 5'),
	(180, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(181, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 6'),
	(182, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(183, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 7'),
	(184, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(185, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 8'),
	(186, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(187, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 9'),
	(188, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(189, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 10'),
	(190, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(191, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 11'),
	(192, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(193, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 12'),
	(194, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(195, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 13'),
	(196, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(197, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 14'),
	(198, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(199, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 15'),
	(200, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(201, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 16'),
	(202, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(203, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 17'),
	(204, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(205, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 18'),
	(206, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(207, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 19'),
	(208, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(209, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 20'),
	(210, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(211, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 21'),
	(212, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(213, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 22'),
	(214, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(215, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 23'),
	(216, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(217, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 24'),
	(218, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(219, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 25'),
	(220, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(221, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 26'),
	(222, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(223, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 27'),
	(224, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(225, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 28'),
	(226, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(227, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 29'),
	(228, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(229, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 30'),
	(230, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(231, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 31'),
	(232, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(233, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 32'),
	(234, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(235, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 33'),
	(236, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(237, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 34'),
	(238, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(239, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 35'),
	(240, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(241, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 36'),
	(242, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(243, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 37'),
	(244, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(245, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 38'),
	(246, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(247, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 39'),
	(248, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(249, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 40'),
	(250, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(251, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 41'),
	(252, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(253, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 42'),
	(254, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(255, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 43'),
	(256, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(257, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 44'),
	(258, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(259, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 45'),
	(260, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(261, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 46'),
	(262, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(263, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 47'),
	(264, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(265, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 48'),
	(266, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(267, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 49'),
	(268, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(269, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 50'),
	(270, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(271, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 51'),
	(272, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(273, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 52'),
	(274, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(275, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 53'),
	(276, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(277, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 54'),
	(278, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(279, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 55'),
	(280, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(281, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 56'),
	(282, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(283, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 57'),
	(284, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(285, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 58'),
	(286, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(287, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 59'),
	(288, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(289, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 60'),
	(290, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(291, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 61'),
	(292, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(293, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 62'),
	(294, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(295, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 63'),
	(296, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(297, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 64'),
	(298, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(299, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 65'),
	(300, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(301, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 66'),
	(302, 'hippo2003', '2022-03-21 10:34:03', 'Update Schedule Attempt'),
	(303, 'hippo2003', '2022-03-21 10:34:03', 'Updated Schedule schedule_id = 67'),
	(304, 'hippo2003', '2022-03-21 10:34:26', 'Update Schedule Attempt'),
	(305, 'hippo2003', '2022-03-21 10:34:26', 'Updated Schedule schedule_id = 67'),
	(306, 'hippo2003', '2022-03-21 10:44:01', 'Update Schedule Attempt'),
	(307, 'hippo2003', '2022-03-21 10:44:01', 'Updated Schedule schedule_id = 63'),
	(308, 'hippo2003', '2022-03-21 10:46:44', 'Update Schedule Attempt'),
	(309, 'hippo2003', '2022-03-21 10:46:44', 'Updated Schedule schedule_id = 63'),
	(310, 'hippo2003', '2022-03-21 10:46:44', 'Update Schedule Attempt'),
	(311, 'hippo2003', '2022-03-21 10:46:44', 'Update Schedule Attempt'),
	(312, 'hippo2003', '2022-03-21 10:46:44', 'Updated Schedule schedule_id = 63'),
	(313, 'hippo2003', '2022-03-21 10:46:44', 'Updated Schedule schedule_id = 67'),
	(314, 'hippo2003', '2022-03-21 10:48:09', 'Update Schedule Attempt'),
	(315, 'hippo2003', '2022-03-21 10:48:09', 'Updated Schedule schedule_id = 67'),
	(316, 'hippo2003', '2022-03-21 10:51:50', 'Update Schedule Attempt'),
	(317, 'hippo2003', '2022-03-21 10:51:50', 'Updated Schedule schedule_id = 63'),
	(318, 'hippo2003', '2022-03-21 10:55:23', 'Update Schedule Attempt'),
	(319, 'hippo2003', '2022-03-21 10:55:23', 'Updated Schedule schedule_id = 63'),
	(320, 'hippo2003', '2022-03-21 11:22:28', 'Update Schedule Attempt'),
	(321, 'hippo2003', '2022-03-21 11:22:28', 'Updated Schedule schedule_id = 63'),
	(322, 'hippo2003', '2022-03-24 10:08:33', 'Update UserInfo Attempt'),
	(323, 'hippo2003', '2022-03-24 10:08:33', 'Updated UserInfo user_id = 7'),
	(324, 'hippo2003', '2022-03-24 10:10:30', 'Update UserInfo Attempt'),
	(325, 'hippo2003', '2022-03-24 10:10:30', 'Updated UserInfo user_id = 7'),
	(326, 'hippo2003', '2022-03-24 10:11:27', 'Update UserInfo Attempt'),
	(327, 'hippo2003', '2022-03-24 10:11:27', 'Updated UserInfo user_id = 7'),
	(328, 'hippo2007', '2022-03-24 10:24:15', 'Signed up 22/hippo2007/a4s5d6!@/박준영/1/ㅁㄴㅇㄹㄴㅁㅇㄹ/2022-03-24 10:24:15'),
	(329, 'hippo2008', '2022-03-24 10:51:21', 'Signed up 23/hippo2008/a4s5d6!@/박준영/1/ㅁㄴㅇㄻㄴㅇㄹ/2022-03-24 10:51:21'),
	(330, 'hippo2009', '2022-03-24 13:22:41', 'Signed up 24/hippo2009/$2a$10$GPf182go7rs8SxMQEmLdRuaqAUsJ80kq46IVjDnouPuuqL16QzjnK/박준영/1/ㅁㅇㄴㄹㅇㄴㄹ/2022-03-24 13:22:41'),
	(331, 'hippo2009', '2022-03-24 17:25:51', 'Insert Schedule Attempt'),
	(332, 'hippo2009', '2022-03-24 17:25:51', 'Inserted Schedule Id = 68'),
	(333, 'hippo2009', '2022-03-24 21:28:06', 'Insert Schedule Attempt'),
	(334, 'hippo2009', '2022-03-24 21:28:06', 'Inserted Schedule Id = 69'),
	(335, 'hippo2009', '2022-03-24 21:33:58', 'Update Schedule Attempt'),
	(336, 'hippo2009', '2022-03-24 21:33:58', 'Updated Schedule schedule_id = 69'),
	(337, 'hippo2010', '2022-03-24 21:35:29', 'Signed up 25/hippo2010/$2a$10$0EkQNOuCwPO4gki.F7NsjOKQDXUavz6oQPAukB6M1jrR5Qkb1hTWG/박준영/1/ㅁㄴㅇㄹㄹ/2022-03-24 21:35:29'),
	(338, 'hippo2010', '2022-03-25 11:15:28', 'Update UserInfo Attempt'),
	(339, 'hippo2010', '2022-03-25 11:15:28', 'Updated UserInfo user_id = 25'),
	(340, 'hippo2010', '2022-03-25 11:17:22', 'Update UserInfo Attempt'),
	(341, 'hippo2010', '2022-03-25 11:17:22', 'Updated UserInfo user_id = 25'),
	(342, 'hippo2010', '2022-03-25 11:36:50', 'Update UserInfo Attempt'),
	(343, 'hippo2010', '2022-03-25 11:36:50', 'Updated UserInfo user_id = 25'),
	(344, 'hippo2010', '2022-03-25 11:37:50', 'Update UserInfo Attempt'),
	(345, 'hippo2010', '2022-03-25 11:37:50', 'Updated UserInfo user_id = 25'),
	(346, 'hippo2010', '2022-03-25 11:49:09', 'Update UserInfo Attempt'),
	(347, 'hippo2010', '2022-03-25 11:49:09', 'Updated UserInfo user_id = 25'),
	(348, 'hippo2010', '2022-03-25 11:51:28', 'Update UserInfo Attempt'),
	(349, 'hippo2010', '2022-03-25 11:51:28', 'Updated UserInfo user_id = 25'),
	(350, 'hippo2010', '2022-03-25 12:05:25', 'Update UserInfo Attempt'),
	(351, 'hippo2010', '2022-03-25 12:05:25', 'Updated UserInfo user_id = 25'),
	(352, 'hippo2010', '2022-03-25 12:08:37', 'Update UserInfo Attempt'),
	(353, 'hippo2010', '2022-03-25 12:08:37', 'Updated UserInfo user_id = 25'),
	(354, 'hippo2010', '2022-03-25 12:24:23', 'Insert Schedule Attempt'),
	(355, 'hippo2010', '2022-03-25 12:24:23', 'Inserted Schedule Id = 70'),
	(356, 'hippo2010', '2022-03-25 12:24:34', 'Update Schedule Attempt'),
	(357, 'hippo2010', '2022-03-25 12:24:34', 'Updated Schedule schedule_id = 70'),
	(358, 'hippo2010', '2022-03-25 12:25:07', 'Insert Schedule Attempt'),
	(359, 'hippo2010', '2022-03-25 12:25:07', 'Inserted Schedule Id = 71'),
	(360, 'hippo2010', '2022-03-25 12:25:50', 'Update Schedule Attempt'),
	(361, 'hippo2010', '2022-03-25 12:25:50', 'Updated Schedule schedule_id = 71'),
	(362, 'hippo2010', '2022-03-25 12:26:40', 'Update Schedule Attempt'),
	(363, 'hippo2010', '2022-03-25 12:26:40', 'Deleted Schedule schedule_id = 71'),
	(364, 'hippo2010', '2022-03-25 12:36:50', 'Update Schedule Attempt'),
	(365, 'hippo2010', '2022-03-25 12:36:50', 'Updated Schedule schedule_id = 70'),
	(366, 'hippo2010', '2022-03-28 13:23:34', 'Insert Schedule Attempt'),
	(367, 'hippo2010', '2022-03-28 13:23:34', 'Inserted Schedule Id = 72');
/*!40000 ALTER TABLE `db_log` ENABLE KEYS */;

-- 테이블 personal_project.schedule 구조 내보내기
CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule_type` tinyint(1) unsigned zerofill NOT NULL DEFAULT 0,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `reg_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `deleted` tinyint(1) unsigned zerofill NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_mst` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 personal_project.schedule:~69 rows (대략적) 내보내기
DELETE FROM `schedule`;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` (`id`, `schedule_type`, `title`, `description`, `start_date`, `end_date`, `reg_date`, `update_date`, `user_id`, `deleted`) VALUES
	(1, 0, 'asdf', 'asdf', '2022-01-25 16:04:24', '2022-01-25 16:40:24', '2022-01-25 16:04:24', '2022-01-28 14:39:04', 7, 1),
	(2, 0, 'asdf2', 'asdf2', '2022-01-25 16:04:32', '2022-01-25 16:40:32', '2022-01-25 16:04:32', '2022-01-28 14:39:06', 7, 1),
	(3, 0, 'asdf3', 'asdf2', '2022-01-25 16:04:35', '2022-01-25 16:40:35', '2022-01-25 16:04:35', '2022-01-28 14:39:08', 7, 1),
	(4, 0, 'asdf3', 'asdf3', '2022-01-25 16:04:37', '2022-01-25 16:40:37', '2022-01-25 16:04:37', '2022-01-28 14:39:09', 7, 1),
	(5, 0, 'asdf4', 'asdf4', '2022-01-25 16:04:42', '2022-01-25 16:40:42', '2022-01-25 16:04:42', '2022-01-28 14:39:10', 7, 1),
	(6, 0, 'asdf5', 'asdf5', '2022-01-25 16:04:45', '2022-01-25 16:40:45', '2022-01-25 16:04:45', '2022-01-28 14:39:12', 7, 1),
	(7, 0, 'asdf6', 'asdf6', '2022-01-25 16:04:48', '2022-01-25 16:40:48', '2022-01-25 16:04:48', '2022-01-25 16:04:48', 7, 0),
	(8, 0, 'asdf7', 'asdf7', '2022-01-25 16:04:52', '2022-01-25 16:40:52', '2022-01-25 16:04:52', '2022-01-25 16:04:52', 7, 0),
	(9, 0, 'asdf8', 'asdf8', '2022-01-25 16:04:58', '2022-01-25 16:40:58', '2022-01-25 16:04:58', '2022-01-25 16:04:58', 7, 0),
	(10, 0, 'asdf9', 'asdf9', '2022-01-25 16:05:02', '2022-01-25 16:41:02', '2022-01-25 16:05:02', '2022-01-25 16:05:02', 7, 0),
	(11, 0, 'asdf10', 'asdf10', '2022-01-25 16:05:07', '2022-01-25 16:41:07', '2022-01-25 16:05:07', '2022-01-25 16:05:07', 7, 0),
	(12, 0, 'asdfadsf', 'asdgasdf', '2022-01-26 19:00:00', '2022-01-26 20:00:00', '2022-01-26 18:00:06', '2022-01-26 18:00:06', 7, 0),
	(13, 0, 'asdfafdgafdg', 'asdfafdgafdg', '2022-01-26 19:00:00', '2022-01-27 20:00:00', '2022-01-26 18:06:12', '2022-01-26 18:06:12', 7, 0),
	(14, 0, 'asfgqregq43', '1efasdfae', '2021-12-29 01:00:00', '2021-12-29 02:00:00', '2022-01-26 20:03:06', '2022-01-28 14:39:04', 7, 1),
	(15, 0, 'asdervafv', 'asdervafv', '2022-01-07 01:00:00', '2022-01-09 02:00:00', '2022-01-27 14:29:59', '2022-01-27 14:32:50', 7, 0),
	(16, 0, 'btrdfgcaf', 'btrdfgcaf', '2022-01-09 01:00:00', '2022-01-10 02:00:00', '2022-01-27 14:30:26', '2022-01-27 15:26:49', 7, 0),
	(17, 0, 'SQL 수업 마지막 날', 'SQL 수업 마지막 날', '2022-01-27 15:00:00', '2022-01-27 16:00:00', '2022-01-27 14:40:00', '2022-01-27 14:40:00', 7, 0),
	(18, 0, 'arvrgadf', 'fga', '2022-01-10 01:00:00', '2022-01-10 02:00:00', '2022-01-27 17:27:58', '2022-01-27 17:27:58', 7, 0),
	(19, 0, 'asgasfdgdfg', 'asgasfdgdfg', '2022-01-06 01:00:00', '2022-01-07 02:00:00', '2022-01-27 18:00:35', '2022-01-28 15:45:39', 7, 1),
	(20, 0, 'bsvbsvb', 'bsvbsvb', '2022-01-08 01:00:00', '2022-01-08 02:00:00', '2022-01-27 18:49:07', '2022-01-28 15:45:36', 7, 1),
	(21, 0, 'nynsrnewt', 'nynsrnewt', '2022-01-10 01:00:00', '2022-01-12 02:00:00', '2022-01-27 18:50:20', '2022-01-27 18:50:20', 7, 0),
	(22, 0, 'abtraef', 'abtraef', '2021-12-30 01:00:00', '2021-12-30 02:00:00', '2022-01-27 19:31:23', '2022-01-27 19:35:18', 7, 1),
	(23, 0, 'dafgavrtq', 'dafgavrtq', '2022-01-07 01:00:00', '2022-01-08 02:00:00', '2022-01-27 20:05:34', '2022-01-27 20:05:37', 7, 1),
	(24, 0, '45656156', '45656156', '2022-01-11 01:00:00', '2022-01-14 02:00:00', '2022-01-27 21:47:13', '2022-01-27 21:47:13', 7, 0),
	(25, 0, 'ewrcw', 'ewrcw', '2022-01-12 01:00:00', '2022-01-15 02:00:00', '2022-01-27 23:21:29', '2022-01-27 23:21:29', 7, 0),
	(26, 0, 'adsfasdf', 'adsfasdf', '2022-01-10 01:00:00', '2022-01-12 02:00:00', '2022-01-27 23:48:26', '2022-01-27 23:48:26', 7, 0),
	(27, 0, 'qh3lrhqlkjcwe', 'qh3lrhqlkjcwe', '2022-01-13 01:00:00', '2022-01-15 02:00:00', '2022-01-27 23:48:50', '2022-01-27 23:48:50', 7, 0),
	(28, 0, 'afgafdsga', 'adgadfadfd', '2022-01-25 01:00:00', '2022-01-26 02:00:00', '2022-01-28 14:39:21', '2022-02-03 14:59:55', 7, 1),
	(29, 0, 'dfdfvadfa', 'dfdfvadfa', '2022-01-28 18:00:00', '2022-01-28 19:00:00', '2022-01-28 17:43:38', '2022-01-28 17:44:34', 7, 1),
	(30, 0, 'afabgadgfdb', 'afabgadgfdb', '2022-01-25 01:00:00', '2022-01-25 02:00:00', '2022-01-28 19:02:00', '2022-01-28 19:04:34', 7, 1),
	(31, 0, 'afabgadgfdb', 'afabgadgfdb', '2022-01-25 01:00:00', '2022-01-25 02:00:00', '2022-01-28 19:02:00', '2022-01-28 19:04:05', 7, 1),
	(32, 0, 'afabgadgfdb', 'afabgadgfdb', '2022-01-25 01:00:00', '2022-01-25 02:00:00', '2022-01-28 19:02:00', '2022-01-28 19:04:06', 7, 1),
	(33, 0, 'afabgadgfdb', 'afabgadgfdb', '2022-01-25 01:00:00', '2022-01-25 02:00:00', '2022-01-28 19:02:00', '2022-01-28 19:04:31', 7, 1),
	(34, 0, 'afdgadfadsf', 'afdgadfadsf', '2022-01-25 01:00:00', '2022-01-25 02:00:00', '2022-01-28 19:03:45', '2022-01-28 19:06:17', 7, 1),
	(35, 0, '내 생일', '내 생일', '2022-02-18 01:00:00', '2022-02-18 02:00:00', '2022-02-02 20:57:09', '2022-02-02 20:57:09', 7, 0),
	(36, 0, 'asdfvadbas', 'asdfvadbas', '2022-01-25 01:00:00', '2022-01-25 02:00:00', '2022-02-03 14:55:58', '2022-02-03 14:55:58', 7, 0),
	(37, 0, '테테테테', 'ㅁㄴㅇㄹ', '2022-01-07 01:00:00', '2022-01-07 02:00:00', '2022-03-12 12:10:32', '2022-03-12 12:10:42', 7, 0),
	(38, 0, 'Springboot로 이전', 'Springboot로 이전', '2022-03-12 01:00:00', '2022-03-12 02:00:00', '2022-03-13 10:13:25', '2022-03-13 10:13:25', 7, 0),
	(39, 0, 'MapTest', 'MapTest', '2022-03-13 11:00:00', '2022-03-13 12:00:00', '2022-03-13 10:13:43', '2022-03-13 10:13:43', 7, 0),
	(40, 0, 'MapTest2', '길찾기 로직 작성\n로직 다듬기 + 경유지 순서 변경 기능 구현 필요', '2022-03-14 01:00:00', '2022-03-14 02:00:00', '2022-03-15 09:13:14', '2022-03-15 09:13:14', 7, 0),
	(41, 0, 'MapTest3', '경로 탐색 구현 완료', '2022-03-15 01:00:00', '2022-03-15 02:00:00', '2022-03-16 12:38:15', '2022-03-16 12:38:15', 7, 0),
	(42, 0, 'link test', 'link test', '2022-03-17 10:00:00', '2022-03-17 11:00:00', '2022-03-17 09:44:30', '2022-03-17 09:44:30', 7, 0),
	(43, 0, 'test2', 'test2', '2022-03-17 10:00:00', '2022-03-17 11:00:00', '2022-03-17 09:45:57', '2022-03-17 10:11:16', 7, 1),
	(44, 0, 'test3', 'test3', '2022-03-17 10:00:00', '2022-03-17 11:00:00', '2022-03-17 09:46:25', '2022-03-17 10:11:14', 7, 1),
	(45, 0, 'test4', 'test4', '2022-03-17 10:00:00', '2022-03-17 11:00:00', '2022-03-17 09:47:55', '2022-03-17 09:51:27', 7, 1),
	(46, 0, 'test5', 'test5', '2022-03-17 10:00:00', '2022-03-17 11:00:00', '2022-03-17 09:48:03', '2022-03-17 09:51:25', 7, 1),
	(47, 0, 'test6', 'test6', '2022-03-17 10:00:00', '2022-03-17 11:00:00', '2022-03-17 09:51:37', '2022-03-17 10:00:43', 7, 1),
	(48, 0, 'test7', 'test7', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:00:08', '2022-03-17 10:00:42', 7, 1),
	(49, 0, 'test8', 'test8', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:00:56', '2022-03-17 10:04:42', 7, 1),
	(50, 0, 'test9', 'test9', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:01:49', '2022-03-17 10:04:40', 7, 1),
	(51, 0, 'test10', 'test10', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:04:48', '2022-03-17 10:09:22', 7, 1),
	(52, 0, 'test11', 'test11', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:05:00', '2022-03-17 10:09:20', 7, 1),
	(53, 0, 'test12', 'test12', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:09:31', '2022-03-17 10:11:13', 7, 1),
	(54, 0, 'test13', 'test13', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:10:14', '2022-03-17 10:11:12', 7, 1),
	(55, 0, 'test14', 'test14', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:11:22', '2022-03-17 10:16:05', 7, 1),
	(56, 0, 'test15', 'test15', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:12:04', '2022-03-17 10:16:04', 7, 1),
	(57, 0, 'test16', 'test16', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:13:54', '2022-03-17 10:16:02', 7, 1),
	(58, 0, 'test17', 'test17', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:15:44', '2022-03-17 10:16:00', 7, 1),
	(59, 0, 'test18', 'test18', '2022-03-17 11:00:00', '2022-03-17 12:00:00', '2022-03-17 10:16:11', '2022-03-17 17:54:19', 7, 1),
	(60, 0, 'test19', 'test19', '2022-03-17 11:00:00', '2022-03-19 12:00:00', '2022-03-17 10:20:53', '2022-03-17 17:54:23', 7, 1),
	(61, 0, 'test20', 'test20', '2022-03-17 11:00:00', '2022-03-18 12:00:00', '2022-03-17 10:24:00', '2022-03-17 17:54:21', 7, 1),
	(62, 0, 'testesdf', 'testesdf', '2022-03-17 13:00:00', '2022-03-17 14:00:00', '2022-03-17 13:00:04', '2022-03-17 17:54:18', 7, 1),
	(63, 1, '1박 2일 여행', '1박 2일 여행', '2022-03-17 18:00:00', '2022-03-18 19:00:00', '2022-03-17 17:54:40', '2022-03-21 11:22:28', 7, 0),
	(64, 0, 'vzxvcxzvx', 'safdsadf', '2022-03-16 01:00:00', '2022-03-16 02:00:00', '2022-03-17 18:47:11', '2022-03-17 18:58:10', 7, 0),
	(65, 0, 'hdkjjvdsvfdlkv', 'asdfdsaf', '2022-03-16 01:00:00', '2022-03-16 02:00:00', '2022-03-17 18:51:13', '2022-03-17 18:58:17', 7, 0),
	(66, 0, 'testset', 'testset', '2022-03-18 01:00:00', '2022-03-18 02:00:00', '2022-03-17 19:46:53', '2022-03-17 19:46:53', 7, 0),
	(67, 1, '1박~2일', '1박~2일', '2022-03-17 18:00:00', '2022-03-18 19:00:00', '2022-03-17 19:48:20', '2022-03-21 10:46:44', 7, 0),
	(68, 1, 'asdfasdf', 'asdfasdf', '2022-03-24 18:00:00', '2022-03-24 19:00:00', '2022-03-24 17:25:51', '2022-03-24 17:25:51', 24, 0),
	(69, 0, '테스트111', '테스트', '2022-03-25 01:00:00', '2022-03-26 02:00:00', '2022-03-24 21:28:06', '2022-03-24 21:33:58', 24, 0),
	(70, 1, '43123543tq', 'asdfadsf', '2022-03-25 13:00:00', '2022-03-25 14:00:00', '2022-03-25 12:24:23', '2022-03-25 12:36:50', 25, 0),
	(71, 1, 'asfdasdf', 'asdasddasf', '2022-03-24 01:00:00', '2022-03-24 02:00:00', '2022-03-25 12:25:07', '2022-03-25 12:26:40', 25, 1),
	(72, 1, 'sadfdsaf', 'sadfdsaf', '2022-03-24 01:00:00', '2022-03-24 02:00:00', '2022-03-28 13:23:34', '2022-03-28 13:23:34', 25, 0);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;

-- 테이블 personal_project.user_mst 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_mst` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `name` text NOT NULL,
  `pw_question` int(11) NOT NULL,
  `pw_answer` text NOT NULL,
  `image_type` text DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `deleted` tinyint(1) unsigned zerofill NOT NULL DEFAULT 0,
  `role` varchar(10) NOT NULL DEFAULT 'ROLE_USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 personal_project.user_mst:~7 rows (대략적) 내보내기
DELETE FROM `user_mst`;
/*!40000 ALTER TABLE `user_mst` DISABLE KEYS */;
INSERT INTO `user_mst` (`id`, `username`, `password`, `name`, `pw_question`, `pw_answer`, `image_type`, `create_date`, `update_date`, `deleted`, `role`) VALUES
	(7, 'hippo2003', 'wns12358!', '박준영', 3, 'ㅁㄴㅇㄹ', 'png', '2022-01-16 14:52:45', '2022-03-24 10:11:27', 0, 'ROLE_USER'),
	(11, 'hippo2004', 'a4s5d6!@', '박준영', 1, 'ㅁㄴㅇㄹㅇㄹ', 'png', '2022-01-22 19:04:03', '2022-01-22 19:57:36', 0, 'ROLE_USER'),
	(20, 'hippo2005', 'a4s5d6!@', '박준영', 1, 'ㅁㄴㅇㄹ', NULL, '2022-01-28 16:18:10', '2022-01-28 16:18:10', 0, 'ROLE_USER'),
	(21, 'hippo2006', 'a4s5d6!@', '박준영', 1, 'ㅁㄴㅇㄹ', NULL, '2022-01-28 16:24:15', '2022-01-28 16:24:15', 0, 'ROLE_USER'),
	(22, 'hippo2007', 'a4s5d6!@', '박준영', 1, 'ㅁㄴㅇㄹㄴㅁㅇㄹ', NULL, '2022-03-24 10:24:15', '2022-03-24 10:24:15', 0, 'ROLE_USER'),
	(23, 'hippo2008', 'a4s5d6!@', '박준영', 1, 'ㅁㄴㅇㄻㄴㅇㄹ', NULL, '2022-03-24 10:51:21', '2022-03-24 10:51:21', 0, 'ROLE_USER'),
	(24, 'hippo2009', '$2a$10$GPf182go7rs8SxMQEmLdRuaqAUsJ80kq46IVjDnouPuuqL16QzjnK', '박준영', 1, 'ㅁㅇㄴㄹㅇㄴㄹ', NULL, '2022-03-24 13:22:41', '2022-03-24 13:22:41', 0, 'ROLE_USER'),
	(25, 'hippo2010', '$2a$10$0EkQNOuCwPO4gki.F7NsjOKQDXUavz6oQPAukB6M1jrR5Qkb1hTWG', '박준영', 1, 'ㅁㄴㅇㄹㄹ', 'png', '2022-03-24 21:35:29', '2022-03-25 12:08:37', 0, 'ROLL_USER');
/*!40000 ALTER TABLE `user_mst` ENABLE KEYS */;

-- 트리거 personal_project.attempt_insert_schedule 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `attempt_insert_schedule` BEFORE INSERT ON `schedule` FOR EACH ROW BEGIN

	DECLARE um TEXT;
	
	SELECT username INTO um FROM user_mst WHERE id = NEW.user_id;
	
	INSERT INTO db_log
	SET 
		username = um,
		log_datetime = NOW(),
		log_text = 'Insert Schedule Attempt';
		
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 personal_project.attempt_update_schedule 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `attempt_update_schedule` BEFORE UPDATE ON `schedule` FOR EACH ROW BEGIN

	DECLARE um TEXT;
	SET um = (SELECT username FROM user_mst WHERE id = Old.user_id);
	
	INSERT INTO db_log
	SET 
		username = um,
		log_datetime = NOW(),
		log_text = 'Update Schedule Attempt';
		
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 personal_project.attempt_update_userInfo 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `attempt_update_userInfo` BEFORE UPDATE ON `user_mst` FOR EACH ROW BEGIN

	DECLARE um TEXT;
	
	SELECT username INTO um FROM user_mst WHERE id = NEW.id;
	
	INSERT INTO db_log
	SET 
		username = um,
		log_datetime = NOW(),
		log_text = 'Update UserInfo Attempt';
		
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 personal_project.logging_insert_schedule 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `logging_insert_schedule` AFTER INSERT ON `schedule` FOR EACH ROW BEGIN

	DECLARE um TEXT;
	
	SELECT username INTO um FROM user_mst WHERE id = NEW.user_id;
	
	INSERT INTO db_log
	SET 
		username = um,
		log_datetime = NOW(),
		log_text = CONCAT('Inserted Schedule Id = ',NEW.id);
		
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 personal_project.logging_signup 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `logging_signup` AFTER INSERT ON `user_mst` FOR EACH ROW BEGIN

	INSERT INTO db_log
	SET 
		username = NEW.username,
		log_datetime = NOW(),
		log_text = CONCAT('Signed up ',NEW.id,'/',NEW.username,'/',NEW.password,'/',NEW.name,'/',NEW.pw_question,'/',NEW.pw_answer,'/',NEW.create_date);
		
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 personal_project.logging_update_schedule 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `logging_update_schedule` AFTER UPDATE ON `schedule` FOR EACH ROW BEGIN

	DECLARE um TEXT;
	DECLARE old_delete INT;
	DECLARE new_delete INT;
	
	SET um = (SELECT username FROM user_mst WHERE id = OLD.user_id);
	SET old_delete = OLD.deleted;
	SET new_delete = NEW.deleted;
	
	if old_delete = new_delete then
		BEGIN
			INSERT INTO db_log
			SET 
				username = um,
				log_datetime = NOW(),
				log_text = CONCAT('Updated Schedule schedule_id = ',OLD.id);
		END;
	ELSE
		BEGIN
			INSERT INTO db_log
			SET 
				username = um,
				log_datetime = NOW(),
				log_text = CONCAT('Deleted Schedule schedule_id = ',OLD.id);
		END;
	END if;
		
		
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 personal_project.logging_update_userInfo 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `logging_update_userInfo` AFTER UPDATE ON `user_mst` FOR EACH ROW BEGIN
	DECLARE um TEXT;
	DECLARE old_delete INT;
	DECLARE new_delete INT;
	
	SET um = (SELECT username FROM user_mst WHERE id = NEW.id);
	SET old_delete = OLD.deleted;
	SET new_delete = NEW.deleted;
	
	if old_delete = new_delete then
		BEGIN
			INSERT INTO db_log
			SET 
				username = um,
				log_datetime = NOW(),
				log_text = CONCAT('Updated UserInfo user_id = ',OLD.id);
		END;
	ELSE
		BEGIN
			INSERT INTO db_log
			SET 
				username = um,
				log_datetime = NOW(),
				log_text = CONCAT('Deleted UserInfo user_id = ',OLD.id);
		END;
	END if;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
