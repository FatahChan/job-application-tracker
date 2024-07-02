import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteApplication } from "@/lib/appwrite/mutation";
import { Link } from "@tanstack/react-router";
function Actions({ documentId }: { documentId: string }) {
  const deleteMutation = useDeleteApplication();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link
          to="/application/$id"
          params={{
            id: documentId,
          }}
        >
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive cursor-pointer"
          onClick={() => {
            deleteMutation.mutate(documentId);
          }}
          disabled={deleteMutation.isPending}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { Actions };
