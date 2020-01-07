create table decks (
  id serial PRIMARY KEY,
  deckname VARCHAR (50) UNIQUE NOT NULL,
  description VARCHAR (50) NOT NULL,
  owner VARCHAR (50) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL
)
