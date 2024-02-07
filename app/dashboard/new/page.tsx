import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

const NewNote = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const postData = async (formData: FormData) => {
    "use server";

    if (!user) {
      throw new Error("Not Authorized!");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await prisma.note.create({
      data: {
        userId: user?.id,
        title: title,
        description: description,
      },
    });

    return redirect("/dashboard");
  };

  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardDescription>
            Right here you can now create your new notes
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Enter your title here."
            />
          </div>
          <div className="gap-y-2 flex flex-col">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Enter your description here."
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button asChild variant={"destructive"}>
            <Link href={"/"}> Cancel</Link>
          </Button>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewNote;
