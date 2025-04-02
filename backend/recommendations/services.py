from django.contrib.auth import get_user_model
from recommendations.ultils import preprocess_user_data, calculate_user_similarities
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from django.db import close_old_connections
User = get_user_model()

class RecommendationEngine:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()  
        self.refresh_data()  
    
    def get_similar_users(self, user_id, top_n=5):
        try:
            user_index = self.user_ids.index(user_id)
            
            # Get all similarity scores for this user
            user_similarities = self.similarity_matrix[user_index]
            
            # Create array of indices [0, 1, 2, ..., n]
            all_indices = np.arange(len(user_similarities))
            
            # Create pairs of (similarity_score, index)
            scored_indices = list(zip(user_similarities, all_indices))
            
            # Sort by score descending, then by index ascending
            sorted_indices = sorted(scored_indices, key=lambda x: (-x[0], x[1]))
            
            # Filter out the user's own index and get top_n
            similar_indices = [
                idx for score, idx in sorted_indices 
                if idx != user_index
            ][:top_n]
            
            similar_users = [self.users[i] for i in similar_indices]
            return similar_users
        except ValueError:
            return []
        
    def refresh_data(self):
        """Refresh all data and recalculate similarities"""
        close_old_connections()
        self.users = list(User.objects.all().iterator())
        self.user_ids = [user.id for user in self.users]
        self.user_data = preprocess_user_data(self.users)
        
        # Fit vectorizer and transform all data
        self.tfidf_matrix = self.vectorizer.fit_transform(self.user_data)
        self.similarity_matrix = cosine_similarity(self.tfidf_matrix)
        
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
