import os
import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor, GradientBoostingClassifier
from sklearn.cluster import KMeans
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split

os.makedirs("models", exist_ok=True)

def generate_advanced_data(n=3000):
    np.random.seed(42)
    categories = ['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports']
    countries = ['USA', 'UK', 'India', 'Canada', 'Australia']
    
    data = {
        'session_id': [f"sess_{i}" for i in range(1, n+1)],
        'country': np.random.choice(countries, n),
        'category': np.random.choice(categories, n),
        'price': np.round(np.random.uniform(10, 500, n), 2),
        'clicks': np.random.randint(1, 50, n),
        'duration': np.random.randint(10, 1200, n), # duration in seconds
    }
    df = pd.DataFrame(data)
    
    # Advanced logic for Conversion prediction
    # Higher chance if duration > 300s, clicks > 15, and price < 300
    base_chance = ((df['duration'] > 300) & (df['clicks'] > 15) & (df['price'] < 300)).astype(int)
    # Add noise
    df['prediction'] = base_chance ^ (np.random.random(n) > 0.85).astype(int)
    
    # Revenue (only if they buy)
    df['revenue'] = df['prediction'] * df['price'] * np.random.uniform(0.8, 1.2, n)
    df['revenue'] = df['revenue'].round(2)
    
    # Churn Prediction: High bounce rate, low duration, no buy
    df['churn'] = ((df['duration'] < 60) & (df['prediction'] == 0)).astype(int)
    
    # Sequence/Funnel Drop-off (0=Visit, 1=Product, 2=Cart, 3=Purchase)
    # This feature will simulate where the user is likely to stop in the funnel
    def assign_funnel(pred, duration):
        if pred == 1: return 3
        if duration < 30: return 0
        if duration < 120: return 1
        return 2
    df['funnel_step'] = df.apply(lambda row: assign_funnel(row['prediction'], row['duration']), axis=1)

    return df

def train_models():
    print("Generating advanced synthetic data...")
    df = generate_advanced_data(3000)
    
    # Preprocessing
    print("Preprocessing data...")
    le_country = LabelEncoder()
    le_category = LabelEncoder()
    
    df['country_encoded'] = le_country.fit_transform(df['country'])
    df['category_encoded'] = le_category.fit_transform(df['category'])
    
    features = ['country_encoded', 'category_encoded', 'price', 'clicks', 'duration']
    X = df[features]
    y_class = df['prediction']
    y_reg = df['revenue']
    y_churn = df['churn']
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    print("1. Training Classification Model (Conversion)...")
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_scaled, y_class)
    
    print("2. Training Regression Model (Revenue)...")
    reg = RandomForestRegressor(n_estimators=100, random_state=42)
    X_reg_scaled = scaler.transform(df[df['prediction'] == 1][features])
    y_reg_actual = df[df['prediction'] == 1]['revenue']
    if len(X_reg_scaled) > 0:
        reg.fit(X_reg_scaled, y_reg_actual)
    
    print("3. Training Clustering Model...")
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    kmeans.fit(X_scaled)
    
    print("4. Training Churn Prediction Model...")
    churn_clf = GradientBoostingClassifier(n_estimators=100, random_state=42)
    churn_clf.fit(X_scaled, y_churn)
    
    print("5. Training Recommendation Engine (KNN)...")
    # Using NearestNeighbors to find "similar sessions" as product recommendations
    rec_engine = NearestNeighbors(n_neighbors=5, algorithm='ball_tree')
    rec_engine.fit(X_scaled)

    # Save models
    print("Saving models to /models ...")
    with open('models/scaler.pkl', 'wb') as f: pickle.dump(scaler, f)
    with open('models/le_country.pkl', 'wb') as f: pickle.dump(le_country, f)
    with open('models/le_category.pkl', 'wb') as f: pickle.dump(le_category, f)
    with open('models/classifier.pkl', 'wb') as f: pickle.dump(clf, f)
    with open('models/regressor.pkl', 'wb') as f: pickle.dump(reg, f)
    with open('models/kmeans.pkl', 'wb') as f: pickle.dump(kmeans, f)
    with open('models/churn.pkl', 'wb') as f: pickle.dump(churn_clf, f)
    with open('models/recommendation.pkl', 'wb') as f: pickle.dump(rec_engine, f)
    
    # Calculate global feature importance for the Conversion model
    importances = clf.feature_importances_
    features_dict = {feat: float(imp) for feat, imp in zip(features, importances)}
    with open('models/feature_importance.json', 'w') as f:
        import json
        json.dump(features_dict, f)
        
    print("Training Complete!")

if __name__ == "__main__":
    train_models()
