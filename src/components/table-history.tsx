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
import { BrakeSchema } from "@/types/brakes";

export function TableHistory({ brakes }: { brakes: BrakeSchema[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent brakes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Latitude</TableHead>
          <TableHead>Longitude</TableHead>
          <TableHead>Kondisi</TableHead>
          <TableHead>Durasi Pengereman</TableHead>
          <TableHead>Perlambatan</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Waktu</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brakes.map((brake, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell className="font-medium">{brake.latitude}</TableCell>
              <TableCell>{brake.longitude}</TableCell>
              <TableCell>{brake.road_condition}</TableCell>
              <TableCell>{brake.brake_duration_ms / 1000} s</TableCell>
              <TableCell>{brake.avg_deceleration_mps2}</TableCell>
              <TableCell>{brake.road_condition}</TableCell>
              <TableCell className="text-right">
                {formatDate(brake.timestamp)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
