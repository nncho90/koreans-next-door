"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, InstagramLogo, MapPin, CaretUpDown } from "@phosphor-icons/react";

const GlobeGL = dynamic(() => import("react-globe.gl"), { ssr: false });


// Cities with coordinates for pin placement
const CITIES: { name: string; country: string; lat: number; lng: number }[] = [
  // North America — USA
  { name: "New York", country: "USA", lat: 40.71, lng: -74.01 },
  { name: "Los Angeles", country: "USA", lat: 34.05, lng: -118.24 },
  { name: "Chicago", country: "USA", lat: 41.88, lng: -87.63 },
  { name: "Houston", country: "USA", lat: 29.76, lng: -95.37 },
  { name: "Phoenix", country: "USA", lat: 33.45, lng: -112.07 },
  { name: "Philadelphia", country: "USA", lat: 39.95, lng: -75.17 },
  { name: "San Antonio", country: "USA", lat: 29.42, lng: -98.49 },
  { name: "San Diego", country: "USA", lat: 32.72, lng: -117.16 },
  { name: "Dallas", country: "USA", lat: 32.78, lng: -96.80 },
  { name: "San Jose", country: "USA", lat: 37.34, lng: -121.89 },
  { name: "Austin", country: "USA", lat: 30.27, lng: -97.74 },
  { name: "Jacksonville", country: "USA", lat: 30.33, lng: -81.66 },
  { name: "San Francisco", country: "USA", lat: 37.77, lng: -122.42 },
  { name: "Columbus", country: "USA", lat: 39.96, lng: -82.99 },
  { name: "Indianapolis", country: "USA", lat: 39.77, lng: -86.16 },
  { name: "Fort Worth", country: "USA", lat: 32.75, lng: -97.33 },
  { name: "Charlotte", country: "USA", lat: 35.23, lng: -80.84 },
  { name: "Seattle", country: "USA", lat: 47.61, lng: -122.33 },
  { name: "Denver", country: "USA", lat: 39.74, lng: -104.98 },
  { name: "Nashville", country: "USA", lat: 36.17, lng: -86.78 },
  { name: "Oklahoma City", country: "USA", lat: 35.47, lng: -97.52 },
  { name: "El Paso", country: "USA", lat: 31.76, lng: -106.49 },
  { name: "Washington D.C.", country: "USA", lat: 38.91, lng: -77.04 },
  { name: "Las Vegas", country: "USA", lat: 36.17, lng: -115.14 },
  { name: "Louisville", country: "USA", lat: 38.25, lng: -85.76 },
  { name: "Memphis", country: "USA", lat: 35.15, lng: -90.05 },
  { name: "Portland", country: "USA", lat: 45.52, lng: -122.68 },
  { name: "Baltimore", country: "USA", lat: 39.29, lng: -76.61 },
  { name: "Milwaukee", country: "USA", lat: 43.04, lng: -87.91 },
  { name: "Albuquerque", country: "USA", lat: 35.08, lng: -106.65 },
  { name: "Tucson", country: "USA", lat: 32.22, lng: -110.93 },
  { name: "Fresno", country: "USA", lat: 36.74, lng: -119.77 },
  { name: "Sacramento", country: "USA", lat: 38.58, lng: -121.49 },
  { name: "Kansas City", country: "USA", lat: 39.10, lng: -94.58 },
  { name: "Mesa", country: "USA", lat: 33.42, lng: -111.83 },
  { name: "Atlanta", country: "USA", lat: 33.75, lng: -84.39 },
  { name: "Omaha", country: "USA", lat: 41.26, lng: -95.94 },
  { name: "Colorado Springs", country: "USA", lat: 38.83, lng: -104.82 },
  { name: "Raleigh", country: "USA", lat: 35.78, lng: -78.64 },
  { name: "Long Beach", country: "USA", lat: 33.77, lng: -118.19 },
  { name: "Virginia Beach", country: "USA", lat: 36.85, lng: -75.98 },
  { name: "Minneapolis", country: "USA", lat: 44.98, lng: -93.27 },
  { name: "Tampa", country: "USA", lat: 27.95, lng: -82.46 },
  { name: "New Orleans", country: "USA", lat: 29.95, lng: -90.07 },
  { name: "Arlington", country: "USA", lat: 32.74, lng: -97.11 },
  { name: "Wichita", country: "USA", lat: 37.69, lng: -97.34 },
  { name: "Bakersfield", country: "USA", lat: 35.37, lng: -119.02 },
  { name: "Aurora", country: "USA", lat: 39.73, lng: -104.83 },
  { name: "Anaheim", country: "USA", lat: 33.84, lng: -117.91 },
  { name: "Santa Ana", country: "USA", lat: 33.75, lng: -117.87 },
  { name: "Corpus Christi", country: "USA", lat: 27.80, lng: -97.40 },
  { name: "Riverside", country: "USA", lat: 33.95, lng: -117.40 },
  { name: "St. Louis", country: "USA", lat: 38.63, lng: -90.20 },
  { name: "Lexington", country: "USA", lat: 38.05, lng: -84.50 },
  { name: "Pittsburgh", country: "USA", lat: 40.44, lng: -79.99 },
  { name: "Stockton", country: "USA", lat: 37.96, lng: -121.29 },
  { name: "Anchorage", country: "USA", lat: 61.22, lng: -149.90 },
  { name: "Cincinnati", country: "USA", lat: 39.10, lng: -84.51 },
  { name: "St. Paul", country: "USA", lat: 44.95, lng: -93.09 },
  { name: "Greensboro", country: "USA", lat: 36.07, lng: -79.79 },
  { name: "Toledo", country: "USA", lat: 41.66, lng: -83.56 },
  { name: "Newark", country: "USA", lat: 40.74, lng: -74.17 },
  { name: "Plano", country: "USA", lat: 33.02, lng: -96.70 },
  { name: "Henderson", country: "USA", lat: 36.04, lng: -114.98 },
  { name: "Orlando", country: "USA", lat: 28.54, lng: -81.38 },
  { name: "Chandler", country: "USA", lat: 33.30, lng: -111.84 },
  { name: "Laredo", country: "USA", lat: 27.51, lng: -99.49 },
  { name: "Madison", country: "USA", lat: 43.07, lng: -89.40 },
  { name: "Durham", country: "USA", lat: 35.99, lng: -78.90 },
  { name: "Miami", country: "USA", lat: 25.77, lng: -80.19 },
  { name: "Lubbock", country: "USA", lat: 33.58, lng: -101.86 },
  { name: "Boston", country: "USA", lat: 42.36, lng: -71.06 },
  { name: "Honolulu", country: "USA", lat: 21.31, lng: -157.86 },
  { name: "Detroit", country: "USA", lat: 42.33, lng: -83.05 },
  { name: "Salt Lake City", country: "USA", lat: 40.76, lng: -111.89 },
  // North America — Canada
  { name: "Toronto", country: "Canada", lat: 43.65, lng: -79.38 },
  { name: "Vancouver", country: "Canada", lat: 49.28, lng: -123.12 },
  { name: "Montreal", country: "Canada", lat: 45.50, lng: -73.57 },
  { name: "Calgary", country: "Canada", lat: 51.05, lng: -114.07 },
  { name: "Edmonton", country: "Canada", lat: 53.55, lng: -113.49 },
  { name: "Ottawa", country: "Canada", lat: 45.42, lng: -75.69 },
  { name: "Winnipeg", country: "Canada", lat: 49.90, lng: -97.14 },
  { name: "Quebec City", country: "Canada", lat: 46.81, lng: -71.21 },
  { name: "Hamilton", country: "Canada", lat: 43.25, lng: -79.87 },
  { name: "Halifax", country: "Canada", lat: 44.65, lng: -63.59 },
  { name: "Victoria", country: "Canada", lat: 48.43, lng: -123.37 },
  { name: "Saskatoon", country: "Canada", lat: 52.13, lng: -106.67 },
  { name: "Regina", country: "Canada", lat: 50.45, lng: -104.62 },
  { name: "St. John's", country: "Canada", lat: 47.56, lng: -52.71 },
  // North America — Mexico & Caribbean
  { name: "Mexico City", country: "Mexico", lat: 19.43, lng: -99.13 },
  { name: "Guadalajara", country: "Mexico", lat: 20.66, lng: -103.35 },
  { name: "Monterrey", country: "Mexico", lat: 25.68, lng: -100.32 },
  { name: "Puebla", country: "Mexico", lat: 19.04, lng: -98.21 },
  { name: "Tijuana", country: "Mexico", lat: 32.53, lng: -117.04 },
  { name: "Cancún", country: "Mexico", lat: 21.16, lng: -86.85 },
  { name: "León", country: "Mexico", lat: 21.12, lng: -101.68 },
  { name: "Ciudad Juárez", country: "Mexico", lat: 31.74, lng: -106.49 },
  { name: "Mérida", country: "Mexico", lat: 20.97, lng: -89.62 },
  { name: "San Juan", country: "Puerto Rico", lat: 18.47, lng: -66.11 },
  { name: "Havana", country: "Cuba", lat: 23.14, lng: -82.36 },
  { name: "Guatemala City", country: "Guatemala", lat: 14.64, lng: -90.51 },
  { name: "San José", country: "Costa Rica", lat: 9.93, lng: -84.08 },
  { name: "Panama City", country: "Panama", lat: 8.99, lng: -79.52 },
  // South America
  { name: "São Paulo", country: "Brazil", lat: -23.55, lng: -46.63 },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.91, lng: -43.17 },
  { name: "Brasília", country: "Brazil", lat: -15.78, lng: -47.93 },
  { name: "Salvador", country: "Brazil", lat: -12.97, lng: -38.50 },
  { name: "Fortaleza", country: "Brazil", lat: -3.72, lng: -38.54 },
  { name: "Belo Horizonte", country: "Brazil", lat: -19.92, lng: -43.94 },
  { name: "Manaus", country: "Brazil", lat: -3.10, lng: -60.03 },
  { name: "Curitiba", country: "Brazil", lat: -25.43, lng: -49.27 },
  { name: "Recife", country: "Brazil", lat: -8.05, lng: -34.88 },
  { name: "Porto Alegre", country: "Brazil", lat: -30.03, lng: -51.23 },
  { name: "Buenos Aires", country: "Argentina", lat: -34.60, lng: -58.38 },
  { name: "Córdoba", country: "Argentina", lat: -31.42, lng: -64.19 },
  { name: "Rosario", country: "Argentina", lat: -32.95, lng: -60.64 },
  { name: "Mendoza", country: "Argentina", lat: -32.89, lng: -68.83 },
  { name: "Bogotá", country: "Colombia", lat: 4.71, lng: -74.07 },
  { name: "Medellín", country: "Colombia", lat: 6.25, lng: -75.56 },
  { name: "Cali", country: "Colombia", lat: 3.44, lng: -76.52 },
  { name: "Barranquilla", country: "Colombia", lat: 11.00, lng: -74.81 },
  { name: "Lima", country: "Peru", lat: -12.05, lng: -77.04 },
  { name: "Arequipa", country: "Peru", lat: -16.41, lng: -71.54 },
  { name: "Santiago", country: "Chile", lat: -33.46, lng: -70.65 },
  { name: "Valparaíso", country: "Chile", lat: -33.05, lng: -71.62 },
  { name: "Caracas", country: "Venezuela", lat: 10.48, lng: -66.88 },
  { name: "Maracaibo", country: "Venezuela", lat: 10.63, lng: -71.64 },
  { name: "Quito", country: "Ecuador", lat: -0.23, lng: -78.52 },
  { name: "Guayaquil", country: "Ecuador", lat: -2.19, lng: -79.89 },
  { name: "La Paz", country: "Bolivia", lat: -16.50, lng: -68.15 },
  { name: "Santa Cruz", country: "Bolivia", lat: -17.79, lng: -63.18 },
  { name: "Montevideo", country: "Uruguay", lat: -34.90, lng: -56.19 },
  { name: "Asunción", country: "Paraguay", lat: -25.29, lng: -57.64 },
  { name: "Georgetown", country: "Guyana", lat: 6.80, lng: -58.16 },
  // Europe — UK & Ireland
  { name: "London", country: "UK", lat: 51.51, lng: -0.13 },
  { name: "Birmingham", country: "UK", lat: 52.48, lng: -1.90 },
  { name: "Manchester", country: "UK", lat: 53.48, lng: -2.24 },
  { name: "Glasgow", country: "UK", lat: 55.86, lng: -4.25 },
  { name: "Leeds", country: "UK", lat: 53.80, lng: -1.55 },
  { name: "Liverpool", country: "UK", lat: 53.41, lng: -2.99 },
  { name: "Bristol", country: "UK", lat: 51.45, lng: -2.59 },
  { name: "Edinburgh", country: "UK", lat: 55.95, lng: -3.19 },
  { name: "Cardiff", country: "UK", lat: 51.48, lng: -3.18 },
  { name: "Belfast", country: "UK", lat: 54.60, lng: -5.93 },
  { name: "Dublin", country: "Ireland", lat: 53.33, lng: -6.25 },
  { name: "Cork", country: "Ireland", lat: 51.90, lng: -8.47 },
  // Europe — Western
  { name: "Paris", country: "France", lat: 48.86, lng: 2.35 },
  { name: "Lyon", country: "France", lat: 45.75, lng: 4.85 },
  { name: "Marseille", country: "France", lat: 43.30, lng: 5.37 },
  { name: "Toulouse", country: "France", lat: 43.60, lng: 1.44 },
  { name: "Nice", country: "France", lat: 43.70, lng: 7.27 },
  { name: "Nantes", country: "France", lat: 47.22, lng: -1.55 },
  { name: "Bordeaux", country: "France", lat: 44.84, lng: -0.58 },
  { name: "Strasbourg", country: "France", lat: 48.58, lng: 7.75 },
  { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.41 },
  { name: "Hamburg", country: "Germany", lat: 53.55, lng: 9.99 },
  { name: "Munich", country: "Germany", lat: 48.14, lng: 11.58 },
  { name: "Cologne", country: "Germany", lat: 50.94, lng: 6.96 },
  { name: "Frankfurt", country: "Germany", lat: 50.11, lng: 8.68 },
  { name: "Stuttgart", country: "Germany", lat: 48.78, lng: 9.18 },
  { name: "Düsseldorf", country: "Germany", lat: 51.23, lng: 6.79 },
  { name: "Leipzig", country: "Germany", lat: 51.34, lng: 12.38 },
  { name: "Dortmund", country: "Germany", lat: 51.51, lng: 7.46 },
  { name: "Essen", country: "Germany", lat: 51.46, lng: 7.01 },
  { name: "Bremen", country: "Germany", lat: 53.08, lng: 8.81 },
  { name: "Dresden", country: "Germany", lat: 51.05, lng: 13.74 },
  { name: "Madrid", country: "Spain", lat: 40.42, lng: -3.70 },
  { name: "Barcelona", country: "Spain", lat: 41.39, lng: 2.15 },
  { name: "Valencia", country: "Spain", lat: 39.47, lng: -0.38 },
  { name: "Seville", country: "Spain", lat: 37.39, lng: -5.99 },
  { name: "Zaragoza", country: "Spain", lat: 41.65, lng: -0.89 },
  { name: "Málaga", country: "Spain", lat: 36.72, lng: -4.42 },
  { name: "Bilbao", country: "Spain", lat: 43.26, lng: -2.93 },
  { name: "Rome", country: "Italy", lat: 41.90, lng: 12.50 },
  { name: "Milan", country: "Italy", lat: 45.46, lng: 9.19 },
  { name: "Naples", country: "Italy", lat: 40.85, lng: 14.27 },
  { name: "Turin", country: "Italy", lat: 45.07, lng: 7.69 },
  { name: "Palermo", country: "Italy", lat: 38.12, lng: 13.36 },
  { name: "Genoa", country: "Italy", lat: 44.41, lng: 8.93 },
  { name: "Florence", country: "Italy", lat: 43.77, lng: 11.26 },
  { name: "Venice", country: "Italy", lat: 45.44, lng: 12.34 },
  { name: "Bologna", country: "Italy", lat: 44.50, lng: 11.34 },
  { name: "Amsterdam", country: "Netherlands", lat: 52.37, lng: 4.90 },
  { name: "Rotterdam", country: "Netherlands", lat: 51.92, lng: 4.48 },
  { name: "The Hague", country: "Netherlands", lat: 52.08, lng: 4.31 },
  { name: "Utrecht", country: "Netherlands", lat: 52.09, lng: 5.12 },
  { name: "Brussels", country: "Belgium", lat: 50.85, lng: 4.35 },
  { name: "Antwerp", country: "Belgium", lat: 51.22, lng: 4.40 },
  { name: "Ghent", country: "Belgium", lat: 51.05, lng: 3.72 },
  { name: "Lisbon", country: "Portugal", lat: 38.72, lng: -9.14 },
  { name: "Porto", country: "Portugal", lat: 41.16, lng: -8.63 },
  { name: "Vienna", country: "Austria", lat: 48.21, lng: 16.37 },
  { name: "Graz", country: "Austria", lat: 47.07, lng: 15.44 },
  { name: "Zurich", country: "Switzerland", lat: 47.38, lng: 8.54 },
  { name: "Geneva", country: "Switzerland", lat: 46.20, lng: 6.14 },
  { name: "Basel", country: "Switzerland", lat: 47.56, lng: 7.59 },
  { name: "Bern", country: "Switzerland", lat: 46.95, lng: 7.45 },
  { name: "Luxembourg City", country: "Luxembourg", lat: 49.61, lng: 6.13 },
  { name: "Monaco", country: "Monaco", lat: 43.74, lng: 7.43 },
  // Europe — Nordic
  { name: "Stockholm", country: "Sweden", lat: 59.33, lng: 18.07 },
  { name: "Gothenburg", country: "Sweden", lat: 57.71, lng: 11.97 },
  { name: "Malmö", country: "Sweden", lat: 55.61, lng: 13.00 },
  { name: "Oslo", country: "Norway", lat: 59.91, lng: 10.75 },
  { name: "Bergen", country: "Norway", lat: 60.39, lng: 5.33 },
  { name: "Trondheim", country: "Norway", lat: 63.43, lng: 10.39 },
  { name: "Copenhagen", country: "Denmark", lat: 55.68, lng: 12.57 },
  { name: "Aarhus", country: "Denmark", lat: 56.16, lng: 10.21 },
  { name: "Helsinki", country: "Finland", lat: 60.17, lng: 24.94 },
  { name: "Tampere", country: "Finland", lat: 61.50, lng: 23.78 },
  { name: "Reykjavik", country: "Iceland", lat: 64.13, lng: -21.82 },
  { name: "Tallinn", country: "Estonia", lat: 59.44, lng: 24.75 },
  { name: "Riga", country: "Latvia", lat: 56.95, lng: 24.11 },
  { name: "Vilnius", country: "Lithuania", lat: 54.69, lng: 25.28 },
  // Europe — Central & Eastern
  { name: "Warsaw", country: "Poland", lat: 52.23, lng: 21.01 },
  { name: "Kraków", country: "Poland", lat: 50.06, lng: 19.94 },
  { name: "Wrocław", country: "Poland", lat: 51.11, lng: 17.04 },
  { name: "Gdańsk", country: "Poland", lat: 54.35, lng: 18.65 },
  { name: "Prague", country: "Czech Republic", lat: 50.08, lng: 14.44 },
  { name: "Brno", country: "Czech Republic", lat: 49.20, lng: 16.61 },
  { name: "Budapest", country: "Hungary", lat: 47.50, lng: 19.04 },
  { name: "Bratislava", country: "Slovakia", lat: 48.15, lng: 17.11 },
  { name: "Ljubljana", country: "Slovenia", lat: 46.05, lng: 14.51 },
  { name: "Zagreb", country: "Croatia", lat: 45.81, lng: 15.98 },
  { name: "Split", country: "Croatia", lat: 43.51, lng: 16.44 },
  { name: "Sarajevo", country: "Bosnia", lat: 43.85, lng: 18.36 },
  { name: "Belgrade", country: "Serbia", lat: 44.80, lng: 20.46 },
  { name: "Bucharest", country: "Romania", lat: 44.43, lng: 26.10 },
  { name: "Cluj-Napoca", country: "Romania", lat: 46.77, lng: 23.59 },
  { name: "Sofia", country: "Bulgaria", lat: 42.70, lng: 23.32 },
  { name: "Kyiv", country: "Ukraine", lat: 50.45, lng: 30.52 },
  { name: "Kharkiv", country: "Ukraine", lat: 49.99, lng: 36.23 },
  { name: "Odessa", country: "Ukraine", lat: 46.48, lng: 30.72 },
  { name: "Minsk", country: "Belarus", lat: 53.90, lng: 27.57 },
  { name: "Athens", country: "Greece", lat: 37.98, lng: 23.73 },
  { name: "Thessaloniki", country: "Greece", lat: 40.64, lng: 22.94 },
  { name: "Skopje", country: "North Macedonia", lat: 41.99, lng: 21.43 },
  { name: "Tirana", country: "Albania", lat: 41.33, lng: 19.82 },
  { name: "Podgorica", country: "Montenegro", lat: 42.44, lng: 19.26 },
  { name: "Chișinău", country: "Moldova", lat: 47.01, lng: 28.86 },
  { name: "Nicosia", country: "Cyprus", lat: 35.17, lng: 33.37 },
  { name: "Valletta", country: "Malta", lat: 35.90, lng: 14.51 },
  // Europe — Russia & Caucasus
  { name: "Moscow", country: "Russia", lat: 55.75, lng: 37.62 },
  { name: "St. Petersburg", country: "Russia", lat: 59.95, lng: 30.32 },
  { name: "Novosibirsk", country: "Russia", lat: 54.99, lng: 82.90 },
  { name: "Yekaterinburg", country: "Russia", lat: 56.84, lng: 60.60 },
  { name: "Kazan", country: "Russia", lat: 55.80, lng: 49.11 },
  { name: "Nizhny Novgorod", country: "Russia", lat: 56.33, lng: 44.00 },
  { name: "Chelyabinsk", country: "Russia", lat: 55.16, lng: 61.40 },
  { name: "Samara", country: "Russia", lat: 53.20, lng: 50.15 },
  { name: "Omsk", country: "Russia", lat: 54.99, lng: 73.37 },
  { name: "Rostov-on-Don", country: "Russia", lat: 47.23, lng: 39.72 },
  { name: "Ufa", country: "Russia", lat: 54.74, lng: 55.97 },
  { name: "Krasnoyarsk", country: "Russia", lat: 56.01, lng: 92.87 },
  { name: "Vladivostok", country: "Russia", lat: 43.12, lng: 131.90 },
  { name: "Tbilisi", country: "Georgia", lat: 41.69, lng: 44.83 },
  { name: "Yerevan", country: "Armenia", lat: 40.18, lng: 44.51 },
  { name: "Baku", country: "Azerbaijan", lat: 40.41, lng: 49.87 },
  // Middle East
  { name: "Dubai", country: "UAE", lat: 25.20, lng: 55.27 },
  { name: "Abu Dhabi", country: "UAE", lat: 24.47, lng: 54.37 },
  { name: "Sharjah", country: "UAE", lat: 25.34, lng: 55.39 },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.69, lng: 46.72 },
  { name: "Jeddah", country: "Saudi Arabia", lat: 21.49, lng: 39.19 },
  { name: "Mecca", country: "Saudi Arabia", lat: 21.39, lng: 39.86 },
  { name: "Medina", country: "Saudi Arabia", lat: 24.47, lng: 39.61 },
  { name: "Doha", country: "Qatar", lat: 25.29, lng: 51.53 },
  { name: "Kuwait City", country: "Kuwait", lat: 29.37, lng: 47.98 },
  { name: "Muscat", country: "Oman", lat: 23.59, lng: 58.59 },
  { name: "Manama", country: "Bahrain", lat: 26.22, lng: 50.59 },
  { name: "Tel Aviv", country: "Israel", lat: 32.08, lng: 34.78 },
  { name: "Jerusalem", country: "Israel", lat: 31.78, lng: 35.22 },
  { name: "Amman", country: "Jordan", lat: 31.96, lng: 35.95 },
  { name: "Beirut", country: "Lebanon", lat: 33.89, lng: 35.50 },
  { name: "Damascus", country: "Syria", lat: 33.51, lng: 36.29 },
  { name: "Baghdad", country: "Iraq", lat: 33.34, lng: 44.40 },
  { name: "Tehran", country: "Iran", lat: 35.69, lng: 51.39 },
  { name: "Isfahan", country: "Iran", lat: 32.66, lng: 51.68 },
  { name: "Ankara", country: "Turkey", lat: 39.93, lng: 32.85 },
  { name: "Istanbul", country: "Turkey", lat: 41.01, lng: 28.96 },
  { name: "Izmir", country: "Turkey", lat: 38.42, lng: 27.14 },
  { name: "Bursa", country: "Turkey", lat: 40.19, lng: 29.06 },
  { name: "Kabul", country: "Afghanistan", lat: 34.53, lng: 69.17 },
  { name: "Sana'a", country: "Yemen", lat: 15.35, lng: 44.21 },
  // Africa — North
  { name: "Cairo", country: "Egypt", lat: 30.04, lng: 31.24 },
  { name: "Alexandria", country: "Egypt", lat: 31.20, lng: 29.92 },
  { name: "Casablanca", country: "Morocco", lat: 33.59, lng: -7.62 },
  { name: "Rabat", country: "Morocco", lat: 34.02, lng: -6.84 },
  { name: "Marrakech", country: "Morocco", lat: 31.63, lng: -8.01 },
  { name: "Algiers", country: "Algeria", lat: 36.74, lng: 3.06 },
  { name: "Tunis", country: "Tunisia", lat: 36.82, lng: 10.17 },
  { name: "Tripoli", country: "Libya", lat: 32.90, lng: 13.18 },
  { name: "Khartoum", country: "Sudan", lat: 15.55, lng: 32.53 },
  // Africa — West
  { name: "Lagos", country: "Nigeria", lat: 6.52, lng: 3.38 },
  { name: "Abuja", country: "Nigeria", lat: 9.07, lng: 7.40 },
  { name: "Kano", country: "Nigeria", lat: 12.00, lng: 8.52 },
  { name: "Ibadan", country: "Nigeria", lat: 7.38, lng: 3.90 },
  { name: "Accra", country: "Ghana", lat: 5.56, lng: -0.20 },
  { name: "Kumasi", country: "Ghana", lat: 6.69, lng: -1.62 },
  { name: "Dakar", country: "Senegal", lat: 14.72, lng: -17.47 },
  { name: "Abidjan", country: "Côte d'Ivoire", lat: 5.36, lng: -4.01 },
  { name: "Douala", country: "Cameroon", lat: 4.05, lng: 9.70 },
  { name: "Yaoundé", country: "Cameroon", lat: 3.87, lng: 11.52 },
  { name: "Conakry", country: "Guinea", lat: 9.54, lng: -13.68 },
  { name: "Ouagadougou", country: "Burkina Faso", lat: 12.37, lng: -1.53 },
  { name: "Bamako", country: "Mali", lat: 12.65, lng: -8.00 },
  { name: "Lomé", country: "Togo", lat: 6.14, lng: 1.21 },
  { name: "Cotonou", country: "Benin", lat: 6.37, lng: 2.42 },
  { name: "Freetown", country: "Sierra Leone", lat: 8.49, lng: -13.23 },
  { name: "Monrovia", country: "Liberia", lat: 6.30, lng: -10.80 },
  // Africa — East
  { name: "Nairobi", country: "Kenya", lat: -1.29, lng: 36.82 },
  { name: "Mombasa", country: "Kenya", lat: -4.05, lng: 39.67 },
  { name: "Addis Ababa", country: "Ethiopia", lat: 9.03, lng: 38.74 },
  { name: "Kampala", country: "Uganda", lat: 0.35, lng: 32.58 },
  { name: "Kigali", country: "Rwanda", lat: -1.94, lng: 30.06 },
  { name: "Dar es Salaam", country: "Tanzania", lat: -6.79, lng: 39.21 },
  { name: "Mogadishu", country: "Somalia", lat: 2.05, lng: 45.34 },
  { name: "Djibouti", country: "Djibouti", lat: 11.59, lng: 43.15 },
  { name: "Antananarivo", country: "Madagascar", lat: -18.91, lng: 47.54 },
  // Africa — Southern
  { name: "Johannesburg", country: "South Africa", lat: -26.20, lng: 28.04 },
  { name: "Cape Town", country: "South Africa", lat: -33.93, lng: 18.42 },
  { name: "Durban", country: "South Africa", lat: -29.86, lng: 31.02 },
  { name: "Pretoria", country: "South Africa", lat: -25.75, lng: 28.19 },
  { name: "Lusaka", country: "Zambia", lat: -15.42, lng: 28.28 },
  { name: "Harare", country: "Zimbabwe", lat: -17.83, lng: 31.05 },
  { name: "Maputo", country: "Mozambique", lat: -25.97, lng: 32.59 },
  { name: "Lilongwe", country: "Malawi", lat: -13.97, lng: 33.79 },
  { name: "Gaborone", country: "Botswana", lat: -24.65, lng: 25.91 },
  { name: "Windhoek", country: "Namibia", lat: -22.56, lng: 17.08 },
  { name: "Luanda", country: "Angola", lat: -8.84, lng: 13.23 },
  { name: "Kinshasa", country: "DR Congo", lat: -4.33, lng: 15.32 },
  // Asia — East: Korea
  { name: "Seoul", country: "South Korea", lat: 37.57, lng: 126.98 },
  { name: "Busan", country: "South Korea", lat: 35.10, lng: 129.04 },
  { name: "Incheon", country: "South Korea", lat: 37.46, lng: 126.71 },
  { name: "Daegu", country: "South Korea", lat: 35.87, lng: 128.60 },
  { name: "Daejeon", country: "South Korea", lat: 36.35, lng: 127.38 },
  { name: "Gwangju", country: "South Korea", lat: 35.16, lng: 126.85 },
  { name: "Ulsan", country: "South Korea", lat: 35.54, lng: 129.31 },
  { name: "Suwon", country: "South Korea", lat: 37.26, lng: 127.03 },
  { name: "Pyongyang", country: "North Korea", lat: 39.03, lng: 125.75 },
  // Asia — East: Japan
  { name: "Tokyo", country: "Japan", lat: 35.68, lng: 139.69 },
  { name: "Osaka", country: "Japan", lat: 34.69, lng: 135.50 },
  { name: "Yokohama", country: "Japan", lat: 35.44, lng: 139.64 },
  { name: "Nagoya", country: "Japan", lat: 35.18, lng: 136.90 },
  { name: "Sapporo", country: "Japan", lat: 43.06, lng: 141.35 },
  { name: "Fukuoka", country: "Japan", lat: 33.59, lng: 130.40 },
  { name: "Kobe", country: "Japan", lat: 34.69, lng: 135.19 },
  { name: "Kyoto", country: "Japan", lat: 35.01, lng: 135.77 },
  { name: "Hiroshima", country: "Japan", lat: 34.40, lng: 132.46 },
  { name: "Sendai", country: "Japan", lat: 38.27, lng: 140.87 },
  // Asia — East: China
  { name: "Beijing", country: "China", lat: 39.91, lng: 116.39 },
  { name: "Shanghai", country: "China", lat: 31.23, lng: 121.47 },
  { name: "Guangzhou", country: "China", lat: 23.13, lng: 113.26 },
  { name: "Shenzhen", country: "China", lat: 22.54, lng: 114.06 },
  { name: "Chengdu", country: "China", lat: 30.57, lng: 104.07 },
  { name: "Tianjin", country: "China", lat: 39.13, lng: 117.20 },
  { name: "Wuhan", country: "China", lat: 30.59, lng: 114.31 },
  { name: "Chongqing", country: "China", lat: 29.56, lng: 106.55 },
  { name: "Xi'an", country: "China", lat: 34.27, lng: 108.95 },
  { name: "Nanjing", country: "China", lat: 32.06, lng: 118.78 },
  { name: "Hangzhou", country: "China", lat: 30.25, lng: 120.15 },
  { name: "Shenyang", country: "China", lat: 41.80, lng: 123.43 },
  { name: "Harbin", country: "China", lat: 45.75, lng: 126.64 },
  { name: "Dalian", country: "China", lat: 38.91, lng: 121.60 },
  { name: "Qingdao", country: "China", lat: 36.07, lng: 120.38 },
  { name: "Zhengzhou", country: "China", lat: 34.75, lng: 113.65 },
  { name: "Jinan", country: "China", lat: 36.67, lng: 116.99 },
  { name: "Fuzhou", country: "China", lat: 26.07, lng: 119.30 },
  { name: "Kunming", country: "China", lat: 25.05, lng: 102.72 },
  { name: "Changsha", country: "China", lat: 28.23, lng: 112.94 },
  { name: "Urumqi", country: "China", lat: 43.80, lng: 87.57 },
  { name: "Macau", country: "Macau", lat: 22.20, lng: 113.54 },
  { name: "Hong Kong", country: "Hong Kong", lat: 22.32, lng: 114.17 },
  { name: "Taipei", country: "Taiwan", lat: 25.05, lng: 121.56 },
  { name: "Kaohsiung", country: "Taiwan", lat: 22.63, lng: 120.27 },
  { name: "Taichung", country: "Taiwan", lat: 24.15, lng: 120.68 },
  { name: "Ulaanbaatar", country: "Mongolia", lat: 47.91, lng: 106.88 },
  // Asia — Central
  { name: "Almaty", country: "Kazakhstan", lat: 43.24, lng: 76.89 },
  { name: "Astana", country: "Kazakhstan", lat: 51.18, lng: 71.45 },
  { name: "Tashkent", country: "Uzbekistan", lat: 41.30, lng: 69.24 },
  { name: "Bishkek", country: "Kyrgyzstan", lat: 42.87, lng: 74.59 },
  { name: "Dushanbe", country: "Tajikistan", lat: 38.56, lng: 68.77 },
  { name: "Ashgabat", country: "Turkmenistan", lat: 37.95, lng: 58.38 },
  // Asia — South
  { name: "Mumbai", country: "India", lat: 19.08, lng: 72.88 },
  { name: "Delhi", country: "India", lat: 28.61, lng: 77.21 },
  { name: "Bangalore", country: "India", lat: 12.97, lng: 77.59 },
  { name: "Hyderabad", country: "India", lat: 17.38, lng: 78.49 },
  { name: "Ahmedabad", country: "India", lat: 23.03, lng: 72.57 },
  { name: "Chennai", country: "India", lat: 13.08, lng: 80.27 },
  { name: "Kolkata", country: "India", lat: 22.57, lng: 88.36 },
  { name: "Surat", country: "India", lat: 21.17, lng: 72.83 },
  { name: "Pune", country: "India", lat: 18.52, lng: 73.86 },
  { name: "Jaipur", country: "India", lat: 26.91, lng: 75.79 },
  { name: "Lucknow", country: "India", lat: 26.85, lng: 80.95 },
  { name: "Kanpur", country: "India", lat: 26.45, lng: 80.35 },
  { name: "Nagpur", country: "India", lat: 21.15, lng: 79.09 },
  { name: "Indore", country: "India", lat: 22.72, lng: 75.86 },
  { name: "Bhopal", country: "India", lat: 23.26, lng: 77.40 },
  { name: "Patna", country: "India", lat: 25.59, lng: 85.14 },
  { name: "Vadodara", country: "India", lat: 22.31, lng: 73.18 },
  { name: "Coimbatore", country: "India", lat: 11.00, lng: 76.96 },
  { name: "Kochi", country: "India", lat: 9.93, lng: 76.26 },
  { name: "Visakhapatnam", country: "India", lat: 17.69, lng: 83.22 },
  { name: "Agra", country: "India", lat: 27.18, lng: 78.01 },
  { name: "Karachi", country: "Pakistan", lat: 24.86, lng: 67.01 },
  { name: "Lahore", country: "Pakistan", lat: 31.52, lng: 74.36 },
  { name: "Islamabad", country: "Pakistan", lat: 33.72, lng: 73.04 },
  { name: "Peshawar", country: "Pakistan", lat: 34.01, lng: 71.58 },
  { name: "Dhaka", country: "Bangladesh", lat: 23.78, lng: 90.40 },
  { name: "Chittagong", country: "Bangladesh", lat: 22.33, lng: 91.84 },
  { name: "Colombo", country: "Sri Lanka", lat: 6.93, lng: 79.85 },
  { name: "Kathmandu", country: "Nepal", lat: 27.71, lng: 85.31 },
  { name: "Thimphu", country: "Bhutan", lat: 27.47, lng: 89.64 },
  { name: "Malé", country: "Maldives", lat: 4.18, lng: 73.51 },
  // Asia — Southeast
  { name: "Singapore", country: "Singapore", lat: 1.35, lng: 103.82 },
  { name: "Bangkok", country: "Thailand", lat: 13.75, lng: 100.52 },
  { name: "Chiang Mai", country: "Thailand", lat: 18.79, lng: 98.98 },
  { name: "Phuket", country: "Thailand", lat: 7.88, lng: 98.39 },
  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.14, lng: 101.69 },
  { name: "Penang", country: "Malaysia", lat: 5.41, lng: 100.33 },
  { name: "Johor Bahru", country: "Malaysia", lat: 1.49, lng: 103.74 },
  { name: "Jakarta", country: "Indonesia", lat: -6.21, lng: 106.85 },
  { name: "Surabaya", country: "Indonesia", lat: -7.25, lng: 112.75 },
  { name: "Bandung", country: "Indonesia", lat: -6.92, lng: 107.61 },
  { name: "Medan", country: "Indonesia", lat: 3.58, lng: 98.68 },
  { name: "Bali (Denpasar)", country: "Indonesia", lat: -8.67, lng: 115.21 },
  { name: "Manila", country: "Philippines", lat: 14.60, lng: 120.98 },
  { name: "Cebu", country: "Philippines", lat: 10.32, lng: 123.90 },
  { name: "Davao", country: "Philippines", lat: 7.07, lng: 125.61 },
  { name: "Ho Chi Minh City", country: "Vietnam", lat: 10.82, lng: 106.63 },
  { name: "Hanoi", country: "Vietnam", lat: 21.03, lng: 105.85 },
  { name: "Da Nang", country: "Vietnam", lat: 16.07, lng: 108.22 },
  { name: "Yangon", country: "Myanmar", lat: 16.87, lng: 96.19 },
  { name: "Naypyidaw", country: "Myanmar", lat: 19.74, lng: 96.13 },
  { name: "Phnom Penh", country: "Cambodia", lat: 11.56, lng: 104.92 },
  { name: "Vientiane", country: "Laos", lat: 17.97, lng: 102.61 },
  { name: "Bandar Seri Begawan", country: "Brunei", lat: 4.94, lng: 114.95 },
  { name: "Dili", country: "Timor-Leste", lat: -8.56, lng: 125.58 },
  // Oceania
  { name: "Sydney", country: "Australia", lat: -33.87, lng: 151.21 },
  { name: "Melbourne", country: "Australia", lat: -37.81, lng: 144.96 },
  { name: "Brisbane", country: "Australia", lat: -27.47, lng: 153.02 },
  { name: "Perth", country: "Australia", lat: -31.95, lng: 115.86 },
  { name: "Adelaide", country: "Australia", lat: -34.93, lng: 138.60 },
  { name: "Gold Coast", country: "Australia", lat: -28.02, lng: 153.40 },
  { name: "Newcastle", country: "Australia", lat: -32.93, lng: 151.78 },
  { name: "Canberra", country: "Australia", lat: -35.28, lng: 149.13 },
  { name: "Darwin", country: "Australia", lat: -12.46, lng: 130.84 },
  { name: "Hobart", country: "Australia", lat: -42.88, lng: 147.33 },
  { name: "Auckland", country: "New Zealand", lat: -36.87, lng: 174.77 },
  { name: "Wellington", country: "New Zealand", lat: -41.29, lng: 174.78 },
  { name: "Christchurch", country: "New Zealand", lat: -43.53, lng: 172.64 },
  { name: "Hamilton", country: "New Zealand", lat: -37.79, lng: 175.28 },
  { name: "Suva", country: "Fiji", lat: -18.14, lng: 178.44 },
  { name: "Port Moresby", country: "Papua New Guinea", lat: -9.44, lng: 147.18 },
  { name: "Honiara", country: "Solomon Islands", lat: -9.43, lng: 160.05 },
  { name: "Nuku'alofa", country: "Tonga", lat: -21.14, lng: -175.22 },
];

interface MemberPin {
  lat: number;
  lng: number;
  name: string;
  city: string;
  country: string;
  note: string;
  instagram?: string;
}

const members: MemberPin[] = [];

// Combobox for city selection
function CityCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (city: string, country: string, lat: number, lng: number) => void;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.length < 2
    ? []
    : CITIES.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (c: typeof CITIES[0]) => {
    setQuery(`${c.name}, ${c.country}`);
    onChange(c.name, c.country, c.lat, c.lng);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center rounded-lg border border-white/10 bg-white/5 focus-within:border-[#ffd966]/60 transition-colors">
        <input
          required
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search city..."
          className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
        />
        <CaretUpDown size={14} className="mr-3 text-white/30" />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-white/10 bg-[#111] shadow-xl">
          {filtered.map(c => (
            <button
              key={`${c.name}-${c.country}`}
              type="button"
              onClick={() => select(c)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/10 transition-colors"
            >
              <span>{c.name}</span>
              <span className="text-white/40">{c.country}</span>
            </button>
          ))}
        </div>
      )}
      {open && query.length >= 2 && filtered.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-white/10 bg-[#111] px-4 py-3 text-sm text-white/40 shadow-xl">
          No cities found — try another name
        </div>
      )}
    </div>
  );
}

function AddPinModal({ onClose, onPinAdded }: { onClose: () => void; onPinAdded: (pin: MemberPin) => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", city: "", country: "", lat: 0, lng: 0, note: "", instagram: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.city) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/pins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          city: form.city,
          country: form.country,
          lat: form.lat,
          lng: form.lng,
          note: form.note,
          instagram: form.instagram || undefined,
        }),
      });
      if (res.ok) {
        const newPin = await res.json();
        onPinAdded(newPin);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1a1a] p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Add your pin</h3>
            <p className="mt-1 text-sm text-white/40">You&apos;ll appear on the globe right away.</p>
          </div>
          <button onClick={onClose} className="text-white/40 transition-colors hover:text-white">
            <X size={20} />
          </button>
        </div>

        {status === "success" ? (
          <div className="py-8 text-center">
            <p className="mb-2 text-2xl">🗺️</p>
            <p className="font-semibold text-white">You&apos;re on the map!</p>
            <p className="mt-1 text-sm text-white/40">You&apos;re on the globe. Welcome, neighbor.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Name</label>
              <input
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your first name"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-[#ffd966]/60"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40">City</label>
              <CityCombobox
                value={form.city}
                onChange={(city, country, lat, lng) => setForm(f => ({ ...f, city, country, lat, lng }))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40">One-liner about you</label>
              <input
                required
                value={form.note}
                onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                placeholder="e.g. Came for work, staying for the food"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-[#ffd966]/60"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Instagram <span className="normal-case font-normal text-white/25">(optional)</span>
              </label>
              <div className="flex items-center rounded-lg border border-white/10 bg-white/5 transition-colors focus-within:border-[#ffd966]/60">
                <span className="pl-4 text-sm text-white/30">@</span>
                <input
                  value={form.instagram}
                  onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))}
                  placeholder="yourhandle"
                  className="flex-1 bg-transparent px-2 py-3 text-sm text-white placeholder-white/20 outline-none"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-400">Something went wrong. Try again!</p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !form.city}
              className="mt-2 rounded-full bg-[#ffd966] px-6 py-3 text-sm font-semibold text-[#1a1a1a] transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              {status === "loading" ? "Sending..." : "Add my pin"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Globe() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [dynamicPins, setDynamicPins] = useState<MemberPin[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("/api/pins")
      .then(r => r.json())
      .then((pins: MemberPin[]) => setDynamicPins(pins))
      .catch(() => {});
  }, []);

  const allMembers = [...members, ...dynamicPins];

  // Auto-cycle through members
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % allMembers.length);
    }, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMembers.length]);

  // Spin globe to active member's location
  useEffect(() => {
    if (!globeRef.current) return;
    const m = allMembers[activeIndex];
    if (!m) return;
    globeRef.current.pointOfView({ lat: m.lat, lng: m.lng, altitude: 2.2 }, 1200);
  }, [activeIndex, allMembers]);

  const handleGlobeReady = useCallback(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
    }
    // Point to first member on load
    const m = members[0];
    globeRef.current.pointOfView({ lat: m.lat, lng: m.lng, altitude: 2.2 }, 0);
  }, []);

  const activeMember = allMembers[activeIndex] ?? members[0];

  const getPointRadius = useCallback((point: object) => {
    const { name } = point as MemberPin;
    return name === activeMember.name ? 0.5 : 0.3;
  }, [activeMember]);

  const getPointColor = useCallback((point: object) => {
    const { name } = point as MemberPin;
    return name === activeMember.name ? "#ffd966" : "rgba(255,217,102,0.4)";
  }, [activeMember]);

  if (!mounted) return null;

  return (
    <section id="globe" className="overflow-hidden bg-[#fafaf8] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ffd966]">
            Our community
          </p>
          <h2 className="text-4xl font-bold text-zinc-950 md:text-5xl">
            From all over the world
          </h2>
          <p className="mt-3 max-w-xl text-zinc-500">
            Our neighbors come from every corner of the globe.
          </p>
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-3">
            {allMembers.map(m => (
              <div key={m.name} className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#c9a800]" weight="fill" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {m.name} <span className="font-normal text-zinc-400">· {m.city}, {m.country}</span>
                  </p>
                  <p className="text-xs text-zinc-400">{m.note}</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 w-full rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
            >
              + Add your pin
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[3fr_2fr]">
            {/* Globe */}
            <div className="flex justify-center">
              <GlobeGL
                ref={globeRef}
                width={460}
                height={460}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-day.jpg"
                atmosphereColor="#a8d8ea"
                atmosphereAltitude={0.15}
                pointsData={allMembers}
                pointLat="lat"
                pointLng="lng"
                pointAltitude={0}
                pointRadius={getPointRadius}
                pointColor={getPointColor}
                ringsData={activeMember ? [activeMember] : []}
                ringLat="lat"
                ringLng="lng"
                ringColor={() => (t: number) => `rgba(255,217,102,${1 - t})`}
                ringMaxRadius={4}
                ringPropagationSpeed={1.5}
                ringRepeatPeriod={1200}
                enablePointerInteraction={false}
                onGlobeReady={handleGlobeReady}
              />
            </div>

            {/* Auto-cycling profile card */}
            <div className="flex flex-col gap-6">
              <div className="relative min-h-[180px]">
                {allMembers.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center">
                    <p className="text-sm text-zinc-400">Be the first to add your pin!</p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <span className="inline-block h-2 w-2 rounded-full bg-[#ffd966]" />
                        <span className="text-xs uppercase tracking-widest text-zinc-400">
                          {activeMember.city}, {activeMember.country}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-zinc-950">{activeMember.name}</p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-500">{activeMember.note}</p>
                      {activeMember.instagram && (
                        <a
                          href={`https://instagram.com/${activeMember.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-700"
                        >
                          <InstagramLogo size={14} />
                          {activeMember.instagram}
                        </a>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* Dot indicators */}
              {allMembers.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {allMembers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveIndex(i);
                      if (intervalRef.current) clearInterval(intervalRef.current);
                      intervalRef.current = setInterval(
                        () => setActiveIndex(n => (n + 1) % allMembers.length),
                        3000
                      );
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-5 bg-[#ffd966]" : "w-1.5 bg-zinc-300"
                    }`}
                  />
                ))}
              </div>
              )}

              <button
                onClick={() => setShowModal(true)}
                className="w-full rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
              >
                + Add your pin
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <AddPinModal
            onClose={() => setShowModal(false)}
            onPinAdded={(pin) => {
              setDynamicPins(prev => [...prev, pin]);
              setActiveIndex(allMembers.length); // highlight the new pin
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
