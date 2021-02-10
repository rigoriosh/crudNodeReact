CREATE SCHEMA `programacredito` ;

CREATE TABLE `programacredito`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusers`))
COMMENT = '	Tabla para el control de usuarios';

ALTER TABLE `programacredito`.`users` 
ADD COLUMN `email` VARCHAR(45) NOT NULL AFTER `password`;

CREATE TABLE `programacredito`.`teachers` (
  `idteachers` INT NOT NULL AUTO_INCREMENT,
  `nombre_profesor` VARCHAR(45) NOT NULL,
  `apellido_profesor` VARCHAR(45) NOT NULL,
  `profesion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idteachers`));

CREATE TABLE `programacredito`.`materias` (
  `idmaterias` INT NOT NULL AUTO_INCREMENT,
  `nombre_materia` VARCHAR(45) NOT NULL,
  `creditos_materia` INT NOT NULL,
  PRIMARY KEY (`idmaterias`))
COMMENT = '3.Existen 10 materias\n4.Cada materia equivale a 3 créditos.';

CREATE TABLE `programacredito`.`roles` (
  `idroles` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idroles`));

CREATE TABLE `programacredito`.`clases` (
  `idclases` INT NOT NULL AUTO_INCREMENT,
  `nombre-clase` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idclases`));

  CREATE TABLE `programacredito`.`materselected` (
  `idmaterSelected` INT NOT NULL AUTO_INCREMENT,
  `firstMat` VARCHAR(45) NOT NULL,
  `secondMat` VARCHAR(45) NOT NULL,
  `thirdMat` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idmaterSelected`));

ALTER TABLE `programacredito`.`materias` 
ADD COLUMN `idteachers` INT NOT NULL AFTER `creditos_materia`,
ADD INDEX `idteachers_idx` (`idteachers` ASC) VISIBLE;


ALTER TABLE `programacredito`.`materias` 
ADD CONSTRAINT `idteachers`
  FOREIGN KEY (`idteachers`)
  REFERENCES `programacredito`.`teachers` (`idteachers`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `programacredito`.`users` 
ADD COLUMN `rol` VARCHAR(45) NULL AFTER `email`;

ALTER TABLE `programacredito`.`materias` 
DROP FOREIGN KEY `idprofesors`;
ALTER TABLE `programacredito`.`materias` 
CHANGE COLUMN `idprofesors` `idteachers` INT NOT NULL ,
ADD INDEX `idteachers_idx` (`idteachers` ASC) VISIBLE,
DROP INDEX `idprofesors_idx` ;
;
ALTER TABLE `programacredito`.`materias` 
ADD CONSTRAINT `idteachers`
  FOREIGN KEY (`idteachers`)
  REFERENCES `programacredito`.`teachers` (`idteachers`);




ALTER TABLE `programacredito`.`users` 
CHANGE COLUMN `rol` `rol` INT NULL DEFAULT NULL ,
ADD INDEX `rol_idx` (`rol` ASC) VISIBLE;
;
ALTER TABLE `programacredito`.`users` 
ADD CONSTRAINT `rol`
  FOREIGN KEY (`rol`)
  REFERENCES `programacredito`.`roles` (`idroles`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `programacredito`.`clases` 
CHANGE COLUMN `nombre-clase` `nombre_clase` VARCHAR(45) NOT NULL ;

/////////////

ALTER TABLE `programacredito`.`materselected` 
ADD COLUMN `idusers` INT NOT NULL AFTER `thirdMat`,
ADD INDEX `idusers_idx` (`idusers` ASC) VISIBLE;
;
ALTER TABLE `programacredito`.`materselected` 
ADD CONSTRAINT `idusers`
  FOREIGN KEY (`idusers`)
  REFERENCES `programacredito`.`users` (`idusers`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

  ///////////////////////

 ALTER TABLE `programacredito`.`users` 
ADD COLUMN `idmaterSelected` INT NOT NULL AFTER `idclases`,
ADD INDEX `idmaterSelected_idx` (`idmaterSelected` ASC) VISIBLE;
;
ALTER TABLE `programacredito`.`users` 
ADD CONSTRAINT `idmaterSelected`
  FOREIGN KEY (`idmaterSelected`)
  REFERENCES `programacredito`.`materselected` (`idmaterSelected`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

  ALTER TABLE `programacredito`.`users` 
DROP FOREIGN KEY `idmaterSelected`;
ALTER TABLE `programacredito`.`users` 
CHANGE COLUMN `idclases` `idclases` INT NULL ,
CHANGE COLUMN `idmaterSelected` `idmaterSelected` INT NULL ;
ALTER TABLE `programacredito`.`users` 
ADD CONSTRAINT `idmaterSelected`
  FOREIGN KEY (`idmaterSelected`)
  REFERENCES `programacredito`.`materselected` (`idmaterSelected`);


  //////////////////////////////

