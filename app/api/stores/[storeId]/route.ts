import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const currentUser = await getCurrentUser();
		const body = await req.json();

		const { name } = body;

		if (!currentUser) {
			return new NextResponse("Unauthenticated", { status: 403 });
		}

		if (!name) {
			return new NextResponse("Name is required", { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse("Store id is required", { status: 400 });
		}

		const store = await prismadb.store.updateMany({
			where: {
				id: params.storeId,
				userId: currentUser.id,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[STORE_PATCH]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return new NextResponse("Unauthenticated", { status: 403 });
		}

		if (!params.storeId) {
			return new NextResponse("Store id is required", { status: 400 });
		}

		const store = await prismadb.store.deleteMany({
			where: {
				id: params.storeId,
				userId: currentUser.id,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log("[STORE_DELETE]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
