import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import browser from "webextension-polyfill";
import { z } from "zod";

const contentScriptResponse = z.object({
  role: z.string(),
  company: z.string(),
  posting: z.string().url(),
});
function RequestJobPostingContentButton({
  className,
  onSuccess,
}: {
  className?: string;
  onSuccess?: (data: z.infer<typeof contentScriptResponse>) => void;
}) {
  const { mutate } = useMutation({
    mutationFn: async () => {
      console.log("sending message");
      const [firstTab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!firstTab?.id) {
        console.error("No active tab found");
        return;
      }
      const response = await browser.tabs.sendMessage(firstTab.id, {
        action: "parseJobPosting",
      });
      if (response.error) {
        toast.error(response.error);
        return;
      }
      const { data, success } = contentScriptResponse.safeParse(response);
      if (!success) {
        toast.error("Could not parse job posting");
        return;
      }
      toast.success("Job posting parsed successfully");
      onSuccess && onSuccess(data);
      return;
    },
  });
  return (
    <Button className={className} onClick={() => mutate()}>
      Fill Form
    </Button>
  );
}

export default RequestJobPostingContentButton;
