export class VersionValidationError extends Error {}

export function isValidVersion(version: string): boolean {
  const parts = version.split('.');
  for (const part of parts) {
    if (!part || isNaN(Number(part)) || Number(part) < 0) {
      return false;
    }
  }
  return true;
}

export function compareVersions(versionA: string, versionB: string): number {
    if(!isValidVersion(versionA)) {
        throw new VersionValidationError(`Invalid format for version: ${versionA}`);
    }
    if(!isValidVersion(versionB)) {
        throw new VersionValidationError(`Invalid format for version: ${versionB}`);
    }

    const splitVA = versionA.split('.').map(Number);
    const splitVB = versionB.split('.').map(Number);

    const maxLength = Math.max(splitVA.length, splitVB.length);

    for (let i = 0; i < maxLength; i++) {
        const num1 = splitVA[i] || 0;
        const num2 = splitVB[i] || 0;

        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }

    return 0;
}
