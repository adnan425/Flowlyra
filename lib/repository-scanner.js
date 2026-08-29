'use strict'

const fs = require('node:fs/promises')
const path = require('node:path')

const IGNORED_DIRECTORIES = new Set([
  '.git',
  '.github',
  '.next',
  '.nuxt',
  '.turbo',
  '.cache',
  '.idea',
  '.vscode',
  'node_modules',
  'dist',
  'build',
  'coverage',
  'vendor',
  'target',
  '__pycache__',
  '.venv',
  'venv'
])

const IGNORED_FILES = new Set([
  '.env',
  '.env.local',
  '.env.development',
  '.env.production',
  '.env.test'
])

const IGNORED_EXTENSIONS = new Set([
  '.lock',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico',
  '.pdf',
  '.zip',
  '.tar',
  '.gz',
  '.7z',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.mp3',
  '.mp4',
  '.mov',
  '.avi',
  '.pem',
  '.key',
  '.p12',
  '.pfx'
])

const LANGUAGE_MAP = {
  '.js': 'JavaScript',
  '.jsx': 'JavaScript',
  '.mjs': 'JavaScript',
  '.cjs': 'JavaScript',

  '.ts': 'TypeScript',
  '.tsx': 'TypeScript',
  '.mts': 'TypeScript',
  '.cts': 'TypeScript',

  '.py': 'Python',

  '.java': 'Java',

  '.go': 'Go',

  '.rs': 'Rust',

  '.php': 'PHP',

  '.rb': 'Ruby',

  '.cs': 'C#',

  '.cpp': 'C++',
  '.cc': 'C++',
  '.cxx': 'C++',

  '.c': 'C',

  '.vue': 'Vue',
  '.svelte': 'Svelte',

  '.html': 'HTML',
  '.css': 'CSS',
  '.scss': 'SCSS',
  '.sass': 'Sass',

  '.sql': 'SQL',

  '.json': 'JSON',
  '.yaml': 'YAML',
  '.yml': 'YAML'
}

const MAX_FILES = 15000

const MAX_FILE_SIZE = 1024 * 1024 // 1 MB

function shouldIgnoreFile(fileName) {
  if (IGNORED_FILES.has(fileName)) {
    return true
  }

  const extension = path.extname(fileName).toLowerCase()

  return IGNORED_EXTENSIONS.has(extension)
}

async function validateProjectPath(projectPath) {
  if (!projectPath || typeof projectPath !== 'string') {
    throw new Error('A project path is required.')
  }

  const resolvedPath = path.resolve(projectPath)

  let stats

  try {
    stats = await fs.stat(resolvedPath)
  } catch {
    throw new Error(`Project path does not exist: ${resolvedPath}`)
  }

  if (!stats.isDirectory()) {
    throw new Error(`Project path is not a directory: ${resolvedPath}`)
  }

  return resolvedPath
}

async function walkDirectory(rootPath) {
  const files = []

  async function walk(currentPath) {
    if (files.length >= MAX_FILES) {
      return
    }

    let entries

    try {
      entries = await fs.readdir(currentPath, {
        withFileTypes: true
      })
    } catch {
      return
    }

    for (const entry of entries) {
      if (files.length >= MAX_FILES) {
        break
      }

      const fullPath = path.join(currentPath, entry.name)

      if (entry.isDirectory()) {
        if (IGNORED_DIRECTORIES.has(entry.name)) {
          continue
        }

        await walk(fullPath)

        continue
      }

      if (!entry.isFile()) {
        continue
      }

      if (shouldIgnoreFile(entry.name)) {
        continue
      }

      files.push(fullPath)
    }
  }

  await walk(rootPath)

  return files
}

function detectLanguages(files) {
  const languages = {}

  for (const file of files) {
    const extension = path.extname(file).toLowerCase()
    const language = LANGUAGE_MAP[extension]

    if (!language) {
      continue
    }

    languages[language] = (languages[language] || 0) + 1
  }

  return Object.entries(languages)
    .map(([name, files]) => ({
      name,
      files
    }))
    .sort((a, b) => b.files - a.files)
}

async function readJsonFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8')

    return JSON.parse(content)
  } catch {
    return null
  }
}

async function detectNodeFrameworks(rootPath) {
  const packageJsonPath = path.join(rootPath, 'package.json')

  const packageJson = await readJsonFile(packageJsonPath)

  if (!packageJson) {
    return []
  }

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies
  }

  const frameworks = []

  const frameworkChecks = [
    ['next', 'Next.js'],
    ['react', 'React'],
    ['@nestjs/core', 'NestJS'],
    ['express', 'Express'],
    ['fastify', 'Fastify'],
    ['@fastify/autoload', 'Fastify'],
    ['vue', 'Vue'],
    ['nuxt', 'Nuxt'],
    ['@angular/core', 'Angular'],
    ['svelte', 'Svelte'],
    ['@sveltejs/kit', 'SvelteKit']
  ]

  for (const [dependency, framework] of frameworkChecks) {
    if (dependencies && dependencies[dependency]) {
      if (!frameworks.includes(framework)) {
        frameworks.push(framework)
      }
    }
  }

  return frameworks
}

async function detectPythonFrameworks(rootPath, files) {
  const frameworks = []

  const pythonFiles = files.filter(file =>
    file.endsWith('.py')
  )

  if (pythonFiles.length === 0) {
    return frameworks
  }

  const dependencyFiles = [
    'requirements.txt',
    'pyproject.toml',
    'Pipfile'
  ]

  let dependencyText = ''

  for (const fileName of dependencyFiles) {
    try {
      const content = await fs.readFile(
        path.join(rootPath, fileName),
        'utf8'
      )

      dependencyText += content.toLowerCase()
    } catch {
      // file does not exist
    }
  }

  if (dependencyText.includes('django')) {
    frameworks.push('Django')
  }

  if (dependencyText.includes('fastapi')) {
    frameworks.push('FastAPI')
  }

  if (dependencyText.includes('flask')) {
    frameworks.push('Flask')
  }

  return frameworks
}

async function detectFrameworks(rootPath, files) {
  const nodeFrameworks =
    await detectNodeFrameworks(rootPath)

  const pythonFrameworks =
    await detectPythonFrameworks(rootPath, files)

  return [
    ...new Set([
      ...nodeFrameworks,
      ...pythonFrameworks
    ])
  ]
}

async function analyzeRepository(projectPath) {
  const rootPath =
    await validateProjectPath(projectPath)

  const files =
    await walkDirectory(rootPath)

  const languages =
    detectLanguages(files)

  const frameworks =
    await detectFrameworks(rootPath, files)

  return {
    project: {
      name: path.basename(rootPath),
      path: rootPath
    },

    summary: {
      totalFiles: files.length,
      languageCount: languages.length,
      frameworksDetected: frameworks.length
    },

    languages,

    frameworks,

    limits: {
      maxFiles: MAX_FILES,
      reachedFileLimit:
        files.length >= MAX_FILES
    }
  }
}

function normalizeFeatureQuery(feature) {
  return feature
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(token => token.length >= 3)
}

async function searchFeature(projectPath, feature) {
  const rootPath =
    await validateProjectPath(projectPath)

  if (!feature || typeof feature !== 'string') {
    throw new Error('A feature query is required.')
  }

  const tokens =
    normalizeFeatureQuery(feature)

  if (tokens.length === 0) {
    throw new Error(
      'Feature query must contain searchable words.'
    )
  }

  const files =
    await walkDirectory(rootPath)

  const matches = []

  for (const filePath of files) {
    const extension =
      path.extname(filePath).toLowerCase()

    if (!LANGUAGE_MAP[extension]) {
      continue
    }

    let stats

    try {
      stats = await fs.stat(filePath)
    } catch {
      continue
    }

    if (stats.size > MAX_FILE_SIZE) {
      continue
    }

    let content

    try {
      content =
        await fs.readFile(filePath, 'utf8')
    } catch {
      continue
    }

    const relativePath =
      path.relative(rootPath, filePath)

    const lowerPath =
      relativePath.toLowerCase()

    const lines =
      content.split(/\r?\n/)

    let score = 0

    const evidence = []

    for (const token of tokens) {
      if (lowerPath.includes(token)) {
        score += 8

        evidence.push({
          type: 'filename',
          token
        })
      }
    }

    for (
      let lineIndex = 0;
      lineIndex < lines.length;
      lineIndex++
    ) {
      const line =
        lines[lineIndex]

      const lowerLine =
        line.toLowerCase()

      let lineScore = 0

      const matchedTokens = []

      for (const token of tokens) {
        if (lowerLine.includes(token)) {
          lineScore += 2
          matchedTokens.push(token)
        }
      }

      if (matchedTokens.length > 0) {
        score += lineScore

        if (evidence.length < 8) {
          evidence.push({
            type: 'source',
            line: lineIndex + 1,
            tokens: matchedTokens,
            preview: line.trim().slice(0, 220)
          })
        }
      }
    }

    if (score > 0) {
      matches.push({
        file: relativePath,
        language:
          LANGUAGE_MAP[extension] || 'Unknown',
        score,
        evidence
      })
    }
  }

  matches.sort((a, b) =>
    b.score - a.score
  )

  return {
    query: feature,

    project: {
      name: path.basename(rootPath),
      path: rootPath
    },

    mode: 'keyword-prototype',

    note:
      'This is the first Flowlyra tracer. AST and call-graph tracing will replace keyword-only discovery.',

    matches: matches.slice(0, 25),

    totalMatches: matches.length
  }
}

module.exports = {
  analyzeRepository,
  searchFeature
}