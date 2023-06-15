import { Grid } from './grid'

let grid: Grid

export function setup() {
  createCanvas(400, 400)
  grid = new Grid()
}

export function draw() {
  background(255)
  grid.forEachCell(cell => cell.draw())
}

export function mousePressed() {
  const cell = grid.getCellAtCoords(mouseX, mouseY)
  if (cell) {
    if (cell.bee) {
      grid.forEachCell(c => {
        c.revealed = true
      })
    } else {
      grid.visit(cell, c => {
        c.revealed = true

        return c.bombs === 0 && !c.bee
      })
    }
  }
}
