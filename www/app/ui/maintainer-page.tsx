import { css } from 'remix/ui'

import { routes } from '../routes.ts'

const FONT_STACK =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"

export function MaintainerPage() {
  return () => (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <title>zigc — maintainer guide</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
        />
        <script type="module" src={routes.assets.href({ path: 'app/assets/entry.ts' })}></script>
        <script src={routes.copyScript.href()}></script>
      </head>
      <body mix={css(bodyStyles)}>
        <nav mix={css(navStyles)}>
          <a href={routes.docs.href()} mix={css(navLinkStyles)}>← docs</a>
          <a href="https://github.com/nathanjmorton/zigc" mix={css(navLinkStyles)}>GitHub</a>
        </nav>
        <main mix={css(mainStyles)}>
          <h1 mix={css({ margin: 0, fontSize: '32px', fontWeight: 700 })}>Maintainer Guide</h1>
          <P>
            Release process for <Code>zigc</Code> and <Code>zigtsc</Code>. Both CLIs follow the
            same pattern: bump the compiled-in version, push a tag, CI builds release binaries,
            users get the update via <Code>upgrade</Code> or <Code>brew upgrade</Code>.
          </P>

          <Section title="Release checklist">
            <P>This applies to both <Code>zigc</Code> and <Code>zigtsc</Code>.</P>
            <H3>1. Bump VERSION</H3>
            <P>
              Edit the <Code>VERSION</Code> constant in <Code>src/main.zig</Code>:
            </P>
            <CodeBlock lines={[
              '// zigc:   src/main.zig line 5',
              '// zigtsc: src/main.zig line 11',
              'const VERSION = "0.3.0";',
            ]} />

            <H3>2. Commit and push</H3>
            <CodeBlock copy={'git add src/main.zig && git commit -m "release: v0.3.0" && git push'} lines={[
              'git add src/main.zig',
              'git commit -m "release: v0.3.0"',
              'git push',
            ]} />

            <H3>3. Tag and push</H3>
            <CodeBlock copy="git tag v0.3.0 && git push --tags" lines={[
              'git tag v0.3.0',
              'git push --tags',
            ]} />
            <P>
              The <Code>v*</Code> tag triggers <Code>.github/workflows/release.yml</Code>, which
              cross-compiles for 4 targets and creates a GitHub Release with tarballs.
            </P>

            <H3>4. Wait for CI</H3>
            <P>
              Check the Actions tab. The release job builds:
            </P>
            <CodeBlock lines={[
              'aarch64-macos',
              'x86_64-macos',
              'aarch64-linux-gnu',
              'x86_64-linux-gnu',
            ]} />
            <P>
              Each target produces a tarball: <Code>{'<tool>-<target>.tar.gz'}</Code>{' '}
              (e.g. <Code>zigc-aarch64-macos.tar.gz</Code>).
            </P>

            <H3>5. Update Homebrew formula</H3>
            <P>
              After the release is published, update the tap repo with the new version and sha256 hashes.
            </P>
            <CodeBlock lines={[
              '# For zigc:  github.com/nathanjmorton/homebrew-zigc',
              '# For zigtsc: github.com/nathanjmorton/homebrew-zigtsc',
              '',
              '# In Formula/<tool>.rb, update:',
              '  version "0.3.0"',
              '  sha256 "..."   # for each platform block',
            ]} />
            <P>
              Get the sha256 for each tarball from the release page, or compute locally:
            </P>
            <CodeBlock copy="curl -sL https://github.com/nathanjmorton/zigc/releases/download/v0.3.0/zigc-aarch64-macos.tar.gz | shasum -a 256" lines={[
              'curl -sL <tarball-url> | shasum -a 256',
            ]} />

            <H3>6. Verify</H3>
            <CodeBlock copy={'zigc upgrade && zigc help'} lines={[
              '# Self-update (shell script / build-from-source installs)',
              'zigc upgrade',
              '',
              '# Homebrew',
              'brew upgrade zigc',
              '',
              '# Confirm version',
              'zigc help    # should show new version in behavior',
            ]} />
          </Section>

          <Section title="How the upgrade command works">
            <P>
              Both <Code>zigc upgrade</Code> and <Code>zigtsc upgrade</Code> follow the same logic:
            </P>
            <CodeBlock lines={[
              '1. curl GitHub API → /repos/{owner}/{repo}/releases/latest',
              '2. Extract "tag_name" from JSON response',
              '3. Compare against compiled-in VERSION constant',
              '4. If newer: detect platform (comptime), build download URL',
              '5. which <tool> → find binary location on PATH',
              '6. If Homebrew path detected → print "use brew upgrade" and exit',
              '7. curl tarball → /tmp, tar extract → overwrite binary',
              '8. chmod +x, clean up tarball',
            ]} />
            <P>
              The <Code>VERSION</Code> constant is compiled into the binary at build time. This is
              why bumping it is the first step — without a bump, the upgrade command thinks it's
              already up to date.
            </P>
          </Section>

          <Section title="Architecture">
            <CodeBlock lines={[
              'src/main.zig        VERSION constant + all CLI commands',
              '.github/workflows/  release.yml — triggered by v* tags',
              'install.sh          Shell installer (downloads from GitHub releases)',
              'homebrew-*/          Separate tap repos with Formula/*.rb',
            ]} />
            <P>
              The Homebrew tap repos are at{' '}
              <A href="https://github.com/nathanjmorton/homebrew-zigc">nathanjmorton/homebrew-zigc</A>{' '}
              and{' '}
              <A href="https://github.com/nathanjmorton/homebrew-zigtsc">nathanjmorton/homebrew-zigtsc</A>.
            </P>
          </Section>

          <footer mix={css({ paddingTop: '24px', fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center' })}>
            <a href={routes.docs.href()} mix={css({ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '2px' })}>
              ← Back to docs
            </a>
          </footer>
        </main>
      </body>
    </html>
  )
}

// ── Reusable components ──────────────────────────────────────────────────────

function Section() {
  return ({ title, children }: { title: string; children?: any }) => (
    <section mix={css({ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' })}>
      <h2 mix={css({ margin: 0, fontSize: '18px', fontWeight: 700, paddingBottom: '4px', borderBottom: '1px solid var(--border)' })}>{title}</h2>
      {children}
    </section>
  )
}

function H3() {
  return ({ children }: { children?: any }) => (
    <h3 mix={css({ margin: '8px 0 0', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' })}>{children}</h3>
  )
}

function P() {
  return ({ children }: { children?: any }) => (
    <p mix={css({ margin: 0, fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)' })}>{children}</p>
  )
}

function A() {
  return ({ href, children }: { href: string; children?: any }) => (
    <a href={href} mix={css({ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '2px' })}>{children}</a>
  )
}

function Code() {
  return ({ children }: { children?: any }) => (
    <code mix={css({ fontSize: '13px', background: 'var(--surface-3)', padding: '1px 5px', borderRadius: '4px' })}>{children}</code>
  )
}

function CodeBlock() {
  return ({ lines, copy }: { lines: string[]; copy?: string }) => (
    <pre
      {...(copy ? { 'data-copy': copy } : {})}
      mix={css({
        margin: 0,
        background: 'var(--surface-3)',
        borderRadius: '12px',
        padding: '16px 20px',
        fontSize: '13px',
        lineHeight: 1.7,
        overflowX: 'auto',
        color: 'var(--text-primary)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        ...(copy ? {
          cursor: 'pointer',
          position: 'relative',
          transition: 'border-color 150ms ease',
          border: '1px solid transparent',
          '&:hover': { borderColor: 'var(--accent)' },
          '&::after': {
            content: '"click to copy"',
            position: 'absolute',
            top: '8px',
            right: '12px',
            fontSize: '11px',
            color: 'var(--text-tertiary)',
            opacity: 0,
            transition: 'opacity 150ms ease',
          },
          '&:hover::after': { opacity: 1 },
        } : {}),
      })}
    >
      {lines.join('\n')}
    </pre>
  )
}

// ── Styles

const bodyStyles = {
  '--surface-0': '#0c0d10',
  '--surface-3': '#1a1b1f',
  '--border': '#2a2b30',
  '--text-primary': '#e8e8ec',
  '--text-secondary': '#a0a0a8',
  '--text-tertiary': '#6b6b74',
  '--accent': '#f0c040',
  '@media (prefers-color-scheme: light)': {
    '--surface-0': '#f5f5f7',
    '--surface-3': '#e8e8ec',
    '--border': '#d0d0d6',
    '--text-primary': '#1a1b1f',
    '--text-secondary': '#52525a',
    '--text-tertiary': '#8b8b94',
    '--accent': '#b8860b',
  },
  '& *, & *::before, & *::after': { boxSizing: 'border-box' },
  margin: 0,
  padding: '48px 24px',
  minHeight: '100vh',
  background: 'var(--surface-0)',
  color: 'var(--text-primary)',
  fontFamily: FONT_STACK,
  fontSize: '14px',
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
} as const

const mainStyles = {
  width: '100%',
  maxWidth: '760px',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  paddingTop: '24px',
} as const

const navStyles = {
  width: '100%',
  maxWidth: '760px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '16px',
  borderBottom: '1px solid var(--border)',
} as const

const navLinkStyles = {
  fontSize: '13px',
  color: 'var(--text-tertiary)',
  textDecoration: 'none',
  '&:hover': { color: 'var(--text-primary)' },
} as const
