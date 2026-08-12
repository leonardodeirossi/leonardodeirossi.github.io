---
title: "Lezione 10 - Upload di file"
codice: "as2526/triennio-quinte/informatica"

layout: "corso-lezione"

id: "lez-10"
numero: "10"
descrizione: "Upload di file"
data: "22/01"
licenza: "CC BY-NC-SA 4.0"
licenza_img: "cc-by-ns-sa.png"
licenza_link: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
argomenti: |
    * Definizione di *storage*;
    * Schema dello storage nel filesystem;
    * Codici di stato HTTP:
        * 400 - Bad Request;
        * 413 - Content Too Large;
        * 415 - Unsupported Media Type.
    * Preparazione all'upload di un file (form HTML):
        * Tipo di richiesta `POST`;
        * Attributo `enctype="multipart/form-data"`.
    * Preparazione all'upload di un file (PHP):
        * Funzione `basename([...])`;
        * Array associativo globale `$_FILES`:
            * Variabile `tmp_name`.
        * Funzione `file_exists([...])`;
        * Funzione `move_uploaded_file([...])`.
    * Media types (MIME types):
        * Definizione;
        * MIME Type vs. estensione;
        * Variabile `type`.

materiali:
  - icon: "bi-file-earmark-slides"
    testo: "Slides della lezione"
    link: "Lez11_UploadFile.pdf"

date: 2026-08-07T11:17:00+02:00
---
