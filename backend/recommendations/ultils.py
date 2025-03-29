from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def preprocess_user_data(users):
    """
    Convert user skills and interests into a format suitable for vectorization
    """
    user_data = []
    for user in users:
        # Combine skills and interests into a single string
        combined = " ".join(user.skills) + " " + " ".join(user.interests)
        user_data.append(combined.lower())
    return user_data

def calculate_user_similarities(user_data):
    """
    Calculate similarity matrix between users
    """
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(user_data)
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    return cosine_sim