CREATE TABLE `recipes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`prep_time` integer NOT NULL,
	`cook_time` integer NOT NULL,
	`servings` integer NOT NULL,
	`ingredients` text NOT NULL,
	`instructions` text NOT NULL,
	`image_url` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
