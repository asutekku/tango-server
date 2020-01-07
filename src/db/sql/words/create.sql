create table word (
  id serial PRIMARY KEY,
  value VARCHAR (256) NOT NULL,
  parent VARCHAR (256) NOT NULL,
  created_on TIMESTAMP NOT NULL
)