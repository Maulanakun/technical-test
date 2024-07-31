"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

function ClientInputError() {
  const params = useSearchParams();

  return <p className="text-lg text-red-700">{params.get("error")}</p>;
}

export default ClientInputError;
