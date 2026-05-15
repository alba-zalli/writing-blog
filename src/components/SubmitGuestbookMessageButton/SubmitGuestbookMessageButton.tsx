import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";

function SubmitGuestbookMessageButton() {
  const { pending } = useFormStatus();

  return (
    <button >
      {!pending ? <PaperPlaneIcon className="pl-1 h-5 w-5" /> : <ReloadIcon className="pl-1 h-5 w-5 animate-spin" />}
    </button>
  );
}

export default SubmitGuestbookMessageButton;
