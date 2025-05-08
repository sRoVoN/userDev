"use client";

import { use } from "react";
import EditForm from "@/app/components/editForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPage({ params }: EditPageProps) {
  const { id } = use(params);

  return <EditForm id={id} />;
}

