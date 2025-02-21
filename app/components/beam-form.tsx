import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FRAME_BEAM_LOAD_TYPES,
  FRAME_BEAM_LOAD_TYPE_LABELS,
} from "@/app/utils/frameloadTypes";
import { Beam } from "../types/frameTypes";

interface BeamFormProps {
  beams: Beam[];
  onBeamChange: (index: number, field: keyof Beam, value: any) => void;
}

export default function BeamForm({ beams, onBeamChange }: BeamFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Beam Details</h2>
      {beams.map((beam, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-medium">Beam {index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Length <span className="text-chart-2 text-xs">(m)</span>
              </Label>
              <Input
                type="number"
                value={beam.length}
                onChange={(e) =>
                  onBeamChange(index, "length", parseFloat(e.target.value) || 0)
                }
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label>
                Moment of Inertia{" "}
                <span className="text-chart-2 text-xs">(m⁴)</span>
              </Label>
              <Input
                type="number"
                value={beam.momentOfInertia}
                onChange={(e) =>
                  onBeamChange(
                    index,
                    "momentOfInertia",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label>Load Type</Label>
              <Select
                value={beam.loadType}
                onValueChange={(value) =>
                  onBeamChange(index, "loadType", value)
                }
              >
                <SelectTrigger className="bg-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(FRAME_BEAM_LOAD_TYPES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {FRAME_BEAM_LOAD_TYPE_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {beam.loadType !== "NONE" && (
              <div className="space-y-2">
                <Label>
                  Load Magnitude{" "}
                  <span className="text-chart-2 text-xs">
                    {beam.loadType === "UDL" ? "(kN/m)" : "(kN)"}
                  </span>
                </Label>
                <Input
                  type="number"
                  value={beam.loadMagnitude}
                  onChange={(e) =>
                    onBeamChange(
                      index,
                      "loadMagnitude",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="bg-secondary"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
