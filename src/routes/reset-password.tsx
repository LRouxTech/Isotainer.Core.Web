import {createFileRoute} from "@tanstack/react-router";
import {ResetPasswordPageComponent} from "../component/auth/ResetPasswordPageComponent.tsx";

export const Route = createFileRoute('/reset-password')({
    component: ResetPasswordPageComponent,
});