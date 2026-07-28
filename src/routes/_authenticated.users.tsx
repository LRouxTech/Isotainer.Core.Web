import { createFileRoute } from '@tanstack/react-router';
import {UsersPageComponent} from "../component/users/UsersPageComponent.tsx";

export const Route = createFileRoute('/_authenticated/users')({
    component: UsersPageComponent,
});
