-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2022 at 09:43 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `safeelect`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `id` int(11) NOT NULL,
  `nid` bigint(20) NOT NULL,
  `first` varchar(255) NOT NULL,
  `last` varchar(255) NOT NULL,
  `voteCount` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `nid`, `first`, `last`, `voteCount`) VALUES
(1, 11111111111, 'MEHMET', 'YAPAR', 1),
(2, 11111111113, 'BEYZA', 'YILMAZ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `id` int(11) NOT NULL,
  `gender` enum('Female','Male') NOT NULL,
  `age` int(11) NOT NULL,
  `area` varchar(255) NOT NULL,
  `bcity` varchar(255) NOT NULL,
  `votedFor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`id`, `gender`, `age`, `area`, `bcity`, `votedFor`) VALUES
(1, 'Male', 19, 'ÇANKAYA', 'ANKARA', 'MEHMET YAPAR'),
(2, 'Female', 22, 'YENİMAHALLE', 'İSTANBUL', 'BEYZA YILMAZ'),
(3, 'Male', 55, 'KEÇİÖREN', 'ANKARA', 'MEHMET YAPAR');

-- --------------------------------------------------------

--
-- Table structure for table `voter`
--

CREATE TABLE `voter` (
  `id` int(11) NOT NULL,
  `nid` bigint(11) NOT NULL,
  `first` varchar(255) NOT NULL,
  `last` varchar(255) NOT NULL,
  `mother_first` varchar(255) NOT NULL,
  `father_first` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `bday` date NOT NULL,
  `bcity` varchar(255) NOT NULL,
  `pass` varchar(534) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `voter`
--

INSERT INTO `voter` (`id`, `nid`, `first`, `last`, `mother_first`, `father_first`, `address`, `gender`, `bday`, `bcity`, `pass`) VALUES
(1, 11111111111, 'MEHMET', 'YAPAR', 'AYŞE', 'ALİ', 'ÇANKAYA', 'Male', '1993-02-10', 'ANKARA', '$2b$10$ets2arucjoLI8a2ecZMnvew1eozrZXdCRL8NckjiO5fsUyqShMOLq'),
(2, 11111111112, 'ALİ', 'VELİ', 'ZEHRA', 'MUSTAFA', 'KEÇİÖREN', 'Male', '2002-10-09', 'ANKARA', '$2b$10$rZXfRI5pLjAwG9o8AtUE.eaD8smfQrZGIGkGmXqpHdxKece//7bsu'),
(4, 11111111113, 'BEYZA', 'YILMAZ', 'ZEYNEP', 'EMİN', 'YENİMAHALLE', 'Female', '1998-03-27', 'İSTANBUL', '$2b$10$7EDXorHjL3ZBX.N2eMDrkO8N/FYSRxfHTaGz6CVi.vYPRMspn5noK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`nid`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voter`
--
ALTER TABLE `voter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nid` (`nid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stats`
--
ALTER TABLE `stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
