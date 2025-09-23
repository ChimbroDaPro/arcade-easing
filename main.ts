	//% color=#FF7F50 ico="\uf1de" block="Easing" weight=90
    
    namespace easing {

    export enum Mode {
        //% block="linear"
        Linear = 0,
        // Quadratic
        //% block="quad in"
        InQuad,
        //% block="quad out"
        OutQuad,
        //% block="quad in-out"
        InOutQuad,
        // Cubic
        //% block="cubic in"
        InCubic,
        //% block="cubic out"
        OutCubic,
        //% block="cubic in-out"
        InOutCubic,
        // Quart
        //% block="quart in"
        InQuart,
        //% block="quart out"
        OutQuart,
        //% block="quart in-out"
        InOutQuart,
        // Quint
        //% block="quint in"
        InQuint,
        //% block="quint out"
        OutQuint,
        //% block="quint in-out"
        InOutQuint,
        // Sine
        //% block="sine in"
        InSine,
        //% block="sine out"
        OutSine,
        //% block="sine in-out"
        InOutSine,
        // Expo
        //% block="expo in"
        InExpo,
        //% block="expo out"
        OutExpo,
        //% block="expo in-out"
        InOutExpo,
        // Circ
        //% block="circ in"
        InCirc,
        //% block="circ out"
        OutCirc,
        //% block="circ in-out"
        InOutCirc,
        // Back
        //% block="back in"
        InBack,
        //% block="back out"
        OutBack,
        //% block="back in-out"
        InOutBack,
        // Elastic
        //% block="elastic in"
        InElastic,
        //% block="elastic out"
        OutElastic,
        //% block="elastic in-out"
        InOutElastic,
        // Bounce
        //% block="bounce in"
        InBounce,
        //% block="bounce out"
        OutBounce,
        //% block="bounce in-out"
        InOutBounce
    }
    export enum ReturnKind {
        //% block="job id"
        JobId = 0,
        //% block="eased value"
        EasedValue
    }

    const EVT_SRC = 0xE453

    // ---------- Easing math ----------
    function outBounce(t: number): number {
        const n1 = 7.5625
        const d1 = 2.75
        if (t < 1 / d1) {
            return n1 * t * t
        } else if (t < 2 / d1) {
            t -= 1.5 / d1
            return n1 * t * t + 0.75
        } else if (t < 2.5 / d1) {
            t -= 2.25 / d1
            return n1 * t * t + 0.9375
        } else {
            t -= 2.625 / d1
            return n1 * t * t + 0.984375
        }
    }

    function applyEase(mode: Mode, t: number): number {
        if (t <= 0) return 0
        if (t >= 1) return 1

        switch (mode) {
            case Mode.Linear: return t

            case Mode.InQuad: return t * t
            case Mode.OutQuad: return t * (2 - t)
            case Mode.InOutQuad: return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

            case Mode.InCubic: return t * t * t
            case Mode.OutCubic: { const u = t - 1; return u * u * u + 1 }
            case Mode.InOutCubic: return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

            case Mode.InQuart: return t * t * t * t
            case Mode.OutQuart: { const v = t - 1; return 1 - v * v * v * v }
            case Mode.InOutQuart: return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * Math.pow(t - 1, 4)

            case Mode.InQuint: return Math.pow(t, 5)
            case Mode.OutQuint: return 1 + Math.pow(t - 1, 5)
            case Mode.InOutQuint: return t < 0.5 ? 16 * Math.pow(t, 5) : 1 + 16 * Math.pow(t - 1, 5)

            case Mode.InSine: return 1 - Math.cos((t * Math.PI) / 2)
            case Mode.OutSine: return Math.sin((t * Math.PI) / 2)
            case Mode.InOutSine: return -(Math.cos(Math.PI * t) - 1) / 2

            case Mode.InExpo: return Math.pow(2, 10 * t - 10)
            case Mode.OutExpo: return 1 - Math.pow(2, -10 * t)
            case Mode.InOutExpo: return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2

            case Mode.InCirc: return 1 - Math.sqrt(1 - t * t)
            case Mode.OutCirc: { const w = t - 1; return Math.sqrt(1 - w * w) }
            case Mode.InOutCirc: return t < 0.5 ? (1 - Math.sqrt(1 - 4 * t * t)) / 2 : (Math.sqrt(1 - Math.pow(2 * t - 2, 2)) + 1) / 2

            case Mode.InBack: { const c1 = 1.70158, c3 = c1 + 1; return c3 * t * t * t - c1 * t * t }
            case Mode.OutBack: { const c12 = 1.70158, c32 = c12 + 1; const a = t - 1; return 1 + c32 * a * a * a + c12 * a * a }
            case Mode.InOutBack: {
                const c13 = 1.70158, c2 = c13 * 1.525
                if (t < 0.5) {
                    const b = 2 * t
                    return (b * b * ((c2 + 1) * b - c2)) / 2
                } else {
                    const c = 2 * t - 2
                    return (c * c * ((c2 + 1) * c + c2) + 2) / 2
                }
            }

            case Mode.InElastic: { const c4 = (2 * Math.PI) / 3; return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4) }
            case Mode.OutElastic: { const c42 = (2 * Math.PI) / 3; return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c42) + 1 }
            case Mode.InOutElastic: {
                const c5 = (2 * Math.PI) / 4.5
                if (t < 0.5) return -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
                return (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
            }

            case Mode.InBounce: return 1 - outBounce(1 - t)
            case Mode.OutBounce: return outBounce(t)
            case Mode.InOutBounce: return t < 0.5 ? (1 - outBounce(1 - 2 * t)) / 2 : (1 + outBounce(2 * t - 1)) / 2
        }

        return t
    }

    // ---------- Job system ----------
    type JobType = "pos" | "scale" | "camera" | "value"

    class Job {
        id: number
        type: JobType
        sprite: Sprite | null
        // pos
        x0: number
        y0: number
        x1: number
        y1: number
        // scale
        s0: number
        s1: number
        // camera
        cx0: number
        cy0: number
        cx1: number
        cy1: number
        // value
        v0: number
        v1: number
        handler: ((v: number) => void) | null
        start: number
        ms: number
        mode: Mode
        done: boolean
        tag: string | null
        progress: number

        constructor(id: number) {
            this.id = id
            this.type = "pos"
            this.sprite = null
            this.x0 = this.y0 = this.x1 = this.y1 = 0
            this.s0 = this.s1 = 1
            this.cx0 = this.cy0 = this.cx1 = this.cy1 = 0
            this.v0 = this.v1 = 0
            this.handler = null
            this.start = game.runtime()
            this.ms = 1
            this.mode = Mode.InOutQuad
            this.done = false
            this.tag = null
            this.progress = 0
        }

        update(now: number) {
            if (this.done) return
            const t = Math.min(1, (now - this.start) / this.ms)
            const e = applyEase(this.mode, t)
            this.progress = e
            switch (this.type) {
                case "pos":
                    if (this.sprite) {
                        this.sprite.x = this.x0 + (this.x1 - this.x0) * e
                        this.sprite.y = this.y0 + (this.y1 - this.y0) * e
                    }
                    break
                case "scale":
                    if (this.sprite) {
                        try {
                            (this.sprite as any).setScale(this.s0 + (this.s1 - this.s0) * e)
                        } catch (err) {
                        }
                    }
                    break
                case "camera":
                    scene.cameraShake(0, 0) // noop, just ensure scene exists
                    scene.centerCameraAt(Math.round(this.cx0 + (this.cx1 - this.cx0) * e), Math.round(this.cy0 + (this.cy1 - this.cy0) * e))
                    break
                case "value":
                    if (this.handler) {
                        const val = this.v0 + (this.v1 - this.v0) * e
                        this.handler(val)
                    }
                    break
            }

            if (t >= 1) {
                this.done = true
                // raise sprite-specific event for pos/scale types
                if (this.sprite) {
                    control.raiseEvent(EVT_SRC, this.sprite.id)
                }
            }
        }
    }

    let jobs: Job[] = []
    let namedValueHandlers: { [name: string]: (v: number) => void } = {}
    let nextId = 1
    let runnerStarted = false

    function ensureRunner() {
        if (runnerStarted) return
        runnerStarted = true
        game.onUpdate(function () {
            if (jobs.length === 0) return
            const now = game.runtime()
            for (let i = jobs.length - 1; i >= 0; i--) {
                jobs[i].update(now)
                if (jobs[i].done) jobs.splice(i, 1)
            }
        })
    }

    function pushJob(j: Job) {
        jobs.push(j)
        ensureRunner()
    }

    function getCameraCenter() {
        const camLeft = scene.cameraLeft();
        const camTop = scene.cameraTop();
        const cx = camLeft + scene.screenWidth() / 2;
        const cy = camTop + scene.screenHeight() / 2;
        return { x: cx, y: cy };
    }

    function findJobsForSprite(s: Sprite): Job[] {
        const out: Job[] = []
        for (let j of jobs) if (j.sprite === s) out.push(j)
        return out
    }

    // ---------- External Blocks ----------

    /**
     * Ease a sprite to a target position. Returns a job id.
     * Overwrites any existing easing of this sprite (pos/scale) unless you choose to keep multiple.
     */
    //% blockId=easing_easeTo
    //% block="ease %sprite=variables_get(mySprite) to x %x y %y over %ms (ms) using %mode"
    //% inlineInputMode=inline
    //% group="Move" weight=100
    export function easeTo(sprite: Sprite, x: number, y: number, ms: number, mode: Mode = Mode.InOutQuad): number {
        if (!sprite) return -1
        for (let k = jobs.length - 1; k >= 0; k--) {
            if (jobs[k].sprite === sprite && jobs[k].type === "pos") jobs.splice(k, 1)
        }
        const l = new Job(nextId++)
        l.type = "pos"
        l.sprite = sprite
        l.x0 = sprite.x
        l.y0 = sprite.y
        l.x1 = x
        l.y1 = y
        l.start = game.runtime()
        l.ms = Math.max(1, ms | 0)
        l.mode = mode
        pushJob(l)
        return l.id
    }

    /**
     * Ease a sprite by delta.
     */
    //% blockId=easing_easeBy
    //% block="ease %sprite=variables_get(mySprite) by dx %dx dy %dy over %ms (ms) using %mode"
    //% inlineInputMode=inline
    //% group="Move" weight=90
    export function easeBy(sprite: Sprite, dx: number, dy: number, ms: number, mode: Mode = Mode.InOutQuad): number {
        if (!sprite) return -1
        return easeTo(sprite, sprite.x + dx, sprite.y + dy, ms, mode)
    }

    /**
     * Ease the scale of a sprite. If startScale is omitted, 1 is assumed.
     * Returns job id.
     */
    //% blockId=easing_easeScaleTo
    //% block="ease scale of %sprite=variables_get(mySprite) to %toScale over %ms (ms) using %mode (start %startScale)"
    //% inlineInputMode=inline
    //% group="Scale" weight=85
    export function easeScaleTo(sprite: Sprite, toScale: number, ms: number, mode: Mode = Mode.InOutQuad, startScale?: number): number {
        if (!sprite) return -1
        // remove existing scale jobs
        for (let m = jobs.length - 1; m >= 0; m--) {
            if (jobs[m].sprite === sprite && jobs[m].type === "scale") jobs.splice(m, 1)
        }
        const n = new Job(nextId++)
        n.type = "scale"
        n.sprite = sprite
        n.s0 = (startScale === undefined) ? 1 : startScale
        n.s1 = toScale
        n.start = game.runtime()
        n.ms = Math.max(1, ms | 0)
        n.mode = mode
        pushJob(n)
        return n.id
    }

    /**
     * Ease the scale of a sprite by delta (relative).
     * Returns job id.
     */
    //% blockId=easing_easeScaleBy
    //% block="ease scale of %sprite=variables_get(mySprite) by %dScale over %ms (ms) using %mode (start %startScale)"
    //% inlineInputMode=inline
    //% group="Scale" weight=84
    export function easeScaleBy(sprite: Sprite, dScale: number, ms: number, mode: Mode = Mode.InOutQuad, startScale?: number): number {
        const s0 = (startScale === undefined) ? 1 : startScale
        return easeScaleTo(sprite, s0 + dScale, ms, mode, s0)
    }

    /**
     * Ease the camera center to a given (x,y). Returns job id.
     * NOTE: If camera is following a sprite, it will override manual centering.
     */
    //% blockId=easing_easeCameraTo
    //% block="ease camera to x %x y %y over %ms (ms) using %mode"
    //% inlineInputMode=inline
    //% group="Camera" weight=80
    export function easeCameraTo(x: number, y: number, ms: number, mode: Mode = Mode.Linear): number {
        const o = new Job(nextId++)
        o.type = "camera"
        // store current center as start (we compute from screen and camera)
        o.cx0 = getCameraCenter().x
        o.cy0 = getCameraCenter().y
        o.cx1 = x
        o.cy1 = y
        o.start = game.runtime()
        o.ms = Math.max(1, ms | 0)
        o.mode = mode
        pushJob(o)
        return o.id
    } 


    /**
     * Define (register) a named easing function. The handler receives (value).
     * Use this to store a function that you will launch later.
     */
    //% blockId=easing_setupEaseFunc
    //% value.defl=0
    //% block="setup easing function named $name with $handler"
    //% draggableParameters=reporter
    //% group="Generic" weight=77
    export function setupEaseFunc(name: string, handler: (value: number) => void) {
        if (!name) return
        if (!handler) return
        namedValueHandlers[name] = handler
    }

    /**
     * Launch a previously defined easing function (by name), easing value from v0 -> v1.
     * The registered handler is called each frame with (value, jobId).
     * This block returns nothing — the handler itself is responsible for using jobId if needed.
     */
    //% blockId=easing_launchEaseFunc
    //% block="launch easing function named %name from %v0 to %v1 over %ms (ms) using %mode"
    //% inlineInputMode=inline
    //% group="Generic" weight=76
    export function launchEaseFunc(name: string, v0: number, v1: number, ms: number, mode: Mode = Mode.InOutQuad): void {
        const h = namedValueHandlers[name]
        if (!h) {
            return
        }

        const p = new Job(nextId++)
        p.type = "value"
        p.v0 = v0
        p.v1 = v1
        p.start = game.runtime()
        p.ms = Math.max(1, ms | 0)
        p.mode = mode
        // simply use the registered handler (it expects value, jobId)
        p.handler = h
        pushJob(p)
    }

    /**
     * Cancel a job by job id.
     */
    //% blockId=easing_cancelJob
    //% block="cancel easing job id %jobId"
    //% group="Control" weight=70
    export function cancelJob(jobId: number): void {
        for (let q = jobs.length - 1; q >= 0; q--) {
            if (jobs[q].id === jobId) jobs.splice(q, 1)
        }
    }

    /**
     * Cancel easing on a sprite (any job type attached to the sprite).
     */
    //% blockId=easing_cancelSprite
    //% block="cancel easing on %sprite=variables_get(mySprite)"
    //% group="Control" weight=75
    export function cancel(sprite: Sprite): void {
        if (!sprite) return
        for (let r = jobs.length - 1; r >= 0; r--) {
            if (jobs[r].sprite === sprite) jobs.splice(r, 1)
        }
    }

    /**
     * Cancel by tag (useful if you tag job(s) when creating).
     */
    //% blockId=easing_cancelTag
    //% block="cancel easings tagged %tag"
    //% group="Control" weight=69
    export function cancelTag(tag: string): void {
        if (!tag) return
        for (let s = jobs.length - 1; s >= 0; s--) {
            if (jobs[s].tag === tag) jobs.splice(s, 1)
        }
    }

    /**
     * Cancel all easings.
     */
    //% blockId=easing_cancelAll
    //% block="cancel all easings"
    //% group="Control" weight=60
    export function cancelAll(): void {
        jobs = []
    }

    /**
     * Set a tag on a job (for later cancellation). Use the returned job id from creation.
     */
    //% blockId=easing_setTag
    //% block="tag job id %jobId as %tag"
    //% group="Control" weight=58
    export function setJobTag(jobId: number, tag: string): void {
        for (let d of jobs) if (d.id === jobId) d.tag = tag
    }

    /**
     * Query if a sprite has any active easing jobs.
     */
    //% blockId=easing_isEasing
    //% block="is %sprite=variables_get(mySprite) easing?"
    //% group="Control" weight=56
    export function isEasing(sprite: Sprite): boolean {
        for (let f of jobs) if (f.sprite === sprite && !f.done) return true
        return false
    }

    /**
     * Get easing progress (0..1) for a sprite. If not easing, returns -1.
     */
    //% blockId=easing_getProgressForSprite
    //% block="easing progress of %sprite=variables_get(mySprite)"
    //% group="Control" weight=54
    export function getEaseProgress(sprite: Sprite): number {
        for (let g of jobs) {
            if (g.sprite === sprite && !g.done) return g.progress
        }
        return -1
    }

    /**
     * Get easing progress for a job id. Returns -1 if not found.
     */
    //% blockId=easing_getProgressForId
    //% block="easing progress of job id %jobId"
    //% group="Control" weight=53
    export function getEaseProgressById(jobId: number): number {
        for (let j2 of jobs) if (j2.id === jobId) return j2.progress
        return -1
    }

    /**
     * Event: on easing finished for sprite.
     */
    //% blockId=easing_onFinished
    //% block="on easing finished for %sprite=variables_get(mySprite)"
    //% draggableParameters=reporter
    //% group="Events" weight=50 blockAllowMultiple=1
    export function onFinished(sprite: Sprite, handler: (s: Sprite) => void): void {
        control.onEvent(EVT_SRC, sprite.id, function () {
            handler(sprite)
        })
    }

    // ---------- Backwards compatibility helpers ----------
    /**
     * Convenience: easeTo but returns void (compat) — kept for older projects
     */
    //% blockHidden=true
    export function easeToVoid(sprite: Sprite, x: number, y: number, ms: number, mode: Mode = Mode.InOutQuad): void {
        easeTo(sprite, x, y, ms, mode)
    }
}
