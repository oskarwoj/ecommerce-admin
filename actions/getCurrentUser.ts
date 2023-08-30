import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export async function getSession() {
	return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
	try {
		const session = await getSession();

		console.log("session", session);

		if (!session?.user?.email) {
			return null;
		}

		const currentUser = await prismadb.user.findUnique({
			where: {
				email: session.user.email,
			},
		});

		if (!currentUser) {
			return null;
		}

		return {
			...currentUser,
			createdAt: currentUser.createdAt.toISOString(),
			updatedAt: currentUser.updatedAt.toISOString(),
			emailVerified: currentUser.emailVerified?.toISOString() || null,
		};
	} catch (error: any) {
		return null;
	}
}
