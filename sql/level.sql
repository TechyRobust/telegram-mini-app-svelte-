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
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `boost_coin` int(11) NOT NULL,
  `per_tap` int(11) NOT NULL,
  `target_count` int(11) NOT NULL,
  `default_add_energy` int(11) NOT NULL,
  `squirrel_url` varchar(191) NOT NULL DEFAULT '',
  `useful_energy` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id`, `title`, `boost_coin`, `per_tap`, `target_count`, `default_add_energy`, `squirrel_url`, `useful_energy`) VALUES
(1, '1', 100, 1, 10, 1, '/squirrel/1.png', 1000),
(2, '2', 200, 2, 20, 2, '/squirrel/2.png', 1500),
(3, '3', 300, 3, 30, 3, '/squirrel/3.png', 2000),
(4, '4', 400, 4, 30, 4, '/squirrel/4.png', 2500),
(5, '5', 500, 5, 50, 5, '/squirrel/5.png', 3000),
(6, '6', 600, 6, 60, 6, '/squirrel/6.png', 3500),
(7, '7', 700, 7, 70, 7, '/squirrel/7.png', 4000),
(8, '8', 800, 8, 80, 8, '/squirrel/8.png', 4500),
(9, '9', 900, 9, 90, 9, '/squirrel/9.png', 5000),
(10, '10', 1000, 10, 100, 10, '/squirrel/10.png', 6000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
