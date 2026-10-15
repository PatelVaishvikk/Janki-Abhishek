// Elegant, slow-drifting celebratory canvas confetti burst
export function triggerConfetti(options?: { particleCount?: number; originY?: number }) {
  if (typeof window === 'undefined') return

  const particleCount = options?.particleCount ?? 80
  const originYRatio = options?.originY ?? 0.65

  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '999999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }

  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)

  // Royal gold, rose petal, warm saffron, champagne palette
  const colors = [
    '#A37A3E', // Royal gold primary
    '#C9A66B', // Gold light
    '#E5B869', // Bright gold leaf
    '#E06D80', // Soft rose petal
    '#681D29', // Deep royal maroon
    '#F59E0B', // Saffron amber
    '#FDE047', // Champagne sparkle
  ]

  const pieces: {
    x: number
    y: number
    size: number
    color: string
    vx: number
    vy: number
    rotation: number
    vRot: number
    swaySpeed: number
    swayOffset: number
    isCircle: boolean
  }[] = []

  const originX = window.innerWidth * 0.5
  const originY = window.innerHeight * originYRatio

  for (let i = 0; i < particleCount; i++) {
    // Gentle fountain spread
    const angle = Math.PI * (0.78 + Math.random() * 1.44)
    const speed = 4.5 + Math.random() * 7.5
    pieces.push({
      x: originX,
      y: originY,
      size: 4 + Math.random() * 5.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4.5,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 3.5, // gentle tumble
      swaySpeed: 0.0025 + Math.random() * 0.003,
      swayOffset: Math.random() * Math.PI * 2,
      isCircle: Math.random() > 0.6,
    })
  }

  let animationFrameId: number
  const startTime = Date.now()
  const duration = 4600 // 4.6 seconds graceful float

  function render() {
    const elapsed = Date.now() - startTime
    if (elapsed > duration) {
      canvas.remove()
      return
    }

    ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight)

    // Calculate overall opacity fade towards the end
    const alpha = elapsed > duration - 1200
      ? Math.max(0, (duration - elapsed) / 1200)
      : 1

    for (const p of pieces) {
      // Gentle physics
      p.x += p.vx + Math.sin(elapsed * p.swaySpeed + p.swayOffset) * 0.85
      p.y += p.vy
      p.vy += 0.11 // low gravity for floaty descent
      p.vx *= 0.985 // smooth air deceleration
      p.rotation += p.vRot

      ctx!.save()
      ctx!.globalAlpha = alpha
      ctx!.translate(p.x, p.y)
      ctx!.rotate((p.rotation * Math.PI) / 180)
      ctx!.fillStyle = p.color

      if (p.isCircle) {
        ctx!.beginPath()
        ctx!.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx!.fill()
      } else {
        ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.75)
      }
      ctx!.restore()
    }

    animationFrameId = requestAnimationFrame(render)
  }

  render()
}
