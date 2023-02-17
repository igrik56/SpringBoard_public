DROP DATABASE IF EXISTS blogly_test;

CREATE DATABASE blogly_test;

\c blogly_test

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    img_url TEXT NOT NULL
);

INSERT INTO users (first_name, last_name, img_url) 
    VALUES ('Bob', 'Hope', 'static/def_user_img.jpg'),
        ('Jane', 'Smith', 'static/def_user_img.jpg'),
        ('Melody', 'Jones', 'static/def_user_img.jpg'),
        ('Sarah', 'Palmer', 'static/def_user_img.jpg'),
        ('Alex', 'Miller', 'static/def_user_img.jpg'),
        ('Shana', 'Smith', 'static/def_user_img.jpg'),
        ('Maya', 'Malarkin', 'static/def_user_img.jpg');

