DROP TABLE IF EXISTS Collaborateurs;
 
CREATE TABLE Collaborateurs (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  prenom VARCHAR(250) NOT NULL,
  nom VARCHAR(250) NOT NULL,
  mail VARCHAR(250) NOT NULL,
  ticket_resto VARCHAR(250) NOT NULL
);
 
INSERT INTO Collaborateurs (prenom, nom, mail, ticket_resto) VALUES
  ('Laurent', 'GINA', 'laurentgina@mail.com', 'laurent'),
  ('Sophie', 'FONCEK', 'sophiefoncek@mail.com', 'sophie'),
  ('Agathe', 'FEELING', 'agathefeeling@mail.com', 'agathe');
