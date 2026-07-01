
import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { getServerSession } from "next-auth/next";
import { NextResponse ,NextRequest } from "next/server";

export const GET = async () => {
    const session = await getServerSession(authOptions);

    if (session){
        try{
            if(session.user.isAdmin){
                const orders = await prisma.order.findMany()
                return new NextResponse(JSON.stringify(orders), { status: 200 });}
                const orders = await prisma.order.findMany({
                    where: {
                        userEmail: session.user.email!
                    }
                })
                return new NextResponse(JSON.stringify(orders), { status: 200 });
        }catch (error) {
            console.error("Error fetching orders:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    }
       
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

 const body = await req.json();

const order = await prisma.order.create({
  data: {
    price: body.price,
    status: "Pending",
    products: body.products,

    address: body.address,
    phone: body.phone,
    notes: body.notes,

    userEmail: session.user.email!,
  },
});

  return NextResponse.json(order);
}