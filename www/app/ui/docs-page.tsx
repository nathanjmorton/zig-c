import { css } from 'remix/ui'

import { routes } from '../routes.ts'

const FONT_STACK =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"

export function DocsPage() {
  return () => (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <title>zigc docs</title>
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
          <a href={routes.home.href()} mix={css(navLinkStyles)}>← zigc</a>
          <a href="https://github.com/nathanjmorton/zigc" mix={css(navLinkStyles)}>GitHub</a>
        </nav>
        <main mix={css(mainStyles)}>
          <h1 mix={css({ margin: 0, fontSize: '32px', fontWeight: 700 })}>Documentation</h1>

          <Section title="Homebrew">
            <CodeBlock copy={"brew tap nathanjmorton/zigc \x26\x26 brew install zigc"} lines={[
              'brew tap nathanjmorton/zigc',
              'brew install zigc',
            ]} />
            <P>
              Upgrade via Homebrew:
            </P>
            <CodeBlock copy="brew upgrade zigc" lines={['brew upgrade zigc']} />
            <P>
              <strong>Note:</strong> If you installed via Homebrew, use <Code>brew upgrade zigc</Code>{' '}
              instead of <Code>zigc upgrade</Code> to avoid version conflicts. The two install
              methods use different paths (<Code>/opt/homebrew/bin</Code> vs <Code>~/.zigc/bin</Code>)
              so they won't shadow each other, but stick with one upgrade method.
            </P>
          </Section>

          <Section title="Shell script">
            <CodeBlock copy="curl -fsSL https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh | bash" lines={[
              'curl -fsSL https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh | bash',
            ]} />
            <P>
              The installer detects your platform (macOS/Linux, arm64/x86_64), downloads the correct
              binary from GitHub releases, and places it at <Code>~/.zigc/bin/zigc</Code>. It also
              adds <Code>ZIGC_INSTALL</Code> and updates your <Code>PATH</Code> in your shell config.
            </P>
            <P>
              To install a specific version:
            </P>
            <CodeBlock copy="curl -fsSL https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh | bash -s v0.1.0" lines={[
              'curl -fsSL https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh | bash -s v0.1.0',
            ]} />
          </Section>

          <Section title="Build from source">
            <CodeBlock copy={"git clone https://github.com/nathanjmorton/zigc \x26\x26 cd zigc \x26\x26 zig build -Doptimize=ReleaseFast"} lines={[
              'git clone https://github.com/nathanjmorton/zigc',
              'cd zigc',
              'zig build -Doptimize=ReleaseFast',
              'export PATH="$PWD/zig-out/bin:$PATH"',
            ]} />
            <P>
              Requires <A href="https://ziglang.org/download/">Zig 0.16.0</A>.
            </P>
          </Section>

          <Section title="Upgrade">
            <CodeBlock copy="zigc upgrade" lines={['zigc upgrade']} />
            <P>
              Checks GitHub for the latest release, compares to the current version, and downloads
              the correct binary for your platform. Replaces the existing binary in-place.
            </P>
          </Section>

          <Section title="Workflow">
            <H3>Create a project</H3>
            <CodeBlock copy="zigc init my-app" lines={['zigc init my-app', 'cd my-app']} />
            <P>
              Scaffolds <Code>build.zig</Code>, <Code>build.zig.zon</Code>,{' '}
              <Code>src/main.c</Code>, and <Code>.gitignore</Code>. Use <Code>--cpp</Code> for C++.
            </P>

            <H3>Build and run</H3>
            <CodeBlock copy="zigc build" lines={['zigc build', 'zigc run']} />

            <H3>Add a dependency</H3>
            <CodeBlock copy={"zigc registry update \x26\x26 zigc add lz4"} lines={[
              'zigc registry update           # fetch package registry (first time)',
              'zigc add lz4                    # resolve from registry',
              'zigc add git+https://github.com/allyourcodebase/lz4.git#1.10.0-6   # or by URL',
            ]} />
            <P>
              Registry-based adds write the URL + hash directly — no network fetch needed at add time.
              Both methods auto-generate the <Code>b.dependency()</Code> and{' '}
              <Code>mod.linkLibrary()</Code> boilerplate in <Code>build.zig</Code>.
            </P>

            <H3>Inspect and verify</H3>
            <CodeBlock copy={"zigc check --build \x26\x26 zigc verify --symbols"} lines={['zigc check --build', 'zigc verify --symbols']} />

            <H3>Cross-compile to WASM</H3>
            <CodeBlock copy="zigc build --wasi" lines={['zigc build --wasi', 'wasmtime zig-out/bin/my-app.wasm']} />

            <H3>Clean</H3>
            <CodeBlock copy="zigc clean" lines={['zigc clean']} />
          </Section>

          <Section title="Command reference">
            {[
              ['zigc init <name> [--cpp]', 'Scaffold a new C/C++ project'],
              ['zigc add <name|url> [--lib n]', 'Add a dependency by registry name or URL'],
              ['zigc remove <name>', 'Remove a dependency from manifest and build.zig'],
              ['zigc list', 'Show all declared dependencies and pinned URLs'],
              ['zigc registry update', 'Fetch the latest package registry'],
              ['zigc registry generate [--limit N]', 'Scrape allyourcodebase → registry.json'],
              ['zigc check [--build]', 'Verify manifest fields, paths, and dep consistency'],
              ['zigc verify [--symbols]', 'Inspect object files and binary symbol table'],
              ['zigc build [flags]', 'Compile the project (zig build)'],
              ['zigc run [flags]', 'Compile and run (zig build run)'],
              ['zigc clean', 'Remove .zig-cache/ and zig-out/'],
              ['zigc upgrade', 'Update zigc to the latest release'],
              ['zigc help', 'Print usage'],
            ].map(([cmd, desc]) => (
              <div mix={css({ display: 'flex', gap: '16px', padding: '6px 0', flexWrap: 'wrap' })}>
                <code mix={css({ fontSize: '13px', color: 'var(--accent)', whiteSpace: 'nowrap', minWidth: '280px' })}>{cmd}</code>
                <span mix={css({ fontSize: '13px', color: 'var(--text-secondary)' })}>{desc}</span>
              </div>
            ))}
          </Section>

          <Section title="Flag passthrough">
            <P>
              <Code>zigc build</Code> and <Code>zigc run</Code> translate C-style flags to Zig build options:
            </P>
            {[
              ['-O3, -O2, -O1, -Ofast', '-Doptimize=ReleaseFast'],
              ['-Os', '-Doptimize=ReleaseSmall'],
              ['-Og', '-Doptimize=ReleaseSafe'],
              ['--wasi', '-Dtarget=wasm32-wasi'],
              ['--wasm', '-Dtarget=wasm32-freestanding'],
              ['-Wall, -Werror, -DFOO', 'Accumulated into -Dcflags=...'],
            ].map(([from, to]) => (
              <div mix={css({ display: 'flex', gap: '16px', padding: '4px 0', flexWrap: 'wrap' })}>
                <code mix={css({ fontSize: '13px', color: 'var(--text-primary)', minWidth: '220px' })}>{from}</code>
                <span mix={css({ fontSize: '13px', color: 'var(--text-tertiary)' })}>→ {to}</span>
              </div>
            ))}
          </Section>


          <footer mix={css({ paddingTop: '24px', fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center' })}>
            <a href={routes.home.href()} mix={css({ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '2px' })}>
              ← Back to zigc
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
