#!/bin/bash

echo "🔒 VERIFICACIÓN DE SEGURIDAD - SuperAgent"
echo "========================================"

# Verificar que .env no esté siendo trackeado
if git ls-files | grep -q "^\.env$"; then
    echo "❌ PELIGRO: El archivo .env está siendo trackeado por Git!"
    echo "   Ejecuta: git rm --cached .env"
    echo "   Y luego: git commit -m 'fix: remove .env from tracking'"
else
    echo "✅ .env está correctamente excluido de Git"
fi

# Verificar que .gitignore existe
if [ -f ".gitignore" ]; then
    if grep -q ".env" .gitignore; then
        echo "✅ .gitignore contiene exclusión para .env"
    else
        echo "⚠️  .gitignore no contiene .env - agregándolo..."
        echo ".env" >> .gitignore
    fi
else
    echo "❌ No existe archivo .gitignore"
fi

# Verificar que .env.example existe
if [ -f ".env.example" ]; then
    echo "✅ .env.example existe para guía de configuración"
else
    echo "⚠️  .env.example no existe - se recomienda crearlo"
fi

# Mostrar archivos que serán incluidos en el commit
echo ""
echo "📁 ARCHIVOS QUE SE SUBIRÁN A GITHUB:"
echo "===================================="
git add . --dry-run 2>/dev/null || echo "No hay git repo inicializado"

echo ""
echo "🔍 BUSCAR POSIBLES CREDENCIALES EN ARCHIVOS:"
echo "============================================="

# Buscar posibles API keys o credenciales en archivos que se van a commitear
for file in $(git diff --cached --name-only 2>/dev/null || find . -name "*.js" -o -name "*.ts" -o -name "*.json" | grep -v node_modules); do
    if [ -f "$file" ]; then
        if grep -l -i "api.key\|secret\|password\|token" "$file" 2>/dev/null; then
            echo "⚠️  Revisar archivo: $file (contiene posibles credenciales)"
        fi
    fi
done

echo ""
echo "🎯 RECOMENDACIONES FINALES:"
echo "=========================="
echo "1. ✅ Nunca hagas commit del archivo .env"
echo "2. ✅ Usa variables de entorno para credenciales"
echo "3. ✅ Mantén .env.example actualizado"
echo "4. ✅ Revisa cada commit antes de hacer push"
echo "5. ✅ Si accidentalmente subes credenciales, rótalas inmediatamente"
