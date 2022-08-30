from mongoengine.connection import connect
from mongoengine.document import Document, DynamicDocument
from mongoengine.fields import BooleanField, EmailField, IntField, ListField, ReferenceField, StringField
# from mongoengine_goodjson.document import Document
from werkzeug.security import check_password_hash

connect('recipes-db')


class User(DynamicDocument):
    user_id = StringField(primary_key=True, required=True)
    username = StringField(required=True)
    email = EmailField(unique=True)
    hashed_password = StringField()
    admin_status = BooleanField(default=False)
    recipes = ListField(ReferenceField('Recipe'))

    def is_password_correct(self, password):
        return check_password_hash(self.hashed_password, password)

    def userDoc(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
            'admin_status': self.admin_status,
            'recipes': [{
                'recipe_id': recipe.recipe_id,
                'name': recipe.name,
                'ingredients': [
                    {
                        'name': ingredient.name,
                        'quantity': ingredient.quantity,
                        'type': ingredient.type
                    } for ingredient in recipe.ingredients
                ],
                'steps': recipe.steps,
                'imagePath': recipe.imageURL
            } for recipe in self.recipes]
        }


class Recipe(Document):
    recipe_id = IntField(primary_key=True)
    name = StringField()
    ingredients = ListField(ReferenceField('Ingredient'))
    steps = ListField(StringField())
    imageURL = StringField()

    meta = {'collection': 'recipe'}

    def recipeDoc(self):
        return {
            'recipe_id': self.recipe_id,
            'name': self.name,
            'ingredients': [
                {
                    'name': ingredient.name,
                    'quantity': ingredient.quantity,
                    'type': ingredient.type
                } for ingredient in self.ingredients
            ],
            'steps': self.steps,
            'imageURL': self.imageURL
        }


class Ingredient(Document):
    name = StringField()
    quantity = StringField()
    type = StringField()

    meta = {'collection': 'ingredient'}


user = User.objects().get(user_id="d61855c0-9154-11eb-9613-e4b97a318d38")
print(user.userDoc())
