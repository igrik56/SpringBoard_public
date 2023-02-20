"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.sql import func

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    """Model for Users"""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)
    img_url = db.Column(
        db.String(200), nullable=False, default="static/def_user_img.jpg"
    )
    posts = db.relationship("Post", backref="creator")

    def __repr__(self):
        return f"<User {self.first_name}, {self.last_name}, {self.img_url}"


class Post(db.Model):
    """Model for Posts"""

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(70), nullable=False, unique=True)
    content = db.Column(db.String(2000), nullable=False, unique=True)
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=func.Now(),
    )
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        default=func.Now(),
    )
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    tags = db.relationship("Tag", secondary="posts_tags", backref="posts")

    def __repr__(self):
        return f"<Post {self.title}, {self.content}, {self.user_id}"

    @property
    def str_updated_date(self):
        return self.updated_at.strftime("%m/%d/%Y, %H:%M:%S")


class Tag(db.Model):
    """Model for Tags"""

    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(15), nullable=False, unique=True)

    def __repr__(self):
        return f"<Tag: {self.id}, {self.name}"


class PostTag(db.Model):
    """Model for M2M table for post and tag"""

    __tablename__ = "posts_tags"

    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id"), primary_key=True)
