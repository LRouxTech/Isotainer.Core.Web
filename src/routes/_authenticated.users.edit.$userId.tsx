import { createFileRoute } from '@tanstack/react-router';
import {UserFormPageComponent} from "../component/users/UserFormPageComponent.tsx";

export const Route = createFileRoute('/_authenticated/users/edit/$userId')({
    component: UserFormPageComponent,
});