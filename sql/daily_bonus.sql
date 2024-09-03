-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2024 at 06:02 PM
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
-- Table structure for table `daily_bonus`
--

CREATE TABLE `daily_bonus` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `daily_bonus_cost` int(11) NOT NULL,
  `daily_bonus_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `daily_bonus`
--

INSERT INTO `daily_bonus` (`id`, `title`, `daily_bonus_cost`, `daily_bonus_type`) VALUES
(1, '1 день', 100, 1),
(2, '2 дня', 50, 1),
(3, '3 дня', 90, 1),
(4, '4 дня', 150, 1),
(5, '5 дней', 20, 1),
(6, '6 дней', 200, 1),
(7, '7 дней', 110, 1),
(8, '8 дней', 200, 1),
(9, '9 дней', 10, 1),
(10, '10 дней', 120, 1),
(11, '11 дней', 50, 1),
(12, '12 дней', 5, 1),
(13, '13 дней', 170, 1),
(14, '14 дней', 25, 1),
(15, '15 дней', 80, 1),
(16, '16 дней', 10, 1),
(17, '17 дней', 55, 1),
(18, '18 дней', 80, 1),
(19, '19 дней', 10, 1),
(20, '20 дней', 200, 1),
(21, '21 дней', 20, 1),
(22, '22 дней', 220, 1),
(23, '23 дней', 100, 1),
(24, '24 дней', 120, 1),
(25, '25 дней', 290, 1),
(26, '26 дней', 40, 1),
(27, '27 дней', 70, 1),
(28, '28 дней', 80, 1),
(29, '29 дней', 90, 1),
(30, '30 дней', 400, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daily_bonus`
--
ALTER TABLE `daily_bonus`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daily_bonus`
--
ALTER TABLE `daily_bonus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
