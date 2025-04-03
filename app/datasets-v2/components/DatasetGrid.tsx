import type { Dataset } from "../../api/data/datasets"
import DatasetCard from "./DatasetCards"

type DatasetGridProps = {
  datasets: Dataset[]
}

export default function DatasetGrid({ datasets }: DatasetGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {datasets.map((dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} />
      ))}
    </div>
  )
}

