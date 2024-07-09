-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2024 at 04:36 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

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
(2, '2024-06-27 03:53:14', 1),
(3, '2024-06-27 03:54:01', 1),
(4, '2024-06-28 06:00:06', 1),
(5, '2024-06-28 07:05:41', 4),
(6, '2024-06-28 07:06:10', 4),
(7, '2024-06-28 07:14:41', 9),
(8, '2024-06-30 14:11:21', 11);

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
(1, 1, 1, '2024-06-01 05:30:00', 'not checked out'),
(1, 2, 2, '2024-06-01 05:45:00', 'not checked out'),
(8, 103, 2, '2024-06-30 16:05:42', 'not checked out'),
(8, 104, 1, '2024-06-30 16:05:42', 'not checked out'),
(8, 105, 3, '2024-06-30 16:05:42', 'not checked out'),
(8, 106, 5, '2024-06-30 16:05:42', 'not checked out'),
(8, 107, 4, '2024-06-30 16:05:42', 'not checked out'),
(8, 108, 2, '2024-06-30 16:05:42', 'not checked out'),
(8, 109, 1, '2024-06-30 16:05:42', 'not checked out'),
(8, 110, 27, '2024-06-30 16:45:10', 'not checked out'),
(8, 111, 2, '2024-06-30 16:05:42', 'not checked out'),
(8, 112, 3, '2024-06-30 16:05:42', 'not checked out'),
(8, 113, 2, '2024-06-30 16:05:42', 'not checked out'),
(8, 114, 1, '2024-06-30 16:05:42', 'not checked out'),
(8, 115, 3, '2024-06-30 16:05:42', 'not checked out'),
(8, 116, 5, '2024-06-30 16:05:42', 'not checked out'),
(8, 117, 4, '2024-06-30 16:05:42', 'not checked out'),
(8, 118, 2, '2024-06-30 16:05:42', 'not checked out'),
(8, 119, 1, '2024-06-30 16:05:42', 'not checked out'),
(8, 120, 6, '2024-06-30 16:05:42', 'not checked out'),
(8, 121, 5, '2024-07-05 13:02:38', 'not checked out'),
(8, 122, 3, '2024-06-30 16:05:42', 'not checked out'),
(8, 123, 2, '2024-06-30 16:05:42', 'not checked out'),
(8, 124, 1, '2024-06-30 16:05:42', 'not checked out'),
(8, 125, 3, '2024-06-30 16:05:42', 'not checked out');

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
(1, 'https://images-na.ssl-images-amazon.com/images/I/716%2BTls0L1L._SS400_.jpg', 1),
(2, 'https://e-lectromart.com/wp-content/uploads/2023/08/y1.jpg', 2),
(3, '1720251739602-CCC_LOGO.jpeg', 133);

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
(1, 'Mountain Bike X1', 'mountain bike', 'A durable mountain bike', 500, 'City A', 'Province A', '2024-07-07 13:08:19', 25, 'available', 1),
(2, 'Road Bike Y2', 'road bike', 'A fast road bike', 750, 'City B', 'Province B', '2024-07-07 13:08:23', 32, 'available', 1),
(103, 'Mountain Bike Pro', 'mountain bike', 'A high-quality mountain bike perfect for rough terrains.', 499.99, 'New York', 'NY', '2024-06-30 16:03:49', 10, 'available', 11),
(104, 'Mountain Bike Pro', 'mountain bike', 'A high-quality mountain bike perfect for rough terrains.', 499.99, 'New York', 'NY', '2024-06-30 16:03:49', 10, 'available', 11),
(105, 'Mountain Bike Pro', 'mountain bike', 'A high-quality mountain bike perfect for rough terrains.', 499.99, 'New York', 'NY', '2024-06-30 16:03:49', 10, 'available', 11),
(106, 'Road Racer', 'road bike', 'Lightweight and fast road bike for competitive racing.', 299.99, 'Los Angeles', 'CA', '2024-06-30 16:03:49', 15, 'available', 11),
(107, 'Road Racer', 'road bike', 'Lightweight and fast road bike for competitive racing.', 299.99, 'Los Angeles', 'CA', '2024-06-30 16:03:49', 15, 'available', 11),
(108, 'Road Racer', 'road bike', 'Lightweight and fast road bike for competitive racing.', 299.99, 'Los Angeles', 'CA', '2024-06-30 16:03:49', 15, 'available', 11),
(109, 'Touring Explorer', 'touring bike', 'Durable bike designed for long-distance touring.', 399.99, 'Chicago', 'IL', '2024-06-30 16:03:49', 8, 'available', 11),
(110, 'Touring Explorer', 'touring bike', 'Durable bike designed for long-distance touring.', 399.99, 'Chicago', 'IL', '2024-06-30 16:03:49', 8, 'available', 11),
(111, 'Touring Explorer', 'touring bike', 'Durable bike designed for long-distance touring.', 399.99, 'Chicago', 'IL', '2024-06-30 16:03:49', 8, 'available', 11),
(112, 'Hybrid Commuter', '', 'Perfect blend of road and mountain bike for commuting.', 199.99, 'Houston', 'TX', '2024-06-30 16:03:49', 12, 'available', 11),
(113, 'Hybrid Commuter', '', 'Perfect blend of road and mountain bike for commuting.', 199.99, 'Houston', 'TX', '2024-06-30 16:03:49', 12, 'available', 11),
(114, 'Hybrid Commuter', '', 'Perfect blend of road and mountain bike for commuting.', 199.99, 'Houston', 'TX', '2024-06-30 16:03:49', 12, 'available', 11),
(115, 'Electric Cruiser', '', 'Electric bike with pedal assist for easy rides.', 599.99, 'Phoenix', 'AZ', '2024-06-30 16:03:49', 5, 'available', 11),
(116, 'Electric Cruiser', '', 'Electric bike with pedal assist for easy rides.', 599.99, 'Phoenix', 'AZ', '2024-06-30 16:03:49', 5, 'available', 11),
(117, 'Electric Cruiser', '', 'Electric bike with pedal assist for easy rides.', 599.99, 'Phoenix', 'AZ', '2024-06-30 16:03:49', 5, 'available', 11),
(118, 'Kids Fun Bike', '', 'A safe and fun bike for children.', 99.99, 'Philadelphia', 'PA', '2024-06-30 16:03:49', 20, 'available', 11),
(119, 'Kids Fun Bike', '', 'A safe and fun bike for children.', 99.99, 'Philadelphia', 'PA', '2024-06-30 16:03:49', 20, 'available', 11),
(120, 'Kids Fun Bike', '', 'A safe and fun bike for children.', 99.99, 'Philadelphia', 'PA', '2024-06-30 16:03:49', 20, 'available', 11),
(121, 'BMX Stunt Rider', '', 'BMX bike for performing stunts and tricks.', 149.99, 'San Antonio', 'TX', '2024-06-30 16:03:49', 7, 'available', 11),
(122, 'BMX Stunt Rider', '', 'BMX bike for performing stunts and tricks.', 149.99, 'San Antonio', 'TX', '2024-06-30 16:03:49', 7, 'available', 11),
(123, 'BMX Stunt Rider', '', 'BMX bike for performing stunts and tricks.', 149.99, 'San Antonio', 'TX', '2024-06-30 16:03:49', 7, 'available', 11),
(124, 'Folding Compact', '', 'Compact folding bike for easy storage and transport.', 249.99, 'San Diego', 'CA', '2024-06-30 16:03:49', 6, 'available', 11),
(125, 'Folding Compact', '', 'Compact folding bike for easy storage and transport.', 249.99, 'San Diego', 'CA', '2024-06-30 16:03:49', 6, 'available', 11),
(126, 'Folding Compact', '', 'Compact folding bike for easy storage and transport.', 249.99, 'San Diego', 'CA', '2024-06-30 16:03:49', 6, 'available', 11),
(127, 'Fat Tire Adventurer', '', 'Bike with extra-wide tires for soft and unstable terrains.', 349.99, 'Dallas', 'TX', '2024-06-30 16:03:49', 9, 'available', 11),
(128, 'Fat Tire Adventurer', '', 'Bike with extra-wide tires for soft and unstable terrains.', 349.99, 'Dallas', 'TX', '2024-06-30 16:03:49', 9, 'available', 11),
(129, 'Fat Tire Adventurer', '', 'Bike with extra-wide tires for soft and unstable terrains.', 349.99, 'Dallas', 'TX', '2024-06-30 16:03:49', 9, 'available', 11),
(130, 'Single Speed Classic', '', 'Simple and stylish single speed bike.', 179.99, 'San Jose', 'CA', '2024-06-30 16:03:49', 11, 'available', 11),
(131, 'Single Speed Classic', '', 'Simple and stylish single speed bike.', 179.99, 'San Jose', 'CA', '2024-06-30 16:03:49', 11, 'available', 11),
(132, 'Single Speed Classic', '', 'Simple and stylish single speed bike.', 179.99, 'San Jose', 'CA', '2024-06-30 16:03:49', 11, 'available', 11),
(133, 'a', 'road bike', 'a', 1500, 'a', 'a', '2024-07-06 00:42:19', 15, 'available', 11),
(134, 'Electric Scooter', '', 'Modern electric scooter for urban commuting.', 800, 'City D', 'Province W', '2024-07-06 17:00:00', 30, 'available', 13),
(135, 'BMX Bike', 'bmx', 'Sturdy BMX bike for tricks and jumps.', 500, 'City E', 'Province V', '2024-07-06 17:00:00', 25, 'available', 13),
(136, 'Cruiser Bike', '', 'Comfortable cruiser bike for leisurely rides.', 700, 'City F', 'Province U', '2024-07-06 17:00:00', 10, 'available', 13);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('success','fail') DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `transaction_date`, `status`, `user_id`, `total_price`) VALUES
(1, '2024-06-15 07:00:00', 'success', 2, NULL),
(2, '2024-06-28 03:00:00', 'success', 1, NULL),
(3, '2024-06-28 04:30:00', 'fail', 2, NULL),
(4, '2024-06-28 05:45:00', 'success', 3, NULL),
(5, '2024-06-28 06:00:00', 'success', 11, NULL),
(6, '2024-06-28 06:15:00', 'fail', 11, NULL),
(7, '2024-06-28 06:30:00', 'success', 11, NULL),
(8, '2024-06-28 06:45:00', 'fail', 11, NULL),
(9, '2024-06-28 07:00:00', 'success', 11, NULL),
(10, '2024-06-28 07:15:00', 'fail', 11, NULL),
(11, '2024-06-28 07:30:00', 'success', 11, NULL),
(12, '2024-06-28 07:45:00', 'fail', 11, NULL),
(13, '2024-06-28 08:00:00', 'success', 11, NULL),
(14, '2024-06-28 08:15:00', 'fail', 11, NULL),
(15, '2024-06-30 16:26:32', 'success', 11, NULL),
(16, '2024-06-30 17:09:59', 'success', 11, 1999.95),
(17, '2024-07-05 13:28:18', 'success', 11, NULL),
(18, '2024-07-05 13:37:18', 'success', 11, NULL),
(19, '2024-07-05 13:37:34', 'success', 11, 1999.95),
(20, '2024-07-07 12:32:05', 'success', 13, 500),
(21, '2024-07-07 12:49:41', 'success', 13, 1500),
(22, '2024-07-07 13:08:01', 'success', 13, 5000),
(23, '2024-07-07 13:08:09', 'success', 13, 7500),
(24, '2024-07-06 17:00:00', '', 1, 27500),
(25, '2024-07-07 13:35:00', 'success', 12, 27000),
(26, '2024-07-06 17:00:00', 'success', 12, 6329.97);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

CREATE TABLE `transaction_detail` (
  `detail_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_detail`
--

INSERT INTO `transaction_detail` (`detail_id`, `transaction_id`, `post_id`, `quantity`, `total_price`) VALUES
(1, 24, 1, 25, '12500.00'),
(2, 24, 2, 32, '24000.00'),
(3, 25, 134, 2, '4000.00'),
(4, 25, 135, 3, '1000.00'),
(5, 25, 136, 1, '400.00'),
(6, 26, 131, 3, '539.97'),
(7, 26, 133, 5, '1500.00');

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
  `address` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `is_seller` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone_number`, `address`, `profile_picture`, `is_seller`) VALUES
(1, 'johndoe', '$2a$12$LUGcqtehXitGjBCNcxUq6.7IAZwgV5D4WBnieY.EbzCTguhJLzuPy', 'john.doe@example.com', '123-456-7890', NULL, NULL, 0),
(2, 'janesmith', '1f51c87a47d5c4aacc042ba9945523ce', 'jane.smith@example.com', '098-765-4321', NULL, NULL, NULL),
(3, 'michael_johnson', '$2a$10$DlL6YC169iGCowFck/cXieYBB0YVwIX3bA9X34XVBPsEtpdR5HYOG', 'michael.johnson@example.com', NULL, NULL, NULL, NULL),
(4, 'emily_wilson', '$2a$10$UO0vpSvQ/VQ3z1xm2Gdr7ehqtyDQmydoTnuoDdO.hxsXX2n9OeFLi', 'emily.wilson@example.com', NULL, NULL, NULL, NULL),
(5, 'david_miller', '$2a$10$JC.cs2K5.6IDFy/OBStTqe7gVy6uzu9l2GiqTt0JQq85ZfwR/nRRm', 'david.miller@example.com', NULL, NULL, NULL, NULL),
(6, 'sarah_anderson', '$2a$10$2iAyDZ4fMVDiagNxJo8/oupO4GmHY7RoBEcxWRr6jXDhk1OprMJci', 'sarah.anderson@example.com', NULL, NULL, NULL, NULL),
(7, 'james_thomas', '$2a$10$WSVkOWdjSRlQT7WxAQIWk./RWphwliI4R7OAhR/n8Ruo3wVjPascO', 'james.thomas@example.com', NULL, NULL, NULL, NULL),
(8, 'alexander_brown', '$2a$10$4Oj74mDQbwDGpg.ZHllM7.O2wPBi2yFRPuok6FOwMjtFeWU/N2boi', 'alexander.brown@example.com', NULL, NULL, NULL, NULL),
(9, 'isabella_martinez', '$2a$10$pceNy5n9PqNtJKupV4Vh0OXmcBdeCIciVWHLXAJsStuNLLBcziQ7u', 'isabella.martinez@example.com', NULL, NULL, NULL, NULL),
(10, 'ethan_clark', '$2a$10$SLsrXbgGLaMbfvndOKhjIOWTD4R7ZIK4t6qWlqxCGOqXUNXCcQ216', 'ethan.clark@example.com', NULL, NULL, NULL, 1),
(11, 'peter', '$2a$10$fhmpstrOsxdW6.uoNLNHMeWgKdpDzsPRFOQI8yxtFA33eZlROEmFG', 'peter@gmail.com', '0812', 'pagarsih', 'C:\\dev\\bicycle-webapp\\backend\\user_uploads\\1720252495482-CCC_LOGO.jpeg', 1),
(12, 'alek', '$2a$10$.CW6BJMu5JxnixhbWK5s3OgTUPA7/GeXWVhZuFyvy7AL5oC3gOeXe', 'alek@gmail.com', '81218282138', NULL, NULL, NULL),
(13, 'dadang', '$2a$10$UZhsdJpbvjSbGgXQ1fSru.wjQLTVjNWAwuVS01iJ1QgSrPlwkgc5m', 'dadang@example.com', '987-654', NULL, NULL, 1);

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
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `fk_transaction_id` (`transaction_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  ADD CONSTRAINT `fk_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
