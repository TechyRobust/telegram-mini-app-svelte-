-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nick_name` VARCHAR(191) NOT NULL,
    `avatar_url` VARCHAR(191) NOT NULL,
    `telegram_id` VARCHAR(191) NOT NULL,
    `squirrel_coin` DECIMAL(65, 30) NULL,
    `tron_coin` DECIMAL(65, 30) NULL,
    `boost_coin` DECIMAL(65, 30) NULL,
    `level_id` INTEGER NOT NULL,
    `count` INTEGER NOT NULL,
    `energy` INTEGER NOT NULL DEFAULT 1000,
    `last_date` VARCHAR(191) NOT NULL,
    `accept_bonus_last_date` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_telegram_id_key`(`telegram_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `level` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `default_add_energy` INTEGER NOT NULL,
    `boost_coin` INTEGER NOT NULL,
    `per_tap` INTEGER NOT NULL,
    `target_count` INTEGER NOT NULL,
    `squirrel_url` VARCHAR(191) NOT NULL DEFAULT '',
    `useful_energy` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `card_name` VARCHAR(191) NOT NULL,
    `squirrel_coin_amount` INTEGER NOT NULL,
    `boost_coin_amount` INTEGER NOT NULL,
    `energy_amount` INTEGER NOT NULL,
    `add_squirrel` INTEGER NOT NULL,
    `add_energy` INTEGER NOT NULL,
    `add_boost` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,
    `add_cost` INTEGER NOT NULL,
    `role` INTEGER NOT NULL,
    `require_user_level` INTEGER NOT NULL,
    `card_avatar` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `improvecard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `card_id` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_bonus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `daily_bonus_cost` INTEGER NOT NULL,
    `daily_bonus_type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_bonus_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `daily_bonus_accept_date` VARCHAR(191) NOT NULL,
    `daily_step` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invite_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `invited_user_id` INTEGER NOT NULL,
    `invite_date` VARCHAR(191) NOT NULL,
    `invite_bonus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_type` INTEGER NOT NULL,
    `task_target_id` INTEGER NOT NULL,
    `task_complete_bonus` INTEGER NOT NULL,
    `task_target` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_user_id` INTEGER NOT NULL,
    `task_id` INTEGER NOT NULL,
    `task_state` INTEGER NOT NULL,
    `task_progress` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `withdraw_card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `svg_type` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL DEFAULT '',
    `convert_rub` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conform_withdraw_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `withdraw_card_id` INTEGER NOT NULL,
    `withdraw_card_number` VARCHAR(191) NOT NULL,
    `withdraw_card_owner` VARCHAR(191) NOT NULL,
    `info_state` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `withdraw_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `conform_withdraw_info_id` INTEGER NOT NULL,
    `withdraw_amount` INTEGER NOT NULL,
    `withdraw_date` VARCHAR(191) NOT NULL,
    `withdraw_state` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_verify` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `user_surname` VARCHAR(191) NOT NULL,
    `user_birthday` VARCHAR(191) NOT NULL,
    `user_city` VARCHAR(191) NOT NULL,
    `user_verify_state` INTEGER NOT NULL,
    `user_verify_date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `card_id` INTEGER NOT NULL,
    `withdraw_amount` VARCHAR(191) NOT NULL,
    `withdraw_date` VARCHAR(191) NOT NULL,
    `card_number` VARCHAR(191) NOT NULL,
    `withdraw_state` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
