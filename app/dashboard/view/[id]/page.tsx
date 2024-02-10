import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const getData = async ({
  userId,
  noteId,
}: {
  userId: string;
  noteId: string;
}) => {
  noStore();

  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: userId,
    },
    select: {
      title: true,
      description: true,
      id: true,
      createdAt: true,
    },
  });

  return data;
};

const NoteView = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ userId: user?.id as string, noteId: params.id });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold text-xl text-primary">
          {data?.title}
        </CardTitle>
        <CardDescription>
          {data?.createdAt
            ? Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
              }).format(new Date(data.createdAt))
            : "Unknown Date"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-md leading-6">{data?.description}</p>
      </CardContent>

      <CardFooter>
        <Link href={"/dashboard"}>
          <Button> Back to Dashboard</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NoteView;
