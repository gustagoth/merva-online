-- db.sql
-- con PostgreSQL

DROP DATABASE merva;
CREATE DATABASE merva;
-- \connect merva

CREATE TABLE termografos(
  id INT NOT NULL PRIMARY KEY,
  ubicacion VARCHAR(60)
);

CREATE TABLE logs(
  id SERIAL PRIMARY KEY,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  temp REAL,
  termografo_id INT,
  FOREIGN KEY (termografo_id) REFERENCES termografos(id),
  UNIQUE (creado, termografo_id)
);


INSERT INTO termografos VALUES (1, 'CESAC 37'), (2, 'CESAC 13');

-- testeando

INSERT INTO logs(creado, temp, termografo_id) VALUES
  ('2018-11-21 03:03:03', 24.3, 1),
  ('2018-11-21 03:03:03', 12.3, 2);

INSERT INTO logs(creado, temp, termografo_id) VALUES
  ('2018-11-21 03:03:03', 24.3, 1) ON CONFLICT DO NOTHING;

INSERT INTO logs(temp, termografo_id) VALUES (6.5, 1);
