import { createFileRoute } from '@tanstack/react-router';
import {WashInstructionPageComponent} from "../component/wash/WashInstructionPageComponent.tsx";

export const Route = createFileRoute('/_authenticated/washing')({
    component: WashInstructionPageComponent,
});
