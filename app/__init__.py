# Un objet "obj_mon_application" pour utiliser la classe Flask
# Pour les personnes qui veulent savoir ce que signifie __name__ une démonstration se trouve ici :
# https://www.studytonight.com/python/_name_-as-main-method-in-python
# C'est une chaîne de caractère qui permet de savoir si on exécute le code comme script principal
# appelé directement avec Python et pas importé.
from flask import Flask
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
# cors permet de généré automatiquement les droits "allow-origin" etc... Qui permette de répondre
# à la méthod OPTION et donc de pouvoir excectuer la tache !
CORS(app)

# Flask va pouvoir crypter les cookies
app.secret_key = "LE_VxxO**_GON^^^ÂMIRLA"


from app.controller.model import category_page, dashboard_page, item_page, tiqet_page
from app.controller.api import category_api, item_api, tiqet_api