export function checkCollision(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  threshold: number = 8
): boolean {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance < threshold;
}
