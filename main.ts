/**
 * Easing for MakeCode Arcade
 * MIT License
 */

//% color=#FF7F50 icon="\uf1de" block="Easing" weight=90
namespace easing {

    // Internal: single event source for completion notifications
    const EVT_SRC = 0xE453; // arbitrary unique number

    // Easing modes exposed in the dropdown
    export enum Mode {
        //% block="linear"
        Linear = 0,

        //% block="quad in"
        InQuad,
        //% block="quad out"
        OutQuad,
        //% block="quad in-out"
        InOutQuad,

        //% block="cubic in"
        InCubic,
        //% block="cubic out"
        OutCubic,
        //% block="cubic in-out"
        InOutCubic,

        //% block="quart in"
        InQuart,
        //% block="quart out"
        OutQuart,
        //% block="quart in-out"
        InOutQuart,

        //% block="quint in"
        InQuint,
        //% block="quint out"
        OutQuint,
        //% block="quint in-out"
        InOutQuint,

        //% block="sine in"
        InSine,
        //% block="sine out"
        OutSine,
        //% block="sine in-out"
        InOutSine,

        //% block="expo in"
        InExpo,
        //% block="expo out"
        OutExpo,
        //% block="expo in-out"
        InOutExpo,

        //% block="circ in"
        InCirc,
        //% block="circ out"
        OutCirc,
        //% block="circ in-out"
        InOutCirc,

        //% block="back in"
        InBack,
        //% block="back out"
        OutBack,
        //% block="back in-out"
        InOutBack,

        //% block="elastic in"
        InElastic,
        //% block="elastic out"
        OutElastic,
        //% block="elastic in-out"
        InOutElastic,

        //% block="bounce in"
        InBounce,
        //% block="bounce out"
        OutBounce,
        //% block="bounce in-out"
        InOutBounce
    }

    // ===== Internal easing math =====

    function applyEase(mode: Mode, t: number): number {
        if (t <= 0) return 0
        if (t >= 1) return 1

        switch (mode) {
            case Mode.Linear: return t

            // QUAD
            case Mode.InQuad: return t * t
            case Mode.OutQuad: return t * (2 - t)
            case Mode.InOutQuad: return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

            // CUBIC
            case Mode.InCubic: return t * t * t
            case Mode.OutCubic: {
                const u = t - 1
                return u * u * u + 1
            }
            case Mode.InOutCubic: return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

            // QUART
            case Mode.InQuart: return t * t * t * t
            case Mode.OutQuart: {
                const u = t - 1
                return 1 - u * u * u * u
            }
            case Mode.InOutQuart: return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * Math.pow(t - 1, 4)

            // QUINT
            case Mode.InQuint: return Math.pow(t, 5)
            case Mode.OutQuint: return 1 + Math.pow(t - 1, 5)
            case Mode.InOutQuint: return t < 0.5 ? 16 * Math.pow(t, 5) : 1 + 16 * Math.pow(t - 1, 5)

            // SINE
            case Mode.InSine: return 1 - Math.cos((t * Math.PI) / 2)
            case Mode.OutSine: return Math.sin((t * Math.PI) / 2)
            case Mode.InOutSine: return -(Math.cos(Math.PI * t) - 1) / 2

            // EXPO
            case Mode.InExpo: return Math.pow(2, 10 * t - 10)
            case Mode.OutExpo: return 1 - Math.pow(2, -10 * t)
            case Mode.InOutExpo:
                return t < 0.5
                    ? Math.pow(2, 20 * t - 10) / 2
                    : (2 - Math.pow(2, -20 * t + 10)) / 2

            // CIRC
            case Mode.InCirc: return 1 - Math.sqrt(1 - t * t)
            case Mode.OutCirc: {
                const u = t - 1
                return Math.sqrt(1 - u * u)
            }
            case Mode.InOutCirc:
                return t < 0.5
                    ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
                    : (Math.sqrt(1 - Math.pow(2 * t - 2, 2)) + 1) / 2

            // BACK
            case Mode.InBack: {
                const c1 = 1.70158, c3 = c1 + 1
                return c3 * t * t * t - c1 * t * t
            }
            case Mode.OutBack: {
                const c1 = 1.70158, c3 = c1 + 1
                const u = t - 1
                return 1 + c3 * u * u * u + c1 * u * u
            }
            case Mode.InOutBack: {
                const c1 = 1.70158, c2 = c1 * 1.525
                if (t < 0.5) {
                    const u = 2 * t
                    return (u * u * ((c2 + 1) * u - c2)) / 2
                } else {
                    const u = 2 * t - 2
                    return (u * u * ((c2 + 1) * u + c2) + 2) / 2
                }
            }

            // ELASTIC
            case Mode.InElastic: {
                const c4 = (2 * Math.PI) / 3
                return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
            }
            case Mode.OutElastic: {
                const c4 = (2 * Math.PI) / 3
                return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
            }
            case Mode.InOutElastic: {
                const c5 = (2 * Math.PI) / 4.5
                if (t < 0.5) return -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
                return (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
            }

            // BOUNCE
            case Mode.InBounce: return 1 - outBounce(1 - t)
            case Mode.OutBounce: return outBounce(t)
            case Mode.InOutBounce:
                return t < 0.5
                    ? (1 - outBounce(1 - 2 * t)) / 2
                    : (1 + outBounce(2 * t - 1)) / 2
        }
        return t
    }

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

    // ===== Job system =====

    class Job {
        sprite: Sprite
        x0: number
        y0: number
        x1: number
        y1: number
        start: number
        ms: number
        mode: Mode
        done: boolean

        constructor(sprite: Sprite, x1: number, y1: number, ms: number, mode: Mode) {
            this.sprite = sprite
            this.x0 = sprite.x
            this.y0 = sprite.y
            this.x1 = x1
            this.y1 = y1
            this.start = game.runtime()
            this.ms = Math.max(1, ms | 0)
            this.mode = mode
            this.done = false
        }

        update(now: number) {
            if (this.done) return
            if (!this.sprite) { this.done = true; return }

            const t = Math.min(1, (now - this.start) / this.ms)
            const e = applyEase(this.mode, t)
            this.sprite.x = this.x0 + (this.x1 - this.x0) * e
            this.sprite.y = this.y0 + (this.y1 - this.y0) * e

            if (t >= 1) {
                this.done = true
                control.raiseEvent(EVT_SRC, this.sprite.id) // finished event for this sprite
            }
        }
    }

    let jobs: Job[] = []
    let runnerStarted = false

    function ensureRunner() {
        if (runnerStarted) return
        runnerStarted = true
        game.onUpdate(function () {
            if (jobs.length === 0) return
            const now = game.runtime()
            for (let i = jobs.length - 1; i >= 0; i--) {
                const j = jobs[i]
                j.update(now)
                if (j.done) jobs.splice(i, 1)
            }
        })
    }

    function cancelInternal(sprite: Sprite) {
        if (!sprite) return
        for (let i = jobs.length - 1; i >= 0; i--) {
            if (jobs[i].sprite === sprite) {
                jobs.splice(i, 1)
            }
        }
    }

    function hasJob(sprite: Sprite): boolean {
        for (let j of jobs) if (j.sprite === sprite) return true
        return false
    }

    // ===== Public Blocks =====

    /**
     * Ease a sprite to a target position over time using the selected easing curve.
     * Overwrites any existing easing on that sprite.
     * @param sprite sprite to move
     * @param x target x
     * @param y target y
     * @param ms duration in milliseconds
     * @param mode easing mode
     */
    //% blockId=easing_easeTo
    //% block="ease %sprite=variables_get(mySprite) to x %x y %y over %ms (ms) using %mode"
    //% inlineInputMode=inline
    //% group="Move" weight=100
    export function easeTo(sprite: Sprite, x: number, y: number, ms: number, mode: Mode = Mode.InOutQuad): void {
        ensureRunner()
        cancelInternal(sprite)
        jobs.push(new Job(sprite, x, y, ms, mode))
    }

    /**
     * Ease a sprite by a delta (relative movement).
     */
    //% blockId=easing_easeBy
    //% block="ease %sprite=variables_get(mySprite) by dx %dx dy %dy over %ms (ms) using %mode"
    //% inlineInputMode=inline
    //% group="Move" weight=90
    export function easeBy(sprite: Sprite, dx: number, dy: number, ms: number, mode: Mode = Mode.InOutQuad): void {
        ensureRunner()
        cancelInternal(sprite)
        jobs.push(new Job(sprite, sprite.x + dx, sprite.y + dy, ms, mode))
    }

    /**
     * Cancel easing on a sprite (leaves it where it is).
     */
    //% blockId=easing_cancel
    //% block="cancel easing on %sprite=variables_get(mySprite)"
    //% group="Control" weight=80
    export function cancel(sprite: Sprite): void {
        cancelInternal(sprite)
    }

    /**
     * Cancel all easings (every sprite).
     */
    //% blockId=easing_cancelAll
    //% block="cancel all easings"
    //% group="Control" weight=70
    export function cancelAll(): void {
        jobs = []
    }

    /**
     * Check if a sprite is currently easing.
     */
    //% blockId=easing_isEasing
    //% block="is %sprite=variables_get(mySprite) easing?"
    //% group="Control" weight=60
    export function isEasing(sprite: Sprite): boolean {
        return hasJob(sprite)
    }

    /**
     * Run code when easing finishes for a specific sprite.
     * The handler runs once for each completion.
     * @param sprite sprite to watch
     * @param handler code to run
     */
    //% blockId=easing_onFinished
    //% block="on easing finished for %sprite=variables_get(mySprite)"
    //% draggableParameters=reporter
    //% group="Events" weight=50 blockAllowMultiple=1
    export function onFinished(sprite: Sprite, handler: (s: Sprite) => void): void {
        // Register for this sprite's id
        control.onEvent(EVT_SRC, sprite.id, function () {
            handler(sprite)
        })
    }
}
