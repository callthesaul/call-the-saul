CREATE TABLE `inquiries` (
	`email` text NOT NULL,
	`interest` text NOT NULL,
	`name` text NOT NULL,
	`company` text NOT NULL,
	`submitted_at` text NOT NULL,
	PRIMARY KEY(`email`, `interest`)
);
