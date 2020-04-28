from backend.models import Word

Word.objects.all().delete()


words = """
Mouchoir
Expression
Stupide
Baril
Photo
Statue
Drapeaux
Jus
Farfouiller
Engagement
Rafle
Jument
Grandir
Dessert
Embouchure
Courant
Aviron
Distiller
Difficile
Logique
Fantaisie
Fantoche
Censure
Mars
Conducteur
Groenland
Nouveau
Immobile
Jalousie
Ravin
Phoque
Doberman
Vain
Respirer
Passage
Rectangle
Courses
Plagiat
Hollande
Filles
Faible
Tulipe
Ballons
Lent
Bandeau
Cigarettes
Coyote
Rasoir
Clara
Caraïbes
Guillotine
Grassouillet
Poire
Pack
Place
Fuir
Ballerine
Loin
Pointe
Pirates
Antilopes
Equateur
Disque
Bourse
Amygdales
Angles
Missions
Poêle
Footballeur
Gorille
"""


def create_words():
    for word in words.split():
        Word.objects.create(word=word)
        print(word)


create_words()
