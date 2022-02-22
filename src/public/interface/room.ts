export interface Place {
  positionX: number
  positionY: number
  available: boolean
  placeName: string
  letter?: string
}

export interface Room {
  name: string
  slug: string
  rows: number
  columns: number
  places: Place[]
  drawMap: any[]
  available: boolean
}

export interface MapParams {
  placeName: string
  index: number
  subindex: number
}