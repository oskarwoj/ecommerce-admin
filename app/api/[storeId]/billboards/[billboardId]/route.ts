import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

export async function GET(
	req: Request,
	{ params }: { params: { billboardId: string } },
) {
	try {
		if (!params.billboardId) {
			return new NextResponse("Billboard id is required", { status: 400 });
		}

		const billboard = await prismadb.billboard.findUnique({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { billboardId: string; storeId: string } },
) {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return new NextResponse("Unauthenticated", { status: 403 });
		}

		if (!params.billboardId) {
			return new NextResponse("Billboard id is required", { status: 400 });
		}

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId: currentUser.id,
			},
		});

		if (!storeByUserId) {
			return new NextResponse("Unauthorized", { status: 405 });
		}

		const billboard = await prismadb.billboard.delete({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_DELETE]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { billboardId: string; storeId: string } },
) {
	try {
		const currentUser = await getCurrentUser();

		const body = await req.json();

		const { label, imageUrl } = body;

		if (!currentUser) {
			return new NextResponse("Unauthenticated", { status: 403 });
		}

		if (!label) {
			return new NextResponse("Label is required", { status: 400 });
		}

		if (!imageUrl) {
			return new NextResponse("Image URL is required", { status: 400 });
		}

		if (!params.billboardId) {
			return new NextResponse("Billboard id is required", { status: 400 });
		}

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId: currentUser.id,
			},
		});

		if (!storeByUserId) {
			return new NextResponse("Unauthorized", { status: 405 });
		}

		const billboard = await prismadb.billboard.update({
			where: {
				id: params.billboardId,
			},
			data: {
				label,
				imageUrl,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("[BILLBOARD_PATCH]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
