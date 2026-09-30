#!/usr/bin/env node
/**
 * Finishes what `lerna version --no-git-tag-version` starts.
 *
 * Lerna is used only for its interactive per-package prompt. Its own tagging
 * cannot be used: in independent mode it names tags `<npm name><sep><version>`,
 * and the npm name is not the package directory (`@commercelayer/sdk` lives in
 * `packages/core-sdk`), while release.yml derives the package from the tag
 * prefix precisely so no name->directory mapping has to be maintained. And
 * --no-git-tag-version suppresses Lerna's commit along with its tag, so both
 * are made here.
 *
 * So: run lerna with --no-git-tag-version --no-private, then this. It
 *   1. commits the bumped manifests,
 *   2. tags each bumped package as `<directory>-v<version>`.
 *
 * Private packages are left alone by --no-private; if one has moved anyway,
 * this refuses rather than release a version nothing publishes.
 *
 * Deliberately does not push. Pushing a tag drafts a release, which is the
 * point at which a mistake stops being local.
 *
 * Usage:  node scripts/finish-version.mjs [--dry-run]
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const DRY = process.argv.includes('--dry-run')
const PACKAGES_DIR = 'packages'

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()
/**
 * Untrimmed, for `status --porcelain`: its format is two status columns then a
 * space, so an unstaged change begins with a space. Trimming the whole output
 * eats that column on the first line only, shifting the filename by one.
 */
const gitRaw = (...args) => execFileSync('git', args, { encoding: 'utf8' })
const run = (...args) => {
  if (DRY) {
    console.log(`  would run: git ${args.join(' ')}`)
    return ''
  }
  return git(...args)
}

const fail = (msg) => {
  console.error(`\n✖ ${msg}\n`)
  process.exit(1)
}

/** The version a package.json declares, at HEAD or in the working tree. */
const versionAt = (dir, ref) => {
  const path = `${PACKAGES_DIR}/${dir}/package.json`
  const raw = ref ? git('show', `${ref}:${path}`) : readFileSync(path, 'utf8')
  return JSON.parse(raw).version
}

const manifest = (dir) => JSON.parse(readFileSync(join(PACKAGES_DIR, dir, 'package.json'), 'utf8'))

// Only package.json files may differ from HEAD. Anything else means the tree
// was dirty before versioning, and the release commit would silently pick it up.
const dirty = gitRaw('status', '--porcelain', '--untracked-files=no')
  .split('\n')
  .filter(Boolean)
  .map((l) => l.slice(3))
const stray = dirty.filter((f) => !/^packages\/[^/]+\/package\.json$/.test(f))
if (stray.length > 0) {
  fail(`Working tree has changes outside package.json:\n   ${stray.join('\n   ')}\n\n   Commit or stash them first.`)
}
if (dirty.length === 0) fail('No version changes found. Did `lerna version --no-git-tag-version` run?')

const dirs = readdirSync(PACKAGES_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)

const bumped = []

for (const dir of dirs) {
  const before = versionAt(dir, 'HEAD')
  const after = versionAt(dir)
  if (before === after) continue

  const pkg = manifest(dir)
  if (pkg.private === true) {
    // `release:version` passes --no-private, so a private package should never
    // have moved. If one has, the flag was dropped: stop rather than commit a
    // version bump for something that is never published.
    fail(
      `Private package ${dir} was versioned (${before} -> ${after}).\n` +
        `   Run lerna with --no-private, then restore it before releasing.`,
    )
  }

  bumped.push({ dir, name: pkg.name, from: before, to: after, tag: `${dir}-v${after}` })
}

if (bumped.length === 0) fail('Only private packages changed — nothing to release.')

// A tag that already exists means this ran twice, or the version was not
// actually bumped. Either way, stop before writing history.
for (const b of bumped) {
  const exists = git('tag', '--list', b.tag)
  if (exists) fail(`Tag ${b.tag} already exists. Delete it or pick a different version.`)
}

console.log('\nReleasing:')
for (const b of bumped) console.log(`  ${b.name.padEnd(36)} ${b.from} -> ${b.to}   tag: ${b.tag}`)

const subject =
  bumped.length === 1
    ? `chore: bump ${bumped[0].name} to ${bumped[0].to}`
    : `chore: bump ${bumped.map((b) => `${b.dir} to ${b.to}`).join(' and ')}`

run('add', '--', ...dirs.map((d) => `${PACKAGES_DIR}/${d}/package.json`))
run('commit', '-m', subject)
for (const b of bumped) run('tag', b.tag)

const head = DRY ? '<dry-run>' : git('rev-parse', '--short', 'HEAD')
console.log(`\n✔ ${DRY ? 'Would commit' : 'Committed'} ${head}: ${subject}`)
console.log(`  ${DRY ? 'Would tag' : 'Tagged'}: ${bumped.map((b) => b.tag).join(', ')}`)
console.log('\nNothing pushed. To release:')
console.log('  git push origin HEAD')
console.log(`  git push origin ${bumped.map((b) => b.tag).join(' ')}`)
