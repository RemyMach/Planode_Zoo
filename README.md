# Planode_Zoo
Réalisation d'une API en Typescript avec l'utilisation de l'ORM Sequelize afin de permettre de gérer un Zoo

## Démarrer l'environnement de dev

### Installer l'ensemble des dépendances du projet
- se placer à la racine du projet
```
npm install
```

### Créer un fichier dev.env avec les mêmes pair clé valeur que dev.env.example
- se placer dans le dossier config
- créer un fichier dev.env en copiant dev.env.example
- remplir toutes les valeurs entre {} par les valeurs correspondant à cotre env de dev

### Start l'env de dev
```
npm run dev
```

## Démarrer l'app en local avec la db de prod

### Installer l'ensemble des dépendances du projet
- se placer à la racine du projet
```
npm install
```

### Créer un fichier prod.env avec les mêmes pair clé valeur que prod.env.example
- se placer dans le dossier config
- créer un fichier prod.env en copiant prod.env.example
- remplir toutes les valeurs entre {} par les valeurs correspondant à cotre env de dev

### Start l'env de dev
```
npm run prod
```

## Démarrer l'environnement de prod 

### Installer l'ensemble des dépendances du projet
- se placer à la racine du projet
```
npm install
```

### Pour les variables d'environnement 
- l'hébergeur heroku a été utilisé
- les variables d'environement sont donc référencé dans le dashboard heroku

### Transcrire les fichiers TS en fichier js dans un dossier dist
```
npm run build
```

### copié le dossier dist dans le serveur heroku
- se mettre à la rasine du dossier dist
- installer les libs de prod
```
npm install --prod
```

- lancer l'application
```
npm start
```

## Accéder à l'application
- se référencer aux exports Postman ainsi que à la documentation fournie pour accéder au serveur de production