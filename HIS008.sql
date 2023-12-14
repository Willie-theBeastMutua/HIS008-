CREATE DATABASE `his008` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `alternativecontact` (
  `alternativeContactId` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`alternativeContactId`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `appointment` (
  `patientNo` int NOT NULL,
  `appDate` date DEFAULT NULL,
  `appTime` datetime DEFAULT NULL,
  `appointmentId` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`appointmentId`),
  UNIQUE KEY `appointmentId_UNIQUE` (`appointmentId`),
  KEY `appointment_patientNo_idx` (`patientNo`),
  CONSTRAINT `appointment_patientNo` FOREIGN KEY (`patientNo`) REFERENCES `patient` (`patient_No`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `county` (
  `countyId` int NOT NULL,
  `countyName` varchar(255) NOT NULL,
  PRIMARY KEY (`countyId`),
  UNIQUE KEY `countyName_UNIQUE` (`countyName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `gender` (
  `genderID` int NOT NULL,
  `genderName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`genderID`),
  UNIQUE KEY `genderName_UNIQUE` (`genderName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `patient` (
  `patient_No` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `otherNames` varchar(45) DEFAULT NULL,
  `DOB` date NOT NULL,
  `ID_No` int DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `county` int DEFAULT NULL,
  `mobile` varchar(13) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `AlternativeContactId` int DEFAULT NULL,
  `disability` tinyint DEFAULT NULL,
  PRIMARY KEY (`patient_No`),
  UNIQUE KEY `patient_No_UNIQUE` (`patient_No`),
  KEY `patient_gender_idx` (`gender`),
  KEY `patient_county_idx` (`county`),
  KEY `patient_alternativeContactId_idx` (`AlternativeContactId`),
  CONSTRAINT `patient_alternativeContactId` FOREIGN KEY (`AlternativeContactId`) REFERENCES `alternativecontact` (`alternativeContactId`),
  CONSTRAINT `patient_county` FOREIGN KEY (`county`) REFERENCES `county` (`countyId`),
  CONSTRAINT `patient_gender` FOREIGN KEY (`gender`) REFERENCES `gender` (`genderID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
