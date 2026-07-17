import { createFileRoute } from '@tanstack/react-router';
import {WashTypeRoute} from "../component/master-data/wash-type/WashTypePageComponent.tsx";

export const Route = createFileRoute('/_authenticated/master-data/wash-type')({
  component: WashTypeRoute,
});