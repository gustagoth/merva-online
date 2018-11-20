-- db.sql

DROP DATABASE merva;
CREATE DATABASE merva;
USE merva;

CREATE TABLE termografos(
  id INT NOT NULL PRIMARY KEY,
  ubicacion VARCHAR(60)
);

CREATE TABLE logs(
  id INT PRIMARY KEY AUTO_INCREMENT,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  temp REAL,
  termografo_id INT,
  FOREIGN KEY (termografo_id) REFERENCES termografos(id),
  UNIQUE KEY timestamp_termografo (creado, termografo_id)
);


INSERT INTO termografos VALUES (1, 'CESAC 37'), (2, 'CESAC 13');
