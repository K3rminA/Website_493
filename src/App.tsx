import { FormEvent, useEffect, useState } from 'react'

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
    kind: 'verdura',
  },
  {
    name: 'SPACE',
    year: '2024 – now',
    line: 'A space-themed game that combines speech and arm therapy for children with cerebral palsy, built for use at home.',
    stack: 'Unity · C# · MediaPipe · OpenCV · PostgreSQL',
    kind: 'space',
  },
  {
    name: 'Fusion Care AR',
    year: '2024',
    line: 'Backend for AR-enhanced communication: immersive 3D calls for healthcare with role-based access to patient records.',
    stack: 'C# · C++ · Java · Microservices',
    kind: 'ar',
  },
  {
    name: 'Robotic Arm',
    year: 'Prosthetics Club',
    line: 'A 3D-printed robotic arm that integrates sensors and AI to assist people with limited mobility.',
    stack: 'Embedded C++ · SolidWorks · 3D printing',
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

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === 'verdura') {
    return <div className="project-visual"><div className="window-bar"><i /><i /><i /><span>verdura / hub</span></div><div className="node-map"><i className="hub">V</i>{[0, 1, 2, 3, 4].map(n => <i className={`node n${n}`} key={n} />)}<span>hub ⇄ sensor nodes</span></div></div>
  }
  if (kind === 'space') {
    return <div className="project-visual"><div className="window-bar"><i /><i /><i /><span>space / voice</span></div><div className="scope-grid"><svg viewBox="0 0 500 160" preserveAspectRatio="none"><path d="M0 80h35l8-30 15 60 14-30h46l9-20 12 40 10-20h54l8-50 14 100 15-50h48l8-25 12 50 11-25h60l7-15 12 30 9-15h62" /><path className="threshold" d="M0 45H500" /></svg><span>VOICE LEVEL · PERSONAL THRESHOLD</span></div></div>
  }
  if (kind === 'ar') {
    return <div className="project-visual"><div className="window-bar"><i /><i /><i /><span>fusion / session</span></div><div className="access-ui"><span>ROLE-BASED ACCESS</span><p><b>clinician</b><em>patient record</em><u>granted</u></p><p><b>front desk</b><em>patient record</em><u className="off">denied</u></p><p><b>clinician</b><em>3D call</em><u>live</u></p></div></div>
  }
  return <div className="project-visual"><div className="window-bar"><i /><i /><i /><span>arm / joints</span></div><div className="scope-grid"><svg viewBox="0 0 500 160" preserveAspectRatio="xMidYMid meet"><path d="M90 130 150 130M120 130 120 90 215 52 320 78 400 40" /><circle cx="120" cy="90" r="7" /><circle cx="215" cy="52" r="7" /><circle cx="320" cy="78" r="7" /><circle cx="400" cy="40" r="10" /></svg><span>3-DOF · SENSOR + AI</span></div></div>
}

export default function App() {
  const [powered, setPowered] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function contact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Hello from your portfolio')}&body=${encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('email')}`)}`
  }

  return (
    <div className="site">
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
          <div className="hero-copy">
            <div className="status"><i /> Co-founder &amp; CTO, Verdura Automations</div>
            <h1>I build hardware and software people <em>actually use</em>.</h1>
            <p>Electrical engineering student at NJIT&apos;s Albert Dorman Honors College. I connect sensors, embedded systems and cloud software to the people who depend on them, from greenhouse growers to children in therapy.</p>
            <div className="hero-actions"><a className="primary" href="#projects">See the work <Arrow /></a><a href="#about">About me <Arrow up /></a></div>
            <div className="terminal">
              <div className="terminal-top"><i /><i /><i /><span>session</span></div>
              <code><span>$</span> whoami<br />kermina_david · EE · NJIT Honors &apos;27<br /><span>$</span> current_status<br /><b>● designing a custom PCB for the Verdura sensor node</b></code>
            </div>
          </div>
          <div className={`hero-board ${powered ? 'powered' : ''}`}>
            <div className="board-label"><span>SENSOR NODE</span><b>ESP32</b></div>
            <div className="pcb">
              <span className="trace t1" /><span className="trace t2" /><span className="trace t3" /><span className="trace t4" />
              <i className="chip">ESP32<small>dual-core</small></i>
              <i className="part resistor">1kΩ</i><i className="part capacitor">10μF</i>
              <i className="pin p1" /><i className="pin p2" /><i className="pin p3" /><i className="led" />
            </div>
            <button onClick={() => setPowered((value) => !value)} aria-pressed={powered}><i /> {powered ? 'NODE ONLINE' : 'POWER NODE'}</button>
            <div className="readout"><span>VCC<br /><b>{powered ? '3.30 V' : '0.00 V'}</b></span><span>CLOCK<br /><b>{powered ? '240 MHz' : '—'}</b></span><span>STATUS<br /><b>{powered ? 'NOMINAL' : 'IDLE'}</b></span></div>
          </div>
          <a className="scroll-cue" href="#projects">SCROLL <span>↓</span></a>
        </section>

        <section className="section shell" id="projects">
          <div className="section-head"><div><span className="eyebrow"><i /> Selected work</span><h2>Things built for<br />real users.</h2></div><a href="https://github.com/K3rminA">GitHub <Arrow up /></a></div>
          <div className="project-grid">
            {projects.map((project) => <article className="project" key={project.name}>
              <ProjectVisual kind={project.kind} />
              <div className="project-title"><h3>{project.name}</h3><span>{project.year}</span></div>
              <p>{project.line}</p>
              <small><i /> {project.stack}</small>
            </article>)}
          </div>
        </section>

        <section className="section shell" id="work">
          <span className="eyebrow"><i /> What I do</span>
          <div className="capabilities">
            {capabilities.map(([title, text], i) => <div key={title}><h3><span>0{i + 1}</span>{title}</h3><p>{text}</p></div>)}
          </div>
        </section>

        <section className="section shell" id="experience">
          <span className="eyebrow"><i /> Experience</span>
          <h2>Where I&apos;ve worked.</h2>
          <div className="capabilities experience">
            {experience.map((job) => <div key={job.role + job.when}>
              <h3>{job.role}<small>{job.org}</small><em>{job.when}</em></h3>
              <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>)}
          </div>
        </section>

        <section className="section about shell" id="about">
          <div>
            <span className="eyebrow"><i /> About</span>
            <h2>Engineering for<br />the person on the<br />other end.</h2>
            <img className="portrait" src="/headshot.jpg" alt="Portrait of Kermina David" />
          </div>
          <div className="about-copy">
            <p>I&apos;m a B.S. Electrical Engineering student at NJIT&apos;s Albert Dorman Honors College on a full scholarship, with a minor in Grand Challenges. My interest is technology that improves lives, from prosthetics and assistive devices to automation for small farms.</p>
            <p>What ties my projects together is watching how people actually use what I build. A child struggling with one exercise in SPACE changed how I designed difficulty, and 60+ grower interviews shaped Verdura around cost, ease of use and repairability.</p>
            <p>IEEE AP-S Poster Competition winner. AWS Certified Cloud Practitioner. I speak English, Arabic, Spanish and some Japanese.</p>
            <div className="stack">{stack.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="shell contact-grid">
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
