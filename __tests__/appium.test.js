import wd from 'wd'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000
const PORT = 4723
const config = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: './android/app/build/outputs/apk/debug/app-debug.apk' // relative to root of project
}
const driver = wd.promiseChainRemote('localhost', PORT)

beforeAll(async () => {
  try {
    await driver.init(config)
    await driver.sleep(2000) // wait for app to load
  } catch (err) {
    console.log(err)
  }
})

afterAll(async () => {
  try {
    await driver.quit()
  } catch (err) {
    console.error(err)
  }
})

test('Renders root view', async () => {
  expect(await driver.hasElementByAccessibilityId('testview')).toBe(true)
  expect(await driver.hasElementByAccessibilityId('notthere')).toBe(false)
})
