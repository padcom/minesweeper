import { Cell } from './cell'

export class Grid {
  private w: number
  private grid: Cell[][]

  constructor(cols = 10, rows = 10, w = 20) {
    this.w = w
    this.grid = Array.from(new Array(rows), () => new Array(cols))

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.grid[i][j] = new Cell(i, j, w)
      }
    }

    // eslint-disable-next-line complexity
    this.forEachCell(cell => {
      const { i, j } = cell
      cell.top = j === 0 ? null : this.grid[i][j - 1]
      cell.right = i === cols - 1 ? null : this.grid[i + 1][j]
      cell.bottom = j === rows - 1 ? null : this.grid[i][j + 1]
      cell.left = i === 0 ? null : this.grid[i - 1][j]
    })
  }

  // eslint-disable-next-line complexity
  getCellAtCoords(x: number, y: number) {
    const i = floor(x / this.w)
    const j = floor(y / this.w)

    if (i >= 0 && i < this.grid.length && j >= 0 && j < this.grid[i].length) {
      return this.grid[i][j]
    } else {
      return null
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  forEachCell(callback = (cell: Cell) => {}) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        // eslint-disable-next-line promise/prefer-await-to-callbacks
        callback(this.grid[i][j])
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  visit(fromCellOrCallback = this.grid[0][0], callback = (cell: Cell) => true) {
    if (typeof fromCellOrCallback === 'function') {
      callback = fromCellOrCallback
      // eslint-disable-next-line prefer-destructuring
      fromCellOrCallback = this.grid[0][0]
    }

    const visited = new Set()

    function next(cell: Cell): any {
      visited.add(cell)

      // eslint-disable-next-line promise/prefer-await-to-callbacks
      return callback(cell) && cell.neighbors
        .filter(neighbor => !visited.has(neighbor))
        .reduce((acc, neighbor) => next(neighbor), true)
    }

    next(fromCellOrCallback)
  }
}
