export interface Directions {
  getDirections(placeOriginId: string, placeDestinationId: string): Promise<any>;
}
