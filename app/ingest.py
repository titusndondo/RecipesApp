from mongoengine.errors import NotUniqueError
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import json
from mongoengine.connection import connect
from models.models import User, Recipe, Ingredient


connect('recipes-db')


# res = Recipe.objects()
# res.delete()
# res = Ingredient.objects()
# res.delete()
# res = User.objects()
# res.delete()

# Create Recipe Document

with open('./data/Recipes.json') as data:
    recipes = json.load(data)


usernames = ['Admin', 'One', 'Two', 'Three']
recipe_assignments = {
    'One': [1, 2, 3],
    'Two': [4, 5, 6],
    'Three': [7, 8, 9]
}


users = [{
    'username': username,
    'email': f"{username.lower()}@{username.lower()}.com",
    'hashed_password': generate_password_hash(username.lower()),
    'admin_status': {True: True, False: False}[username == 'Admin'],
    'recipes': []  # (i + 1, recipe) for i, recipe in enumerate(recipes)
} for username in usernames]


def assign_recipes_to_users():
    for i, recipe in enumerate(recipes):
        id = i + 1
        for username in usernames[1:]:
            if id in recipe_assignments[username]:
                for user in users:
                    if user['username'] == username:
                        recipe['recipe_id'] = id
                        for key in ['timers', 'originalURL']:
                            try:
                                recipe.pop(key)
                            except:
                                pass
                        user['recipes'].append(recipe)
    return None


assign_recipes_to_users()


for user in users:
    recipes = []
    for rec in user['recipes']:
        ingredients = []
        for ingredient in rec['ingredients']:
            ingredient = Ingredient(**ingredient).save()
            ingredients.append(ingredient)

        rec['ingredients'] = ingredients
        recipe = Recipe(**rec).save()
        recipes.append(recipe)

    user['recipes'] = recipes
    user['user_id'] = str(uuid.uuid1())
    user = User(**user).save()


for i, recipe in enumerate(recipes):

    recipe['id'] = i + 1

    ingredients = []
    for ingr in recipe['ingredients']:
        ingredient = Ingredient(
            name=ingr['name'],
            quantity=ingr['quantity'],
            type=ingr['type']
        ).save()
        ingredients.append(ingredient)

    recipe = Recipe(
        id=recipe['id'],
        name=recipe['name'],
        ingredients=ingredients,
        steps=recipe['steps'],
        imagePath=recipe['imageURL']
    ).save()
