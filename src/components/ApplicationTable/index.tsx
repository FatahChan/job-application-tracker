import { type JobApplicationType } from "@/schema/Application";
import { DataTable } from "../DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { Actions } from "./ActionsCell";
import type { Document } from "@/lib/appwrite";
import SortableHeader from "./SortableHeader";
import capitalize from "lodash.capitalize";

const columnHelper = createColumnHelper<Document<JobApplicationType>>();

const columns = [
  columnHelper.accessor("role", {
    header: ({ column }) => (
      <SortableHeader column={column}>Role</SortableHeader>
    ),
    id: "role",
  }),
  columnHelper.accessor("company", {
    header: ({ column }) => (
      <SortableHeader column={column}>Company</SortableHeader>
    ),
    id: "company",
  }),
  columnHelper.accessor("posting", {
    header: ({ column }) => (
      <SortableHeader column={column}>Posting</SortableHeader>
    ),
    id: "posting",
    cell: (cell) => {
      const value = cell.getValue();
      if (!value) return <span>Not Found</span>;
      return (
        <a href={value} target="_blank" className="underline text-primary">
          Link
        </a>
      );
    },
  }),
  columnHelper.accessor("salary", {
    header: ({ column }) => (
      <SortableHeader column={column}>Salary</SortableHeader>
    ),
    id: "salary",
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <SortableHeader column={column}>Status</SortableHeader>
    ),
    id: "status",
    cell: (cell) => capitalize(cell.getValue()),
  }),
  columnHelper.accessor("applicationDate", {
    header: ({ column }) => (
      <SortableHeader column={column}>Application Date</SortableHeader>
    ),
    id: "applicationDate",
    cell: (cell) => {
      let value = cell.getValue();
      if (typeof value === "string") value = new Date(value);
      return value?.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  }),
  columnHelper.accessor("interviewDate", {
    header: ({ column }) => (
      <SortableHeader column={column}>Interview Date</SortableHeader>
    ),
    id: "interviewDate",
    cell: (cell) => {
      let value = cell.getValue();
      if (typeof value === "string") value = new Date(value);
      return value?.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  }),
  columnHelper.accessor("acceptanceDate", {
    header: ({ column }) => (
      <SortableHeader column={column}>Acceptance Date</SortableHeader>
    ),
    id: "acceptanceDate",
    cell: (cell) => {
      let value = cell.getValue();
      if (typeof value === "string") value = new Date(value);
      return value?.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  }),
  columnHelper.accessor("rejectionDate", {
    header: ({ column }) => (
      <SortableHeader column={column}>Rejection Date</SortableHeader>
    ),
    id: "rejectionDate",
    cell: (cell) => {
      let value = cell.getValue();
      if (typeof value === "string") value = new Date(value);
      return value?.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  }),
  columnHelper.accessor("$id", {
    header: "Actions",
    id: "actions",
    cell: (cell) => {
      const id = cell.getValue();
      return <Actions documentId={id} />;
    },
  }),
];

function ApplicationTable({ data }: { data: Document<JobApplicationType>[] }) {
  return (
    <DataTable
      columns={
        columns as unknown as ColumnDef<Document<JobApplicationType>, unknown>[] // TODO: Fix typing
      }
      data={data}
    />
  );
}
export { ApplicationTable };
