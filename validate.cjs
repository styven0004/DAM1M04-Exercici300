#!/usr/bin/env node

const fs = require("fs")
const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const [,, schemaFile, dataFile] = process.argv

if (!schemaFile || !dataFile) {
  console.error("Usage: validate <schema.json> <data.json>")
  process.exit(1)
}

const schema = JSON.parse(fs.readFileSync(schemaFile))
const data = JSON.parse(fs.readFileSync(dataFile))

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

const validate = ajv.compile(schema)

if (validate(data)) {
  console.log("✅ JSON valid")
} else {
  console.error("❌ JSON invalid")
  console.error(validate.errors)
  process.exit(1)
}
