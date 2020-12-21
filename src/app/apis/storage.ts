export function getSeed(): string | null {
  return window.localStorage.getItem('seed');
}

export function setSeed(seed: string): void {
  return window.localStorage.setItem('seed', seed);
}

export function removeSeed(): void {
  window.localStorage.removeItem('seed');
}
