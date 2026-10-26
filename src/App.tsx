import { CSSProperties, FormEvent, MouseEvent as ReactMouse, Suspense, lazy, useEffect, useRef, useState } from 'react'
const ModelViewer = lazy(() => import('./ModelViewer'))

const EMAIL = 'kerminadavid@icloud.com'

function Arrow({ up = false }: { up?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d={up ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14M14 7l5 5-5 5'} /></svg>
}

const projects = [
  {
    name: 'Verdura Automations',
    year: '2025 – now',
    line: 'Affordable, repairable greenhouse automation for small growers. Co-founder and CTO; $30K raised after 60+ grower interviews.',
    stack: 'ESP32 · Raspberry Pi · Node.js · React/TypeScript',
    status: 'Actively building',
    kind: 'verdura',
  },
  {
    name: 'SPACE',
    year: '2024 – now',
    line: 'A space-themed game that combines speech and arm therapy for children with cerebral palsy, built for use at home.',
    stack: 'Unity · C# · MediaPipe · OpenCV · PostgreSQL',
    status: 'In research with Rutgers',
    kind: 'space',
  },
  {
    name: 'Fusion Care AR',
    year: '2024',
    line: 'Backend for AR-enhanced communication: immersive 3D calls for healthcare with role-based access to patient records.',
    stack: 'C# · C++ · Java · Microservices',
    status: 'Shipped Jan – Jun 2024',
    kind: 'ar',
  },
  {
    name: 'Robotic Arm',
    year: 'Prosthetics Club',
    line: 'A 3D-printed robotic arm that integrates sensors and AI to assist people with limited mobility.',
    stack: 'Embedded C++ · SolidWorks · 3D printing',
    status: 'NJIT Prosthetics Club',
    kind: 'arm',
  },
]

const experience = [
  {
    role: 'Software Engineering Intern',
    org: 'Prudential Financial · Process Excellence Team',
    when: 'Jun – Aug 2026',
    points: [
      'Project-management role driving evaluation and onboarding of new technologies through workflow documents and Process Design Documents (PDDs).',
      'Built an AWS-based audio transcription and note-taking tool that generates workflow documents and PDDs from recorded meetings, saving ~30 hours of manual documentation.',
      'Led a hackathon team building a learning platform that teaches effective AI prompting; it is being deployed by PGIM.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    org: 'Prudential Financial · Infrastructure Team',
    when: 'Jun – Aug 2025',
    points: [
      'Developed a DNS health monitoring application with FastAPI and Docker for real-time monitoring across the enterprise network.',
      'Architected a HashiCorp Vault integration template for secure credential management across 60+ service accounts.',
      'Led a hackathon team building a parking and desk booking system that pairs IoT sensors with a backend API.',
    ],
  },
  {
    role: 'Biomedical Research Assistant',
    org: 'NJIT BME Department · Rutgers SHP',
    when: 'Apr 2024 – now',
    points: [
      'Designed and built SPACE, an eight-week gamified therapy platform using hand tracking and voice control, with adaptive calibration for each child.',
      'Integrated computer vision, voice-loudness monitoring and embedded hardware; packaged the platform for home installs.',
      'Ran feasibility testing with 12 typically developing children (ages 6–17) before moving toward trials with children with CP.',
    ],
  },
  {
    role: 'Backend Developer',
    org: 'Fusion Care (startup) · Newark, NJ',
    when: 'Jan – Jun 2024',
    points: [
      'Built microservice backends for AR healthcare applications, including role-based access control and real-time data processing.',
      'Researched market needs and represented the company at industry conferences.',
    ],
  },
  {
    role: 'President, Prosthetics Club',
    org: 'NJIT',
    when: 'Jan – Dec 2024',
    points: ['Led a 200+ member group developing and distributing free prosthetics with robotics for improved functionality.'],
  },
]

const capabilities = [
  ['Embedded & IoT', 'ESP32 sensor nodes, battery-powered hardware, hub-and-node networking, and a custom PCB for a compact, deployable board.'],
  ['Software & cloud', 'Node.js and Python backends, React/TypeScript dashboards, AWS and Supabase, and cost-per-user thinking before anything ships.'],
  ['Assistive & health tech', 'Computer vision, voice and motor-learning research turned into software that adapts to the person using it.'],
  ['Leading teams', 'Sprint plans, role descriptions, acceptance criteria and code review practices so a four-person mobile team can build in parallel.'],
]

const stack = ['C/C++', 'Python', 'Java', 'TypeScript', 'React', 'Node.js', 'C#', 'Unity', 'SQL', 'ESP32', 'Raspberry Pi', 'PCB design', 'SolidWorks', 'OpenCV', 'AWS', 'Docker', 'Kubernetes']

const stats = [
  { to: 30, prefix: '$', suffix: 'K', label: 'raised for Verdura' },
  { to: 60, prefix: '', suffix: '+', label: 'grower interviews' },
  { to: 30, prefix: '~', suffix: ' hrs', label: 'documentation saved at Prudential' },
  { to: 1, prefix: '', suffix: 'st', label: 'IEEE AP-S poster competition' },
]

const sparks = Array.from({ length: 18 }, (_, i) => ({ left: (i * 37) % 100, delay: (i * 1.3) % 9, dur: 7 + ((i * 5) % 6), size: 2 + (i % 3) }))

function Typewriter({ lines }: { lines: string[] }) {
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const line = lines[i]
    const wait = !del && n === line.length ? 1700 : del ? 16 : 42
    const t = setTimeout(() => {
      if (!del) {
        if (n < line.length) setN(n + 1)
        else setDel(true)
      } else if (n > 0) setN(n - 1)
      else {
        setDel(false)
        setI((i + 1) % lines.length)
      }
    }, wait)
    return () => clearTimeout(t)
  }, [n, del, i, lines])
  return <>{lines[i].slice(0, n)}<span className="caret" /></>
}

const BOOT = ['hardware', 'firmware', 'cloud', 'application']
const DOTS = 16
const NOW = ['designing the Verdura sensor-node PCB', 'leading a four-person mobile app team', 'building therapy games for kids with CP']

function Boot() {
  const cmd = 'boot --profile kermina'
  const total = cmd.length + 8 + BOOT.length * (DOTS + 4)
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => { if (t >= total) { clearInterval(id); return t } return t + 1 }), 38)
    return () => clearInterval(id)
  }, [total])
  const done = tick >= total
  return (
    <code>
      <span>$</span> {cmd.slice(0, tick)}{tick < cmd.length && <span className="caret" />}<br />
      {BOOT.map((name, k) => {
        const s = cmd.length + 8 + k * (DOTS + 4)
        const d = Math.max(0, Math.min(DOTS, tick - s))
        if (tick <= s) return null
        return <em key={name}>{'  '}{name.padEnd(12, ' ')}{'.'.repeat(d)} {d >= DOTS && <b>ok</b>}<br /></em>
      })}
      {done && <><span>$</span> now<br /><b>● <Typewriter lines={NOW} /></b></>}
    </code>
  )
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.documentElement.classList.add('cursor')
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0
    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      dot.current!.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`
      ring.current!.classList.toggle('big', !!(e.target as HTMLElement).closest('a,button,input,textarea,.stage3d'))
      document.documentElement.style.setProperty('--mx', `${x}px`)
      document.documentElement.style.setProperty('--my', `${y}px`)
    }
    const loop = () => {
      rx += (x - rx) * 0.15
      ry += (y - ry) * 0.15
      ring.current!.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    loop()
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('cursor')
    }
  }, [])
  return <><div className="cursor-ring" ref={ring} /><div className="cursor-dot" ref={dot} /></>
}

function CountUp({ to, prefix, suffix }: { to: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const s = performance.now()
      const tick = (now: number) => {
        const k = Math.min((now - s) / 1400, 1)
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))))
        if (k < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <strong ref={ref}>{prefix}{v}<em>{suffix}</em></strong>
}

const seed = (v: number, n: number) => Array.from({ length: n }, (_, i) => v + Math.sin(i * 1.7) * 0.8)
const step = (a: number[], amp: number, lo: number, hi: number) => {
  const next = Math.min(hi, Math.max(lo, a[a.length - 1] + (Math.random() - 0.5) * amp * 2))
  return [...a.slice(1), next]
}
const line = (a: number[]) => {
  const lo = Math.min(...a), hi = Math.max(...a), r = hi - lo || 1
  return a.map((v, i) => `${(i / (a.length - 1)) * 100},${22 - ((v - lo) / r) * 20}`).join(' ')
}

function DashVisual() {
  const [h, setH] = useState({ soil: seed(42, 22), temp: seed(76, 22), hum: seed(62, 22), light: seed(26, 22) })
  useEffect(() => {
    const id = setInterval(() => setH((p) => ({ soil: step(p.soil, 0.7, 34, 50), temp: step(p.temp, 0.8, 72, 82), hum: step(p.hum, 0.9, 52, 70), light: step(p.light, 1.1, 18, 34) })), 1100)
    return () => clearInterval(id)
  }, [])
  const last = (a: number[]) => a[a.length - 1]
  const fanOn = last(h.temp) > 78
  const tiles: [string, number[], string][] = [['SOIL MOISTURE', h.soil, '%'], ['AIR TEMP', h.temp, '°F'], ['HUMIDITY', h.hum, '%'], ['LIGHT', h.light, 'k lux']]
  return (
    <div className="project-visual">
      <div className="window-bar"><i /><i /><i /><span>verdura.local / greenhouse · demo data</span></div>
      <div className="dash">
        {tiles.map(([name, a, unit]) => <div className="tile" key={name}><span>{name}</span><strong>{last(a).toFixed(0)}<small>{unit}</small></strong><svg viewBox="0 0 100 24" preserveAspectRatio="none"><polyline points={line(a)} /></svg></div>)}
        <div className="dash-foot"><span><i className={fanOn ? 'fan spin' : 'fan'} /> FAN {fanOn ? 'ON' : 'AUTO'}</span><span>threshold 78°F</span><span>BATT 87%</span></div>
      </div>
    </div>
  )
}

const OPEN: [number, number][] = [[50, 92], [36, 82], [26, 70], [19, 58], [14, 48], [40, 58], [38, 40], [37, 27], [36, 15], [50, 54], [50, 34], [50, 20], [50, 7], [60, 57], [62, 38], [63, 25], [64, 13], [69, 64], [74, 49], [77, 38], [80, 28]]
const FIST: [number, number][] = [[50, 92], [36, 82], [34, 72], [40, 66], [45, 64], [40, 58], [37, 47], [41, 53], [44, 60], [50, 54], [50, 43], [50, 51], [50, 58], [60, 57], [62, 46], [60, 53], [57, 60], [69, 64], [73, 54], [70, 59], [66, 65]]
const BONES = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17]]

function SpaceVisual() {
  const [t, setT] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 0.05), 50)
    return () => clearInterval(id)
  }, [])
  const k = (Math.sin(t * 1.3) + 1) / 2
  const pts = OPEN.map(([x, y], i) => [x + (FIST[i][0] - x) * k, y + (FIST[i][1] - y) * k])
  const level = 0.45 + 0.4 * Math.sin(t * 2.1) * Math.sin(t * 0.7) + 0.15 * Math.sin(t * 5)
  return (
    <div className="project-visual">
      <div className="window-bar"><i /><i /><i /><span>space.exe / planet 3 · tracking</span></div>
      <div className="space-ui">
        <div className="stars" />
        <div className="hand">
          <svg viewBox="0 0 100 100">
            {BONES.map(([a, b]) => <line key={`${a}-${b}`} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} />)}
            {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2.1 : 1.5} />)}
          </svg>
          <span>HAND · 21 LANDMARKS</span>
        </div>
        <div className="meter">
          {Array.from({ length: 12 }, (_, i) => <i key={i} className={i / 12 < level ? (i >= 7 ? 'hit' : 'on') : ''} style={{ height: `${18 + i * 6}%` }} />)}
          <b />
          <span>VOICE · TARGET</span>
        </div>
      </div>
    </div>
  )
}

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === 'verdura') return <DashVisual />
  if (kind === 'space') return <SpaceVisual />
  if (kind === 'ar') {
    return <div className="project-visual"><div className="window-bar"><i /><i /><i /><span>fusion-care / ar session</span></div><div className="access-ui"><span>ROLE-BASED ACCESS</span><p><b>clinician</b><em>patient record</em><u>granted</u></p><p><b>front desk</b><em>patient record</em><u className="off">denied</u></p><p><b>clinician</b><em>3D call</em><u>live</u></p></div></div>
  }
  return <div className="project-visual"><div className="window-bar"><i /><i /><i /><span>prosthetic-arm / joints</span></div><div className="scope-grid"><svg viewBox="0 0 500 160" preserveAspectRatio="xMidYMid meet"><path className="arm" d="M90 130 150 130M120 130 120 90 215 52 320 78 400 40" /><circle cx="120" cy="90" r="7" /><circle cx="215" cy="52" r="7" /><circle cx="320" cy="78" r="7" /><circle className="claw" cx="400" cy="40" r="10" /></svg><span>3-DOF · SENSOR + AI</span></div></div>
}

function tiltCard(e: ReactMouse<HTMLElement>) {
  const v = e.currentTarget.querySelector<HTMLElement>('.project-visual')
  if (!v) return
  const b = v.getBoundingClientRect()
  v.style.setProperty('--ry', `${((e.clientX - b.left) / b.width - 0.5) * 10}deg`)
  v.style.setProperty('--rx', `${-((e.clientY - b.top) / b.height - 0.5) * 8}deg`)
}

function untilt(e: ReactMouse<HTMLElement>) {
  const v = e.currentTarget.querySelector<HTMLElement>('.project-visual')
  v?.style.setProperty('--ry', '0deg')
  v?.style.setProperty('--rx', '0deg')
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [prog, setProg] = useState(0)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
      if (event.key === 'Escape') setSearchOpen(false)
    }
    const onScroll = () => {
      const d = document.documentElement
      setProg(d.scrollTop / (d.scrollHeight - d.clientHeight || 1))
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        io.unobserve(e.target)
      }
    }), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  function contact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Hello from your portfolio')}&body=${encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('email')}`)}`
  }

  return (
    <div className="site">
      <Cursor />
      <a className="skip" href="#main">Skip to content</a>
      <header>
        <a className="logo" href="#top">kermina<span>.</span>david</a>
        <nav>
          <a href="#projects"><b>01</b> Projects</a>
          <a href="#experience"><b>02</b> Experience</a>
          <a href="#about"><b>03</b> About</a>
        </nav>
        <div className="header-actions">
          <button className="search-button" onClick={() => setSearchOpen(true)}><span>⌕</span> Search <kbd>⌘K</kbd></button>
          <a className="contact-button" href="#contact">Get in touch</a>
        </div>
        <i className="progress" style={{ transform: `scaleX(${prog})` }} />
      </header>

      {searchOpen && <div className="search-overlay" onMouseDown={() => setSearchOpen(false)}>
        <div className="command" onMouseDown={(e) => e.stopPropagation()}>
          <div><span>⌕</span><input autoFocus placeholder="Jump to a section..." aria-label="Search sections" /></div>
          <a href="#projects" onClick={() => setSearchOpen(false)}><b>01</b> Projects <span>↵</span></a>
          <a href="#experience" onClick={() => setSearchOpen(false)}><b>02</b> Experience <span>↵</span></a>
          <a href="#about" onClick={() => setSearchOpen(false)}><b>03</b> About <span>↵</span></a>
          <a href="#contact" onClick={() => setSearchOpen(false)}><b>04</b> Contact <span>↵</span></a>
        </div>
      </div>}

      <main id="main">
        <section className="hero shell" id="top">
          <div className="particles" aria-hidden="true">{sparks.map((s, i) => <i key={i} style={{ left: `${s.left}%`, animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`, width: s.size, height: s.size }} />)}</div>
          <div className="hero-copy">
            <div className="status"><i /> Co-founder &amp; CTO, Verdura Automations</div>
            <h1>I build hardware and software people <em>actually use</em>.</h1>
            <p>Electrical engineering student at NJIT&apos;s Albert Dorman Honors College. I connect sensors, embedded systems and cloud software to the people who depend on them, from greenhouse growers to children in therapy.</p>
            <div className="hero-actions"><a className="primary" href="#projects">See the work <Arrow /></a><a href="#about">About me <Arrow up /></a></div>
            <div className="terminal">
              <div className="terminal-top"><i /><i /><i /><span>session</span></div>
              <Boot />
            </div>
          </div>
          <Suspense fallback={<div className="hero-board" />}><ModelViewer /></Suspense>
          <a className="scroll-cue" href="#projects">SCROLL <span>↓</span></a>
        </section>

        <section className="shell stats reveal">
          {stats.map((s) => <div key={s.label}><CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} /><span>{s.label}</span></div>)}
        </section>

        <div className="marquee" aria-hidden="true"><div>{[...stack, ...stack].map((s, i) => <span key={i}>{s}</span>)}</div></div>

        <section className="section shell" id="projects">
          <div className="section-head reveal"><div><span className="eyebrow"><i /> Selected work</span><h2>Things built for<br />real users.</h2></div><a href="https://github.com/K3rminA">GitHub <Arrow up /></a></div>
          <div className="project-grid">
            {projects.map((project, i) => <article className="project reveal" key={project.name} style={{ '--d': `${(i % 2) * 0.12}s` } as CSSProperties} onMouseMove={tiltCard} onMouseLeave={untilt}>
              <ProjectVisual kind={project.kind} />
              <div className="project-title"><h3>{project.name}</h3><span>{project.year}</span></div>
              <p>{project.line}</p>
              <p className="stack-line">{project.stack}</p>
              <small><i /> {project.status}</small>
            </article>)}
          </div>
        </section>

        <section className="section shell" id="work">
          <span className="eyebrow reveal"><i /> What I do</span>
          <div className="capabilities">
            {capabilities.map(([title, text], i) => <div className="reveal" style={{ '--d': `${i * 0.08}s` } as CSSProperties} key={title}><h3><span>0{i + 1}</span>{title}</h3><p>{text}</p></div>)}
          </div>
        </section>

        <section className="section shell" id="experience">
          <span className="eyebrow reveal"><i /> Experience</span>
          <h2 className="reveal">Where I&apos;ve worked.</h2>
          <div className="capabilities experience">
            {experience.map((job) => <div className="reveal" key={job.role + job.when}>
              <h3>{job.role}<small>{job.org}</small><em>{job.when}</em></h3>
              <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>)}
          </div>
        </section>

        <section className="section about shell" id="about">
          <div className="reveal">
            <span className="eyebrow"><i /> About</span>
            <h2>Engineering for<br />the person on the<br />other end.</h2>
            <img className="portrait" src="/headshot.jpg" alt="Portrait of Kermina David" />
          </div>
          <div className="about-copy reveal" style={{ '--d': '0.15s' } as CSSProperties}>
            <p>I&apos;m a B.S. Electrical Engineering student at NJIT&apos;s Albert Dorman Honors College on a full scholarship, with a minor in Grand Challenges. My interest is technology that improves lives, from prosthetics and assistive devices to automation for small farms.</p>
            <p>What ties my projects together is watching how people actually use what I build. A child struggling with one exercise in SPACE changed how I designed difficulty, and 60+ grower interviews shaped Verdura around cost, ease of use and repairability.</p>
            <p>IEEE AP-S Poster Competition winner. AWS Certified Cloud Practitioner. I speak English, Arabic, Spanish and some Japanese.</p>
            <div className="stack">{stack.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="shell contact-grid reveal">
          <div><span className="eyebrow"><i /> Get in touch</span><h2>Building something<br /><em>that needs to work?</em></h2><p>I&apos;m glad to talk about embedded systems, assistive technology, automation or research collaboration.</p></div>
          <form onSubmit={contact}>
            <label htmlFor="email">Email</label><input id="email" name="email" type="email" placeholder="you@company.com" required />
            <label htmlFor="message">Message</label><textarea id="message" name="message" rows={3} placeholder="What are we building?" required />
            <button type="submit">Send <Arrow /></button>
          </form>
        </div>
        <div className="shell footer-bottom"><a className="logo" href="#top">kermina<span>.</span>david</a><span>Electrical engineering · Software · Assistive tech</span><div><a href="https://github.com/K3rminA">GitHub</a><a href="https://www.linkedin.com/in/kermina-david">LinkedIn</a><a href={`mailto:${EMAIL}`}>Email</a></div></div>
      </footer>
    </div>
  )
}
