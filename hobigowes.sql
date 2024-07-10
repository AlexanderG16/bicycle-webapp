-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2024 at 06:38 AM
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
-- Database: `hobigowes`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `updated_at`, `user_id`) VALUES
(1, '2024-06-01 05:00:00', 2),
(2, '2024-06-27 12:57:45', 1),
(3, '2024-06-28 00:26:27', 1),
(4, '2024-06-28 00:32:45', 1),
(5, '2024-06-28 00:55:28', 1),
(6, '2024-06-28 01:18:32', 1),
(7, '2024-06-28 01:29:55', 1),
(8, '2024-06-28 01:32:04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `cart_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('checked out','not checked out') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_item`
--

INSERT INTO `cart_item` (`cart_id`, `post_id`, `quantity`, `added_at`, `status`) VALUES
(1, 1, 1, '2024-07-08 09:46:24', NULL),
(1, 22, 2, '2024-07-08 01:35:36', 'not checked out'),
(1, 24, 1, '2024-07-08 01:34:45', 'not checked out'),
(2, 21, 3, '2024-07-08 17:06:00', NULL),
(2, 24, 1, '2024-07-08 11:29:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `post_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `url`, `post_id`) VALUES
(9, '1720184593973-Deluxe MTB.jpg', 21),
(10, '1720185748786-MTB Brake Kit.jpg', 22),
(11, '1720185829202-MTB Brake Kit.jpg', 23),
(12, '1720233824160-Deluxe MTB.jpg', 24),
(13, '1720233952457-Deluxe MTB.jpg', 25),
(14, '1720234838793-MTB Handlebar.png', 26),
(15, '1720236197344-Deluxe MTB.jpg', 27),
(16, '1720237272186-Deluxe MTB.jpg', 28),
(17, '1720237419063-Deluxe MTB.jpg', 29),
(18, '1720241971547-keyboard.jpg', 30),
(19, '1720185748786-MTB Brake Kit.jpg', 21),
(20, '1720452154770-vw beatle example.jpg', 31);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `bike_type` enum('mountain bike','road bike','touring bike','bmx') DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `upload_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `stok` int(11) DEFAULT NULL,
  `status` enum('available','sold out') DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `title`, `bike_type`, `description`, `price`, `city`, `province`, `upload_date`, `stok`, `status`, `user_id`) VALUES
(1, 'Mountain Bike X1', 'mountain bike', 'A durable mountain bike', 500, 'City A', 'Province A', '2024-01-01 03:00:00', 5, 'available', 1),
(2, 'Road Bike Y2', 'road bike', 'A fast road bike', 750, 'City B', 'Province B', '2024-01-05 08:00:00', 3, 'available', 1),
(4, 'post 1', NULL, 'post 1', 3000000, 'bandung', 'jawa barat', '2024-07-04 22:59:52', 22, 'available', 1),
(5, 'post 2', NULL, 'post 2', 1000000, 'Bandung', 'Jawa Barat', '2024-07-04 23:19:06', 12, 'available', 1),
(8, 'Post 4', NULL, 'Post 4', 1820000, 'Semarang', 'Jawa Tengah', '2024-07-05 00:04:49', 9, 'available', 1),
(10, 'Post 5', NULL, 'Post 5', 0, 'Se', '', '2024-07-05 00:10:12', 0, 'available', 1),
(11, 'Post 5', NULL, 'Post 5', 1000, 'Semarang', 'Jawa Tengah', '2024-07-05 00:10:28', 11, 'available', 1),
(15, 'post ', NULL, 'post', 10000, 'bandung', 'jawa barat', '2024-07-05 02:31:09', 12, 'available', 1),
(21, 'post', NULL, 'post', 10550000, 'bdg', 'jabar', '2024-07-05 06:03:13', 191, 'available', 1),
(22, 'post', 'road bike', 'post', 1230000, 'bdg', 'jabar', '2024-07-05 06:22:28', 89, 'available', 1),
(23, 'post', 'road bike', 'post', 1230000, 'bdg', 'jabar', '2024-07-05 06:23:49', 89, 'available', 1),
(24, 'post', 'road bike', 'post nih bos', 5000000, 'bandung', 'jawa barat', '2024-07-05 19:43:44', 14, 'available', 1),
(25, 'post MTB', 'road bike', 'Post MTB', 101020, 'Surabaya', 'Jawa TImur', '2024-07-05 19:45:52', 90, 'available', 1),
(26, 'MTB', 'road bike', 'MTB', 2300000, 'Denpasar', 'Bali', '2024-07-05 20:00:38', 1, 'available', 1),
(27, 'MTB', 'road bike', 'psot', 1, 'v', 'v', '2024-07-05 20:23:17', 1, 'available', 1),
(28, 'post', 'road bike', 'post', 11, 'post', 'post', '2024-07-05 20:41:12', 1, 'available', 1),
(29, 'MTB NIH MTB', 'mountain bike', '', 0, '', '', '2024-07-05 20:43:39', 0, 'available', 1),
(30, 'post', 'mountain bike', 'post', 11010110999, 'post', 'post', '2024-07-05 21:59:31', 111, 'available', 1),
(31, 'vw beetle', 'road bike', 'vw nih vw senggol dong, unit langka bos', 250000000, 'Jambi', 'Jambi', '2024-07-08 08:22:34', 1, 'available', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('success','fail') DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `transaction_date`, `status`, `user_id`) VALUES
(1, '2024-06-15 07:00:00', 'success', 2);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

CREATE TABLE `transaction_detail` (
  `transaction_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_detail`
--

INSERT INTO `transaction_detail` (`transaction_id`, `post_id`, `quantity`) VALUES
(1, 1, 1),
(1, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `is_seller` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone_number`, `is_seller`) VALUES
(1, 'John Doe', '$2a$12$LUGcqtehXitGjBCNcxUq6.7IAZwgV5D4WBnieY.EbzCTguhJLzuPy', 'john.doe@example.com', '123-456-7890', 1),
(2, 'Jane Smith', '1f51c87a47d5c4aacc042ba9945523ce', 'jane.smith@example.com', '098-765-4321', 0),
(3, 'test1', '$2a$10$oK1evgIbigHwVQfTaEuaeepcB9cAMeb/Aj4CWYs4sme8bb/ZopI/O', 'test1@gmail', '1', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`cart_id`,`post_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD PRIMARY KEY (`transaction_id`,`post_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD CONSTRAINT `transaction_detail_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`),
  ADD CONSTRAINT `transaction_detail_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
