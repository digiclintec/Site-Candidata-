@echo off
chcp 65001 > nul
echo ========================================================
echo   Sincronizando alteracoes com o GitHub (Site-Candidata-)
echo ========================================================
echo.

git status

echo.
echo Adicionando arquivos modificados...
git add .

echo.
echo Criando commit com as ultimas atualizacoes...
git commit -m "fix: adiciona link oficial completo e abertura direta ao compartilhar propostas e fotos no whatsapp"

echo.
echo Enviando para o repositorio remoto (origin main)...
git push origin main

echo.
echo ========================================================
echo   Processo finalizado com sucesso!
echo ========================================================
pause
