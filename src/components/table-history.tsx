import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/date";
import { BrakeType } from "@/types/brakes";

export function TableHistory({ brakes }: { brakes: BrakeType[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent brakes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>start_braking</TableHead>
          <TableHead>stop_braking</TableHead>
          <TableHead>Speed</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>Braking Duration</TableHead>
          <TableHead className="text-right">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brakes.map((brake, idx) => {
          const start = formatDate(brake.start_braking);
          const stop = formatDate(brake.stop_braking);
          return (
            <TableRow key={idx}>
              <TableCell className="font-medium">{start}</TableCell>
              <TableCell>{stop}</TableCell>
              <TableCell>{Number(brake.speed)}</TableCell>
              <TableCell>{Number(brake.distance)}</TableCell>
              <TableCell>{Number(brake.duration_braking)}</TableCell>
              <TableCell className="text-right">{brake.category}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
