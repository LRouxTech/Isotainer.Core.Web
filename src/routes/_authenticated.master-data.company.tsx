import { createFileRoute } from '@tanstack/react-router'
import {CompanyRoute} from "../component/master-data/company/CompanyPageComponent.tsx";

export const Route = createFileRoute('/_authenticated/master-data/company')({
  component: CompanyRoute,
});
