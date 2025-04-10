import sys
from sentence_transformers import SentenceTransformer, util

title = sys.argv[1]

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
description = f"Это программа под названием «{title}». Она рассказывает о культурных событиях, интересных людях и историях."

print(description)

