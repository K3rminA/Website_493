import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

type Focus = 'both' | 'hub' | 'node'

const BODY = '#e4dfcf'
const GREEN = 0x3f8f45
const HUB_X = 0.7
const NODE_X = -1.45

type Draw = (c: CanvasRenderingContext2D, w: number, h: number) => void

function tex(w: number, h: number, draw: Draw) {
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  const c = cv.getContext('2d')!
  draw(c, w, h)
  const t = new THREE.CanvasTexture(cv)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

function rr(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath()
  c.roundRect(x, y, w, h, r)
}

function base(c: CanvasRenderingContext2D, w: number, h: number) {
  const g = c.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, '#ece8da')
  g.addColorStop(1, '#d9d4c3')
  c.fillStyle = g
  c.fillRect(0, 0, w, h)
}

function seam(c: CanvasRenderingContext2D, x: number, h: number) {
  c.strokeStyle = '#9c978a'
  c.lineWidth = 3
  c.beginPath()
  c.moveTo(x, 0)
  c.lineTo(x, h * 0.2)
  c.arc(x, h * 0.25, h * 0.05, -Math.PI / 2, Math.PI / 2, true)
  c.lineTo(x, h * 0.72)
  c.arc(x, h * 0.77, h * 0.05, -Math.PI / 2, Math.PI / 2, false)
  c.lineTo(x, h)
  c.stroke()
}

function leaf(c: CanvasRenderingContext2D, x: number, y: number, s: number) {
  c.save()
  c.translate(x, y)
  c.scale(s, s)
  c.fillStyle = '#3f8f45'
  c.beginPath()
  c.moveTo(0.5, -0.95)
  c.bezierCurveTo(1.25, -0.95, 1.35, -0.2, 0.6, 0.1)
  c.bezierCurveTo(0.4, -0.1, 0.3, -0.55, 0.5, -0.95)
  c.fill()
  c.strokeStyle = '#1d2b1d'
  c.lineWidth = 0.17
  c.lineJoin = 'round'
  c.lineCap = 'round'
  c.beginPath()
  c.moveTo(-0.7, -0.8)
  c.lineTo(0, 0.4)
  c.lineTo(0.5, -0.3)
  c.stroke()
  c.restore()
}

const hubFront: Draw = (c, w, h) => {
  base(c, w, h)
  seam(c, w * 0.34, h)
  seam(c, w * 0.6, h)
  rr(c, w * 0.3, h * 0.26, w * 0.4, h * 0.48, 22)
  c.fillStyle = '#1b1d1f'
  c.fill()
  const g = c.createLinearGradient(0, h * 0.3, 0, h * 0.7)
  g.addColorStop(0, '#4a4e52')
  g.addColorStop(1, '#2a2d30')
  rr(c, w * 0.31, h * 0.29, w * 0.38, h * 0.42, 12)
  c.fillStyle = g
  c.fill()
  c.fillStyle = 'rgba(255,255,255,.07)'
  c.beginPath()
  c.moveTo(w * 0.31, h * 0.29)
  c.lineTo(w * 0.5, h * 0.29)
  c.lineTo(w * 0.36, h * 0.71)
  c.lineTo(w * 0.31, h * 0.71)
  c.fill()
  leaf(c, w * 0.76, h * 0.8, 42)
  c.fillStyle = '#1d2b1d'
  c.font = '700 34px Manrope, sans-serif'
  c.fillText('VERDURA', w * 0.79, h * 0.79)
  c.font = '700 15px Manrope, sans-serif'
  c.fillText('AUTOMATIONS', w * 0.79, h * 0.855)
}

const hubBack: Draw = (c, w, h) => {
  base(c, w, h)
  seam(c, w * 0.34, h)
  seam(c, w * 0.6, h)
  rr(c, w * 0.07, h * 0.16, w * 0.86, h * 0.64, 10)
  c.fillStyle = '#d2cdbb'
  c.fill()
  c.strokeStyle = '#a8a393'
  c.lineWidth = 3
  c.stroke()
  for (let i = 0; i < 8; i++) {
    const x = w * (0.2 + i * 0.088)
    rr(c, x, h * 0.28, w * 0.07, h * 0.44, 8)
    c.fillStyle = '#26282a'
    c.fill()
    c.fillStyle = '#cfcab8'
    c.fillRect(x + w * 0.017, h * 0.36, 5, h * 0.12)
    c.fillRect(x + w * 0.045, h * 0.36, 5, h * 0.12)
    c.beginPath()
    c.arc(x + w * 0.035, h * 0.6, 6, 0, 7)
    c.fill()
  }
  rr(c, w * 0.1, h * 0.52, w * 0.05, h * 0.14, 5)
  c.fillStyle = '#26282a'
  c.fill()
  c.fillStyle = '#d6322b'
  c.fillRect(w * 0.108, h * 0.54, w * 0.034, h * 0.05)
  c.fillStyle = '#6d7175'
  for (let i = 0; i < 6; i++) c.fillRect(w * 0.12, h * (0.22 + i * 0.045), 8, 5)
}

const nodeFront: Draw = (c, w, h) => {
  base(c, w, h)
  seam(c, w * 0.42, h)
  rr(c, w * 0.2, h * 0.38, w * 0.34, h * 0.4, 8)
  c.fillStyle = '#6f7478'
  c.fill()
  rr(c, w * 0.23, h * 0.42, w * 0.28, h * 0.32, 5)
  c.fillStyle = '#9aa0a4'
  c.fill()
  c.fillStyle = '#6f7478'
  c.fillRect(w * 0.23, h * 0.42, w * 0.28, h * 0.05)
  c.fillStyle = '#8b8678'
  for (const x of [0.13, 0.74]) {
    c.beginPath()
    c.arc(w * x, h * 0.25, 7, 0, 7)
    c.fill()
  }
  leaf(c, w * 0.72, h * 0.82, 30)
}

const nodeBack: Draw = (c, w, h) => {
  base(c, w, h)
  seam(c, w * 0.62, h)
  for (let r = 0; r < 3; r++) {
    for (let k = 0; k < 4; k++) {
      rr(c, w * (0.1 + k * 0.14), h * (0.4 + r * 0.17), w * 0.1, h * 0.08, 8)
      c.fillStyle = '#4a4e52'
      c.fill()
    }
  }
}

const nodeSide: Draw = (c, w, h) => {
  base(c, w, h)
  c.fillStyle = '#7d8286'
  for (let r = 0; r < 8; r++) {
    for (let k = 0; k < 8; k++) {
      c.beginPath()
      c.arc(w * (0.42 + k * 0.07), h * (0.3 + r * 0.075), 5, 0, 7)
      c.fill()
    }
  }
}

function louvers(n: number, len: number, h: number) {
  const g = new THREE.Group()
  const dark = new THREE.MeshStandardMaterial({ color: 0x5d6368, roughness: 0.6 })
  const light = new THREE.MeshStandardMaterial({ color: 0x9aa0a4, roughness: 0.5, metalness: 0.2 })
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.04, h + 0.1, len + 0.08), dark)
  plate.castShadow = true
  g.add(plate)
  for (let i = 0; i < n; i++) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.04, len), light)
    s.position.set(0.03, (i - (n - 1) / 2) * (h / n), 0)
    s.rotation.z = -0.5
    s.castShadow = true
    g.add(s)
  }
  return g
}

function buildModel() {
  const root = new THREE.Group()
  const std = (color: number | string, rough = 0.7) => new THREE.MeshStandardMaterial({ color, roughness: rough })
  const body = std(BODY)
  const green = std(GREEN, 0.5)
  const map = (t: THREE.Texture) => new THREE.MeshStandardMaterial({ map: t, roughness: 0.7 })

  const hub = new THREE.Group()
  hub.position.x = HUB_X
  const hubBody = new THREE.Mesh(new RoundedBoxGeometry(2.6, 1.1, 0.9, 4, 0.04), [body, body, body, body, map(tex(1040, 440, hubFront)), map(tex(1040, 440, hubBack))])
  hubBody.position.y = 0.55
  const hubLid = new THREE.Mesh(new RoundedBoxGeometry(2.66, 0.1, 0.96, 4, 0.04), green)
  hubLid.position.y = 1.15
  const mount = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.12), green)
  mount.position.set(-0.55, 1.25, 0.12)
  const cam = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.3, 0.06), std(0xcfcab8))
  cam.position.set(-0.55, 1.45, 0.12)
  const lens = new THREE.Mesh(new THREE.CircleGeometry(0.035, 24), std(0x2b2f33))
  lens.position.set(-0.55, 1.52, 0.1505)
  const lensFrame = new THREE.Mesh(new THREE.RingGeometry(0.04, 0.05, 24), std(0x8a8f93))
  lensFrame.position.set(-0.55, 1.52, 0.151)
  const hubR = louvers(5, 0.55, 0.6)
  hubR.position.set(1.33, 0.55, 0)
  const hubL = louvers(5, 0.55, 0.6)
  hubL.position.set(-1.33, 0.55, 0)
  hubL.rotation.y = Math.PI
  hub.add(hubBody, hubLid, mount, cam, lens, lensFrame, hubR, hubL)

  const node = new THREE.Group()
  node.position.x = NODE_X
  const nodeBody = new THREE.Mesh(new RoundedBoxGeometry(1.1, 0.8, 0.9, 4, 0.04), [body, map(tex(540, 480, nodeSide)), body, body, map(tex(660, 480, nodeFront)), map(tex(660, 480, nodeBack))])
  nodeBody.position.y = 0.4
  const vent = louvers(3, 0.35, 0.36)
  vent.position.set(0.58, 0.4, 0.05)
  const pivot = new THREE.Group()
  pivot.position.set(0, 0.8, -0.45)
  const lid = new THREE.Mesh(new RoundedBoxGeometry(1.14, 0.08, 0.96, 4, 0.04), green)
  lid.position.set(0, 0.04, 0.48)
  const inner = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.02, 0.8), std(0x2f7335, 0.4))
  inner.position.set(0, -0.005, 0.48)
  pivot.add(lid, inner)
  node.add(nodeBody, vent, pivot)

  root.add(hub, node)
  root.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.castShadow = true
      o.receiveShadow = true
    }
  })
  return { root, pivot }
}

const TARGETS: Record<Focus, { t: THREE.Vector3; d: number }> = {
  both: { t: new THREE.Vector3(0, 0.6, 0), d: 7.2 },
  hub: { t: new THREE.Vector3(HUB_X, 0.65, 0), d: 4.6 },
  node: { t: new THREE.Vector3(NODE_X, 0.55, 0), d: 3.6 },
}

export default function ModelViewer() {
  const mount = useRef<HTMLDivElement>(null)
  const focusRef = useRef<Focus>('both')
  const lidRef = useRef(true)
  const [focus, setFocus] = useState<Focus>('both')
  const [lid, setLid] = useState(true)

  useEffect(() => { focusRef.current = focus }, [focus])
  useEffect(() => { lidRef.current = lid }, [lid])

  useEffect(() => {
    const el = mount.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60)
    camera.position.set(4.2, 3, 6.4)
    const controls = new OrbitControls(camera, renderer.domElement)
    renderer.domElement.style.touchAction = 'pan-y'
    controls.enablePan = false
    controls.enableZoom = false
    controls.enableDamping = true
    controls.minPolarAngle = 0.35
    controls.maxPolarAngle = Math.PI / 2 - 0.04
    controls.autoRotate = !reduce
    controls.autoRotateSpeed = 1.4
    controls.target.copy(TARGETS.both.t)
    let idle: number | undefined
    controls.addEventListener('start', () => {
      controls.autoRotate = false
      window.clearTimeout(idle)
    })
    controls.addEventListener('end', () => {
      window.clearTimeout(idle)
      idle = window.setTimeout(() => { controls.autoRotate = !reduce }, 4000)
    })

    scene.add(new THREE.HemisphereLight(0xfff3e6, 0x1a1d20, 1.1))
    const sun = new THREE.DirectionalLight(0xffffff, 2.2)
    sun.position.set(4, 7, 5)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6 })
    sun.shadow.bias = -0.0004
    scene.add(sun)
    const rim = new THREE.PointLight(0xff6b35, 18, 14)
    rim.position.set(-4, 2, -3)
    scene.add(rim)

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.4 }))
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)
    const ring = new THREE.Mesh(new THREE.RingGeometry(3.7, 3.74, 128), new THREE.MeshBasicMaterial({ color: 0xff6b35, transparent: true, opacity: 0.35, side: THREE.DoubleSide }))
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.002
    scene.add(ring)
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(2.6, 2.61, 128), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.07, side: THREE.DoubleSide }))
    ring2.rotation.x = -Math.PI / 2
    ring2.position.y = 0.002
    scene.add(ring2)

    const { root, pivot } = buildModel()
    scene.add(root)
    pivot.rotation.x = -1.2

    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)

    let raf = 0
    const tmp = new THREE.Vector3()
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      const f = TARGETS[focusRef.current]
      tmp.copy(camera.position).sub(controls.target)
      const d = tmp.length() + (f.d - tmp.length()) * 0.06
      controls.target.lerp(f.t, 0.06)
      camera.position.copy(controls.target).add(tmp.setLength(d))
      const want = lidRef.current ? -1.2 : 0
      pivot.rotation.x += (want - pivot.rotation.x) * 0.08
      ring.rotation.z += 0.002
      controls.update()
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(idle)
      ro.disconnect()
      io.disconnect()
      controls.dispose()
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          const m = o.material
          for (const mat of Array.isArray(m) ? m : [m]) {
            ;(mat as THREE.MeshStandardMaterial).map?.dispose()
            mat.dispose()
          }
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="hero-board">
      <div className="board-label"><span>HUB &amp; NODE · 3D</span><b>DRAG TO ROTATE</b></div>
      <div className="stage3d" ref={mount} aria-label="Interactive 3D model of the Verdura hub and sensor node" />
      <div className="view-toggle">
        {(['both', 'hub', 'node'] as const).map((v) => <button key={v} onClick={() => setFocus(v)} aria-pressed={focus === v}><i /> {v.toUpperCase()}</button>)}
        <button onClick={() => setLid((o) => !o)} aria-pressed={lid}><i /> LID {lid ? 'OPEN' : 'CLOSED'}</button>
      </div>
      <div className="readout"><span>FOCUS<br /><b>{focus.toUpperCase()}</b></span><span>NODE LID<br /><b>{lid ? 'OPEN' : 'CLOSED'}</b></span><span>MODEL<br /><b>APPROX. CAD</b></span></div>
    </div>
  )
}
