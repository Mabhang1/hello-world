import re
import nltk
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

print("~By 4701 Abhang Mane")
# Download NLTK data if not already installed
nltk.download('punkt')
nltk.download('stopwords')

from nltk.corpus import stopwords

# Function to preprocess and clean text
def preprocess_text(text):
    # Remove special characters and digits
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Convert to lowercase
    text = text.lower()
    # Tokenize the text
    tokens = nltk.word_tokenize(text)
    # Remove stopwords
    tokens = [word for word in tokens if word not in stopwords.words('english')]
    # Join tokens into a cleaned text
    cleaned_text = ' '.join(tokens)
    return cleaned_text

# Function to calculate cosine similarity between two documents
def calculate_cosine_similarity(doc1, doc2, tfidf_vectorizer):
    tfidf_matrix = tfidf_vectorizer.transform([doc1, doc2])
    cosine_sim = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])
    return cosine_sim[0][0]

# Sample documents
document1 = "Natural language processing is a subfield of artificial intelligence."
document2 = "NLP is a branch of AI that deals with the interaction between computers and humans using natural language."
document3 = "This document has no similarity with the previous two."

# Preprocess documents
document1 = preprocess_text(document1)
document2 = preprocess_text(document2)
document3 = preprocess_text(document3)

# Create a TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer()

# Fit and transform the documents
tfidf_matrix = tfidf_vectorizer.fit_transform([document1, document2, document3])

# Calculate cosine similarity between document1 and document2
similarity_score = calculate_cosine_similarity(document1, document2, tfidf_vectorizer)

# Set a similarity threshold to identify reused passages
similarity_threshold = 0.7

# Check if the similarity score is above the threshold
if similarity_score > similarity_threshold:
    print("Document 1 and Document 2 have reused passages.")
else:
    print("Document 1 and Document 2 do not have reused passages.")

# Calculate cosine similarity between document1 and document3
similarity_score = calculate_cosine_similarity(document1, document3, tfidf_vectorizer)

# Check if the similarity score is above the threshold
if similarity_score > similarity_threshold:
    print("Document 1 and Document 3 have reused passages.")
else:
    print("Document 1 and Document 3 do not have reused passages.")


