/* eslint-disable no-use-before-define */
export class Cell {
  private x: number
  private y: number
  private w: number
  public top: Cell | null
  public right: Cell | null
  public bottom: Cell | null
  public left: Cell | null
  public revealed: boolean
  public bee: boolean

  constructor(public i: number, public j: number, w = 20) {
    this.x = i * w
    this.y = j * w
    this.w = w
    this.top = null
    this.right = null
    this.bottom = null
    this.left = null

    this.revealed = false
    this.bee = random(1) < 0.1
  }

  get bombs() {
    return [...this.neighbors, ...this.relatives].filter(neighbor => neighbor.bee).length
  }

  get neighbors() {
    const all = [this.top, this.right, this.bottom, this.left] as Cell[]

    return all.filter(neighbor => neighbor !== null)
  }

  get relatives() {
    const all = [this.top?.right, this.right?.bottom, this.bottom?.left, this.left?.top] as Cell[]

    return all.filter(neighbor => neighbor)
  }

  draw() {
    if (this.revealed) {
      stroke(0)
      fill(200)
      rect(this.x, this.y, this.w, this.w)

      if (this.bee) {
        noStroke()
        fill(100)
        const r = (this.w - 0) / 2
        ellipse(this.x + r, this.y + r, r, r)
      } else if (this.bombs > 0) {
        stroke(0)
        fill(0)
        textSize(this.w * 0.8)
        text(this.bombs, this.x + 5, this.y - 4 + this.w)
      }
    } else {
      stroke(0)
      fill(180)
      rect(this.x, this.y, this.w, this.w)
    }
  }
}
