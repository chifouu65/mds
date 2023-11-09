/**
 * !! Explication choix du design pattern decorator !!
 * * le design pattern decorator permet d'ajouter des fonctionnalités a un object de maniere flexible
 * * le design pattern decorator permet de ne pas avoir a modifier l'object de base (ici le bouton)
 * * le decorztor buttonDecorator encapsule le button et ajoute des methonde pour definir ses propriétés
 * 
 * ? pourquoi utiliser le pattern décorator plutot que le pattern buildeur ? (complexe vs flexible)
    Le pattern builder permet de créer des objets complexes.
    Le pattern decorator permet d'ajouter des fonctionnalités à un objet de manière flexible.
    jai préfeter choisir le décorateur car un button est souvent un object ou les fonctionnalités 
    sont ajoutées au fur et a mesure et ont besoin d'etre flexible
 * ? la function .prototype permet d'ajouter des methodes a un object
 * ? la function createButton utilise le design pattern decorator pour ajouter des fonctionnalités a un bouton
 */

/**
 * @description: class ButtonDecorator: un decorateur pour ajouter des fonctionnalités a un bouton
 * @param {HTMLButtonElement} button 
 */
function ButtonDecorator(button) {
    this.button = button;
}

/**
 * @description: definir la taille du bouton
 * @param {string} tailleX: largeur du bouton
 * @param {string} tailleY: hauteur du bouton
 */
ButtonDecorator.prototype.setSize = function (tailleX, tailleY) {
    this.button.style.width = tailleX;
    this.button.style.height = tailleY;
    return this;
}

/**
 * @description: methode pour définir les couleur
 * @param {string} couleur: couleur de fond du bouton
 * @param {string} texteCouleur: couleur du texte du bouton
 */
ButtonDecorator.prototype.setColor = function (couleur, texteCouleur) {
    this.button.style.backgroundColor = couleur;
    this.button.style.color = texteCouleur;
    return this;
}

/**
 * @description: methode pour definr le rayon de l'arrondie de la bordure du button
 * @param {string} arrondie 
 */
ButtonDecorator.prototype.setRadius = function (arrondie) {
    this.button.style.borderRadius = arrondie;
    return this;
}

/**
 * @description: methode pour definir la position du bouton (gauche ou droite)
 * @param {int ( 0 | 1 ); 0 = droite} gauche 
 */
ButtonDecorator.prototype.setPosition = function (gauche) {
    if (gauche) {
        this.button.style.left = "0px";
    } else {
        // if (droite) =>
        this.button.style.right = "0px";
    }
    return this;
}

/**
 * @description: methode pour definir le texte du bouton
 * @param {string} texte 
 * @returns 
 */
ButtonDecorator.prototype.setText = function (texte) {
    this.button.appendChild(document.createTextNode(texte));
    return this;
}

/**
 * @description: methode pour definir la function callback du btn (onCLick) 
 * @param { () => void } callback 
 * @returns 
 */
ButtonDecorator.prototype.setCallback = function (callback) {
    this.button.setAttribute("onClick", callback);
    return this;
}

/**
 * function createButton utilisant le design pattern decorator
 * @param {string} tailleX 
 * @param {string} tailleY 
 * @param {int} gauche 
 * @param {string} couleur 
 * @param {string} texteCouleur 
 * @param {string} onclickCallback 
 * @param {string} arrondie 
 * @param {string} texte 
 * @param {string} cible 
 */
function createButton(tailleX, tailleY, gauche, couleur, texteCouleur, onclickCallback, arrondie, texte, cible) {
    let bouton = document.createElement("button");
    // valeur de base pour le bouton
    bouton.setAttribute("type", "button");
    bouton.style.fontWeight = "bold";
    bouton.style.position = "absolute";
    bouton.style.margin = "15px";

    // creation d'un new object décorator pour le bouton 
    let buttonDecorator = new ButtonDecorator(bouton);

    // utilisation du decorateur pour definir les propriétés du bouton
    buttonDecorator.setSize(tailleX, tailleY)
        .setColor(couleur, texteCouleur)
        .setRadius(arrondie)
        .setPosition(gauche)
        .setText(texte)
        .setCallback(onclickCallback);

    // ajout du bouton au DOM
    document.querySelector(cible).appendChild(bouton);
}


/**
 * !! test here !!
*/

// function (test) pour createButton
let onClick = (text) => {
    alert(text)
};

// creation des boutons
createButton("200px", "80px", 0, "#FF3333", "#FFFFFF",
    "onClick('je suis une erreur auss')", "15px", "Bouton Erreur", "main");

createButton("100px", "100px", 1, "#23FF23", "#000000",
    "onClick('je suis validé aussi')", null, "Bouton Validation", "main");

