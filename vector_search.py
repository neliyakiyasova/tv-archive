from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)
CORS(app)

model = SentenceTransformer('all-MiniLM-L6-v2')  

def get_programs():
    conn = sqlite3.connect('tv_programs.db')
    cursor = conn.cursor()
    cursor.execute("SELECT title, description, channel, link FROM programs")
    rows = cursor.fetchall()
    conn.close()
    programs = [{"title": r[0], "description": r[1], "channel": r[2], "link": r[3]} for r in rows]
    return programs

programs = get_programs()
titles = [p['title'] for p in programs]
title_embeddings = model.encode(titles, convert_to_tensor=True)

@app.route("/vector-search")
def vector_search():
    query = request.args.get("query")
    if not query:
        return jsonify({"error": "Query is required"}), 400

    query_embedding = model.encode(query, convert_to_tensor=True)
    hits = util.semantic_search(query_embedding, title_embeddings, top_k=10)[0]

    results = [programs[hit['corpus_id']] for hit in hits]
    return jsonify(results)

if __name__ == "__main__":
    app.run(port=4000)
