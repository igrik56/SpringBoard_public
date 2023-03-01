Work done:

        IN SEED.PY:

    Wrong import from app. Changed db to app.
    Added import of db from models.


        IN MODELS.PY:

    Added and implemented @classmethod edit() for User, that will 
        also check for authentication before update user.


        IN FORMS.PY:

    Fixed email validator from class Email() to instance email.
    Implimented UserEditForm()


        IN APP.PY:

    Added app.app_context().push() and db.create_all().
    Implemented logout().
    Added from form import UserEditForm
    Implemented profile() now users can update their profiles
    Added .filter() homepage(). Now it will only show messages 
        from following users and itself.
    Added likes variable.
    Implemented like_add()
    Implemented likes_show()

    

        IN DETAIL.HTML

    Added header image.
    Implemented BIO and Location.


        IN FOLLOWERS.HTML and IN FOLLOWING.HTML

    Implemented BIO to users' cards.


        IN LIKES.HTML

    Created likes.html that extends detail.html and shows
        messages that were liked by user.


        IN TEST_USER_MODEL
    