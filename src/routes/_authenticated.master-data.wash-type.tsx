import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/master-data/wash-type')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/master-data/wash-type"!</div>
}
