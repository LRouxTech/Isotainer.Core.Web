import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/master-data/company')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/master-data/company"!</div>
}
