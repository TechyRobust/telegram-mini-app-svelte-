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
-- Table structure for table `card`
--

CREATE TABLE `card` (
  `id` int(11) NOT NULL,
  `card_name` varchar(191) NOT NULL,
  `squirrel_coin_amount` int(11) NOT NULL,
  `energy_amount` int(11) NOT NULL,
  `add_squirrel` int(11) NOT NULL,
  `add_energy` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `add_cost` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `add_boost` int(11) NOT NULL,
  `boost_coin_amount` int(11) NOT NULL,
  `require_user_level` int(11) NOT NULL,
  `card_avatar` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `card`
--

INSERT INTO `card` (`id`, `card_name`, `squirrel_coin_amount`, `energy_amount`, `add_squirrel`, `add_energy`, `cost`, `add_cost`, `role`, `add_boost`, `boost_coin_amount`, `require_user_level`, `card_avatar`) VALUES
(1, 'Back-end разработчик', 5, 1, 1, 1, 100, 10, 1, 1, 5, 1, '/images/cards/team/Back-end разработчик.PNG'),
(2, 'Front-end разработчик', 5, 2, 1, 2, 150, 30, 1, 1, 6, 2, '/images/cards/team/Front-end разработчик.PNG'),
(3, 'Full-Stack-разработчик', 10, 2, 2, 1, 180, 15, 1, 2, 3, 3, '/images/cards/team/Full-Stack-разработчик.PNG'),
(4, 'SEO-менеджер', 5, 3, 1, 3, 400, 20, 1, 3, 2, 4, '/images/cards/team/SEO-менеджер.PNG'),
(5, 'Sis-админ', 5, 3, 1, 1, 500, 100, 1, 5, 7, 5, '/images/cards/team/Sis-админ.PNG'),
(6, 'Дизайнер', 3, 2, 6, 1, 650, 20, 1, 8, 3, 6, '/images/cards/team/Дизайнер.PNG'),
(7, 'Руководитель группы', 5, 1, 6, 1, 700, 80, 1, 3, 6, 7, '/images/cards/team/Руководитель группы.PNG'),
(8, 'Руководитель проекта', 10, 2, 3, 1, 1000, 300, 1, 9, 3, 8, '/images/cards/team/Руководитель проекта.PNG'),
(9, 'Смм', 30, 1, 10, 3, 3000, 2000, 1, 4, 2, 9, '/images/cards/team/Смм.PNG'),
(10, 'Алгоритм майнинга', 1, 1, 1, 1, 100, 20, 2, 1, 1, 1, '/images/cards/infractructure/Алгоритм майнинга.PNG'),
(11, 'Алгоритм шифрования', 2, 1, 1, 1, 150, 70, 2, 2, 1, 2, '/images/cards/infractructure/Алгоритм шифрования.PNG'),
(12, 'Введение соц сетей', 2, 2, 1, 1, 300, 80, 2, 2, 2, 3, '/images/cards/infractructure/Введение соц сетей.PNG'),
(13, 'Защита от кибер атака', 2, 2, 2, 1, 400, 30, 2, 3, 3, 4, '/images/cards/infractructure/Защита от кибер атака.PNG'),
(14, 'Интеграция с биржами', 2, 3, 2, 2, 600, 60, 2, 3, 3, 5, '/images/cards/infractructure/Интеграция с биржами.PNG'),
(15, 'Интеллект', 4, 2, 3, 1, 800, 120, 2, 5, 10, 6, '/images/cards/infractructure/Интеллект.PNG'),
(16, 'Облачное хранилище', 2, 3, 4, 2, 2500, 500, 2, 3, 1, 7, '/images/cards/infractructure/Облачное хранилище.PNG'),
(17, 'Серверная мощность', 6, 2, 3, 1, 5000, 200, 2, 5, 4, 8, '/images/cards/infractructure/Серверная мощность.PNG'),
(18, 'Система мониторинга продуктивности', 15, 2, 7, 1, 5000, 800, 2, 9, 10, 9, '/images/cards/infractructure/Система мониторинга продуктивности.PNG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `card`
--
ALTER TABLE `card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
