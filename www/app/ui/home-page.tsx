import { css, type RemixNode } from 'remix/ui'

import { routes } from '../routes.ts'

const FONT_STACK =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"

const VERSION = '0.3.0'

export function HomePage() {
  return () => (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <title>zigc — C/C++ package manager powered by Zig</title>
        <meta
          name="description"
          content="zigc handles scaffolding, dependency management, build orchestration, and binary inspection for C and C++ projects — all without writing a build script by hand."
        />
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
        <main mix={css(mainStyles)}>
          <Hero />
          <Features />
          <QuickStart />
          <Footer />
        </main>
      </body>
    </html>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return () => (
    <section
      aria-label="Install zigc"
      mix={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        textAlign: 'center',
      })}
    >
      <h1
        mix={css({
          margin: 0,
          fontSize: '48px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          '@media (max-width: 600px)': { fontSize: '32px' },
        })}
      >
        zigc
      </h1>
      <p
        mix={css({
          margin: 0,
          fontSize: '18px',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          maxWidth: '540px',
          '@media (max-width: 600px)': { fontSize: '15px' },
        })}
      >
        A C and C++ project &amp; package manager built on{' '}
        <a href="https://ziglang.org/learn/build-system/" mix={css(linkStyles)}>
          Zig's build system
        </a>
        . Scaffolding, dependencies, builds, and binary inspection — no build scripts by hand.
      </p>
      <InstallBlock />
      <p mix={css({ margin: 0, fontSize: '12px', color: 'var(--text-tertiary)' })}>
        Requires{' '}
        <a href="https://ziglang.org/download/" mix={css(linkStyles)}>
          Zig 0.16.0
        </a>{' '}
        · v{VERSION} ·{' '}
        <a href="https://github.com/nathanjmorton/zigc" mix={css(linkStyles)}>
          GitHub
        </a>
      </p>
    </section>
  )
}

function InstallBlock() {
  return () => (
    <div
      mix={css({
        width: '100%',
        maxWidth: '640px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      })}
    >
      <CopyBlock
        command={"brew tap nathanjmorton/zigc \x26\x26 brew install zigc"}
        display={"$ brew tap nathanjmorton/zigc\n$ brew install zigc"}
      />
      <div
        mix={css({
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: 'center',
          fontSize: '13px',
          color: 'var(--text-tertiary)',
        })}
      >
        <span>or</span>
      </div>
      <CopyBlock
        command="curl -fsSL https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh | bash"
        display="$ curl -fsSL https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh | bash"
      />
      <div
        mix={css({
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          fontSize: '13px',
          color: 'var(--text-tertiary)',
        })}
      >
        <span>macOS</span>
        <span>·</span>
        <span>Linux</span>
        <span>·</span>
        <span>arm64 / x86_64</span>
      </div>
    </div>
  )
}

// ── Features ─────────────────────────────────────────────────────────────────

const FEATURES: Array<{ title: string; desc: string }> = [
  { title: 'zigc init', desc: 'Scaffold a new C or C++ project with build.zig and package manifest in one command.' },
  { title: 'zigc add', desc: 'Add dependencies by name from the registry or by URL. Linking boilerplate is auto-generated.' },
  { title: 'zigc build / run', desc: 'Compile with flag translation (-O3 → ReleaseFast, -Wall → -Dcflags). Cross-compile to WASM with --wasi.' },
  { title: 'zigc check', desc: 'Verify manifest fields, .paths entries, and dependency consistency between build.zig.zon and build.zig.' },
  { title: 'zigc verify', desc: 'Inspect compiled object files, binary format, symbol tables, and confirm dep symbols are linked.' },
  { title: 'zigc upgrade', desc: 'Self-update to the latest release. Downloads the correct binary for your platform from GitHub.' },
]

function Features() {
  return () => (
    <section aria-label="Features" mix={css({ width: '100%' })}>
      <h2 mix={css(sectionHeadingStyles)}>What you get</h2>
      <div
        mix={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        })}
      >
        {FEATURES.map((f) => (
          <FeatureCard title={f.title} desc={f.desc} />
        ))}
      </div>
    </section>
  )
}

function FeatureCard() {
  return ({ title, desc }: { title: string; desc: string }) => (
    <div
      mix={css({
        background: 'var(--surface-3)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <h3
        mix={css({
          margin: 0,
          fontSize: '14px',
          fontWeight: 700,
          color: 'var(--accent)',
          fontFamily: FONT_STACK,
        })}
      >
        {title}
      </h3>
      <p mix={css({ margin: 0, fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)' })}>
        {desc}
      </p>
    </div>
  )
}

// ── Quick start ──────────────────────────────────────────────────────────────

function QuickStart() {
  return () => (
    <section aria-label="Quick start" mix={css({ width: '100%' })}>
      <h2 mix={css(sectionHeadingStyles)}>Quick start</h2>
      <CopyBlock
        command={"zigc init my-app \x26\x26 cd my-app \x26\x26 zigc add lz4 \x26\x26 zigc build -O3 \x26\x26 zigc run"}
        display={"$ zigc init my-app\n$ cd my-app\n$ zigc add lz4\n$ zigc build -O3\n$ zigc run"}
      />
      <p
        mix={css({
          marginTop: '16px',
          fontSize: '13px',
          color: 'var(--text-tertiary)',
          textAlign: 'center',
        })}
      >
        <a href={routes.docs.href()} mix={css(linkStyles)}>
          Read the full docs →
        </a>
      </p>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return () => (
    <footer
      mix={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        fontSize: '12px',
        color: 'var(--text-tertiary)',
        textAlign: 'center',
        '& a': { color: 'var(--text-tertiary)', textDecoration: 'underline', textUnderlineOffset: '2px' },
        '& a:hover': { color: 'var(--text-primary)' },
      })}
    >
      <div mix={css({ display: 'flex', gap: '16px' })}>
        <a href="https://github.com/nathanjmorton/zigc">GitHub</a>
        <a href={routes.docs.href()}>Docs</a>
        <a href={routes.bustub.href()}>BusTub Case Study</a>
      </div>
      <p mix={css({ margin: 0 })}>MIT License</p>
    </footer>
  )
}

// ── Shared styles ────────────────────────────────────────────────────────────

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
  alignItems: 'flex-start',
  justifyContent: 'center',
} as const

const mainStyles = {
  width: '100%',
  maxWidth: '820px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '72px',
  paddingTop: '48px',
} as const

const sectionHeadingStyles = {
  margin: '0 0 20px',
  fontSize: '14px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--text-primary)',
} as const

const linkStyles = {
  color: 'var(--accent)',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
  '&:hover': { color: 'var(--text-primary)' },
} as const

// ── Copy-to-clipboard ────────────────────────────────────────────────────────

function CopyBlock() {
  return ({ command, display }: { command: string; display: string }) => (
    <pre
      data-copy={command}
      mix={css({
        margin: 0,
        background: 'var(--surface-3)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '16px 20px',
        fontSize: '14px',
        lineHeight: 1.5,
        color: 'var(--text-primary)',
        overflowX: 'auto',
        whiteSpace: 'pre',
        textAlign: 'left',
        cursor: 'pointer',
        position: 'relative',
        transition: 'border-color 150ms ease',
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
      })}
    >
      {display}
    </pre>
  )
}

