# Ulhim - Student Achievement Platform

<div align="center">

![Ulhim Logo](frontend/src/assets/images/ulhim.png)

A platform empowering students to celebrate achievements and build meaningful connections.

</div>

---

## 📋 Overview

**Ulhim** addresses a critical challenge faced by college students during their academic journey by providing a supportive community platform. Our mission is to create an environment where students can:

- 🌟 Celebrate small victories and achievements
- 📚 Share knowledge and educational resources
- 🤝 Connect with peers from diverse backgrounds
- 💡 Exchange ideas and experiences

## ✨ Features

### Core Functionality

- **🎯 Community Sharing**
  - Post and celebrate achievements
  - Share progress updates
  - Document academic milestones

- **📚 Knowledge Exchange**
  - Share study resources
  - Exchange academic tips
  - Provide peer support

- **🤝 Social Connectivity**
  - Connect with like-minded peers
  - Build study groups
  - Network across institutions

- **💬 Engagement Tools**
  - Like and comment on posts
  - Follow interesting topics
  - Join academic discussions

## 🛠️ Tech Stack

### Backend
- **Django REST Framework** - Robust API development
- **PostgreSQL** - Reliable data storage
- **JWT** - Secure authentication


### Frontend
- **React 18** - Modern UI development
- **Tailwind CSS** - Responsive styling
- **React Query** - Efficient data fetching
- **React Router** - Seamless navigation



## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- Python (3.8 or later)
- Node.js (16.x or later)


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/ulhim.git
   cd ulhim
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   ```bash
   # Backend (.env)
   cp .env.example .env

   # Frontend (.env)
   cp .env.example .env
   ```

5. **Start the development servers**
   ```bash
   # Backend
   python manage.py runserver

   # Frontend (in a new terminal)
   npm start
   ```


## 📞 Contact


## 🙏 Acknowledgments

- Thanks to all contributors who help make Ulhim better
- Special thanks to our student community for their feedback and support