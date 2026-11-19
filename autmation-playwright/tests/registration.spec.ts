import {test, expect} from '@playwright/test';
import path from 'node:path';
import { faker } from '@faker-js/faker';



const nombre = faker.person.firstName();

test('registration',async ({page})=>{
await page.goto('http://127.0.0.1:5500/registration/register.html')

await page.locator('input#name').fill(nombre)
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

await page.screenshot({path: 'screenshots/register1.png'})



// Validar la navegación y el título

const [summaryPage] = await Promise.all([
    
    page.waitForEvent('popup'),
    page.locator('button#save-btn').click()
    
])

await summaryPage.waitForLoadState()
await expect(summaryPage).toHaveTitle('Summary')

await summaryPage.screenshot({
  path: 'screenshots/summary1.png',
  fullPage: true
});

expect(1).toBe(2);

//await page.pause();

})