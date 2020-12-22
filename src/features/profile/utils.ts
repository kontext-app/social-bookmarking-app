import type { BasicProfileDocContent } from 'kontext-common';

export function enrichPartialProfile(
  partialProfile: Partial<BasicProfileDocContent>
): BasicProfileDocContent {
  const { name = '', description = '', image = '' } = partialProfile;
  return {
    name,
    description,
    image,
  };
}
