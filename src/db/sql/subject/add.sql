insert into subjects(name,description,image,collections,learners,created_on)
values (${subjectName}, ${subjectDesck}, ${subjectImg}, 0, 0, now())
returning *