create table subject (
  id serial PRIMARY KEY,
  title VARCHAR (256) NOT NULL,
  description VARCHAR (256) NOT NULL,
  collections int NOT null,
  image VARCHAR (256) NOT NULL, /* Link to the image */
  learners INT NOT null,
  created_on TIMESTAMP NOT NULL
)