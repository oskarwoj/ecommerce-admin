import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser();
		const body = await req.json();

		const { name } = body;

		if (!currentUser) {
			return new NextResponse("Unauthorized", { status: 403 });
		}

		if (!name) {
			return new NextResponse("Name is required", { status: 400 });
		}

		const store = await prismadb.store.create({
			data: {
				name,
				userId: currentUser.id,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[STORES_POST]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
