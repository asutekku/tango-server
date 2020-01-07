create table collection (
  id serial PRIMARY KEY,
  collectionname VARCHAR (50) UNIQUE NOT NULL,
  description VARCHAR (50) NOT NULL,
  owner VARCHAR (50) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL
)
