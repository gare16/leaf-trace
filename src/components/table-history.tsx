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
          <TableHead>Start Braking</TableHead>
          <TableHead>Stop Braking</TableHead>
          <TableHead>Speed</TableHead>
          <TableHead>Braking Duration</TableHead>
          <TableHead>Deceleration</TableHead>
          <TableHead>Road Conditions</TableHead>
          <TableHead className="text-right">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brakes.map((brake, idx) => {
          const start = formatDate(brake.time_1);
          const stop = formatDate(brake.time_2);
          return (
            <TableRow key={idx}>
              <TableCell className="font-medium">{start}</TableCell>
              <TableCell>{stop}</TableCell>
              <TableCell>{brake.delta_speed?.toFixed(3)}</TableCell>
              <TableCell>{brake.duration_brake}</TableCell>
              <TableCell>{brake.deceleration?.toFixed(3)}</TableCell>
              <TableCell>{brake.road_condition}</TableCell>
              <TableCell className="text-right">
                {brake.category_brake}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
