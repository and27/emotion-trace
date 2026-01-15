import { Suspense } from "react";
import { CreateEntryFlowScreen } from "../../../ui/screens/CreateEntryFlowScreen";

export default function CreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateEntryFlowScreen />
    </Suspense>
  );
}
