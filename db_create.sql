CREATE DATABASE astro;

USE astro;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user` varchar(100) DEFAULT NULL,
  `md5_user` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `reset` MEDIUMINT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (reset)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE users AUTO_INCREMENT=1001;

INSERT INTO users (user, md5_user, password) VALUES ('admin', '21232f297a57a5a743894a0e4a801fc3', '2eef7c2beac1487107e20c224205be0542b094264e58ee848c8ff6cc1a487db6');


