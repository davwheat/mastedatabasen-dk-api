-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mastedatabasen_sites
CREATE DATABASE IF NOT EXISTS `mastedatabasen_sites` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mastedatabasen_sites`;

-- Dumping structure for table mastedatabasen_sites.frequency_bands
CREATE TABLE IF NOT EXISTS `frequency_bands` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `frequency_band` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mastedatabasen_sites.frequency_bands: ~0 rows (approximately)

-- Dumping structure for table mastedatabasen_sites.operators
CREATE TABLE IF NOT EXISTS `operators` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `operator_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mastedatabasen_sites.operators: ~0 rows (approximately)

-- Dumping structure for table mastedatabasen_sites.service_types
CREATE TABLE IF NOT EXISTS `service_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `service_name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mastedatabasen_sites.service_types: ~0 rows (approximately)

-- Dumping structure for table mastedatabasen_sites.sites
CREATE TABLE IF NOT EXISTS `sites` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `mast_id` int NOT NULL,
  `station_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lat` decimal(8,6) NOT NULL,
  `lon` decimal(9,6) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `service_type_id` int unsigned DEFAULT NULL,
  `technology_id` int unsigned DEFAULT NULL,
  `frequency_band_id` int unsigned DEFAULT NULL,
  `operator_id` int unsigned DEFAULT NULL,
  `house_number` tinytext COMMENT 'This needs to be a text column because of house numbers like "24a" or textual building names.',
  `street_name` text,
  `town` text,
  `street_code` tinytext,
  `commune_code` tinytext,
  `post_number` tinytext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mastId` (`mast_id`) USING BTREE,
  KEY `lat` (`lat`),
  KEY `lon` (`lon`),
  KEY `serviceTypeId` (`service_type_id`) USING BTREE,
  KEY `technologyId` (`technology_id`) USING BTREE,
  KEY `frequencyBandId` (`frequency_band_id`) USING BTREE,
  KEY `startDate` (`start_date`) USING BTREE,
  KEY `operatorId` (`operator_id`) USING BTREE,
  KEY `technologyId_frequencyBandId` (`technology_id`,`frequency_band_id`) USING BTREE,
  KEY `technologyId_operatorId` (`technology_id`,`operator_id`) USING BTREE,
  KEY `technologyId_frequencyBandId_operatorId` (`technology_id`,`frequency_band_id`,`operator_id`) USING BTREE,
  CONSTRAINT `FK_sites_frequency_bands` FOREIGN KEY (`frequency_band_id`) REFERENCES `frequency_bands` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_sites_operators` FOREIGN KEY (`operator_id`) REFERENCES `operators` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_sites_service_types` FOREIGN KEY (`service_type_id`) REFERENCES `service_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FK_sites_technologies` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mastedatabasen_sites.sites: ~0 rows (approximately)

-- Dumping structure for table mastedatabasen_sites.technologies
CREATE TABLE IF NOT EXISTS `technologies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `technology_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mastedatabasen_sites.technologies: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
