create schema ucshub;

use ucshub;

create table knowledge_area(
	id int primary key auto_increment,
	name varchar(120) not null,	
	cod_cnpq varchar(8),
	knowledge_subarea_id int,	
	
	CONSTRAINT knowledge_subarea_id FOREIGN KEY (knowledge_subarea_id) REFERENCES knowledge_area(id)
);

create table address(
	id int primary key auto_increment,
	country_code int not null,
	state varchar(120),
	city varchar(120),
	district varchar(120),
	street varchar(120),
	num varchar(8),
	zip_code varchar(10)

);

create table institution(
	id int primary key auto_increment,
	name varchar(80) not null,
	document varchar(50),
	created_at datetime not null default NOW(),
	
	address_id int,
	
	CONSTRAINT instituition_address_address_id FOREIGN KEY (address_id) REFERENCES address(id)
	
);


create table person(
	id int primary key auto_increment,
	name varchar(120) not null,
	birth_date datetime,
	phone varchar(15),
	lattes_id varchar(18),
	knowledge_area_id int,
	instituition_id int,	
	address_id int,
	type tinyint not null,
	titulation tinyint,
	/* admin, researcher, student */
	
	
	CONSTRAINT person_address_address_id FOREIGN KEY (address_id) REFERENCES address(id),
	CONSTRAINT person_knowledge_area_id FOREIGN KEY (knowledge_area_id) REFERENCES knowledge_area(id),
	CONSTRAINT person_instituition_id FOREIGN KEY (instituition_id) REFERENCES institution(id)
	
	
);


create table user(
	id int primary key auto_increment,
	email varchar(80) unique not null,
	password char(32),
	verified_email boolean not null default false,
	created_at datetime not null default NOW(),
	verified_at datetime,
	person_id int,	
	
	CONSTRAINT user_person_id FOREIGN KEY (person_id) REFERENCES person(id)	
	
);




create table project(
	id int primary key auto_increment,
	title varchar(80) not null,
	description varchar(256) not null,
	status tinyint not null,
	type tinyint not null,
	created_at datetime not null default CURRENT_TIMESTAMP,
	ended_at datetime,	

	instituition_id int not null,		
	
	CONSTRAINT project_instituition_id FOREIGN KEY (instituition_id) REFERENCES institution(id)
	
);

create table production(
	id int primary key auto_increment,
	title varchar(80) not null,
	description varchar(256) not null,
	created_at datetime not null default CURRENT_TIMESTAMP,

	type tinyint not null,
	project_id int not null,		
	
	CONSTRAINT production_project_id FOREIGN KEY (project_id) REFERENCES project(id)
	
	

);
/*producoes podem ter pessoas que n estao vinculadas ao projeto*/
create table person_production(
	id int primary key auto_increment,
	person_id int not null,		
	production_id int not null,	
	
	CONSTRAINT person_production_person_id FOREIGN KEY (person_id) REFERENCES person(id),
	CONSTRAINT person_production_production_id FOREIGN KEY (production_id) REFERENCES production(id)
);

create table person_project(
	id int primary key auto_increment,
	person_id int not null,		
	project_id int not null,	
	
	CONSTRAINT person_project_person_id FOREIGN KEY (person_id) REFERENCES person(id),
	CONSTRAINT person_project_project_id FOREIGN KEY (project_id) REFERENCES project(id)
);


create table resource_request(
	id int primary key auto_increment,
	quantity decimal(12,2) not null,
	filed_at datetime not null,
	entry_at datetime not null,
	created_at datetime not null,
	
	person_id int not null,
	project_id int not null,		
	instituition_id int not null,		

	CONSTRAINT resource_request_project_id FOREIGN KEY (project_id) REFERENCES project(id),	
	CONSTRAINT resource_request_instituition_id FOREIGN KEY (instituition_id) REFERENCES institution(id),
	CONSTRAINT resource_request_person_id FOREIGN KEY (person_id) REFERENCES person(id)
	

);



