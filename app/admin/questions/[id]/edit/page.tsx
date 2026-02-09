import { EditQuestionPage } from "./edit-page";

export default async function Page({ params }: PageProps<"/admin/questions/[id]/edit">) {
  return <EditPageWrapper params={params} />;
}

async function EditPageWrapper({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  return <EditQuestionPage id={id} />;
}
