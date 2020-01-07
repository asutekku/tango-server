insert into collections(name,description, owner_id,created_on)
values(${name}, ${description}, ${user_id}, now())
RETURNING *