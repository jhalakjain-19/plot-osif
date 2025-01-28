create table if not exists users (
  id integer primary key autoincrement,
  name varchar(100) not null,
  email varchar(100) not null,
  status tinyint(1) default 1,
  createdAt timestamp default now(),
  updatedAt datetime on update current_timestamp
);

