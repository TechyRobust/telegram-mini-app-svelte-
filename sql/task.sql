-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2024 at 06:03 PM
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
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `task_type` int(11) NOT NULL,
  `task_target_id` int(11) NOT NULL,
  `task_complete_bonus` int(11) NOT NULL,
  `task_target` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `task_type`, `task_target_id`, `task_complete_bonus`, `task_target`) VALUES
(1, 1, 0, 50, 0),
(2, 2, 50, 100, 5),
(3, 3, 0, 200, 0),
(4, 4, 0, 500, 0),
(5, 5, 1, 100, 3),
(6, 5, 2, 50, 5),
(7, 5, 3, 160, 6),
(8, 5, 4, 70, 4),
(9, 5, 6, 20, 2),
(10, 5, 7, 200, 7),
(11, 5, 5, 50, 4),
(12, 5, 8, 800, 10),
(13, 5, 9, 300, 3),
(14, 5, 10, 1000, 10),
(15, 5, 11, 50, 3),
(16, 5, 12, 60, 6),
(17, 5, 13, 300, 8),
(18, 5, 14, 600, 10),
(19, 5, 15, 700, 10),
(20, 5, 16, 400, 5),
(21, 5, 17, 600, 9),
(22, 5, 18, 1000, 10),
(23, 6, 0, 1500, 5),
(24, 7, 0, 2500, 7),
(25, 8, 2, 50, 0),
(26, 8, 3, 100, 0),
(27, 8, 4, 70, 0),
(28, 8, 5, 150, 0),
(29, 8, 6, 300, 0),
(30, 8, 7, 20, 0),
(31, 8, 8, 500, 0),
(32, 8, 9, 900, 0),
(33, 8, 10, 400, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
