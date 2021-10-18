---------------------------------------------------------
-- Projekt - ISS -- Aukce: prodej a nákup zboží a majetku prostřednictvím dražby
---------------------------------------------------------

------- CLEAR TABLES -------  

DROP TABLE "Prihoz";
DROP TABLE "Aukce";
DROP TABLE "Objekt";
DROP TABLE "Licinator";
DROP TABLE "Zakaznik";
DROP TABLE "Osoba";


--------------------------------------     CREATING TABLES      ----------------------------------------

CREATE TABLE "Osoba"(
  "IDUzivatele" INT GENERATED AS IDENTITY NOT NULL PRIMARY KEY,
  "Jmeno" VARCHAR(32) NOT NULL,
  "Prijmeni" VARCHAR(32) NOT NULL,
  "StavKonta" NUMBER,
  "DatumNarozeni" DATE NOT NULL,
  "Bydliste" VARCHAR(100) NOT NULL,
  "TelCislo" NUMBER NOT NULL,
  "Email" VARCHAR(32) NOT NULL 
);

CREATE TABLE "Zakaznik"(
  "IDZakaznika" INT NOT NULL,

  CONSTRAINT "ZakaznikFK" FOREIGN KEY("IDZakaznika") REFERENCES "Osoba" ("IDUzivatele") ON DELETE CASCADE
);

CREATE TABLE "Licinator"(
  "RodneCislo" NUMBER NOT NULL,
  "IDLicinator" INT NOT NULL,

  CONSTRAINT "LicinatorFK" FOREIGN KEY("IDLicinator") REFERENCES "Osoba" ("IDUzivatele") ON DELETE CASCADE
);

CREATE TABLE "Objekt"(
  "IDobjektu" INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,
  "Adresa" VARCHAR(100) NOT NULL,
  "DatumStavby" DATE NOT NULL,
  "Stav" VARCHAR(20) NOT NULL,
  "OdhadovanaCena" NUMBER
);

CREATE TABLE "Aukce"(
  "CisloAukce" INT GENERATED AS IDENTITY NOT NULL PRIMARY KEY,
  "Datum" DATE NOT NULL,
  "Nazev"  VARCHAR(100) NOT NULL,
  "VyvolavaciCena" NUMBER,
  "MinPrihoz" NUMBER NOT NULL,
  "Licinator" INT NOT NULL,
  "Autor" INT NOT NULL,
  "IDobject" INT NOT NULL,

  CONSTRAINT "LicinatorFK" FOREIGN KEY("Licinator") REFERENCES "Osoba" ("IDUzivatele") ON DELETE SET NULL,
  CONSTRAINT "AutorFK" FOREIGN KEY("Autor") REFERENCES "Osoba" ("IDUzivatele") ON DELETE SET NULL,
  CONSTRAINT "IDObjectFK" FOREIGN KEY("IDObject") REFERENCES "Objekt" ("IDobjektu") ON DELETE SET NULL

);

CREATE TABLE "Prihoz"(
    "Zakaznik" INT NOT NULL,
    "Licinator" INT NOT NULL,
    "IDaukce" INT NOT NULL,

    CONSTRAINT "AukceFK" FOREIGN KEY("IDaukce") REFERENCES "Aukce" ("CisloAkce") ON DELETE SET NULL,
    CONSTRAINT "PrihodilFK" FOREIGN KEY("Zakaznik") REFERENCES "Osoba" ("IDUzivatele") ON DELETE SET NULL,
    CONSTRAINT "ZaznamenalFK" FOREIGN KEY("Licinator") REFERENCES "Osoba" ("IDUzivatele") ON DELETE SET NULL
);




