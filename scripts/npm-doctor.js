#!/usr/bin/env node

/**
 * NPM Doctor - Diagnose and fix common npm issues
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

class NpmDoctor {
  constructor() {
    this.issues = []
    this.fixes = []
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[34m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m',
    }

    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    }

    console.log(`${colors[type]}${icons[type]} ${message}${colors.reset}`)
  }

  async checkNodeVersion() {
    try {
      const nodeVersion = process.version.slice(1)
      const requiredVersion = '18.17.0'

      if (this.compareVersions(nodeVersion, requiredVersion) < 0) {
        this.issues.push(`Node.js version ${nodeVersion} is below required ${requiredVersion}`)
        this.fixes.push('Update Node.js: https://nodejs.org/')
      } else {
        this.log(`Node.js version ${nodeVersion} ✓`, 'success')
      }
    } catch (error) {
      this.issues.push('Could not check Node.js version')
    }
  }

  async checkNpmVersion() {
    try {
      const npmVersion = execSync('npm -v', { encoding: 'utf8' }).trim()
      const requiredVersion = '9.6.7'

      if (this.compareVersions(npmVersion, requiredVersion) < 0) {
        this.issues.push(`npm version ${npmVersion} is below recommended ${requiredVersion}`)
        this.fixes.push('Update npm: npm install -g npm@latest')
      } else {
        this.log(`npm version ${npmVersion} ✓`, 'success')
      }
    } catch (error) {
      this.issues.push('Could not check npm version')
    }
  }

  async checkPackageJson() {
    const packageJsonPath = path.join(process.cwd(), 'package.json')

    if (!fs.existsSync(packageJsonPath)) {
      this.issues.push('package.json not found')
      return
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

      // Check for required fields
      const requiredFields = ['name', 'version', 'scripts']
      for (const field of requiredFields) {
        if (!packageJson[field]) {
          this.issues.push(`package.json missing required field: ${field}`)
        }
      }

      // Check for packageManager field
      if (!packageJson.packageManager || !packageJson.packageManager.startsWith('npm')) {
        this.fixes.push('Add "packageManager": "npm@9.6.7" to package.json')
      }

      this.log('package.json structure ✓', 'success')
    } catch (error) {
      this.issues.push('Invalid package.json format')
    }
  }

  async checkNodeModules() {
    const nodeModulesPath = path.join(process.cwd(), 'node_modules')
    const packageLockPath = path.join(process.cwd(), 'package-lock.json')

    if (!fs.existsSync(nodeModulesPath)) {
      this.issues.push('node_modules directory not found')
      this.fixes.push('Run: npm install')
    }

    if (!fs.existsSync(packageLockPath)) {
      this.issues.push('package-lock.json not found')
      this.fixes.push('Run: npm install to generate package-lock.json')
    }

    if (fs.existsSync(nodeModulesPath) && fs.existsSync(packageLockPath)) {
      this.log('Dependencies installed ✓', 'success')
    }
  }

  async checkNpmrc() {
    const npmrcPath = path.join(process.cwd(), '.npmrc')

    if (fs.existsSync(npmrcPath)) {
      this.log('.npmrc configuration found ✓', 'success')
    } else {
      this.fixes.push('Consider adding .npmrc for project-specific npm configuration')
    }
  }

  async checkScripts() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
      const requiredScripts = ['dev', 'build', 'start', 'lint']

      for (const script of requiredScripts) {
        if (!packageJson.scripts[script]) {
          this.issues.push(`Missing required script: ${script}`)
        }
      }

      if (this.issues.length === 0) {
        this.log('Required scripts present ✓', 'success')
      }
    } catch (error) {
      this.issues.push('Could not check package.json scripts')
    }
  }

  async checkEnvironment() {
    const envExamplePath = path.join(process.cwd(), '.env.example')
    const envLocalPath = path.join(process.cwd(), '.env.local')

    if (!fs.existsSync(envExamplePath)) {
      this.issues.push('.env.example not found')
    }

    if (!fs.existsSync(envLocalPath)) {
      this.fixes.push('Copy .env.example to .env.local and configure')
    } else {
      this.log('Environment configuration found ✓', 'success')
    }
  }

  compareVersions(version1, version2) {
    const v1parts = version1.split('.').map(Number)
    const v2parts = version2.split('.').map(Number)

    for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
      const v1part = v1parts[i] || 0
      const v2part = v2parts[i] || 0

      if (v1part < v2part) return -1
      if (v1part > v2part) return 1
    }

    return 0
  }

  async runDiagnostics() {
    this.log('🔍 Running NPM Portfolio Diagnostics...', 'info')
    console.log('')

    await this.checkNodeVersion()
    await this.checkNpmVersion()
    await this.checkPackageJson()
    await this.checkNodeModules()
    await this.checkNpmrc()
    await this.checkScripts()
    await this.checkEnvironment()

    console.log('')

    if (this.issues.length === 0) {
      this.log('🎉 All checks passed! Your npm setup looks good.', 'success')
    } else {
      this.log('⚠️  Issues found:', 'warning')
      this.issues.forEach(issue => this.log(`   • ${issue}`, 'error'))
    }

    if (this.fixes.length > 0) {
      console.log('')
      this.log('🔧 Suggested fixes:', 'info')
      this.fixes.forEach(fix => this.log(`   • ${fix}`, 'info'))
    }

    console.log('')
    this.log('💡 For more help, check the README.md or run: npm run --help', 'info')
  }
}

// Run diagnostics
const doctor = new NpmDoctor()
doctor.runDiagnostics().catch(console.error)
