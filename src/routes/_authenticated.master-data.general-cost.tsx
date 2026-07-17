import { createFileRoute } from '@tanstack/react-router'
import {GeneralCostRoute} from "../component/master-data/general-cost/GeneralCostPageComponent.tsx";

export const Route = createFileRoute('/_authenticated/master-data/general-cost')({
    component: GeneralCostRoute,
});
