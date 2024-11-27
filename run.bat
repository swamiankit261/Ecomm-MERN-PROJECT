@echo off

REM Navigate to the backend directory and start the backend server
cd /d C:\mycode\react\MERN PROJECT\Ecomm-MERN-PROJECT
start cmd /k "npm run dev"

REM Navigate to the frontend directory and start the frontend server
cd /d C:\mycode\react\MERN PROJECT\Ecomm-MERN-PROJECT\frontend
start cmd /k "npm start"
