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
git commit -m "fix: retorno automatico a tela inicial ao atualizar pagina e correcao hero iphone"

echo.
echo Enviando para o repositorio remoto (origin main)...
git push origin main

echo.
echo ========================================================
echo   Processo finalizado com sucesso!
echo ========================================================
pause
