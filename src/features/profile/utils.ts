import type { BasicProfileDocContent } from 'features/profile/types';

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
