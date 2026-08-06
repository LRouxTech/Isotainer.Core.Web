import {createFileRoute} from "@tanstack/react-router";
import {SetInitialPasswordPageComponent} from "../component/auth/SetInitialPasswordPageComponent.tsx";

export const Route = createFileRoute('/set-password')({
    component: SetInitialPasswordPageComponent,
});