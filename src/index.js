var width = 3
var height = 3
var pixels = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

function updateWidth() {
    var newWidth = Number(document.getElementById("width").value)

    for (row in pixels) {
        if (width < newWidth) {
            pixels[row].push(0)
        } else {
            pixels[row].pop()
        }
    }

    width = newWidth
    draw()
}

function updateHeight() {
    var newHeight = Number(document.getElementById("height").value)

    if (height < newHeight) {
        var row = []

        for (var i = 0; i < width; i ++) {
            row.push(0)
        }

        pixels.push(row)
    } else {
        pixels.pop()
    }

    height = newHeight

    draw()
}

function clickPixel(e) {
    var id = e.target.id
    var pixel = 0

    for (i in pixels) {
        for (j in pixels[i]) {
            if (id == pixel) {
                if (pixels[i][j] == 0) {
                    pixels[i][j] = 1
                } else {
                    pixels[i][j] = 0
                }
            }
            pixel += 1
        }
    }

    save()
    draw()
}

function draw() {
    var id = 0
    var grid = document.getElementsByClassName("grid")[0]
    grid.style.gridTemplateColumns = `repeat(${width}, 50px)`

    while (grid.firstChild) {
        grid.removeChild(grid.lastChild)
    }

    for (i in pixels) {
        for (j in pixels[i]) {
            var pixel = document.createElement("div")
            pixel.className = "pixel"
            pixel.id = id
            if (pixels[i][j] == 1) {
                pixel.style.backgroundColor = "#FFF"
            }

            pixel.addEventListener('click', (e) => {
                clickPixel(e)
            })
        
            grid.appendChild(pixel)
            id += 1
        }
    }
}

function save() {
    string = ""
    for (i in pixels) {
        for (j in pixels[i]) {
            string += pixels[i][j]
        }
    }

    document.getElementById("textarea").value = string
}