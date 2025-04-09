# Country Explorer Application

## 📋 Overview

Country Explorer is an interactive web application that allows users to explore information about countries around the world. The application features data visualization, country comparisons, interactive charts, and detailed information about each country.

## ✨ Features

- **Country Cards** - Browse through countries with visually appealing cards
- **Favorites System** - Save your favorite countries for quick access
- **Interactive Globe** - Explore countries on a 3D globe
- **Advanced Statistics** - View and compare countries by:
  - Population
  - Area
  - Population density
- **Data Visualization** - Interactive charts powered by D3.js
- **Region Filtering** - Filter countries by geographical regions
- **Responsive Design** - Works on desktop and mobile devices
- **Dark Mode Support** - Choose between light and dark themes
- **Accessibility Features** - Built with ARIA attributes for better screen reader support
- **Export Functionality** - Download charts as SVG files

## 🛠️ Technology Stack

- **Frontend Framework**: React.js
- **Routing**: React Router
- **Styling**: Tailwind CSS with Flowbite components
- **Data Visualization**: D3.js
- **Icons**: Heroicons
- **State Management**: React Hooks (useState, useEffect, useContext)
- **API Integration**: RESTful API calls with fetch

## 📦 Installation

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/your-username/country-explorer.git
cd country-explorer
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser


### Environment Variables
For API keys or environment-specific configurations, add them to your Netlify dashboard under:
Site Settings → Build & Deploy → Environment

## 🧪 API Integration

The application uses the REST Countries API to fetch country data:
- Base endpoint: https://restcountries.com/v3.1/
- All countries: `/all`
- Country by code: `/alpha/{code}`

## 🔍 Usage Guide

### Home Page
- Browse country cards in list view
- Toggle to globe view for interactive exploration
- Search for countries by name
- Filter countries by region

### Country Details
- Click on any country card to view detailed information
- Toggle favorite status by clicking the heart icon
- View geographical, demographic, and economic data

### Statistics Page
- Compare countries by different metrics
- Export charts as SVG files
- Filter statistics by region
- Switch between population, area, and density views

## 🏆 Features Implemented

| Feature | Description | Status |
|---------|-------------|--------|
| Country Cards | Display countries in card format | ✅ Completed |
| Favorites | Save and retrieve favorite countries | ✅ Completed |
| Country Details | View detailed information about each country | ✅ Completed |
| Interactive Globe | 3D visualization of countries | ✅ Completed |
| Statistics | D3.js powered charts and comparisons | ✅ Completed |
| Region Filtering | Filter countries by region | ✅ Completed |
| Responsive Design | Mobile-friendly layout | ✅ Completed |
| Dark Mode | Theme switching capability | ✅ Completed |
| Accessibility | ARIA attributes, keyboard navigation | ✅ Completed |
| Chart Export | Download visualizations as SVG | ✅ Completed |

## 📚 Code Structure

```
country-explorer/
├── public/
├── src/
│   ├── components/
│   │   ├── CountryCard.jsx        # Country card component
│   │   ├── InteractiveGlobe.jsx   # 3D globe visualization
│   │   ├── LoadingSpinner.jsx     # Loading indicator
│   │   └── SearchFilter.jsx       # Search and filter controls
│   ├── pages/
│   │   ├── Home.jsx               # Home page with country listing
│   │   ├── CountryDetail.jsx      # Country details page
│   │   └── Statistics.jsx         # Statistics and visualization page
│   ├── service/
│   │   └── api.js                 # API interaction functions
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
└── package.json                   # Dependencies and scripts
```

## 🙏 Acknowledgments

- REST Countries API for providing country data
- D3.js for powerful data visualization
- Flowbite React for UI components
- Tailwind CSS for styling
- React Router for navigation
- Heroicons for beautiful iconography

## 📄 License

This project is part of an academic assignment and is subject to the policies of the educational institution.

---

## 👨‍💻 Developer

- IT22323934 - Asiri Jayawardena