CREATE DATABASE merva;
USE merva;

CREATE TABLE hospitales(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(60) UNIQUE NOT NULL,
  direccion VARCHAR(100) UNIQUE,
  comuna TINYINT NOT NULL,
  tel BIGINT NOT NULL
);

CREATE TABLE termografos(
  id INT PRIMARY KEY AUTO_INCREMENT,
  funciona_desde TIMESTAMP,
  modelo VARCHAR(60),
  funciona BOOLEAN NOT NULL
);

CREATE TABLE cesacs(
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero TINYINT,
  direccion VARCHAR(100),
  tel BIGINT,
  hospital INT,
  FOREIGN KEY (hospital) REFERENCES hospitales(id)
);

CREATE TABLE responsables(
    id INT PRIMARY KEY AUTO_INCREMENT,
    dni INT UNIQUE,
    turno CHAR,
    nombre VARCHAR(60),
    tel BIGINT,
    cesac INT,
    FOREIGN KEY (cesac) REFERENCES cesacs(id)
);

CREATE TABLE heladeras(
  id INT PRIMARY KEY AUTO_INCREMENT,
  funciona_desde TIMESTAMP,
  funciona BOOLEAN NOT NULL,
  cesac INT,
  FOREIGN KEY (cesac) REFERENCES cesacs(id)
);

CREATE TABLE registros(
  id INT PRIMARY KEY AUTO_INCREMENT,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  temp REAL,
  heladera INT,
  termografo INT,
  FOREIGN KEY (heladera) REFERENCES heladeras(id),
  FOREIGN KEY (termografo) REFERENCES termografos(id)
);
