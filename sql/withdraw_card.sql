-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2024 at 08:48 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `squirrel`
--

-- --------------------------------------------------------

--
-- Table structure for table `withdraw_card`
--

CREATE TABLE `withdraw_card` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `svg_type` varchar(191) NOT NULL,
  `type` int(11) NOT NULL,
  `image_url` varchar(191) NOT NULL DEFAULT '',
  `convert_rub` varchar(191) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `withdraw_card`
--

INSERT INTO `withdraw_card` (`id`, `name`, `svg_type`, `type`, `image_url`, `convert_rub`) VALUES
(1, 'Т-Банк', '1', 1, '/wallet/T-bank.png', ''),
(2, 'Альфа-Банк', '2', 1, '/wallet/Alfa-bank.png', ''),
(3, 'VISA', '3', 1, '/wallet/visa.png', ''),
(4, 'TRC 20 (USDT)', '1', 2, '/wallet/TRC20.png', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `withdraw_card`
--
ALTER TABLE `withdraw_card`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `withdraw_card`
--
ALTER TABLE `withdraw_card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
