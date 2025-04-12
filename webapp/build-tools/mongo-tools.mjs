import { execSync } from 'child_process'
import { config } from '@dotenvx/dotenvx' // import dotenvx to load env variables
import fs from 'fs'
import path from 'path'

// Load environment variables from .env file
config()

// Get DATABASE_URI from environment variables
const uri = process.env.DATABASE_URI
if (!uri) {
  console.error('❌ DATABASE_URI is missing in .env')
  process.exit(1)
}

// Extract database name from the URI
const dbName = uri.split('/').pop()
if (!dbName) {
  console.error('❌ Failed to extract DB name from DATABASE_URI')
  process.exit(1)
}

// Get the command (dump or restore) from command-line arguments
const command = process.argv[2]
let cmd

// Check if the Docker container is running
const checkDockerCmd = 'docker ps --filter "name=webapp-mongo-1" --filter "status=running" --quiet'
const isContainerRunning = execSync(checkDockerCmd).toString().trim()
if (!isContainerRunning) {
  console.error('❌ Docker container "webapp-mongo-1" is not running.')
  process.exit(1)
}

// Handle the "dump" command
if (command === 'dump') {
  // Check the contents of /dump directory inside the container to identify existing directories
  const lsDumpCmd = 'docker exec webapp-mongo-1 ls /dump'
  console.log(`👉 Running: ${lsDumpCmd}`)
  let lsResult
  try {
    lsResult = execSync(lsDumpCmd).toString()
    console.log(`✅ Found directories inside /dump: \n${lsResult}`)
  } catch (err) {
    console.error('❌ Failed to list /dump directory inside the container.')
    console.error('📛 DEBUG MESSAGE:', err.message)
    process.exit(1)
  }

  // Ensure the local directory exists
  const localDumpDir = './dump'
  if (!fs.existsSync(localDumpDir)) {
    fs.mkdirSync(localDumpDir, { recursive: true })
    console.log(`✅ Created local dump directory: ${localDumpDir}`)
  }

  // Extract and ensure the necessary local dump directories
  const directories = lsResult.split('\n').filter((dir) => dir !== '')
  directories.forEach((dir) => {
    const localDirPath = path.join(localDumpDir, dir)
    if (!fs.existsSync(localDirPath)) {
      fs.mkdirSync(localDirPath, { recursive: true })
      console.log(`✅ Created missing local directory: ${localDirPath}`)
    }
  })

  // Now that the directories are ensured, we proceed with the dump
  const cleanupCmd = `docker exec webapp-mongo-1 rm -rf /dump/*`
  console.log(`👉 Running: ${cleanupCmd}`)
  try {
    execSync(cleanupCmd, { stdio: 'inherit' })
    console.log('✅ Cleaned up previous dump files inside the container.')
  } catch (err) {
    console.error('❌ Failed to clean up previous dump files.')
    console.error('📛 DEBUG MESSAGE:', err.message)
    process.exit(1)
  }

  // Now create the dump using Docker
  cmd = `docker exec webapp-mongo-1 mongodump --uri="${uri}" --db="${dbName}" --out=/dump --verbose`
  console.log(`👉 Running: ${cmd}`)
  try {
    execSync(cmd, { stdio: 'inherit' })
    console.log('✅ Dump created inside the container.')

    // Now, copy the dump from the container to the local machine
    const copyCmd = `docker cp webapp-mongo-1:/dump/${dbName} ./dump`
    console.log(`👉 Running: ${copyCmd}`)
    execSync(copyCmd, { stdio: 'inherit' })
    console.log('✅ Dump copied from the container to the local machine.')

    // Verify the copied files on the local machine
    directories.forEach((dir) => {
      const localDirPath = path.join(localDumpDir, dir)
      if (!fs.existsSync(localDirPath)) {
        fs.mkdirSync(localDirPath, { recursive: true })
        console.log(`✅ Created missing directory: ${localDirPath}`)
      }
    })

    const lsLocalDumpCmd = `ls ${localDumpDir}`
    console.log(`👉 Running: ${lsLocalDumpCmd}`)
    const localLsResult = execSync(lsLocalDumpCmd).toString()
    console.log(`✅ Files in local dump directory: \n${localLsResult}`)
  } catch (err) {
    console.error('❌ Failed to dump and copy the dump from the container.')
    console.error('📛 DEBUG MESSAGE:', err.message)
    process.exit(1)
  }
}
// Handle the "restore" command
else if (command === 'restore') {
  // Verify that the dump directory exists locally before restoreing
  const dumpDirectory = './dump/puckload'
  try {
    execSync(`ls ${dumpDirectory}`, { stdio: 'ignore' })
    console.log('✅ Found local dump directory.')
  } catch (err) {
    console.error(`❌ Local dump directory "${dumpDirectory}" not found.`)
    process.exit(1)
  }

  // First, copy the dump from the local machine to the container
  const copyCmd = `docker cp ./dump/puckload webapp-mongo-1:/dump`
  console.log(`👉 Running: ${copyCmd}`)
  try {
    execSync(copyCmd, { stdio: 'inherit' })
    console.log('✅ Dump copied from local machine to the container.')

    // Verify the copied files inside the container
    const lsInsideCmd = 'docker exec webapp-mongo-1 ls /dump/puckload'
    console.log(`👉 Running: ${lsInsideCmd}`)
    const lsInsideResult = execSync(lsInsideCmd).toString()
    console.log(`✅ Files inside /dump/puckload in container: \n${lsInsideResult}`)
  } catch (err) {
    console.error('❌ Failed to copy dump from the local machine to the container.')
    console.error('📛 DEBUG MESSAGE:', err.message)
    process.exit(1)
  }

  // Now restore the dump using mongorestore inside the container
  cmd = `docker exec webapp-mongo-1 mongorestore --uri="${uri}" --db="${dbName}" --drop /dump/puckload --verbose`
} else {
  console.error('❌ Invalid command. Use "dump" or "restore".')
  process.exit(1)
}

console.log(`👉 Running: ${cmd}`)

try {
  // Execute the restore command using execSync
  execSync(cmd, { stdio: 'inherit' })
  console.log('✅ Operation completed inside container.')
} catch (err) {
  console.error('❌ Operation failed.')
  console.error('📛 DEBUG MESSAGE:', err.message)
  process.exit(1)
}
