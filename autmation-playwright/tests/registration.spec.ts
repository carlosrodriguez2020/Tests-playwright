import {test, expect} from '@playwright/test';
import path from 'node:path';


test('registration',async ({page})=>{
await page.goto('http://127.0.0.1:5500/registration/register.html')

await page.locator('input#name').fill('QA Name')
await page.locator('input#last-name').fill('QA LastName')
await page.locator('//label[contains(text(),"Edad:")]/following-sibling::input').fill('36')

await page.locator('select#country').selectOption('Argentina')
await page.getByRole('radio',{
    name: 'M',
    exact:true
}).click()

await page.locator('//label[contains(text(),"Correo electrónico:")]/following-sibling::input').fill('a@gmail.com')

await page.locator("id=monday").click()

console.log('Antes de seleccionar la img ')
//await page.locator('input#picture').setInputFiles('img/ShortcutsSQL.jpg')
await page.locator('input#picture').setInputFiles(
  path.resolve(__dirname, '../img/ShortcutsSQL.jpg')
);

console.log('img seleccionada')

await page.locator('button#save-btn').click()

//await page.pause();

})