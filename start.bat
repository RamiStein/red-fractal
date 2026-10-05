@echo off
title Red Humana Fractal 3D
echo ========================================================
echo   Iniciando Espacio Digital 3D - Red Humana Fractal
echo   Geometria Sagrada y Solidos Platonicos de la Nueva Era
echo ========================================================
echo.
echo Abriendo en tu navegador: http://localhost:8088/red_comunitaria_2d.html
start http://localhost:8088/red_comunitaria_2d.html
python -m http.server 8088 --bind 0.0.0.0
pause
