
/*
import{test, expect} from '@playwright/test';
test('login',async({page}) => {

    await page.goto('http://127.0.0.1:5500/login/login.html')

    await page.locator('input#username').fill('user')
    await page.locator('input#password').fill('pass')

    //await page.getByRole('button').click();
    await page.locator('//button[@type="submit"]').click();

    await expect(page.locator('//h2[contains(text(), "Transacciones")]')).toBeVisible()
    
    await page.getByRole('button', {
        name: 'Añadir transacción',
        exact: true
    }).click();
    await page.pause();
    
    await expect(page.locator('#transactionModalLabel')).toBeVisible();

    await page.locator('//input["id=date"]]').click()
    
    
    
    await page.locator('//button[contains(text(),"Añadir transacción")]').click();
    await expect(page.locator('id=transactionModalLabel')).toBeVisible()

    await page.locator('id=date').click()

})


import { test, expect } from '@playwright/test';
Utilizando CodeGen

/*test('Crear una transaccion', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login/login.html');
  await page.getByRole('textbox', { name: 'Nombre de usuario:' }).click();
  await page.getByRole('textbox', { name: 'Nombre de usuario:' }).fill('user');
  await page.getByRole('textbox', { name: 'Contraseña:' }).click();
  await page.getByRole('textbox', { name: 'Contraseña:' }).fill('pass');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.getByRole('textbox', { name: 'Fecha:' }).fill('2026-11-18');
  await page.getByRole('spinbutton', { name: 'Monto:' }).click();
  await page.getByRole('spinbutton', { name: 'Monto:' }).fill('1000');
  await page.getByRole('textbox', { name: 'Descripción:' }).click();
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('QA test 1');
  await page.getByRole('button', { name: 'Guardar' }).click();
});
*/

import { test, expect } from '@playwright/test';

test('crear transacción', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login/login.html');

  await page.getByLabel('Nombre de usuario:').fill('user');
  await page.getByLabel('Contraseña:').fill('pass');

  await page.getByRole('button', {
    name: 'Iniciar sesión',
    exact: true
  }).click();

  await page.waitForURL('**/transactions.html', {
    waitUntil: 'load'
  });

  // Tu página utiliza el plugin de modal de Bootstrap 4.
  await page.waitForFunction(() => {
    const jq = (window as any).jQuery;
    return typeof jq?.fn?.modal === 'function';
  });

  await page.getByRole('button', {
    name: 'Añadir transacción',
    exact: true
  }).click();

  const modal = page.locator('#transactionModal');

  await expect(modal).toBeVisible();

  // Para input type="date", el formato es AAAA-MM-DD.
  await modal.locator('#date').fill('2026-11-18');
  await modal.getByLabel('Monto:').fill('1000');
  await modal.getByLabel('Descripción:').fill('QA test 1');

  await modal.getByRole('button', {
    name: 'Guardar',
    exact: true
  }).click();

  await expect(modal).toBeHidden();
});


