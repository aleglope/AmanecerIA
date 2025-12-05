# 🚨 Guía de Seguridad: Rotación y Limpieza de Credenciales

**SITUACIÓN CRÍTICA**: Tus claves de API (Supabase y Google Gemini) fueron subidas a GitHub.
**ACCIÓN INMEDIATA REQUERIDA**: Considera esas claves como **comprometidas públicamente**. Eliminar el archivo del historial de Git NO ES SUFICIENTE para protegerte, porque bots automáticos ya habrán escaneado las claves.

Debes **cambiar las claves (rotarlas)** en los proveedores originales.

---

## 1. Rotar Claves (¡Haz esto primero!)

### A. Supabase

1. Ve a tu [Supabase Dashboard](https://supabase.com/dashboard).
2. Selecciona tu proyecto.
3. Ve a **Project Settings** (engranaje) -> **API**.
4. En la sección **API Keys** (`anon` `public`), haz clic en **"Generate new API key"** o **Rotate Secret**.
   - _Nota: Esto invalidará la clave antigua inmediatamente._
5. Copia la **NUEVA** `anon` key.
6. Abre tu archivo `.env` local en el proyecto AmanecerIA.
7. Reemplaza el valor de `VITE_SUPABASE_ANON_KEY` con la nueva clave.

### B. Google Gemini (AI Studio)

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Busca la API Key que estabas usando.
3. Haz clic en el icono de **papelera** o **Delete** para borrarla.
4. Haz clic en **Create API Key** para generar una nueva.
5. Abre tu archivo `.env` local.
6. Reemplaza el valor de `VITE_GEMINI_API_KEY` con la nueva clave.

---

## 2. Limpiar Historial de Git (Opcional pero Recomendado)

Aunque cambies las claves, es buena práctica limpiar el historial para que no quede rastro de las antiguas. La forma más sencilla y segura para un proyecto personal es usar BFG Repo-Cleaner o simplemente reescribir la rama.

**Método Sencillo (Recomendado):**
Dado que acabamos de asegurar que tu código actual NO tiene claves (ya las movimos a `.env` y corregimos `supabase/env.ts`), lo más rápido es hacer un "Soft Reset" para re-commitir todo limpio.

**Advertencia: Esto reescribirá tu historial local.**

Ejecuta estos comandos en tu terminal en la carpeta `AmanecerIA`:

1. **Asegura que .gitignore incluye .env**
   (Ya lo he hecho por ti en el paso anterior).

2. **Eliminar archivos cacheados:**

   ```powershell
   git rm -r --cached .
   git add .
   ```

3. **Hacer un nuevo commit limpio:**

   ```powershell
   git commit -m "Security fix: moved credentials to environment variables"
   ```

4. **Forzar la subida a GitHub:**
   Esto sobrescribirá el historial en GitHub con tu versión limpia.
   ```powershell
   git push origin main --force
   ```
   _(Cambia `main` por `master` si esa es tu rama principal)._

---

## 3. Verificación Final

1. Abre tu archivo `.env` y asegúrate de que tiene las **NUEVAS** claves.
2. Asegúrate de que tu archivo `supabase/env.ts` se ve así:
   ```typescript
   export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
   export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
   ```
   (Sin claves reales escritas).
3. Asegúrate de que `services/geminiService.ts` no tiene claves escritas.
4. Ejecuta `npm run dev` y verifica que la aplicación funciona correctamente con las nuevas credenciales.

---

**Resumen:**

- ✅ El código actual ya es seguro.
- ⚠️ Debes generar nuevas claves en Supabase y Google.
- ⚠️ Debes actualizar tu archivo `.env` local con las nuevas claves.
