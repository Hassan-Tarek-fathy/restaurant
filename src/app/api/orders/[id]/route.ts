import { prisma } from "@/utils/connect";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("Order ID:", id);

    const body = await req.json();

    console.log("Body:", body);

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: body.status,
      },
    });

    console.log("Updated Order:", order);

    return Response.json(order);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to update",
      },
      {
        status: 500,
      }
    );
  }
}