import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req : NextRequest) => {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");

    try {
        const product = await prisma.product.findMany({
            where: {
                ...(cat ? { catSlug: cat } : { isFeatured: true }),
            },
        });
        return new NextResponse(JSON.stringify(product), { status: 200 });
    } catch (err) {
        console.log("Error in GET /api/product", err);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        title: body.title,
        desc: body.desc,
        img: body.img,
        price: body.price,
        catSlug: body.catSlug,
        isFeatured: body.isFeatured,
        options: body.options,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create product", error },
      { status: 500 }
    );
  }
};
