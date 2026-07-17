import { createFileRoute } from '@tanstack/react-router';
import {MasterDataScreen} from "../component/master-data/MasterDataScreen.tsx";

export const Route = createFileRoute('/_authenticated/master-data/')({
    component: MasterDataScreen,
});