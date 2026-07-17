import { createFileRoute } from '@tanstack/react-router';
import {HomePageComponent} from "../component/home/HomePageComponent.tsx";

export const Route = createFileRoute('/_authenticated/home')({
    component: HomePageComponent,
});
