# Progetto React Native - Gestione Presenze

## Descrizione

Questa applicazione React Native è progettata per semplificare la gestione delle presenze e la visualizzazione di dati importanti per studenti e personale scolastico.
L'app consente di:

- Visualizzare una schermata informativa "Chi siamo".
- Recuperare dati da un server o utilizzare dati di esempio se il server non è disponibile.
- Mostrare i dati in una tabella interattiva.
- Navigare tra le diverse sezioni tramite una barra di navigazione inferiore.

## Requisiti

Per eseguire correttamente il progetto, è necessario avere installato:

- [Node.js](https://nodejs.org/) (versione consigliata: 16+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (installabile con `npm install -g expo-cli`)
- [React Native](https://reactnative.dev/docs/environment-setup)
- Un emulatore Android/iOS o un dispositivo fisico con Expo Go

## Installazione

1. Clonare il repository:
   ```sh
   git clone  https://github.com/Osamak7/Esame.git
   cd Esame_Native 
   ```
2. Installare le dipendenze necessarie:
   ```sh
   npm install
   ```
3. Avviare l'applicazione:
   ```sh
   npm run web
   ```
4. Se si vuole avviare direttamente su un dispositivo specifico:
   - Android:
     ```sh
     npm run android
     ```
   - iOS:
     ```sh
     npm run ios
     ```
5. Per testare l'app su un dispositivo mobile, scansionare il codice QR con l'app Expo Go.

## Dipendenze Principali

- `react-native`: Framework per lo sviluppo di app mobili.
- `axios`: Per effettuare richieste HTTP verso il backend.
- `expo`: Per il supporto allo sviluppo React Native.

## Backend

L'app effettua richieste HTTP a un server locale su `http://localhost:5004`.Se il server non è disponibile, verranno utilizzati dati di esempio presenti in `assets/mockData.json`.

