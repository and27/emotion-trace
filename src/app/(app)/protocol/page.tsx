import { Suspense } from "react";
import { ProtocolRunScreen } from "../../../ui/screens/ProtocolRunScreen";

export default function ProtocolPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtocolRunScreen />
    </Suspense>
  );
}
