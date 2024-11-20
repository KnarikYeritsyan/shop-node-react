-- MariaDB dump 10.19  Distrib 10.8.4-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	10.8.4-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`),
  UNIQUE KEY `name_20` (`name`),
  UNIQUE KEY `name_21` (`name`),
  UNIQUE KEY `name_22` (`name`),
  UNIQUE KEY `name_23` (`name`),
  UNIQUE KEY `name_24` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES
(2,'samsung','2023-01-13 18:19:39','2023-01-13 18:19:39'),
(3,'hp','2023-01-13 18:20:03','2023-01-13 18:20:03'),
(4,'dell','2023-01-13 18:20:16','2023-01-13 18:20:16'),
(12,'honor','2023-02-08 13:51:36','2023-02-08 13:51:37'),
(13,'xiaomi','2023-02-08 13:52:35','2023-02-08 13:52:36'),
(14,'world','2023-02-24 19:41:55','2023-02-24 19:41:55');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `totalQuantity` int(11) NOT NULL DEFAULT 0,
  `totalPrice` float NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES
(4,0,0,'2023-01-21 17:37:47','2023-03-01 13:53:38',22),
(19,2,1300,'2023-03-01 13:54:51','2023-05-04 17:13:21',41),
(22,0,0,'2023-04-27 15:08:03','2023-04-27 15:08:03',44);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartItems`
--

DROP TABLE IF EXISTS `cartItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cartItems` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,0) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `cartId` bigint(20) unsigned DEFAULT NULL,
  `productId` bigint(20) unsigned DEFAULT NULL,
  `subTotalPrice` decimal(10,0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `cartId` (`cartId`),
  KEY `productId` (`productId`),
  CONSTRAINT `cartitems_ibfk_35` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cartitems_ibfk_36` FOREIGN KEY (`productId`) REFERENCES `productItems` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=280 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartItems`
--

LOCK TABLES `cartItems` WRITE;
/*!40000 ALTER TABLE `cartItems` DISABLE KEYS */;
INSERT INTO `cartItems` VALUES
(278,1,500,'2023-05-04 15:47:28','2023-05-04 15:47:28',19,54,500),
(279,1,800,'2023-05-04 17:13:21','2023-05-04 17:13:21',19,50,800);
/*!40000 ALTER TABLE `cartItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`),
  UNIQUE KEY `name_20` (`name`),
  UNIQUE KEY `name_21` (`name`),
  UNIQUE KEY `name_22` (`name`),
  UNIQUE KEY `name_23` (`name`),
  UNIQUE KEY `name_24` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES
(1,'phone','2023-01-05 20:50:20','2023-01-05 20:50:20'),
(2,'notebook','2023-01-13 18:20:50','2023-01-13 18:20:50'),
(3,'tablet','2023-01-13 18:21:25','2023-01-13 18:21:25'),
(20,'hello','2023-02-24 19:41:45','2023-02-24 19:41:45');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorites` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` bigint(20) unsigned DEFAULT NULL,
  `productId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  CONSTRAINT `favorites_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `favorites_ibfk_4` FOREIGN KEY (`productId`) REFERENCES `productItems` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES
(152,'2023-04-30 18:18:13','2023-04-30 18:18:13',41,54),
(153,'2023-04-30 18:18:14','2023-04-30 18:18:14',41,50),
(154,'2023-04-30 18:18:14','2023-04-30 18:18:14',41,55),
(155,'2023-04-30 18:18:16','2023-04-30 18:18:16',41,58),
(156,'2023-04-30 18:18:16','2023-04-30 18:18:16',41,45),
(157,'2023-05-04 15:37:23','2023-05-04 15:37:23',41,46);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderItems`
--

DROP TABLE IF EXISTS `orderItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderItems` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,0) NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `orderId` bigint(20) unsigned DEFAULT NULL,
  `productItemId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productItemId` (`productItemId`),
  CONSTRAINT `orderitems_ibfk_7` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderitems_ibfk_8` FOREIGN KEY (`productItemId`) REFERENCES `productItems` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderItems`
--

LOCK TABLES `orderItems` WRITE;
/*!40000 ALTER TABLE `orderItems` DISABLE KEYS */;
INSERT INTO `orderItems` VALUES
(48,'10 lite',1000,1,'2023-03-01 13:15:06','2023-03-01 13:15:06',84,NULL),
(49,'12 pro max',600,1,'2023-03-01 13:18:29','2023-03-01 13:18:29',85,NULL),
(50,'12 pro max',600,1,'2023-03-01 13:18:29','2023-03-01 13:18:29',85,NULL),
(51,'10 lite',1000,3,'2023-03-01 13:53:16','2023-03-01 13:53:16',86,NULL),
(52,'10 lite',1000,1,'2023-03-01 13:53:16','2023-03-01 13:53:16',86,NULL),
(53,'10 lite',1000,1,'2023-03-01 13:53:38','2023-03-01 13:53:38',87,NULL),
(54,'10 lite',1000,3,'2023-04-07 15:06:37','2023-04-07 15:06:37',88,NULL),
(55,'10 lite',1000,1,'2023-04-08 18:41:39','2023-04-08 18:41:39',89,NULL),
(56,'galaxy s22',800,1,'2023-04-23 13:40:15','2023-04-23 13:40:15',90,NULL),
(57,'galaxy s21',500,1,'2023-04-23 13:40:15','2023-04-23 13:40:15',90,NULL),
(58,'10 lite',1000,1,'2023-04-23 13:42:44','2023-04-23 13:42:44',91,NULL),
(59,'10 lite',1000,1,'2023-04-23 13:44:21','2023-04-23 13:44:21',92,NULL),
(60,'10 lite',1000,1,'2023-04-23 13:46:14','2023-04-23 13:46:14',93,NULL),
(61,'10 lite',1000,1,'2023-04-23 13:48:12','2023-04-23 13:48:12',94,NULL),
(62,'12 pro max',600,1,'2023-04-23 13:49:22','2023-04-23 13:49:22',95,NULL),
(63,'10 lite',1000,1,'2023-04-23 13:58:26','2023-04-23 13:58:26',96,NULL),
(64,'12 pro max',600,1,'2023-04-23 14:01:00','2023-04-23 14:01:00',97,NULL),
(65,'12 pro max',600,1,'2023-04-23 14:02:47','2023-04-23 14:02:47',98,NULL),
(66,'10 lite',1000,1,'2023-04-23 14:12:45','2023-04-23 14:12:45',99,NULL),
(67,'12 pro max',600,1,'2023-04-23 14:18:23','2023-04-23 14:18:23',100,NULL),
(68,'12 pro max',600,1,'2023-04-23 14:21:17','2023-04-23 14:21:17',101,NULL),
(69,'12 pro max',600,1,'2023-04-23 14:23:42','2023-04-23 14:23:42',102,NULL),
(70,'10 lite',1000,1,'2023-04-23 14:41:26','2023-04-23 14:41:26',103,NULL),
(71,'12 pro max',600,1,'2023-04-23 14:42:51','2023-04-23 14:42:51',104,NULL),
(72,'12 pro max',600,1,'2023-04-23 14:48:23','2023-04-23 14:48:23',105,NULL),
(73,'11 lite',750,1,'2023-04-24 13:49:06','2023-04-24 13:49:06',106,NULL),
(74,'galaxy s21',500,1,'2023-04-24 13:54:21','2023-04-24 13:54:21',107,NULL),
(75,'galaxy s21',500,4,'2023-04-24 14:46:45','2023-04-24 14:46:45',108,NULL),
(76,'11 lite',750,1,'2023-04-24 16:22:40','2023-04-24 16:22:40',109,NULL),
(77,'11 lite',750,1,'2023-04-24 21:31:11','2023-04-24 21:31:11',110,NULL),
(78,'11 lite',750,1,'2023-04-24 22:23:02','2023-04-24 22:23:02',111,NULL),
(79,'galaxy s22',800,1,'2023-04-24 22:24:32','2023-04-24 22:24:32',112,NULL),
(80,'galaxy s21',500,1,'2023-04-27 13:44:31','2023-04-27 13:44:31',113,NULL),
(81,'11 lite',750,2,'2023-04-27 13:53:14','2023-04-27 13:53:14',114,NULL),
(82,'galaxy s22',800,1,'2023-04-27 22:29:51','2023-04-27 22:29:51',115,NULL),
(83,'galaxy s22',800,2,'2023-04-27 22:30:56','2023-04-27 22:30:56',116,NULL),
(84,'galaxy s21',500,1,'2023-04-27 22:31:23','2023-04-27 22:31:23',117,NULL),
(85,'galaxy s22',800,2,'2023-04-30 14:36:21','2023-04-30 14:36:21',118,NULL),
(86,'galaxy s22',800,1,'2023-04-30 14:36:21','2023-04-30 14:36:21',118,NULL);
/*!40000 ALTER TABLE `orderItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `totalPrice` decimal(10,0) NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('completed','pending','canceled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` bigint(20) unsigned DEFAULT NULL,
  `postalCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentMethod` enum('paypal','cash') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cash',
  `paymentStatus` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES
(84,1000,'asd','asd','asd','completed','2023-03-01 13:15:06','2023-03-01 13:59:56',22,'123','cash',1),
(85,1200,'asdf','asef','saf','pending','2023-03-01 13:18:29','2023-03-01 13:18:29',22,'123','cash',0),
(86,4000,'aretaet','aewt','aet','pending','2023-03-01 13:53:16','2023-03-01 13:53:16',22,'aergt','cash',0),
(87,1000,'awe','sef','SF','pending','2023-03-01 13:53:38','2023-03-01 13:53:38',22,'SFD','cash',0),
(88,3000,'jhfc','kgv','kgv','pending','2023-04-07 15:06:37','2023-04-07 15:06:37',41,'hgv','cash',1),
(89,1000,'srg','aseg','asge','pending','2023-04-08 18:41:39','2023-04-08 18:41:39',41,'dzg','cash',0),
(90,1300,'zsg','zesg','zdg','pending','2023-04-23 13:40:15','2023-04-23 13:40:15',41,'zdxg','cash',0),
(91,1000,'cfj','xfcj','fcgj','pending','2023-04-23 13:42:44','2023-04-23 13:42:44',41,'cgj','cash',0),
(92,1000,'zdv','zdvx','zxdv','pending','2023-04-23 13:44:21','2023-04-23 13:44:21',41,'zxv','cash',0),
(93,1000,'xbzxv','bx','xz','pending','2023-04-23 13:46:14','2023-04-23 13:46:14',41,'zv','cash',1),
(94,1000,'S','zds','zd','pending','2023-04-23 13:48:12','2023-04-23 13:48:12',41,'zdb','cash',0),
(95,600,'xfb','xfb','xc','pending','2023-04-23 13:49:22','2023-04-23 13:49:22',41,'xcvb','cash',1),
(96,1000,'Dv','sd','sf','completed','2023-04-23 13:58:26','2023-04-24 15:39:37',41,'sdf','cash',0),
(97,600,'zsdg','zdv','xzv','pending','2023-04-23 14:01:00','2023-04-23 14:01:00',41,'xv','cash',1),
(98,600,'dfg','dfxg','xdfh','pending','2023-04-23 14:02:47','2023-04-23 14:02:47',41,'xdh','cash',0),
(99,1000,'xfd','xfh','xf','completed','2023-04-23 14:12:45','2023-04-24 15:36:31',41,'xfcn','cash',0),
(100,600,'sfdg','xfc','xcfh','pending','2023-04-23 14:18:23','2023-04-23 14:18:23',41,'xfh','cash',0),
(101,600,'xh','cfh','cgj','completed','2023-04-23 14:21:17','2023-04-24 15:39:03',41,'cgj','cash',0),
(102,600,'xf','xf','fx','completed','2023-04-23 14:23:42','2023-04-24 15:21:09',41,'xfh','cash',1),
(103,1000,'cfh','cfh','cgj','completed','2023-04-23 14:41:26','2023-04-24 15:29:35',41,'c','cash',0),
(104,600,'ghj','vghj','vbhk','completed','2023-04-23 14:42:51','2023-04-23 14:43:05',41,'vbhk','cash',0),
(105,600,'cvg','gvj','vj','completed','2023-04-23 14:48:23','2023-04-23 14:48:36',41,'h','cash',0),
(106,750,'aaaaaaa','bbbbbbbbb','ccccccccc','completed','2023-04-24 13:49:06','2023-04-24 15:10:01',41,'ddddddddd','cash',0),
(107,500,'dg','drg','rsdy','completed','2023-04-24 13:54:21','2023-04-24 15:10:53',41,'dxh','paypal',1),
(108,2000,'asd','sdgf','sdg','completed','2023-04-24 14:46:45','2023-04-24 15:09:22',41,'age','paypal',1),
(109,750,'jo','kj','iuj','pending','2023-04-24 16:22:40','2023-04-24 16:22:40',41,'uv','paypal',0),
(110,750,'sa','as','sa','pending','2023-04-24 21:31:11','2023-04-24 21:53:38',41,'das','paypal',1),
(111,750,'rt','dr','sfxh','pending','2023-04-24 22:23:02','2023-04-24 22:23:02',41,'xfh','paypal',0),
(112,800,'cj','cgj','gcj','pending','2023-04-24 22:24:32','2023-04-24 22:24:32',41,'jgx','paypal',0),
(113,500,'dh','td','dry','pending','2023-04-27 13:44:31','2023-04-27 13:45:09',41,'sry','paypal',1),
(114,1500,'sry','sry','sy','pending','2023-04-27 13:53:14','2023-04-27 13:53:31',41,'rdsy','paypal',1),
(115,800,'sgfd','g','dfg','pending','2023-04-27 22:29:51','2023-04-27 22:29:51',41,'dfzg','paypal',0),
(116,1600,'sth','srh','zrdh','pending','2023-04-27 22:30:56','2023-04-27 22:30:56',41,'zdhr','cash',0),
(117,500,'xb','xbx','cvb','pending','2023-04-27 22:31:23','2023-04-27 22:31:23',41,'xcvb','paypal',0),
(118,2400,'zdvz','zxdv','zdv','pending','2023-04-30 14:36:21','2023-04-30 14:36:21',41,'zxdv','paypal',0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productItems`
--

DROP TABLE IF EXISTS `productItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productItems` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `productitems_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productItems`
--

LOCK TABLES `productItems` WRITE;
/*!40000 ALTER TABLE `productItems` DISABLE KEYS */;
INSERT INTO `productItems` VALUES
(40,6,'active','4fd9c6de-aa66-4e17-a9d4-b405d818b282_dell_inspiron15 white.jpg','white','2023-02-24 16:38:39','2023-02-24 17:09:45',35),
(41,7,'active','8755c24a-2fc9-4409-a28a-659cd73cbb20_dell_inspiron15. black.jpg','black','2023-02-24 16:39:39','2023-02-24 16:39:39',35),
(42,0,'inactive','a22c8c45-6595-4e13-8aa0-eb0d7b26a4a7_honor 10-lite-black-1.jpg','black','2023-02-24 16:40:54','2023-04-23 13:46:14',36),
(44,4,'active','31406a27-9d5e-407c-8afd-6d35082e8b8d_tablet-samsung-galaxy-s7+-black.jpg','black','2023-02-24 16:45:45','2023-02-24 19:29:40',38),
(45,14,'active','5364c8f4-c6ff-4f7a-bd67-b075b8ac3283_xiaomi11 lite_black.jpg','black','2023-02-24 16:47:08','2023-04-24 13:49:06',39),
(46,6,'active','5deec5c2-19bd-481c-85b5-6aba5c612976_hp_Victus_15_white.jpg','white','2023-02-24 16:48:29','2023-02-24 16:48:29',40),
(47,0,'inactive','785727da-b5ae-462d-aac3-4a516b8ff098_samsung galaxy s21 gray.jpeg','gray','2023-02-24 16:49:42','2023-04-27 13:44:31',41),
(48,10,'active','e53b2a98-394e-422e-a14a-9693c14796e6_dell_latitude_pink_1.jpg','pink','2023-02-24 16:51:35','2023-02-24 16:51:35',42),
(50,3,'active','6cfd178d-f0f5-4af4-b424-a13c699fd7c7_samsung-galaxy s22 violet2.jpg','violet','2023-02-24 16:55:49','2023-04-30 14:36:21',44),
(53,0,'inactive','d4c6425c-35fe-4b04-8189-818af509c71a_xiaomi11_white.jpg','white','2023-02-24 17:01:04','2023-04-27 13:53:14',39),
(54,4,'active','50f07af2-d7cd-4e98-91f5-c7bb31c03430_samsung galaxy s21 green.jpg','green','2023-02-24 17:01:34','2023-04-27 22:31:23',41),
(55,4,'active','3944bee5-749e-4667-ada9-1e822e98b17a_samsung-galaxy-s22-black.jpg','black','2023-02-24 17:02:46','2023-04-30 14:36:21',44),
(56,5,'active','40ca3ace-ccde-45c6-b695-8f93b8459e20_hp-victus_grey.jpg','gray','2023-02-24 17:03:27','2023-02-24 17:03:27',40),
(57,8,'active','4b194af6-d169-4bdc-aaf2-214285f55e6a_dell-latitude-3320-13-i7-1165g7-8gb-512gb-ssd-laptop grey.jpg','gray','2023-02-24 17:04:26','2023-02-24 17:04:26',42),
(58,1,'active','159da3a2-998c-4853-ad18-75bed8764b32_Huawei-Honor-10-lite blue.jpg','blue','2023-02-24 17:07:38','2023-04-23 14:41:26',36),
(62,5,'active','46994bb5-1f1f-45ba-91a6-9ff03b9285e9_hp_pavilion_i5_black.jpg','black','2023-03-01 13:58:20','2023-03-01 13:58:20',49),
(63,1,'active','1a03d833-88d8-4cff-986b-b7273b7efe9c_hp_pavilion_i5_black.jpg','srtb','2023-03-01 13:59:03','2023-03-01 13:59:03',50);
/*!40000 ALTER TABLE `productItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `rating` float NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `brandId` bigint(20) unsigned DEFAULT NULL,
  `categoryId` bigint(20) unsigned DEFAULT NULL,
  `numRating` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `brandId` (`brandId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_47` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_48` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(35,'inspiron 15','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',1500,3,'2023-02-24 16:38:39','2023-04-07 15:04:45',4,2,2),
(36,'10 lite','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',1000,4,'2023-02-24 16:40:54','2023-03-01 13:57:04',12,1,2),
(38,'galaxy s7','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',800,3,'2023-02-24 16:45:45','2023-02-24 19:50:37',2,3,1),
(39,'11 lite','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',750,5,'2023-02-24 16:47:08','2023-02-24 19:50:19',13,1,1),
(40,'victus','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',900,2,'2023-02-24 16:48:29','2023-02-24 19:50:29',3,2,1),
(41,'galaxy s21','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',500,2,'2023-02-24 16:49:42','2023-03-01 10:32:18',2,1,1),
(42,'latitude','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',1100,5,'2023-02-24 16:51:35','2023-02-24 19:50:30',4,2,1),
(44,'galaxy s22','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',800,3,'2023-02-24 16:55:49','2023-02-24 19:50:26',2,1,1),
(49,'pavilon','aerydsrvb',400,0,'2023-03-01 13:58:20','2023-03-01 13:58:20',3,2,0),
(50,'setzv',',kjgucfv,jg b',430,0,'2023-03-01 13:59:03','2023-03-01 13:59:03',4,2,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rate` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` bigint(20) unsigned DEFAULT NULL,
  `productId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  CONSTRAINT `ratings_ibfk_47` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_48` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES
(49,4,'2023-03-01 13:57:03','2023-03-01 13:57:04',41,36),
(50,3,'2023-04-07 15:04:45','2023-04-07 15:04:45',41,35);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('USER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `password` char(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','pending') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `activationCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'John','Mayler','john@mail.com','USER','9c35327c9241a81a9af8be8883e6d1ae','pending','2023-01-08 22:03:11','2023-01-08 22:03:11',NULL),
(22,'Admin','Admin','admin.admin@mail.com','ADMIN','9c35327c9241a81a9af8be8883e6d1ae','active','2023-01-21 17:36:31','2023-01-21 17:36:32','111111'),
(26,'John','Yan','test.test3@mail.com','USER','9c35327c9241a81a9af8be8883e6d1ae','active','2023-01-30 23:57:21','2023-01-30 23:57:22','135111'),
(28,'Jack','London','jack.jack@mail.com','USER','9c35327c9241a81a9af8be8883e6d1ae','active','2023-01-31 00:39:32','2023-01-31 00:39:32','3543'),
(41,'yan','yan','text.text04@mail.com','USER','9c35327c9241a81a9af8be8883e6d1ae','active','2023-03-01 13:54:49','2023-03-01 13:56:58',NULL),
(44,'dzfh','zdfg','yan.yan@mail.com','USER','9c35327c9241a81a9af8be8883e6d1ae','active','2023-04-27 15:08:02','2023-04-27 15:54:57',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-08 23:01:58
