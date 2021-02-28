const puppeteer = require('puppeteer');
const axios = require('axios');

async function fetchDataByMeterId(meterId, sessionId) {
    var postData = {
    };
    let axiosConfig = {
        headers: {
            'Referer': `https://www.smartwatermeters.in/_projects/?page=user_profile&meter_id=${meterId}`,
            'Cookie': `PHPSESSID=${sessionId}`
        }
    };
    console.log(axiosConfig);
    return axios.post('https://www.smartwatermeters.in/assets/custom/users/retrieve_profile.php', postData, axiosConfig);
}

(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto("https://www.smartwatermeters.in/");
    await page.$eval('input[name=username]', el => el.value = 'susheel61@gmail.com');
    await page.$eval('input[name=password]', el => el.value = 'blackcaps1992$');
    await page.click('#kt_login_signin_submit');
    await page.waitForNavigation();
    const cookies = await page.cookies();
    const sessionId = cookies.find(item => item.name = 'PHPSESSID').value;
    const meterData = await fetchDataByMeterId('2-2-15121', sessionId);
    meterData.data.data.forEach(element => {
        console.log(element);
    });
    browser.close();
})();
