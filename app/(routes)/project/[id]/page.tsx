"use client";

import { useGetProjectId } from "@/features/use-project-id";
import { useParams } from "next/navigation";
import Header from "./_common/header";

const Page = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: project, isPending } = useGetProjectId(id);
  const frames = project?.frames || [];
  const theme = project?.theme || "";

  if (!isPending && !project) {
    return <div>Project not found</div>;
  }
  return (
    <div className="relative h-screen w-full flex flex-col">
      <Header projectName={project?.name} />
    </div>
  );
};

export default Page;
