
# MyApp

MyApp è una semplice applicazione React che permette di visualizzare i dati da un database, con un'interfaccia di navigazione basata su React-Bootstrap. I dati vengono recuperati tramite un'API REST e visualizzati in una tabella. In caso di errore nel recupero dei dati dal server, l'app mostra dei dati di prova contenuti in un file JSON.

## Funzionalità

- Visualizza i dati recuperati da un'API REST.
- Gestisce i dati in formato JSON per fallback in caso di errori di connessione.
- Mostra una tabella interattiva con i dati recuperati.
- Possibilità di visualizzare i dati divisi in diverse categorie: Assenza, Progetto, WP.
- Visualizzazione dello stato in base al valore del campo (ad esempio, "In attesa", "In corso", "Completato").

## Requisiti

Per far funzionare l'applicazione, assicurati di avere le seguenti dipendenze installate:

- **Node.js**: Scarica e installa [Node.js](https://nodejs.org/) (versione 14.x o superiore).
- **npm**: Il gestore di pacchetti per Node.js (di solito incluso con Node.js).
- **nvm install node**: Se da problemi conviene anche provare installare node per vedere o settare l'ultima versione.

## Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/Osamak7/Esame.git
   ```

2. Naviga nella cartella del progetto:
   ```bash
   cd myapp
   ```

3. Installa le dipendenze:
   ```bash
   npm install
   ```

4. Avvia il progetto:
   ```bash
   npm run dev
   ```

  

## Come Funziona

### Recupero dei Dati
I dati vengono recuperati tramite richieste HTTP GET utilizzando Axios. Se il server è disponibile, i dati vengono recuperati dal database. In caso contrario, vengono utilizzati dati di prova (mock) contenuti nel file `mockData.json`.

### Struttura dei Dati

I dati vengono organizzati in diverse categorie (es. `assenza`, `progetto`, `wp`). Ogni categoria è rappresentata da una tabella, con le colonne corrispondenti agli attributi degli oggetti nella categoria.

### Interfaccia

- **Navbar**: Permette di navigare tra le categorie di dati (Assenza, Progetto, WP).
- **Tabella**: Ogni tabella mostra i dati della categoria selezionata con l'ID e altre informazioni. Le righe contengono dettagli sui vari record.

### Error Handling

In caso di errore nel recupero dei dati dal server, viene mostrato un messaggio di avviso e i dati vengono caricati dal file `mockData.json`.

## Tecnologie Utilizzate

- **React**: Libreria JavaScript per costruire interfacce utente.
- **Vite**: Strumento di build rapido per applicazioni React.
- **React-Bootstrap**: Libreria di componenti UI basata su Bootstrap.
- **Axios**: Client HTTP per effettuare richieste API.
- **JSON**: Formato dei dati di esempio in caso di errore di connessione.

## Contribuire

1. Fork il progetto.
2. Crea un nuovo ramo (`git checkout -b feature/xyz`).
3. Aggiungi le tue modifiche (`git commit -am 'Aggiungi nuove funzionalità'`).
4. Pusha il ramo (`git push origin feature/xyz`).
5. Crea una Pull Request.

## Licenza

Distribuito sotto la Licenza MIT. Vedere `LICENSE` per maggiori dettagli.