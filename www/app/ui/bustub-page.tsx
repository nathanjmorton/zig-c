import { css } from 'remix/ui'

import { routes } from '../routes.ts'

const FONT_STACK =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"

export function BustubPage() {
  return () => (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <title>Case Study — Migrating BusTub from CMake to zigc</title>
        <meta
          name="description"
          content="How to recreate CMU's BusTub RDBMS as a greenfield zigc project with vendored dependencies hosted on S3."
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
        <nav mix={css(navStyles)}>
          <a href={routes.home.href()} mix={css(navLinkStyles)}>← zigc</a>
          <a href={routes.docs.href()} mix={css(navLinkStyles)}>Docs</a>
        </nav>
        <main mix={css(mainStyles)}>
          <header mix={css({ display: 'flex', flexDirection: 'column', gap: '12px' })}>
            <p mix={css({ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' })}>
              Case Study
            </p>
            <h1 mix={css({ margin: 0, fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em' })}>
              Migrating BusTub from CMake&nbsp;to&nbsp;zigc
            </h1>
            <p mix={css({ margin: 0, fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '560px' })}>
              CMU's BusTub educational RDBMS has 11 vendored C/C++ dependencies managed by CMake.
              This documents how to recreate it as a greenfield <Code>zigc</Code> project — no CMake anywhere.
            </p>
          </header>

          <Section title="Overview">
            <P>
              <A href="https://github.com/cmu-db/bustub">BusTub</A> is CMU's
              educational relational database, written in C++17 with 11 vendored third-party libraries.
              The original project uses CMake with <Code>CMakeLists.txt</Code> files
              at every level.
            </P>
            <P>
              Using <A href="https://github.com/nathanjmorton/zigc">zigc</A>, we replaced
              the entire CMake build system with Zig's build system. Each vendored dependency was repackaged as a
              standalone Zig package, uploaded to S3, and registered in zigc's global registry. The result:
              <Code>zigc init</Code> + 11 × <Code>zigc add</Code> + one <Code>build.zig</Code>.
            </P>
          </Section>

          <Section title="Prerequisites">
            <P>
              <strong>Zig 0.16.0</strong> — <A href="https://ziglang.org/download/">download</A>
            </P>
            <P>
              <strong>zigc</strong> — install via Homebrew or shell script:
            </P>
            <CodeBlock copy={"brew tap nathanjmorton/zigc \x26\x26 brew install zigc"} lines={[
              'brew tap nathanjmorton/zigc',
              'brew install zigc',
            ]} />
            <P>
              <strong>BusTub source</strong> — clone the original repo:
            </P>
            <CodeBlock copy="git clone https://github.com/cmu-db/bustub" lines={[
              'git clone https://github.com/cmu-db/bustub',
            ]} />
          </Section>

          <Section title="Are the dependencies public?">
            <P>
              <strong>Yes.</strong> All 11 dependency packages are hosted on a public S3 bucket at{' '}
              <Code>nathanjmorton-zigc-packages.s3.amazonaws.com/bustub-deps/</Code>.
              Anyone can <Code>zig fetch</Code> them or use <Code>zigc add</Code> from the registry.
              No AWS credentials or special access is needed.
            </P>
            <P>
              They are also pre-registered in zigc's global registry. After running{' '}
              <Code>zigc registry update</Code>, you can add them by name
              (e.g. <Code>zigc add murmur3</Code>).
            </P>
          </Section>

          <Section title="Step 1 — Scaffold the project">
            <CodeBlock copy={"zigc init bustub --cpp \x26\x26 cd bustub \x26\x26 zigc registry update"} lines={[
              'zigc init bustub --cpp',
              'cd bustub',
              'zigc registry update',
            ]} />
            <P>
              This creates <Code>build.zig</Code>,{' '}
              <Code>build.zig.zon</Code>, <Code>src/main.cpp</Code>,
              and <Code>.gitignore</Code>. The <Code>--cpp</Code> flag
              generates a C++17 template with <Code>link_libcpp</Code>.
            </P>
          </Section>

          <Section title="Step 2 — Add all dependencies">
            <H3>Compilable libraries</H3>
            <CodeBlock
              copy={"zigc add murmur3 \x26\x26 zigc add linenoise \x26\x26 zigc add libfort --lib fort \x26\x26 zigc add utf8proc \x26\x26 zigc add libpg_query --lib duckdb_pg_query \x26\x26 zigc add fmt \x26\x26 zigc add googletest"}
              lines={[
                'zigc add murmur3',
                'zigc add linenoise',
                'zigc add libfort --lib fort',
                'zigc add utf8proc',
                'zigc add libpg_query --lib duckdb_pg_query',
                'zigc add fmt',
                'zigc add googletest',
              ]}
            />
            <H3>Header-only libraries</H3>
            <CodeBlock
              copy={"zigc add argparse --header-only \x26\x26 zigc add backward_cpp --header-only \x26\x26 zigc add cpp_random_distributions --header-only \x26\x26 zigc add readerwriterqueue --header-only"}
              lines={[
                'zigc add argparse --header-only',
                'zigc add backward_cpp --header-only',
                'zigc add cpp_random_distributions --header-only',
                'zigc add readerwriterqueue --header-only',
              ]}
            />
            <P>
              Each <Code>zigc add</Code> writes the dependency to{' '}
              <Code>build.zig.zon</Code> (URL + content hash) and injects linking
              boilerplate into <Code>build.zig</Code>.
            </P>
            <P>
              <Code>--lib</Code> overrides the artifact name when it differs from the
              package name. <Code>--header-only</Code> inserts{' '}
              <Code>mod.addIncludePath</Code> instead of{' '}
              <Code>mod.linkLibrary</Code>.
            </P>
          </Section>

          <Section title="Step 3 — Copy BusTub source code">
            <P>From the original BusTub checkout, copy:</P>
            <P>
              • <Code>src/</Code> — all 13 module directories (binder, buffer, catalog, common, concurrency, container, execution, optimizer, planner, primer, recovery, storage, type)
            </P>
            <P>
              • <Code>src/include/</Code> — all BusTub headers
            </P>
            <P>
              • <Code>tools/shell/shell.cpp</Code> — the shell entry point
            </P>
            <P>
              Remove the scaffolded <Code>src/main.cpp</Code> and any <Code>CMakeLists.txt</Code> files that came along.
            </P>
            <CodeBlock
              copy={"rm src/main.cpp \x26\x26 cp -r ../bustub/src/{binder,buffer,catalog,common,concurrency,container,execution,optimizer,planner,primer,recovery,storage,type} src/ \x26\x26 cp -r ../bustub/src/include src/ \x26\x26 mkdir -p tools/shell \x26\x26 cp ../bustub/tools/shell/shell.cpp tools/shell/ \x26\x26 find src -name CMakeLists.txt -delete"}
              lines={[
                'rm src/main.cpp',
                'cp -r ../bustub/src/{binder,buffer,catalog,common,concurrency,container,execution,optimizer,planner,primer,recovery,storage,type} src/',
                'cp -r ../bustub/src/include src/',
                'mkdir -p tools/shell && cp ../bustub/tools/shell/shell.cpp tools/shell/',
                'find src -name CMakeLists.txt -delete',
              ]}
            />
          </Section>

          <Section title="Step 4 — Write build.zig">
            <P>
              Replace the scaffolded <Code>build.zig</Code> with one that:
            </P>
            <P>1. Adds include paths for <Code>src/include</Code> and <Code>src/</Code></P>
            <P>2. Links all 7 compilable deps and adds include paths for the 4 header-only deps</P>
            <P>3. Compiles all 129 <Code>.cpp</Code> files from <Code>src/</Code></P>
            <P>4. Compiles <Code>tools/shell/shell.cpp</Code> as the entry point</P>
            <P>5. Uses <Code>-std=c++17 -w</Code> flags</P>
            <P>
              The full <Code>build.zig</Code> is ~200 lines — mostly just the list of 129 source files.
              See the{' '}
              <A href="https://github.com/nathanjmorton/zigc/blob/main/bustub/build.zig">
                complete file on GitHub
              </A>.
            </P>
          </Section>

          <Section title="Step 5 — Build">
            <CodeBlock copy="zigc build" lines={['zigc build']} />
            <P>
              On first build, Zig fetches all 11 dependencies from S3, compiles the 7 static libraries
              (murmur3, linenoise, libfort, utf8proc, libpg_query, fmt, googletest), then compiles all
              129 BusTub source files and links everything into a single <Code>bustub-shell</Code> binary.
            </P>
            <P>Result: a 33 MB Mach-O arm64 executable with 11,865 symbols.</P>
            <CodeBlock copy={"zigc check \x26\x26 zigc verify"} lines={['zigc check', 'zigc verify']} />
          </Section>

          <Section title="Dependency reference">
            {DEPS.map((d) => (
              <div mix={css({ display: 'flex', gap: '16px', padding: '6px 0', flexWrap: 'wrap' })}>
                <code mix={css({ fontSize: '13px', color: 'var(--accent)', whiteSpace: 'nowrap', minWidth: '200px' })}>{d.name}</code>
                <span mix={css({ fontSize: '13px', color: 'var(--text-secondary)' })}>{d.type} · {d.kind}{d.flag ? ` · ${d.flag}` : ''}</span>
              </div>
            ))}
          </Section>

          <Section title="Architecture">
            <P>The dependency pipeline:</P>
            <P>1. <strong>Package</strong> — each library gets a <Code>build.zig</Code> + <Code>build.zig.zon</Code> that compiles it as a static library (or exposes headers for header-only deps)</P>
            <P>2. <strong>Tar + upload</strong> — packaged as <Code>.tar.xz</Code> (ustar format, <Code>application/x-xz</Code> content-type) and uploaded to S3</P>
            <P>3. <strong>Hash</strong> — <Code>zig fetch &lt;url&gt;</Code> computes the content hash</P>
            <P>4. <strong>Register</strong> — URL + hash + lib name added to <Code>registry.json</Code> in the zigc repo</P>
            <P>5. <strong>Consume</strong> — <Code>zigc add &lt;name&gt;</Code> looks up the registry, writes the dep to <Code>build.zig.zon</Code>, and injects linking code into <Code>build.zig</Code></P>
            <P>
              Key lesson: S3 must serve <Code>.tar.xz</Code> files with{' '}
              <Code>Content-Type: application/x-xz</Code>. Without this,
              Zig's HTTP tar unpacker misidentifies the compression and fails with <Code>TarHeader</Code> errors.
            </P>
          </Section>

          <footer mix={css({ paddingTop: '24px', fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '16px' })}>
            <a href={routes.home.href()} mix={css({ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: '2px' })}>
              ← Back to zigc
            </a>
            <a href={routes.docs.href()} mix={css({ color: 'var(--text-tertiary)', textDecoration: 'underline', textUnderlineOffset: '2px', '&:hover': { color: 'var(--text-secondary)' } })}>
              Docs
            </a>
            <a href="https://github.com/nathanjmorton/zigc/tree/main/bustub" mix={css({ color: 'var(--text-tertiary)', textDecoration: 'underline', textUnderlineOffset: '2px', '&:hover': { color: 'var(--text-secondary)' } })}>
              Source
            </a>
          </footer>
        </main>
      </body>
    </html>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const DEPS = [
  { name: 'murmur3', type: 'C++', kind: 'static lib', flag: '' },
  { name: 'linenoise', type: 'C', kind: 'static lib', flag: '' },
  { name: 'libfort', type: 'C', kind: 'static lib', flag: '--lib fort' },
  { name: 'utf8proc', type: 'C', kind: 'static lib', flag: '' },
  { name: 'libpg_query', type: 'C++', kind: 'static lib', flag: '--lib duckdb_pg_query' },
  { name: 'fmt', type: 'C++', kind: 'static lib', flag: '' },
  { name: 'googletest', type: 'C++', kind: 'static lib', flag: '' },
  { name: 'argparse', type: 'C++', kind: 'header-only', flag: '--header-only' },
  { name: 'backward_cpp', type: 'C++', kind: 'header-only', flag: '--header-only' },
  { name: 'cpp_random_distributions', type: 'C++', kind: 'header-only', flag: '--header-only' },
  { name: 'readerwriterqueue', type: 'C++', kind: 'header-only', flag: '--header-only' },
]

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

// ── Styles ───────────────────────────────────────────────────────────────────

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
