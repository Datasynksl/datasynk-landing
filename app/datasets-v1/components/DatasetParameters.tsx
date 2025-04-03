import { Card, CardContent } from "@/components/ui/card"

interface DatasetParametersProps {
  parameters: any
}

export function DatasetParameters({ parameters }: DatasetParametersProps) {
  if (!parameters) return null

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-4">Parameters</h3>
      <Card className="bg-black-200">
        <CardContent className="pt-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(parameters).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <dt className="text-sm text-muted-foreground">{key}</dt>
                <dd className="font-medium">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}