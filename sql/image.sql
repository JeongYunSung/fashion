create table image(
  id int not null auto_increment,
  product_id int not null,
  key varchar(30) not null,
  value blob not null
);

alter table image add constraint image_pk primary key (id);

alter table image add constraint image_fk foreign key (product_id) references product(id);

create index image_idx on image(key);