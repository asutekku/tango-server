create table assignment (
  id serial PRIMARY KEY,
  parent VARCHAR (256) NOT NULL,
  created_on TIMESTAMP NOT NULL
)