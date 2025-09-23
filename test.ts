let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . 3 3 . . . . . . .
    . . . . . . . 3 . . . . . . . .
    . . . . . . . 3 . . . . . . . .
    . . . . . . . 3 3 3 . . . . . .
    . . . . . . . 3 3 3 . . . . . .
    . . . . . . 3 3 . 3 . . . . . .
    . . . . . . 3 3 . 3 . . . . . .
    . . . . . . 3 3 . 3 . . . . . .
    . . . . . . 3 . . 3 . . . . . .
    . . . . . . . . . 3 . . . . . .
    . . . . . . . . . 3 . . . . . .
    . . . . . . . . . 3 3 . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
easing.setupEaseFunc("test", function(value: number, jobId: number) {
    
    mySprite.setPosition(value, value)
})
// tests go here; this will not be compiled when this package is used as an extension.
easing.launchEaseFunc("test", 0, 0, 0, easing.Mode.Linear)
easing.setupEaseFunc("", function(value: number, jobId: number) {
    
})