import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"


export const updateLicense = () => {

  const encoding = 'utf-8'
  const licenseFile = resolve('LICENSE')

  const license = readFileSync(licenseFile, { encoding })

  const currentYear = new Date().getFullYear()
  const updatedLicense = license.replace(/\[\d{4}\]/, `[${currentYear}]`)

  writeFileSync(licenseFile, updatedLicense, { encoding })

}
