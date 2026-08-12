---
title: "Lezione 9 - Gestione delle sessioni"
codice: "as2526/triennio-quinte/informatica"

layout: "corso-lezione"

id: "lez-09"
numero: "9"
descrizione: "Gestione delle sessioni"
data: "08/01"
licenza: "CC BY-NC-SA 4.0"
licenza_img: "cc-by-ns-sa.png"
licenza_link: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
argomenti: |
    * Definizione di *sessione*;
    * Protocollo HTTP come protocollo *stateless*;
    * Funzione `session_start()`;
    * Funzione `session_name(?[...])`;
    * Funzioni sulle variabili di sessione:
        * Assegnazione (`$_SESSION["..."] = "..."`);
        * Esistenza (`key_exists("...", $_SESSION)`);
        * Eliminazione (`unset($_SESSION["..."])`).
    * Eliminazione di una sessione:
        * Funzione `session_unset()`;
        * Funzione `session_destroy()`.
    * Definizioni:
        * Variabile `$_SESSION`;
        * Cookie.
    * Esempi:
        * Lettura di una variabile di sessione;
        * Scrittura di una variabile di sessione;
        * Eliminazione di una variabile di sessione;
        * Esistenza di una variabile;
        * Eliminazione della sessione.

materiali:
  - icon: "bi-file-earmark-slides"
    testo: "Slides della lezione"
    link: "Lez10_GestioneSessioni.pdf"

date: 2026-08-07T11:09:00+02:00
---
