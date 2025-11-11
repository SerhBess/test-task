import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Headline } from '@/lib/types/headline';

interface HeadlineTableProps {
  headlines: Headline[];
}

export function HeadlineTable({ headlines }: HeadlineTableProps) {
  if (headlines.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground">No headlines found</p>
        <p className="text-sm text-muted-foreground mt-2">
          Generate headlines for your campaigns to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Variant</TableHead>
            <TableHead>Headline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {headlines.map((headline, index) => (
            <TableRow key={headline.id}>
              <TableCell className="font-medium">
                #{index + 1}
              </TableCell>
              <TableCell>{headline.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
