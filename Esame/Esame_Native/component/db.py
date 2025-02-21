from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)  # Abilita il CORS per tutte le rotte

# Configurazione database
db_config = {
    "host": "localhost",  # Cambia con l'indirizzo IP della tua macchina
    "port": "5432",
    "dbname": "accademia",
    "user": "postgres",
    "password": "postgres"
}

def get_db_connection():
    try:
        return psycopg2.connect(**db_config, cursor_factory=RealDictCursor)
    except Exception as e:
        print(f"Errore di connessione al database: {e}")
        return None  # Restituisce None in caso di errore

@app.route('/assenza', methods=['GET'])
def get_assenza():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM assenza")
    risultato = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(risultato)

@app.route('/assenza', methods=['POST'])
def add_assenza():
    new_data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO assenza (colonna1, colonna2) VALUES (%s, %s) RETURNING *", 
        (new_data['colonna1'], new_data['colonna2'])
    )
    connection.commit()
    risultato = cursor.fetchone()
    cursor.close()
    connection.close()
    return jsonify(risultato), 201

@app.route('/assenza/<int:id>', methods=['PUT'])
def update_assenza(id):
    update_data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute(
        "UPDATE assenza SET colonna1 = %s, colonna2 = %s WHERE id = %s RETURNING *", 
        (update_data['colonna1'], update_data['colonna2'], id)
    )
    connection.commit()
    risultato = cursor.fetchone()
    cursor.close()
    connection.close()
    if risultato:
        return jsonify(risultato)
    return jsonify({"error": "Record non trovato"}), 404

@app.route('/assenza/<int:id>', methods=['DELETE'])
def delete_assenza(id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM assenza WHERE id = %s RETURNING *", (id,))
    connection.commit()
    risultato = cursor.fetchone()
    cursor.close()
    connection.close()
    if risultato:
        return jsonify({"message": "Record eliminato con successo"})
    return jsonify({"error": "Record non trovato"}), 404

@app.route('/progetto', methods=['GET'])
def get_progetto():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM progetto")
    risultato = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(risultato)

@app.route('/wp', methods=['GET'])
def get_wp():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM wp")
    risultato = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(risultato)

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Risorsa non trovata"}), 404

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({"error": "Errore interno del server"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004)
