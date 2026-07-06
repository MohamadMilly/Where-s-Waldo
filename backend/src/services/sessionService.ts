import { prisma } from "../lib/prisma.js";

export async function createSession() {
  const sessionId = crypto.randomUUID();
  const startTime = new Date();
  const session = await prisma.gameSession.create({
    data: {
      sessionId: sessionId,
      startTime: startTime,
    },
  });

  return session;
}

export async function endSession(sessionId: string) {
  const endTime = new Date();
  const endedSession = await prisma.gameSession.update({
    where: {
      sessionId: sessionId,
    },
    data: {
      endTime: endTime,
      completed: true,
    },
  });

  return endedSession;
}

export async function getSession(sessionId: string) {
  const session = await prisma.gameSession.findUnique({
    where: {
      sessionId: sessionId,
    },
  });

  return session;
}
