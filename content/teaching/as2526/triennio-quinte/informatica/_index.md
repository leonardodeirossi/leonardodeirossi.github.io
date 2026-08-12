---
title: "Informatica"
classe: "5INC"
scuola: "ITT \"M. Buonarroti\""
anno_scolastico: "2025/2026"
codice: "2025-5inc-computerscience"

layout: "home-corso"

cascade:
  course_root: "/teaching/as2526/triennio-quinte/informatica/"

calendario:
  - giorno: "Ogni giovedì"
    orario: "08:40 / 11:20"
    aula: "Aula R40"

quadrimestri:
  - nome: "Primo quadrimestre"
    lezioni:
        - id: "lez-01"
          numero: "1"
          descrizione: "Introduzione a JavaScript"
          data: "18/09/2025"
          argomenti: |
            * Introduzione a JavaScript:
                * Cenni storici;
                * Sintassi di base.
            * JavaScript come linguaggio interpretato;
            * JavaScript come linguaggio debolmente tipizzato;
            * Variabili in JavaScript:
                * Keywords `var, let, const`;
                * *Scope* delle variabili;
                * Conversioni tra tipi di dato.
            * Tecnica di *hoisting*:
                * Accesso alle variabili prima della loro dichiarazione;
                * Esempi.
          materiali:
            - icon: "bi-file-earmark-slides"
              testo: "Slides della lezione"
              link: "Fall2025_CS300_01_IntroductionToJavaScript.pdf"
            - icon: "bi bi-journal-text"
              testo: "Esercizio 1 - Calcolatrice"
              link: "DoExercises/Ex01.pdf"
            - icon: "bi bi-file-earmark-zip"
              testo: "Esercizio 1 - Calcolatrice (soluzione)"
              link: "DoExercises/Sol/Ex01.zip"

        - id: "lez-02"
          numero: "2"
          descrizione: "Array e oggetti"
          data: "25/09/2025, 02/10/2025"
          argomenti: |
            * Gli array in JavaScript:
                * Dichiarazione e assegnazione;
                * Accesso posizionale;
                * Propriet&agrave; `.length`;
                * Metodi di iterazione:
                    * Ciclo `for` "classico";
                    * Ciclo `for ... of ...`;
                    * Metodo `.forEach([...])`.
                * Metodi di manipolazione:
                    * Metodo `.map([...])`;
                    * Metodo `.filter([...])`.
            * Gli oggetti in JavaScript:
                * Dichiarazione e assegnazione;
                * Accesso con *dot-notation* e *bracket-notation*;
                * Keyword `delete [...]`;
                * Metodi di enumerazione delle propriet&agrave;:
                    * Loop `for ... in ...`;
                    * Funzioni di `Object`:
                        * Funzione `Object.keys()`;
                        * Funzione `Object.values()`;
                        * Funzione `Object.entries()`.
          materiali:
            - icon: "bi-file-earmark-slides"
              testo: "Slides della lezione (1)"
              link: "Fall2025_CS300_02_ObjectsAndArrays.pdf"
            - icon: "bi bi-journal-text"
              testo: "Esercizio 2 - Biblioteca"
              link: "DoExercises/Ex02.pdf"
            - icon: "bi bi-file-earmark-zip"
              testo: "Esercizio 2 - Biblioteca (soluzione)"
              link: "DoExercises/Sol/Ex02.zip"
            - icon: "bi-file-earmark-slides"
              testo: "Slides della lezione (2)"
              link: "Fall2025_CS300_03_ObjectsAndArraysRecall.pdf"
            - icon: "bi bi-journal-text"
              testo: "Esercizio 3 - Salumeria"
              link: "DoExercises/Ex03.pdf"
        
        - id: "lez-03"
          numero: "3"
          descrizione: "Gestione delle date"
          data: "09/10/2025"
          argomenti: |
            * L'oggetto Date():
                * Costruttore;
                * Data per timestamp;
                * Data per stringa ISO;
                * Metodi per la lettura della data:
                    * Metodo `getTime()`;
                    * Metodo `getDate()`;
                    * Metodo `getMonth()`;
                    * [...]
                * Confronto tra date:
                    * Metodo `date1 > date2` (vietatissimo!);
                    * Metodo `date1.getTime() > date2.getTime()`. 
          materiali:
            - icon: "bi-file-earmark-slides"
              testo: "Slides della lezione"
              link: "Fall2025_CS300_04_DatesManagement.pdf"
            - icon: "bi bi-journal-text"
              testo: "Esercizio 4 - Accademia di Idunn"
              link: "DoExercises/Ex04.pdf"

        - id: "lez-04"
          numero: "4"
          descrizione: "JavaScript Object Notation (JSON)"
          data: "23/10/2025"
          argomenti: |
            * Cenni teorici:
                * Utilizzi comuni di JSON;
                * Indipendenza dal linguaggio in uso.
            * Regole sintattiche fondamentali;
            * Integrazione con JavaScript:
                * Metodo `JSON.parse([...])`;
                * Metodo `JSON.stringify([...])`.
          materiali:
            - icon: "bi-file-earmark-slides"
              testo: "Slides della lezione"
              link: "Fall2025_CS300_05_JSObjectNotation.pdf"
            - icon: "bi bi-journal-text"
              testo: "Esercizio 5 - JavaScript Object Notation (JSON)"
              link: "DoExercises/Ex05.zip"
            - icon: "bi bi-journal-text"
              testo: "Esercizio 6 - I giochi degli Dèi"
              link: "DoExercises/Ex06.pdf"
            - icon: "bi bi-link-45deg"
              testo: "Esercizio 7 - Working with JSON (from developer.mozilla.org)"
              link: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON"
              esterno: true

        - id: "lez-05"
          numero: "5"
          descrizione: "Introduzione a PHP"
          data: "06/11/2025"
          argomenti: |
            * Cenni teorici:
              * Origine e prime versioni del linguaggio;
              * Scenari di utilizzo - Web 2.0.
            * Funzionamento di PHP:
              * HTTP request e response;
              * L'interprete PHP;
              * Cenni su `Content-Type`.
            * Requisiti:
              * Lo stack LAMP / WAMP (Linux/Windows + Apache + MySQL + PHP);
              * Installazione e configurazione di XAMPP.
            * Sintassi di PHP:
              * Integrazione di PHP e HTML;
              * Tag di apertura e chiusura (`<?php [...] ?>`);
              * Dichiarazione e assegnazione di variabili.
            * La sagra dei tipi di dato:
              * PHP come linguaggio debolmente tipizzato;
              * Inferenza dei tipi di dato;
              * Metodo `gettype([...])`.
          materiali:
            - icon: "bi-file-earmark-slides"
              testo: "Slides della lezione"
              link: "Fall2025_CS300_06_IntroToPHP.pdf"
            - icon: "bi bi-journal-text"
              testo: "Esercizio 5 - JavaScript Object Notation (JSON)"
              link: "DoExercises/Ex08.zip"

        - id: "lez-06"
          numero: "6"
          descrizione: "Le funzioni in PHP"
          data: "13/11/2025"
          argomenti: |
            * Funzioni definite dall'utente:
              * Definizione di una nuova funzione;
              * Firma della funzione.
            * Invocazione di una funzione:
              * Notazione;
              * Parametri formali e attuali.
            * I parametri di una funzione:
              * Parametri con valore predefinito;
              * Passaggio per valore e per riferimento.
          materiali:
            - icon: "bi-file-earmark-slides"
              testo: "Slides della lezione"
              link: "Fall2025_CS300_07_Functions.pdf"
            - icon: "bi bi-journal-text"
              testo: "Esercizio 5 - JavaScript Object Notation (JSON)"
              link: "DoExercises/Ex09.pdf"

        - id: "lez-07"
          numero: "7"
          descrizione: "Gestione dell'input in PHP"
          data: "20/11/2025"
          argomenti: |
            * Passaggio da front-end a back-end:
              * Uso delle form in HTML;
              * Tipi di input (`type=[...]`);
              * Form `action` e `method`.
            * Le richieste HTTP:
              * Metodi `GET` e `POST`;
              * Uso dei codici di stato (cenni).
            * Gestione delle form:
              * Scope degli input lato front-end;
              * Differenza tra `id=[...]` e `name=[...]`.
          materiali:
            - icon: "bi-file-earmark-slides"
              testo: "Slides della lezione"
              link: "Fall2025_CS300_07_Functions.pdf"
            - icon: "bi bi-journal-text"
              testo: "Esercizio 5 - JavaScript Object Notation (JSON)"
              link: "DoExercises/Ex09.pdf"

  - nome: "Secondo quadrimestre"
    lezioni:

date: 2026-05-06T15:08:00+02:00
---

L'obiettivo del corso &egrave; quello di insegnare la programmazione Web sia front-end che back-end utilizzando framework web basati su JavaScript (front-end) e su PHP (back-end). Integrando il tutto con un database relazionale come MySQL.

<br>