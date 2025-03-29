# services/recommendation_service.py
from django.contrib.auth import get_user_model
from recommendations.ultils import preprocess_user_data, calculate_user_similarities
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

User = get_user_model()

class RecommendationEngine:
    def __init__(self):
        self.users = User.objects.all()
        self.user_data = preprocess_user_data(self.users)
        self.similarity_matrix = calculate_user_similarities(self.user_data)
        self.user_ids = [user.id for user in self.users]
    
    def get_similar_users(self, user_id, top_n=5):
        try:
            user_index = self.user_ids.index(user_id)
            similar_indices = np.argsort(self.similarity_matrix[user_index])[::-1][1:top_n+1]
            similar_users = [self.users[i] for i in similar_indices]
            return similar_users
        except ValueError:
            return []
    
    def refresh_data(self):
        """Refresh user data and similarity matrix"""
        self.users = User.objects.all()
        self.user_data = preprocess_user_data(self.users)
        self.similarity_matrix = calculate_user_similarities(self.user_data)
        self.user_ids = [user.id for user in self.users]
        
    def update_user_data(self, user_id):
        """Update data for a single user"""
        try:
            user = User.objects.get(id=user_id)
            
            # Ensure user_ids and user_data are initialized
            if user_id not in self.user_ids:
                self.user_ids.append(user_id)
                combined = ' '.join(user.skills) + ' ' + ' '.join(user.interests)
                self.user_data.append(combined.lower())
            else:
                user_index = self.user_ids.index(user_id)
                combined = ' '.join(user.skills) + ' ' + ' '.join(user.interests)
                self.user_data[user_index] = combined.lower()
            
            # Recalculate similarities
            vectorizer = TfidfVectorizer()
            tfidf_matrix = vectorizer.fit_transform(self.user_data)
            self.similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)
        except (User.DoesNotExist, ValueError):
            pass