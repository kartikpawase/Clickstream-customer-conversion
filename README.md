# 🚀 Clickstream Customer Conversion AI

> **An Enterprise-Grade AI Analytics Engine** for real-time customer behavior prediction, segmentation, and revenue optimization — powered by Python Flask & Machine Learning.

![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.x-black?style=for-the-badge&logo=flask)
![Scikit-learn](https://img.shields.io/badge/Scikit--Learn-ML-orange?style=for-the-badge&logo=scikit-learn)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📌 Overview

**Clickstream Customer Conversion AI** is a full-stack, production-ready SaaS analytics platform that leverages machine learning to transform raw user clickstream data into powerful business intelligence. It provides:

- 🎯 **Conversion Prediction** — Predict which visitors will convert to buyers
- 💰 **Revenue Forecasting** — Estimate expected revenue per session
- 🔀 **Funnel Analysis** — Identify drop-off hotspots in the customer journey
- 🧩 **User Segmentation** — K-Means clustering to group users by behavior
- ⚠️ **Churn Detection** — Identify at-risk users before they leave
- 🛍️ **Product Recommendations** — Collaborative filtering for personalized suggestions
- 📊 **Feature Importance** — Understand what drives conversions
- 📁 **CSV Data Upload** — Sync historical data seamlessly

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Python 3.9+, Flask, Waitress WSGI |
| **ML Models** | Scikit-learn (RandomForest, KMeans, KNN), XGBoost |
| **Database** | MySQL (via `mysql-connector-python`) |
| **Frontend** | HTML5, CSS3, Vanilla JS |
| **Environment** | `python-dotenv` for config management |
| **CORS** | `flask-cors` |

---

## 📁 Project Structure

```
Clickstream-customer conversion/
├── app.py               # Main Flask application & all API endpoints
├── train_models.py      # ML model training pipeline
├── database.py          # DB connection & logging utilities
├── schema.sql           # MySQL schema setup
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (not committed)
├── models/              # Trained ML model files (.pkl)
│   ├── classifier.pkl
│   ├── regressor.pkl
│   ├── kmeans.pkl
│   ├── churn.pkl
│   ├── recommendation.pkl
│   ├── scaler.pkl
│   ├── le_country.pkl
│   ├── le_category.pkl
│   └── feature_importance.json
├── templates/           # Jinja2 HTML templates
│   ├── index.html
│   ├── dashboard.html
│   ├── prediction.html
│   ├── clustering.html
│   ├── upload.html
│   ├── insights.html
│   └── about.html
└── static/              # CSS, JS, and static assets
```

---

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kartikpawase/Clickstream-customer-conversion.git
cd Clickstream-customer-conversion
```

### 2. Create & Activate Virtual Environment

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=clickstream_db
```

### 5. Set Up MySQL Database

```bash
mysql -u root -p < schema.sql
```

### 6. Train the ML Models

```bash
python train_models.py
```

### 7. Run the Server

```bash
python app.py
```

Open your browser and navigate to: **http://localhost:5000**

---

## 🚀 Vercel Deployment

This project is configured for serverless deployment on Vercel. 

### Steps to Deploy:
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository (`Clickstream-customer-conversion`).
4. Ensure the **Framework Preset** is set to `Other`.
5. Click **Deploy**.

*Note: The `vercel.json` file is already included, which directs all requests to the Flask `app.py` via `@vercel/python`.*

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/predict_conversion` | Predict if a user will convert |
| `POST` | `/predict_revenue` | Forecast expected revenue |
| `POST` | `/predict_next_action` | Predict user's next action in funnel |
| `POST` | `/cluster_users` | Segment user into behavioral cluster |
| `POST` | `/churn_prediction` | Detect churn risk |
| `POST` | `/recommend_products` | Get personalized product recommendations |
| `GET`  | `/get_insights` | Retrieve AI-generated business insights |
| `GET`  | `/funnel_analysis` | Analyze full conversion funnel |
| `GET`  | `/feature_importance` | View ML feature importance scores |
| `POST` | `/upload_data` | Upload CSV data to database |

### Sample Request — Conversion Prediction

```bash
curl -X POST http://localhost:5000/predict_conversion \
  -H "Content-Type: application/json" \
  -d '{
    "country": "USA",
    "category": "Electronics",
    "price": 149.99,
    "clicks": 12,
    "duration": 320
  }'
```

### Sample Response

```json
{
  "status": "success",
  "prediction": 1,
  "confidence_score": 87.43,
  "explanation": "High likelihood of conversion driven by extended duration."
}
```

---

## 🧠 ML Models Used

| Model | Purpose | Algorithm |
|-------|---------|-----------|
| `classifier.pkl` | Conversion prediction | RandomForest Classifier |
| `regressor.pkl` | Revenue forecasting | XGBoost / Ridge Regressor |
| `kmeans.pkl` | User segmentation | K-Means Clustering |
| `churn.pkl` | Churn detection | RandomForest Classifier |
| `recommendation.pkl` | Product recommendations | K-Nearest Neighbors |
| `scaler.pkl` | Feature normalization | StandardScaler |

---

## 📊 User Segments

| Cluster | Segment Name | Behavior |
|---------|-------------|----------|
| 0 | 🛒 Bargain Hunters | Price-sensitive, high cart abandonment |
| 1 | 👁️ Window Shoppers | High views, low purchase intent |
| 2 | 💎 High Value / Loyal | Deep engagement, high conversion rate |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kartik Pawase**  
[![GitHub](https://img.shields.io/badge/GitHub-kartikpawase-black?style=flat&logo=github)](https://github.com/kartikpawase)

---

> ⭐ **Star this repo** if you found it useful!
