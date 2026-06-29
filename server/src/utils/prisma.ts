import { Prisma } from "@prisma/client";

export function getConflictFields(
  err: Prisma.PrismaClientKnownRequestError,
): string[] | undefined {
  // Works when Prisma populates target (older docs / future fixes)
  if (Array.isArray(err.meta?.target) && err.meta.target.length > 0) {
    return err.meta.target as string[];
  }

  const constraint = (
    err.meta?.driverAdapterError as {
      cause?: {
        constraint?: {
          fields?: string[];
          index?: string;
        };
      };
    }
  )?.cause?.constraint;

  if (constraint?.fields?.length) {
    // pg sometimes wraps names in quotes: "\"slug\"" → "slug"
    return constraint.fields.map((f) => f.replace(/^"|"$/g, ""));
  }

  if (constraint?.index) {
    return [constraint.index];
  }

  return undefined;
}
