insert into decks(name, description, collection_ID, owner_ID, created_on)
values(${deckName}, ${deckDescription},${collectionID} ${userID}, now())
RETURNING *
