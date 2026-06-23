import { prisma } from "@/app/lib/prisma";
import type { Categorys } from "@/app/generated/prisma/enums";

export const addprofile = async (
  userId: string,
  role: string,
  category?: Categorys,
) => {
  if (role === "client") {
    const profile = await prisma.userprofile.upsert({
      where: { userId },
      create: { userId },
      update: {},
      select: { id: true },
    });
    return { success: true, Profile: profile };
  }

  if (role === "freelancer" && category) {
    const profile = await prisma.freelancer.upsert({
      where: { userId },
      create: { userId, category },
      update: { category },
      select: {
        id: true,
        category: true,
      },
    });
    return { success: true, Profile: profile };
  }

  return { success: false };
};

export const getProfile = async (role: string, email: string) => {
  if (role === "client") {
    const foundclient = await prisma.user.findUnique({
      where: { email: email },
      select: {
        role: true,
        name: true,
        image: true
      }
    });

    return { success: true, profile: foundclient }
  }
  if (role === "freelancer") {
    const foundfreelancer = await prisma.user.findUnique({
      where: { email: email },
      select: {
        name: true,
        image: true,
        Freelancer: {
          select: {
            id: true,
            category: true,
          }
        }
      }
    });
    return { success: true, profile: foundfreelancer }
  }
  return { success: false };
}