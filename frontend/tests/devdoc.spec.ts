import { test, expect } from '@playwright/test';

test.describe('Flujo de Usuario en DevDoc AI (Sin alterar Base de Datos)', () => {

  test('Debería cargar el historial simulado, permitir enviar código y ver la respuesta de la IA', async ({ page }) => {

    // 1. INTERCEPTAR EL HISTORIAL: Devolvemos el mock inicial
    await page.route('http://localhost:3000/api/ai/history', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          history: [
            {
              _id: 'mock-1',
              title: 'function calcularIva',
              language: 'typescript',
              codeOriginal: 'function calcularIva(p) { return p * 0.21; }',
              markdownGenerado: '# Documentación de IVA\nCalcula el impuesto.',
              createdAt: new Date().toISOString()
            }
          ]
        })
      });
    });

    // 2. INTERCEPTAR LA GENERACIÓN: Devolvemos la documentación simulada
    await page.route('http://localhost:3000/api/ai/generate', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          id: 'mock-generado-123',
          markdown: '# 🚀 Documentación Exitosa\n\nEste es un mock de Gemini sin tocar la base de datos.'
        })
      });
    });

    // 3. NAVEGACIÓN
    await page.goto('http://localhost:4200');

    // 4. VERIFICACIÓN: El historial se pinta correctamente
    const itemHistorial = page.locator('text=function calcularIva');
    await expect(itemHistorial).toBeVisible();

    // 5. ACCIÓN: Escribimos en el editor
    const editorTextarea = page.locator('textarea');
    await editorTextarea.fill('const saludar = () => "Hola Mundo";');

    // 6. ACCIÓN: Pulsamos generar
    const botonGenerar = page.locator('button:has-text("Generar Documentación")');
    await expect(botonGenerar).toBeEnabled();
    await botonGenerar.click();

    // 7. VERIFICACIÓN FINAL GLOBAL: Buscamos el texto directamente en la pantalla
    // Al usar 'body', no importa cómo se llame la etiqueta interna, el test lo encontrará.
    await expect(page.locator('body')).toContainText('Documentación Exitosa', { timeout: 7000 });
    await expect(page.locator('body')).toContainText('mock de Gemini');
  });

});
