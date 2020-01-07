create table card (
  id serial PRIMARY KEY,
  question VARCHAR (256) NOT NULL,
  answer VARCHAR (256) NOT NULL,
  created_on TIMESTAMP NOT NULL
)