import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

export async function GET(
	req: Request,
	{ params }: { params: { colorId: string } },
) {
	try {
		if (!params.colorId) {
			return new NextResponse("Color id is required", { status: 400 });
		}

		const color = await prismadb.color.findUnique({
			where: {
				id: params.colorId,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLOR_GET]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { colorId: string; storeId: string } },
) {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return new NextResponse("Unauthenticated", { status: 403 });
		}

		if (!params.colorId) {
			return new NextResponse("Color id is required", { status: 400 });
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

		const color = await prismadb.color.delete({
			where: {
				id: params.colorId,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLOR_DELETE]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { colorId: string; storeId: string } },
) {
	try {
		const currentUser = await getCurrentUser();

		const body = await req.json();

		const { name, value } = body;

		if (!currentUser) {
			return new NextResponse("Unauthenticated", { status: 403 });
		}

		if (!name) {
			return new NextResponse("Name is required", { status: 400 });
		}

		if (!value) {
			return new NextResponse("Value is required", { status: 400 });
		}

		if (!params.colorId) {
			return new NextResponse("Color id is required", { status: 400 });
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

		const color = await prismadb.color.update({
			where: {
				id: params.colorId,
			},
			data: {
				name,
				value,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		console.log("[COLOR_PATCH]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
