/*
    Inserts a new user record.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/
insert into users (username, email, password, country,created_on)
values
  ('testUser','example@example.com','example123','FIN',NOW())